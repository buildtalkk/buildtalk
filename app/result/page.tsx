"use client";

import { getBuildingInfo } from "@/lib/actions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// http://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo?
// sigunguCd=11140
// bjdongCd=16200
// bun=0369
// ji=0035
// ServiceKey=oQa0u9ZYG7As2ub9ooGMnPoZyjWjj%2Fea01flLcbJXI0XUTWzmqoK5kpK1laeof6FCmVRvSwVtFs4VNc%2Fz6SK7w%3D%3D
// _type=json

function Result() {
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
}

export default Result;
