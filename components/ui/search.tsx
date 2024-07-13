"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { Juso, searchAddress } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Search() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Juso[]>([]);
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    searchAddress(debouncedSearch).then((jusos) => {
      console.log("jusos", jusos);
      if (jusos && jusos.length > 0) {
        setSearchResults(jusos);
      }
    });
  }, [debouncedSearch]);

  useEffect(() => {
    console.log("searchResults", searchResults);
  }, [searchResults]);

  // React.useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
  //       e.preventDefault();
  //       setOpen((open) => !open);
  //     }
  //   };

  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  const handleJuso = (juso: Juso) => {
    const sigunguCd = juso.admCd.slice(0, 5);
    const bjdongCd = juso.admCd.slice(5, 10);

    const searchParams = new URLSearchParams();
    searchParams.set("sigunguCd", sigunguCd);
    searchParams.set("bjdongCd", bjdongCd);

    // fill lnbrMnnm by zero to make 4 letters
    const bun = juso.lnbrMnnm.padStart(4, "0");
    const ji = juso.lnbrSlno.padStart(4, "0");

    searchParams.set("bun", bun);
    searchParams.set("ji", ji);

    searchParams.set("admCd", juso.admCd);
    searchParams.set("lnbrMnnm", juso.lnbrMnnm);
    searchParams.set("lnbrSlno", juso.lnbrSlno);

    router.push(`/result?${searchParams.toString()}`);
  };

  return (
    <>
      <input
        id="search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="주소를 입력해 주세요."
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />

      {/* result */}
      <div className="max-h-[300px] overflow-y-auto overflow-x-hidden">
        {searchResults.length > 0 ? (
          <div className="overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground">
            {searchResults.map((juso) => (
              <div
                key={juso.bdMgtSn}
                className="flex items-center border-b px-3 cursor-pointer hover:bg-primary-foreground hover:text-primary-background"
                onClick={() => handleJuso(juso)}
              >
                <span className="mr-2 h-4 w-4 shrink-0 opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                <span className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
                  {juso.jibunAddr}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
