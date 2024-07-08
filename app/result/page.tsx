"use client";

import { Suspense } from "react";
import { Result } from "./result";

// http://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo?
// sigunguCd=11140
// bjdongCd=16200
// bun=0369
// ji=0035
// ServiceKey=oQa0u9ZYG7As2ub9ooGMnPoZyjWjj%2Fea01flLcbJXI0XUTWzmqoK5kpK1laeof6FCmVRvSwVtFs4VNc%2Fz6SK7w%3D%3D
// _type=json

function ResultPage() {
  return (
    <Suspense>
      <Result />
    </Suspense>
  );
}

export default ResultPage;
