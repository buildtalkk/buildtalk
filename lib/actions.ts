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

export const searchAddress = async (keyword: string) => {
  if (keyword.length < 2) {
    return [];
  }
  const res = await fetch(
    `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=U01TX0FVVEgyMDI0MDcwMTIxNTEwNzExNDg3NzA=&currentPage=1&countPerPage=5&keyword=${keyword}&resultType=json`
  );
  const data = (await res.json()) as { results: { juso: Juso[] } };
  return data.results.juso;
};

// sigunguCd=11140
// bjdongCd=16200
// bun=0369
// ji=0035
export const getBuildingInfo = async ({
  sigunguCd,
  bjdongCd,
  bun,
  ji,
}: {
  sigunguCd: string;
  bjdongCd: string;
  bun: string;
  ji: string;
}) => {
  // getBrFlrOulnInfo
  const getBrFlrOulnInfoRes = fetch(
    `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrFlrOulnInfo?sigunguCd=${sigunguCd}&bjdongCd=${bjdongCd}&bun=${bun}&ji=${ji}&ServiceKey=oQa0u9ZYG7As2ub9ooGMnPoZyjWjj%2Fea01flLcbJXI0XUTWzmqoK5kpK1laeof6FCmVRvSwVtFs4VNc%2Fz6SK7w%3D%3D&_type=json`
  ).then((res) => res.json());
  // getBrBasisOulnInfo
  const getBrBasisOulnInfoRes = fetch(
    `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrBasisOulnInfo?sigunguCd=${sigunguCd}&bjdongCd=${bjdongCd}&bun=${bun}&ji=${ji}&ServiceKey=oQa0u9ZYG7As2ub9ooGMnPoZyjWjj%2Fea01flLcbJXI0XUTWzmqoK5kpK1laeof6FCmVRvSwVtFs4VNc%2Fz6SK7w%3D%3D&_type=json`
  ).then((res) => res.json());

  // getBrRecapTitleInfo
  const getBrRecapTitleInfoRes = fetch(
    `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrRecapTitleInfo?sigunguCd=${sigunguCd}&bjdongCd=${bjdongCd}&bun=${bun}&ji=${ji}&ServiceKey=oQa0u9ZYG7As2ub9ooGMnPoZyjWjj%2Fea01flLcbJXI0XUTWzmqoK5kpK1laeof6FCmVRvSwVtFs4VNc%2Fz6SK7w%3D%3D&_type=json`
  ).then((res) => res.json());

  // getBrTitleInfo
  const getBrTitleInfoRes = fetch(
    `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?sigunguCd=${sigunguCd}&bjdongCd=${bjdongCd}&bun=${bun}&ji=${ji}&ServiceKey=oQa0u9ZYG7As2ub9ooGMnPoZyjWjj%2Fea01flLcbJXI0XUTWzmqoK5kpK1laeof6FCmVRvSwVtFs4VNc%2Fz6SK7w%3D%3D&_type=json`
  ).then((res) => res.json());

  const [
    getBrFlrOulnInfo,
    getBrBasisOulnInfo,
    getBrRecapTitleInfo,
    getBrTitleInfo,
  ] = await Promise.all([
    getBrFlrOulnInfoRes,
    getBrBasisOulnInfoRes,
    getBrRecapTitleInfoRes,
    getBrTitleInfoRes,
  ]);

  return {
    getBrFlrOulnInfo,
    getBrBasisOulnInfo,
    getBrRecapTitleInfo,
    getBrTitleInfo,
  };
};

/**
 * {
    "detBdNmList": "301동, 304동, 303동, 302동",
    "engAddr": "629 Samseong-ro, Gangnam-gu, Seoul",
    "rn": "삼성로",
    "emdNm": "삼성동",
    "zipNo": "06094",
    "roadAddrPart2": " (삼성동, 삼성동센트럴아이파크)",
    "emdNo": "03",
    "sggNm": "강남구",
    "jibunAddr": "서울특별시 강남구 삼성동 188 삼성동센트럴아이파크",
    "siNm": "서울특별시",
    "roadAddrPart1": "서울특별시 강남구 삼성로 629",
    "bdNm": "삼성동센트럴아이파크",
    "admCd": "1168010500",
    "udrtYn": "0",
    "lnbrMnnm": "188",
    "roadAddr": "서울특별시 강남구 삼성로 629 (삼성동, 삼성동센트럴아이파크)",
    "lnbrSlno": "0",
    "buldMnnm": "629",
    "bdKdcd": "1",
    "liNm": "",
    "rnMgtSn": "116803122005",
    "mtYn": "0",
    "bdMgtSn": "1168010500100220000015210",
    "buldSlno": "0"
}
 */
export type Juso = {
  detBdNmList: string;
  engAddr: string;
  rn: string;
  emdNm: string;
  zipNo: string;
  roadAddrPart2: string;
  emdNo: string;
  sggNm: string;
  jibunAddr: string;
  siNm: string;
  roadAddrPart1: string;
  bdNm: string;
  admCd: string;
  udrtYn: string;
  lnbrMnnm: string;
  roadAddr: string;
  lnbrSlno: string;
  buldMnnm: string;
  bdKdcd: string;
  liNm: string;
  rnMgtSn: string;
  mtYn: string;
  bdMgtSn: string;
  buldSlno: string;
};
