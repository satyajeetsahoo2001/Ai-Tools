import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function example() {
    const viewRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // This animates the entire container when it enters the viewport
            gsap.from(viewRef.current, {
                scrollTrigger: {
                    trigger: viewRef.current,
                    start: "top 80%", // Animation starts when container top hits 80% of screen height
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        }, viewRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={viewRef}
            className="container"
            style={{ display: "flex",overflowX: "auto",scrollbarWidth: "none",whiteSpace: "nowrap" }} /* Prevents flash before animation */
        >
            <div style={{fontSize:"20px",backgroundColor:"white",width:"100%"}}> hii good evening</div>
            <div style={{fontSize:"20px",color:"white"}}> hii good evening</div>
            <div style={{fontSize:"20px",color:"white"}}> hii good evening</div>
            <div style={{fontSize:"20px",color:"white"}}> hii good evening</div>
            <div style={{fontSize:"20px"}}> hii good evening</div>
            <div style={{fontSize:"20px"}}> hii good evening</div>
        </div>
    );
}