"use client";

import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { gsap } from "gsap";

interface HeroSlideForClient {
  imageUrl: string;
  titleLine1: string;
  titleLine2?: string;
  buttonLabel: string;
  buttonUrl: string;
  buttonIsExternal?: boolean;
}

interface HeroSliderClientProps {
  slides: HeroSlideForClient[];
}

export function HeroSliderClient({
  slides,
}: HeroSliderClientProps) {
  const [currentSlide, setCurrentSlide] =
    useState(0);
  const slideRefs = useRef<
    (HTMLDivElement | null)[]
  >([]);
  const textContentRefs = useRef<
    (HTMLDivElement | null)[]
  >([]);

  useEffect(() => {
    slides.forEach((_, index) => {
      if (textContentRefs.current[index]) {
        gsap.set(textContentRefs.current[index], {
          opacity: 0,
          y: 50,
        });
      }
    });

    if (textContentRefs.current[0]) {
      gsap.set(textContentRefs.current[0], {
        opacity: 1,
        y: 0,
      });
    }

    const slideInterval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % slides.length,
      );
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides, currentSlide]);

  useEffect(() => {
    gsap.to(slideRefs.current, {
      x: -currentSlide * 100 + "%",
      duration: 0.8,
      ease: "power2.inOut",
    });

    slides.forEach((_, index) => {
      if (textContentRefs.current[index]) {
        if (index === currentSlide) {
          gsap.fromTo(
            textContentRefs.current[index],
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.3,
            },
          );
        } else {
          gsap.to(
            textContentRefs.current[index],
            {
              opacity: 0,
              y: -50,
              duration: 0.3,
            },
          );
        }
      }
    });
  }, [currentSlide, slides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % slides.length,
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + slides.length) %
        slides.length,
    );
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="flex h-full w-full"
        ref={(el) => {
          if (el) slideRefs.current[0] = el;
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="hero-slide flex-shrink-0 w-full h-full relative flex items-center justify-center"
            style={{
              backgroundImage: `url(${slide.imageUrl})`,
            }}
          >
            <div
              className="max-w-1/2 relative z-10 text-center text-white p-8 bg-black/50 rounded-lg"
              ref={(el) => {
                if (el)
                  textContentRefs.current[index] =
                    el;
              }}
              style={{ opacity: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="block">
                  {slide.titleLine1}
                </span>
                {slide.titleLine2 && (
                  <span className="block">
                    {slide.titleLine2}
                  </span>
                )}
              </h1>
              <Button
                asChild
                className="bg-[#f9fafb] text-[#1f2937] font-bold p-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
              >
                <a
                  href={slide.buttonUrl}
                  target={
                    slide.buttonIsExternal
                      ? "_blank"
                      : "_self"
                  }
                  rel={
                    slide.buttonIsExternal
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {slide.buttonLabel}
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-30 rounded-full text-white hover:bg-opacity-50 transition-all z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-30 rounded-full text-white hover:bg-opacity-50 transition-all z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-4 w-4 rounded-full border-2 transition-colors duration-300 ${
              currentSlide === index
                ? "bg-secondary/80"
                : "bg-secondary/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
