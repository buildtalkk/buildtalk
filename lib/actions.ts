"use server";

export const echo = async (message: string) => {
  return message;
};

export const testApi = async () => {
  const res = await fetch(
    "https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=U01TX0FVVEgyMDI0MDcwMTIxNTEwNzExNDg3NzA=&currentPage=1&countPerPage=100&keyword=삼성동&resultType=json"
  );
  const data = await res.json();

  // do something
  const res2 = await fetch(
    "http://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo?sigunguCd=11140&bjdongCd=16200&bun=0369&ji=0035&ServiceKey=oQa0u9ZYG7As2ub9ooGMnPoZyjWjj%2Fea01flLcbJXI0XUTWzmqoK5kpK1laeof6FCmVRvSwVtFs4VNc%2Fz6SK7w%3D%3D&_type=json"
  );

  const data2 = await res2.json();
  return { data, data2 };
};
