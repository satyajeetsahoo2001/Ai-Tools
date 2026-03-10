import { useRef, useEffect } from 'react';

export default function useDragScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let isMoving = false;
    let velocity = 0;
    let lastX = 0;
    let rafId;

    const onMouseDown = (e) => {
      isDown = true;
      slider.classList.add('grabbing');
      slider.style.scrollBehavior = 'auto'; // Disable smooth scroll for manual control
      slider.style.scrollSnapType = 'none'; // Disable snapping during drag
      startX = e.pageX - slider.offsetLeft;
      isMoving = false;
      lastX = e.pageX;
      velocity = 0;
      cancelAnimationFrame(rafId);
    };

    const onMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('grabbing');
      slider.style.scrollBehavior = ''; // Restore original behavior
      slider.style.scrollSnapType = ''; // Restore snapping
      applyMomentum();
    };

    const onMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      slider.classList.remove('grabbing');
      slider.style.scrollBehavior = ''; // Restore original behavior
      slider.style.scrollSnapType = ''; // Restore snapping
      applyMomentum();
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      
      const x = e.pageX - slider.offsetLeft;
      // Use direct diff for walk to avoid cumulative errors
      const walk = (e.pageX - lastX);
      
      if (Math.abs(x - startX) > 5) {
        isMoving = true;
      }
      
      // Update position immediately
      slider.scrollLeft -= walk;
      
      // Calculate velocity for momentum
      velocity = walk;
      lastX = e.pageX;
    };

    const applyMomentum = () => {
      if (Math.abs(velocity) < 0.5) {
        slider.style.scrollSnapType = ''; // Final restoration
        return;
      }
      
      slider.scrollLeft -= velocity;
      velocity *= 0.95; // Friction
      
      rafId = requestAnimationFrame(applyMomentum);
    };

    const onClick = (e) => {
      if (isMoving) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseLeave);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);
    slider.addEventListener('click', onClick, true);

    return () => {
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseLeave);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
      slider.removeEventListener('click', onClick, true);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
}
