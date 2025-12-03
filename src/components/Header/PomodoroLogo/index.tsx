import Logo from "@assets/svgs/pomodoro-night.svg?react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface PomodoroLogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function PomodoroLogo({
  className,
  width = 40,
  height = 40,
}: PomodoroLogoProps) {
  const logoRef = useRef<SVGSVGElement | null>(null);

  // Adiciona animações GSAP para a logo
  useEffect(() => {
    if (!logoRef.current) return;

    const svgEl = logoRef.current;

    const moon = svgEl.querySelector("#moon");
    const stars = [
      svgEl.querySelector("#star1"),
      svgEl.querySelector("#star2"),
      svgEl.querySelector("#star3"),
      svgEl.querySelector("#star4"),
    ];

    const handleMouseEnter = () => {
      gsap.to(moon, {
        rotate: -10,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power1.out",
      });

      gsap.to(stars, {
        scale: 1.5,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power1.out",
        stagger: 0.15,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(moon, {
        rotate: 0,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power1.in",
      });

      gsap.to(stars, {
        scale: 1,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power1.out",
        stagger: 0.1,
      });
    };

    svgEl.addEventListener("mouseenter", handleMouseEnter);
    svgEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      svgEl.removeEventListener("mouseenter", handleMouseEnter);
      svgEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Logo ref={logoRef} className={className} width={width} height={height} />
  );
}
