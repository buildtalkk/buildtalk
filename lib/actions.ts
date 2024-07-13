"use server";
import { parse } from "node-html-parser";
import TelegramBot from "node-telegram-bot-api";

export const echo = async (message: string) => {
  return message;
};
/**
 * Juso
 * "admCd": "1162010200",
 * "lnbrMnnm": "1633",
 * "lnbrSlno": "25",

    to

 * selSido=11
 * selSgg=620
 * selUmd=0102
 * selRi=00
 * landGbn=1
 * bobn=1633
 * bubn=25
 * sggcd=
 * isNoScr=script
 * mode=search
 * selGbn=umd
 * s_type=1
 * add=land
 * pnu=1162010200116330025
 */
export const get용적률건폐율 = async (juso: {
  admCd: string;
  lnbrMnnm: string;
  lnbrSlno: string;
}) => {
  // 1. http://www.eum.go.kr/web/ar/lu/luLandDet.jsp 에 요청 날려서 ucodes 등등을 가져오기

  const search = new URLSearchParams();
  search.set("selSido", juso.admCd.slice(0, 2));
  search.set("selSgg", juso.admCd.slice(2, 5));
  search.set("selUmd", juso.admCd.slice(5, 8).padStart(4, "0"));
  search.set("selRi", juso.admCd.slice(8, 10));
  search.set("landGbn", "1");
  search.set("bobn", juso.lnbrMnnm);
  search.set("bubn", juso.lnbrSlno);
  search.set("sggcd", "");
  search.set("isNoScr", "script");
  search.set("mode", "search");
  search.set("selGbn", "umd");
  search.set("s_type", "1");
  search.set("add", "land");
  search.set(
    "pnu",
    `${juso.admCd}1${juso.lnbrMnnm.padStart(4, "0")}${juso.lnbrSlno.padStart(
      4,
      "0"
    )}`
  );

  const res = await fetch(
    `http://www.eum.go.kr/web/ar/lu/luLandDet.jsp?${search.toString()}`
  );

  const html = await res.text();

  const root = parse(html);
  const pnu = root.querySelector("#pnu")?.getAttribute("value") ?? "";
  const ucodes = root.querySelector("#ucodes")?.getAttribute("value") ?? "";
  const sggcd = root.querySelector("#sggcd")?.getAttribute("value") ?? "";

  const search2 = new URLSearchParams();
  search2.set("pnu", pnu);
  search2.set("ucodes", ucodes);
  search2.set("sggcd", sggcd);
  search2.set("carGbn", "GY");

  // 2. http://www.eum.go.kr/web/ar/lu/luLandDetUseGYAjax.jsp 에 요청하여 건폐율, 용적률 가져오기
  const luLandDetUseGYAjaxRes = await fetch(
    `http://www.eum.go.kr/web/ar/lu/luLandDetUseGYAjax.jsp?${search2.toString()}`
  );

  const luLandDetUseGYAjaxHtml = await luLandDetUseGYAjaxRes.text();

  const root2 = parse(luLandDetUseGYAjaxHtml);
  const gun = (
    root2.querySelector("#gun_basic_UQA121")?.getAttribute("value") ?? ""
  ).trim();
  const yong = (
    root2.querySelector("#yong_basic_UQA121")?.getAttribute("value") ?? ""
  ).trim();

  return JSON.stringify({ gun, yong });
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
  "getBrFlrOulnInfo": {
    "response": {
      "header": {
        "resultCode": "00",
        "resultMsg": "NORMAL SERVICE."
      },
      "body": {
        "items": {
          "item": [
            {
              "area": 70.24,
              "areaExctYn": 0,
              "bjdongCd": 10200,
              "bldNm": " ",
              "block": " ",
              "bun": 1633,
              "crtnDay": 20210706,
              "dongNm": " ",
              "etcPurps": "다중주택",
              "etcStrct": "철근콘크리트구조",
              "flrGbCd": 20,
              "flrGbCdNm": "지상",
              "flrNo": 1,
              "flrNoNm": "1층",
              "ji": "0025",
              "lot": " ",
              "mainAtchGbCd": 0,
              "mainAtchGbCdNm": "주건축물",
              "mainPurpsCd": "01002",
              "mainPurpsCdNm": "다중주택",
              "mgmBldrgstPk": "11620-100261228",
              "naBjdongCd": 10201,
              "naMainBun": 25,
              "naRoadCd": 116204160337,
              "naSubBun": 0,
              "naUgrndCd": 0,
              "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
              "platGbCd": 0,
              "platPlc": "서울특별시 관악구 신림동 1633-25번지",
              "rnum": 1,
              "sigunguCd": 11620,
              "splotNm": " ",
              "strctCd": 21,
              "strctCdNm": "철근콘크리트구조"
            },
            {
              "area": 9.36,
              "areaExctYn": 1,
              "bjdongCd": 10200,
              "bldNm": " ",
              "block": " ",
              "bun": 1633,
              "crtnDay": 20210706,
              "dongNm": " ",
              "etcPurps": "계단실(연면적제외)",
              "etcStrct": "철근콘크리트구조",
              "flrGbCd": 30,
              "flrGbCdNm": "옥탑",
              "flrNo": 1,
              "flrNoNm": "옥탑1층",
              "ji": "0025",
              "lot": " ",
              "mainAtchGbCd": 0,
              "mainAtchGbCdNm": "주건축물",
              "mainPurpsCd": "01002",
              "mainPurpsCdNm": "다중주택",
              "mgmBldrgstPk": "11620-100261228",
              "naBjdongCd": 10201,
              "naMainBun": 25,
              "naRoadCd": 116204160337,
              "naSubBun": 0,
              "naUgrndCd": 0,
              "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
              "platGbCd": 0,
              "platPlc": "서울특별시 관악구 신림동 1633-25번지",
              "rnum": 2,
              "sigunguCd": 11620,
              "splotNm": " ",
              "strctCd": 21,
              "strctCdNm": "철근콘크리트구조"
            },
            {
              "area": 91.02,
              "areaExctYn": 0,
              "bjdongCd": 10200,
              "bldNm": " ",
              "block": " ",
              "bun": 1633,
              "crtnDay": 20210706,
              "dongNm": " ",
              "etcPurps": "다중주택",
              "etcStrct": "철근콘크리트구조",
              "flrGbCd": 10,
              "flrGbCdNm": "지하",
              "flrNo": 1,
              "flrNoNm": "지1",
              "ji": "0025",
              "lot": " ",
              "mainAtchGbCd": 0,
              "mainAtchGbCdNm": "주건축물",
              "mainPurpsCd": "01002",
              "mainPurpsCdNm": "다중주택",
              "mgmBldrgstPk": "11620-100261228",
              "naBjdongCd": 10201,
              "naMainBun": 25,
              "naRoadCd": 116204160337,
              "naSubBun": 0,
              "naUgrndCd": 0,
              "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
              "platGbCd": 0,
              "platPlc": "서울특별시 관악구 신림동 1633-25번지",
              "rnum": 3,
              "sigunguCd": 11620,
              "splotNm": " ",
              "strctCd": 21,
              "strctCdNm": "철근콘크리트구조"
            },
            {
              "area": 29.96,
              "areaExctYn": 1,
              "bjdongCd": 10200,
              "bldNm": " ",
              "block": " ",
              "bun": 1633,
              "crtnDay": 20210706,
              "dongNm": " ",
              "etcPurps": "다락(연면적제외)",
              "etcStrct": "철근콘크리트구조",
              "flrGbCd": 30,
              "flrGbCdNm": "옥탑",
              "flrNo": 1,
              "flrNoNm": "옥탑1층",
              "ji": "0025",
              "lot": " ",
              "mainAtchGbCd": 0,
              "mainAtchGbCdNm": "주건축물",
              "mainPurpsCd": "01002",
              "mainPurpsCdNm": "다중주택",
              "mgmBldrgstPk": "11620-100261228",
              "naBjdongCd": 10201,
              "naMainBun": 25,
              "naRoadCd": 116204160337,
              "naSubBun": 0,
              "naUgrndCd": 0,
              "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
              "platGbCd": 0,
              "platPlc": "서울특별시 관악구 신림동 1633-25번지",
              "rnum": 4,
              "sigunguCd": 11620,
              "splotNm": " ",
              "strctCd": 21,
              "strctCdNm": "철근콘크리트구조"
            },
            {
              "area": 67.86,
              "areaExctYn": 0,
              "bjdongCd": 10200,
              "bldNm": " ",
              "block": " ",
              "bun": 1633,
              "crtnDay": 20210706,
              "dongNm": " ",
              "etcPurps": "다중주택",
              "etcStrct": "철근콘크리트구조",
              "flrGbCd": 20,
              "flrGbCdNm": "지상",
              "flrNo": 3,
              "flrNoNm": "3층",
              "ji": "0025",
              "lot": " ",
              "mainAtchGbCd": 0,
              "mainAtchGbCdNm": "주건축물",
              "mainPurpsCd": "01002",
              "mainPurpsCdNm": "다중주택",
              "mgmBldrgstPk": "11620-100261228",
              "naBjdongCd": 10201,
              "naMainBun": 25,
              "naRoadCd": 116204160337,
              "naSubBun": 0,
              "naUgrndCd": 0,
              "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
              "platGbCd": 0,
              "platPlc": "서울특별시 관악구 신림동 1633-25번지",
              "rnum": 5,
              "sigunguCd": 11620,
              "splotNm": " ",
              "strctCd": 21,
              "strctCdNm": "철근콘크리트구조"
            },
            {
              "area": 70.24,
              "areaExctYn": 0,
              "bjdongCd": 10200,
              "bldNm": " ",
              "block": " ",
              "bun": 1633,
              "crtnDay": 20210706,
              "dongNm": " ",
              "etcPurps": "다중주택",
              "etcStrct": "철근콘크리트구조",
              "flrGbCd": 20,
              "flrGbCdNm": "지상",
              "flrNo": 2,
              "flrNoNm": "2층",
              "ji": "0025",
              "lot": " ",
              "mainAtchGbCd": 0,
              "mainAtchGbCdNm": "주건축물",
              "mainPurpsCd": "01002",
              "mainPurpsCdNm": "다중주택",
              "mgmBldrgstPk": "11620-100261228",
              "naBjdongCd": 10201,
              "naMainBun": 25,
              "naRoadCd": 116204160337,
              "naSubBun": 0,
              "naUgrndCd": 0,
              "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
              "platGbCd": 0,
              "platPlc": "서울특별시 관악구 신림동 1633-25번지",
              "rnum": 6,
              "sigunguCd": 11620,
              "splotNm": " ",
              "strctCd": 21,
              "strctCdNm": "철근콘크리트구조"
            }
          ]
        },
        "numOfRows": 10,
        "pageNo": 1,
        "totalCount": 6
      }
    }
  },
  "getBrBasisOulnInfo": {
    "response": {
      "header": {
        "resultCode": "00",
        "resultMsg": "NORMAL SERVICE."
      },
      "body": {
        "items": {
          "item": {
            "bjdongCd": 10200,
            "bldNm": " ",
            "block": " ",
            "bun": 1633,
            "bylotCnt": 0,
            "crtnDay": 20210706,
            "guyukCd": " ",
            "guyukCdNm": " ",
            "ji": "0025",
            "jiguCd": " ",
            "jiguCdNm": " ",
            "jiyukCd": "UQA121",
            "jiyukCdNm": "제1종일반주거지역",
            "lot": " ",
            "mgmBldrgstPk": "11620-100261228",
            "mgmUpBldrgstPk": " ",
            "naBjdongCd": 10201,
            "naMainBun": 25,
            "naRoadCd": 116204160337,
            "naSubBun": 0,
            "naUgrndCd": 0,
            "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
            "platGbCd": 0,
            "platPlc": "서울특별시 관악구 신림동 1633-25번지",
            "regstrGbCd": 1,
            "regstrGbCdNm": "일반",
            "regstrKindCd": 2,
            "regstrKindCdNm": "일반건축물",
            "rnum": 1,
            "sigunguCd": 11620,
            "splotNm": " "
          }
        },
        "numOfRows": 10,
        "pageNo": 1,
        "totalCount": 1
      }
    }
  },
  "getBrRecapTitleInfo": {
    "response": {
      "header": {
        "resultCode": "00",
        "resultMsg": "NORMAL SERVICE."
      },
      "body": {
        "items": "",
        "numOfRows": 10,
        "pageNo": 1,
        "totalCount": 0
      }
    }
  },
  "getBrTitleInfo": {
    "response": {
      "header": {
        "resultCode": "00",
        "resultMsg": "NORMAL SERVICE."
      },
      "body": {
        "items": {
          "item": {
            "archArea": 91.97,
            "atchBldArea": 0,
            "atchBldCnt": 0,
            "bcRat": 59.26,
            "bjdongCd": 10200,
            "bldNm": " ",
            "block": " ",
            "bun": 1633,
            "bylotCnt": 0,
            "crtnDay": 20210706,
            "dongNm": " ",
            "emgenUseElvtCnt": 0,
            "engrEpi": 0,
            "engrGrade": " ",
            "engrRat": 0,
            "etcPurps": "단독주택",
            "etcRoof": "(철근)콘크리트",
            "etcStrct": "철근콘크리트구조",
            "fmlyCnt": 1,
            "gnBldCert": 0,
            "gnBldGrade": " ",
            "grndFlrCnt": 3,
            "heit": 11.2,
            "hhldCnt": 0,
            "hoCnt": 0,
            "indrAutoArea": 0,
            "indrAutoUtcnt": 0,
            "indrMechArea": 0,
            "indrMechUtcnt": 0,
            "itgBldCert": 0,
            "itgBldGrade": " ",
            "ji": "0025",
            "lot": " ",
            "mainAtchGbCd": 0,
            "mainAtchGbCdNm": "주건축물",
            "mainPurpsCd": "01000",
            "mainPurpsCdNm": "단독주택",
            "mgmBldrgstPk": "11620-100261228",
            "naBjdongCd": 10201,
            "naMainBun": 25,
            "naRoadCd": 116204160337,
            "naSubBun": 0,
            "naUgrndCd": 0,
            "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
            "oudrAutoArea": 23,
            "oudrAutoUtcnt": 2,
            "oudrMechArea": 0,
            "oudrMechUtcnt": 0,
            "platArea": 155.2,
            "platGbCd": 0,
            "platPlc": "서울특별시 관악구 신림동 1633-25번지",
            "pmsDay": 20171220,
            "pmsnoGbCd": 1101,
            "pmsnoGbCdNm": "신축허가",
            "pmsnoKikCd": 3200025,
            "pmsnoKikCdNm": "건축과",
            "pmsnoYear": 2017,
            "regstrGbCd": 1,
            "regstrGbCdNm": "일반",
            "regstrKindCd": 2,
            "regstrKindCdNm": "일반건축물",
            "rideUseElvtCnt": 0,
            "rnum": 1,
            "roofCd": 10,
            "roofCdNm": "(철근)콘크리트",
            "rserthqkAblty": " ",
            "rserthqkDsgnApplyYn": 1,
            "sigunguCd": 11620,
            "splotNm": " ",
            "stcnsDay": 20180305,
            "strctCd": 21,
            "strctCdNm": "철근콘크리트구조",
            "totArea": 299.36,
            "totDongTotArea": 299.36,
            "ugrndFlrCnt": 1,
            "useAprDay": 20180727,
            "vlRat": 134.24,
            "vlRatEstmTotArea": 208.34
          }
        },
        "numOfRows": 10,
        "pageNo": 1,
        "totalCount": 1
      }
    }
  }
}

 */

/**
 * 1.{
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
    1168010500
    1
    0188
    0000
    "buldSlno": "0"
}

2.

{
    "detBdNmList": "",
    "engAddr": "25 Munseong-ro 36-gil, Gwanak-gu, Seoul",
    "rn": "문성로36길",
    "emdNm": "신림동",
    "zipNo": "08843",
    "roadAddrPart2": " (신림동)",
    "emdNo": "01",
    "sggNm": "관악구",
    "jibunAddr": "서울특별시 관악구 신림동 1633-25",
    "siNm": "서울특별시",
    "roadAddrPart1": "서울특별시 관악구 문성로36길 25",
    "bdNm": "",
    "admCd": "1162010200",
    "udrtYn": "0",
    "lnbrMnnm": "1633",
    "roadAddr": "서울특별시 관악구 문성로36길 25 (신림동)",
    "lnbrSlno": "25",
    "buldMnnm": "25",
    "bdKdcd": "0",
    "liNm": "",
    "rnMgtSn": "116204160337",
    "mtYn": "0",
    "bdMgtSn": "1162010200116330025020515",
    "buldSlno": "0"
}



1. 

http://www.eum.go.kr/web/ar/lu/luLandDet.jsp

selSido=11
selSgg=620
selUmd=0102
selRi=00
landGbn=1
bobn=1633
bubn=25
sggcd=
isNoScr=script
mode=search
selGbn=umd
s_type=1
add=land
pnu=1162010200116330025

- selSido
- selSgg
- selUmd
- selRi
- landGbn
- bobn
- bubn
- isNoScr
- mode=search
- selGbn=umd
- s_type=1
- add=land
- pnu=….

11620
10200
0
1633
0025

1.
UQA01X
UQA121
UMZ100
UDX100
UOA120
UNE200
UBA100
UQQ600
----
2.
UQA130
UQQ300
UMZ100
UOA120
UNE201
UBA100
-----
3.
UQA01X
UQA123
UMZ100
UOA120
UNE200
UBA100



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

const token = "7221690912:AAFPODsY3u9Sd8s-qXBmL1ytU7_bMWZ9bnI"; // Replace with your own bot token
const bot = new TelegramBot(token, { polling: true });
// {
//   "ok": true,
//   "result": [
//     {
//       "update_id": 433643227,
//       "message": {
//         "message_id": 3,
//         "from": {
//           "id": 6705933923,
//           "is_bot": false,
//           "first_name": "태훈",
//           "last_name": "김",
//           "username": "echoya",
//           "language_code": "en"
//         },
//         "chat": {
//           "id": -1002168271331,
//           "title": "태훈 & buildtalk-notification, 이동섭 동스리 dongslee 42",
//           "type": "supergroup"
//         },
//         "date": 1720858128,
//         "text": "test"
//       }
//     }
//   ]
// }

export const sendMessage = async (text: string) => {
  await bot.sendMessage(-1002168271331, text);
};
