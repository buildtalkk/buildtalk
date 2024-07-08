"use client";

import { getBuildingInfo } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Result = () => {
  const searchParams = useSearchParams();
  const sigunguCd = searchParams.get("sigunguCd");
  const bjdongCd = searchParams.get("bjdongCd");
  const bun = searchParams.get("bun");
  const ji = searchParams.get("ji");
  const [result, setResult] = useState({} as Record<string, unknown>);

  useEffect(() => {
    if (sigunguCd && bjdongCd && bun && ji) {
      getBuildingInfo({ sigunguCd, bjdongCd, bun, ji }).then((data) => {
        setResult(data);
      });
    }
  }, [sigunguCd, bjdongCd, bun, ji]);

  useEffect(() => {
    console.log("result", result);
  }, [result]);

  return <pre>{JSON.stringify(result, null, 2)}</pre>;
};
