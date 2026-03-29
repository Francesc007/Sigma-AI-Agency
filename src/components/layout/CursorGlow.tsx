"use client";

import { useEffect, useRef, useState } from "react";

const LERP = 0.38;

function isDarkZone(el: Element | null): boolean {
  if (!el) return false;
  const zone = el.closest("[data-cursor-zone]");
  return zone?.getAttribute("data-cursor-zone") === "dark";
}

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const [isDark, setIsDark] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    document.body.classList.add("cursor-glow-active");

    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * LERP;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * LERP;
      const el = dotRef.current;
      if (el) {
        el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      setIsDark(isDarkZone(hit));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("cursor-glow-active");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden
    >
      <div
        ref={dotRef}
        className={`cursor-glow-dot fixed left-0 top-0 will-change-transform transition-opacity duration-150 ${visible ? "opacity-100" : "opacity-0"} ${isDark ? "cursor-glow-dot--on-dark" : "cursor-glow-dot--on-light"}`}
      />
    </div>
  );
}
