"use client";
import { testApi } from "@/lib/actions";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "./ui/button";
import { Search } from "./ui/search";

export const Hero = () => {
  return (
    <section className="container place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6 flex flex-col items-center z-10 relative">
        <main className="text-3xl md:text-5xl font-bold ">
          <h1 className="text-center font-bold">
            성공적인 공간창업을 위한<br></br>건축 인허가 사전 검토 솔루션
            {/* <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
              
            </span>{" "} */}
            {/* landing page */}
          </h1>
          {/* {" "}
          for{" "} */}
          {/* <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
              React
            </span>{" "}
            developers
          </h2> */}
        </main>

        <Search />

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Build your React landing page effortlessly with the required sections
          to your project. !!!!!!!!!!!!
        </p>

        <p>
          <Button
            onClick={async () => {
              console.log(await testApi());
            }}
            className="w-full md:w-1/3"
          >
            검색하기
          </Button>
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3">Get Started</Button>

          <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      {/* <div className="z-10">
        <HeroCards />
      </div> */}

      {/* Shadow effect */}
      <div className="shadow"></div>
      {/* <div className="shadow"></div> */}
    </section>
  );
};
