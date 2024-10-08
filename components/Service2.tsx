"use client";
import Image from "next/image";
import service01 from "../assets/service_01.png";
import { Badge } from "./ui/badge";

export const Service2 = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid md:grid-cols-[1.2fr,1fr] gap-8 place-items-end ">
        <Image
          src={service01}
          width={300}
          height={200}
          className="w-full"
          alt="About services"
        />

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
            빌드톡으로 여러분의 프로젝트를 성공적으로
          </p>
        </div>
      </div>
    </section>
  );
};
