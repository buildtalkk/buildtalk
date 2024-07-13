"use client";
import cubeLeg from "../assets/cube-leg.png";
import { Button } from "./ui/button";

export const Banner = () => {
  return (
    <section className="container py-24 sm:py-32 bg-[#003585] relative">
      <div className="w-1/2 absolute top-0 bottom-0 right-0 z-0 flex justify-end items-center">
        <img src={cubeLeg.src} alt="About services" className="max-h-full" />
      </div>

      <h2
        className="text-3xl md:text-4xl font-bold break-keep text-white z-10 relative mb-5"
        style={{
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        지도에서 매물을 비교하고<br></br>토지를 찾아보세요!
      </h2>

      <Button
        variant="outline"
        size="lg"
        onClick={() => {
          (
            document.querySelector("#search") as HTMLInputElement | null
          )?.focus();
        }}
      >
        용도변경 바로하기
      </Button>
    </section>
  );
};
