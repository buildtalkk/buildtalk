"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { Juso, searchAddress } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function Search() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Juso[]>([]);
  const router = useRouter();
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (search.length < 2) {
      setSearchResults([]);
    }
  }, [search.length]);

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
    <div className="relative">
      <input
        id="search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="주소를 입력해 주세요."
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 relative"
      />

      {/* result */}
      <div className="absolute bg-white left-0 right-0 top-12 rounded  shadow ">
        {searchResults.length > 0 ? (
          <div className="overflow-hidden py-1 text-foreground">
            {searchResults.map((juso, index) => (
              <div
                key={juso.bdMgtSn}
                className={twMerge(
                  "flex items-center  cursor-pointer hover:bg-primary-foreground hover:text-primary-background",
                  index !== searchResults.length - 1 && "border-b"
                )}
                onClick={() => handleJuso(juso)}
              >
                <span className="flex w-full rounded-md bg-transparent py-2 px-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50">
                  {juso.jibunAddr}
                </span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
