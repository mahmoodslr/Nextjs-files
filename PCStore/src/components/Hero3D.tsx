"use client";

import { useEffect, useState } from "react";

export default function Hero3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      setMouse({ x, y });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="relative mx-auto mt-16 h-[420px] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100 shadow-2xl dark:border-gray-800 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20" />

      <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="absolute bottom-0 left-10 h-32 w-32 rounded-full bg-purple-400/10 blur-3xl" />

      {/* Floating particles */}
      <div className="absolute left-[12%] top-[22%] h-3 w-3 animate-bounce rounded-full bg-gray-400/40" />

      <div className="absolute left-[25%] top-[65%] h-2 w-2 animate-pulse rounded-full bg-purple-400/60" />

      <div className="absolute right-[18%] top-[20%] h-3 w-3 animate-pulse rounded-full bg-blue-400/50" />

      <div className="absolute right-[10%] bottom-[25%] h-2 w-2 animate-bounce rounded-full bg-gray-400/40" />

      {/* 3D Scene */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `
            rotateX(${-mouse.y * 4}deg)
            rotateY(${mouse.x * 6}deg)
          `,
        }}
      >
        {/* Glow Ring */}
        <div
          className="absolute h-[310px] w-[310px] rounded-full border border-purple-400/20"
          style={{
            transform: "rotateX(65deg) rotateZ(15deg)",
            boxShadow:
              "0 0 60px rgba(139,92,246,0.12), inset 0 0 40px rgba(139,92,246,0.08)",
          }}
        />

        <div
          className="absolute h-[250px] w-[250px] rounded-full border border-blue-400/20"
          style={{
            transform: "rotateX(65deg) rotateZ(-25deg)",
          }}
        />

        {/* Platform */}
        <div
          className="absolute bottom-[45px] h-8 w-[430px] rounded-[50%] border border-gray-300 bg-gradient-to-b from-gray-300 to-gray-100 shadow-2xl dark:border-gray-700 dark:from-gray-700 dark:to-gray-900"
          style={{
            transform: "rotateX(65deg)",
            boxShadow:
              "0 25px 50px rgba(0,0,0,0.18), 0 0 30px rgba(139,92,246,0.15)",
          }}
        />

        {/* Platform Glow */}
        <div
          className="absolute bottom-[43px] h-2 w-[380px] rounded-full bg-purple-500/40 blur-md"
          style={{
            transform: "rotateX(65deg)",
          }}
        />

        {/* Monitor */}
        <div
          className="absolute left-1/2 top-[65px] -translate-x-1/2"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateX(-50%) rotateX(-3deg) rotateY(-8deg)",
          }}
        >
          {/* Monitor frame */}
          <div className="relative h-[175px] w-[280px] rounded-xl border-4 border-gray-800 bg-gray-950 shadow-2xl dark:border-gray-700">
            {/* Screen */}
            <div className="absolute inset-2 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-950">
              {/* Screen glow */}
              <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/30 blur-3xl" />

              {/* Fake UI */}
              <div className="absolute left-5 top-5 h-2 w-16 rounded-full bg-white/30" />

              <div className="absolute left-5 top-8 h-3 w-28 rounded-full bg-white/15" />

              <div className="absolute bottom-6 left-5 h-16 w-16 rounded-xl border border-white/10 bg-white/10 backdrop-blur" />

              <div className="absolute bottom-6 left-24 h-16 w-16 rounded-xl border border-white/10 bg-white/10 backdrop-blur" />

              <div className="absolute bottom-6 right-5 h-16 w-16 rounded-xl border border-white/10 bg-white/10 backdrop-blur" />
            </div>

            {/* Monitor reflection */}
            <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-transparent" />
          </div>

          {/* Monitor neck */}
          <div className="mx-auto h-12 w-5 bg-gradient-to-r from-gray-600 to-gray-300 dark:from-gray-700 dark:to-gray-500" />

          {/* Monitor base */}
          <div className="mx-auto h-3 w-28 rounded-full bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 dark:from-gray-700 dark:via-gray-500 dark:to-gray-700" />
        </div>

        {/* Keyboard */}
        <div
          className="absolute bottom-[75px] left-[calc(50%-210px)] h-[60px] w-[220px] rounded-xl border border-gray-300 bg-gradient-to-b from-gray-200 to-gray-100 p-2 shadow-2xl dark:border-gray-700 dark:from-gray-700 dark:to-gray-800"
          style={{
            transform: "rotateX(62deg) rotateZ(-8deg) translateZ(15px)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 40 }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-sm ${
                  index === 12 || index === 24 || index === 31
                    ? "bg-purple-400/70"
                    : "bg-white/80 dark:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mouse */}
        <div
          className="absolute bottom-[90px] right-[calc(50%-195px)] h-[60px] w-[42px] rounded-[45%] border border-gray-400 bg-gradient-to-br from-gray-800 to-gray-950 shadow-xl dark:border-gray-600"
          style={{
            transform: "rotateX(58deg) rotateZ(12deg) translateZ(20px)",
          }}
        >
          <div className="mx-auto mt-3 h-4 w-1 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
        </div>

        {/* Headset */}
        <div
          className="absolute right-[calc(50%-235px)] top-[110px] h-[110px] w-[90px]"
          style={{
            transform: "rotateY(-12deg) rotateZ(8deg)",
          }}
        >
          {/* Headband */}
          <div className="absolute left-4 top-0 h-20 w-14 rounded-t-full border-[8px] border-b-0 border-gray-800 dark:border-gray-700" />

          {/* Left ear */}
          <div className="absolute left-0 top-14 h-10 w-8 rounded-lg bg-gray-900 shadow-xl dark:bg-gray-700">
            <div className="h-full w-full rounded-lg bg-purple-500/20" />
          </div>

          {/* Right ear */}
          <div className="absolute right-0 top-14 h-10 w-8 rounded-lg bg-gray-900 shadow-xl dark:bg-gray-700">
            <div className="h-full w-full rounded-lg bg-blue-500/20" />
          </div>
        </div>
      </div>

      {/* Text overlay */}
      <div className="pointer-events-none absolute bottom-7 left-7 z-20 sm:left-10">
        <p className="text-xs font-semibold tracking-[0.3em] text-gray-400">
          PCSTORE
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your setup. Your style.
        </p>
      </div>

      {/* 3D label */}
      <div className="absolute right-7 top-7 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-xs font-medium text-gray-500 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-400">
        3D EXPERIENCE
      </div>
    </div>
  );
}
