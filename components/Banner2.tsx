"use client";
import Link from "next/link";
import cubeLeg from "../assets/cube-leg.png";
import { Button } from "./ui/button";

export const Banner2 = () => {
  return (
    <section className="container py-24 sm:py-32 relative">
      <div className="w-1/2 absolute top-0 bottom-0 right-0 z-0 flex justify-end items-center">
        <img src={cubeLeg.src} alt="About services" className="max-h-full" />
      </div>

      <h2 className="text-3xl md:text-4xl font-bold break-keep z-10 relative mb-5">
        랜드북 건축 컨설팅
      </h2>

      <p className="text-muted-foreground text-xl mt-4 mb-8 break-keep">
        AI기술로 최대 37가지의 건축 설계안을 제공합니다. AI 건축분석으로 빠르게
        수익성을 분석해보세요.
      </p>

      <Button size="lg" asChild>
        <Link target="_blank" href="https://naver.com">
          컨설팅 신청하기
        </Link>
      </Button>
    </section>
  );
};
