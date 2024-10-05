"use client";
import { Search } from "./ui/search";

export const Hero = () => {
  return (
    <section className="container place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-8 flex flex-col items-center z-10 relative">
        <main className="text-3xl md:text-5xl font-bold ">
          <h1 className="text-center font-bold">
            성공적인 공간창업을 위한<br></br>건축 인허가 사전 검토 솔루션
          </h1>
        </main>

        <div className="max-w-[500px] w-full">
          <Search />
        </div>

        <div>
          <p className="text-xl text-muted-foreground mb-2">
            부동산 용도변경의 모든 것을{" "}
            <span className="text-primary font-semibold">빌드톡</span>과 함께
            시작하세요!
          </p>

          <p className="text-sm text-muted-foreground/70">
            *현재 빌드톡은 연면적 3,000m<sup>2</sup> 미만 건물에 대한 서비스를
            제공하고 있습니다.
          </p>
        </div>
      </div>

      {/* Hero cards sections */}
      {/* <div className="z-10">
        <HeroCards />
      </div> */}

      {/* Shadow effect */}
      <div className="hero-bg-shadow"></div>
      {/* <div className="shadow"></div> */}
    </section>
  );
};
