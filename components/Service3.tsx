"use client";
import Image from "next/image";
import cubeLeg from "../assets/cube-leg.png";
import { Badge } from "./ui/badge";

export const Service3 = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid md:grid-cols-[1.6fr,1fr] gap-8 place-items-center">
        <div>
          <Badge className="mb-3" variant="outline">
            AI 분석
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold break-keep">
            빠르게{" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              토지 가치
            </span>
            를 비교, 분석해보세요.
          </h2>

          <p className="text-muted-foreground text-xl mt-4 mb-8 break-keep">
            AI기술로 최대 37가지의 건축 설계안을 제공합니다. AI 건축분석으로
            빠르게 수익성을 분석해보세요.
          </p>
        </div>
        <Image
          src={cubeLeg}
          width={700}
          className="w-full"
          alt="About services"
        />
      </div>
    </section>
  );
};
