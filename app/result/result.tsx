"use client";

import { Button } from "@/components/ui/button";
import { getBuildingInfo, get용적률건폐율 } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Result = () => {
  const searchParams = useSearchParams();
  const sigunguCd = searchParams.get("sigunguCd");
  const bjdongCd = searchParams.get("bjdongCd");
  const bun = searchParams.get("bun");
  const ji = searchParams.get("ji");
  const admCd = searchParams.get("admCd");
  const lnbrMnnm = searchParams.get("lnbrMnnm");
  const lnbrSlno = searchParams.get("lnbrSlno");
  const [result, setResult] = useState({} as Record<string, unknown>);
  const [용적률건폐율result, set용적률건폐율result] = useState("");
  const [용적률건폐율loading, set용적률건폐율loading] = useState(false);

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

  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
      <Button
        disabled={용적률건폐율loading}
        onClick={() => {
          set용적률건폐율loading(true);
          get용적률건폐율({
            admCd: admCd ?? "",
            lnbrMnnm: lnbrMnnm ?? "",
            lnbrSlno: lnbrSlno ?? "",
          }).then((result) => {
            set용적률건폐율result(result);
            set용적률건폐율loading(false);
          });
        }}
      >
        {용적률건폐율loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        <span>용적률/건폐율 분석하기</span>
      </Button>
      <pre>{용적률건폐율result}</pre>
    </div>
  );
};
