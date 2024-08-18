"use client";
import Link from "next/link";
import cubeLeg from "../assets/cube-leg.png";
import { Button } from "./ui/button";

export const Banner2 = () => {
  return (
    <section className="container py-24 sm:py-32 relative">
      {/* 이미지와 텍스트의 위치를 바꿉니다. */}
      <div className="w-1/2 absolute top-0 bottom-0 left-0 z-0 flex justify-start items-center">
        <img src={cubeLeg.src} alt="About services" className="max-h-full" />
      </div>

      <div className="w-1/2 ml-auto flex flex-col items-start relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold break-keep mb-5">
          빌드톡 건축인허가 상담하기
        </h2>

        <p className="text-muted-foreground text-xl mt-4 mb-8 break-keep">
          프로젝트에 최적화된 전문 건축사의 맞춤형 컨설팅으로 성공적인 건축을
          시작하세요.
        </p>

        <Button size="lg" asChild>
          <Link
            target="_blank"
            href="https://docs.google.com/forms/d/1yYalkCYn0yUr744ObSHua9cO188HemMJTR0MpT471F4/"
          >
            건축상담 시작하기{" "}
          </Link>
        </Button>
      </div>
    </section>
  );
};
