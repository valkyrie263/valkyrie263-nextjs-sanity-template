"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  opacity?: number;
}

export function ScrollAnimationWrapper({
  children,
  delay = 0,
  duration = 0.5,
  y = 50,
  opacity = 0,
}: ScrollAnimationWrapperProps) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { opacity: opacity, y: y },
        {
          opacity: 1,
          y: 0,
          duration: duration,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }
  }, [delay, duration, y, opacity]);

  return <div ref={ref}>{children}</div>;
}
