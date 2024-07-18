// "getBrTitleInfo": {
//     "response": {
//       "header": {
//         "resultCode": "00",
//         "resultMsg": "NORMAL SERVICE."
//       },
//       "body": {
//         "items": {
//           "item": {
//             "archArea": 91.97,
//             "atchBldArea": 0,
//             "atchBldCnt": 0,
//             "bcRat": 59.26,
//             "bjdongCd": 10200,
//             "bldNm": " ",
//             "block": " ",
//             "bun": 1633,
//             "bylotCnt": 0,
//             "crtnDay": 20210706,
//             "dongNm": " ",
//             "emgenUseElvtCnt": 0,
//             "engrEpi": 0,
//             "engrGrade": " ",
//             "engrRat": 0,
//             "etcPurps": "단독주택",
//             "etcRoof": "(철근)콘크리트",
//             "etcStrct": "철근콘크리트구조",
//             "fmlyCnt": 1,
//             "gnBldCert": 0,
//             "gnBldGrade": " ",
//             "grndFlrCnt": 3,
//             "heit": 11.2,
//             "hhldCnt": 0,
//             "hoCnt": 0,
//             "indrAutoArea": 0,
//             "indrAutoUtcnt": 0,
//             "indrMechArea": 0,
//             "indrMechUtcnt": 0,
//             "itgBldCert": 0,
//             "itgBldGrade": " ",
//             "ji": "0025",
//             "lot": " ",
//             "mainAtchGbCd": 0,
//             "mainAtchGbCdNm": "주건축물",
//             "mainPurpsCd": "01000",
//             "mainPurpsCdNm": "단독주택",
//             "mgmBldrgstPk": "11620-100261228",
//             "naBjdongCd": 10201,
//             "naMainBun": 25,
//             "naRoadCd": 116204160337,
//             "naSubBun": 0,
//             "naUgrndCd": 0,
//             "newPlatPlc": " 서울특별시 관악구 문성로36길 25",
//             "oudrAutoArea": 23,
//             "oudrAutoUtcnt": 2,
//             "oudrMechArea": 0,
//             "oudrMechUtcnt": 0,
//             "platArea": 155.2,
//             "platGbCd": 0,
//             "platPlc": "서울특별시 관악구 신림동 1633-25번지",
//             "pmsDay": 20171220,
//             "pmsnoGbCd": 1101,
//             "pmsnoGbCdNm": "신축허가",
//             "pmsnoKikCd": 3200025,
//             "pmsnoKikCdNm": "건축과",
//             "pmsnoYear": 2017,
//             "regstrGbCd": 1,
//             "regstrGbCdNm": "일반",
//             "regstrKindCd": 2,
//             "regstrKindCdNm": "일반건축물",
//             "rideUseElvtCnt": 0,
//             "rnum": 1,
//             "roofCd": 10,
//             "roofCdNm": "(철근)콘크리트",
//             "rserthqkAblty": " ",
//             "rserthqkDsgnApplyYn": 1,
//             "sigunguCd": 11620,
//             "splotNm": " ",
//             "stcnsDay": 20180305,
//             "strctCd": 21,
//             "strctCdNm": "철근콘크리트구조",
//             "totArea": 299.36,
//             "totDongTotArea": 299.36,
//             "ugrndFlrCnt": 1,
//             "useAprDay": 20180727,
//             "vlRat": 134.24,
//             "vlRatEstmTotArea": 208.34
//           }
//         },
//         "numOfRows": 10,
//         "pageNo": 1,
//         "totalCount": 1
//       }
//     }
//   }

type GetBrTitleInfo = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: GetBrTitleInfoItem | GetBrTitleInfoItem[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
};

type GetBrTitleInfoItem = {
  archArea: number;
  atchBldArea: number;
  atchBldCnt: number;
  bcRat: number;
  bjdongCd: number;
  bldNm: string;
  block: string;
  bun: number;
  bylotCnt: number;
  crtnDay: number;
  dongNm: string;
  emgenUseElvtCnt: number;
  engrEpi: number;
  engrGrade: string;
  engrRat: number;
  etcPurps: string;
  etcRoof: string;
  etcStrct: string;
  fmlyCnt: number;
  gnBldCert: number;
  gnBldGrade: string;
  grndFlrCnt: number;
  heit: number;
  hhldCnt: number;
  hoCnt: number;
  indrAutoArea: number;
  indrAutoUtcnt: number;
  indrMechArea: number;
  indrMechUtcnt: number;
  itgBldCert: number;
  itgBldGrade: string;
  ji: string;
  lot: string;
  mainAtchGbCd: number;
  mainAtchGbCdNm: string;
  mainPurpsCd: string;
  mainPurpsCdNm: string;
  mgmBldrgstPk: string;
  naBjdongCd: number;
  naMainBun: number;
  naRoadCd: number;
  naSubBun: number;
  naUgrndCd: number;
  newPlatPlc: string;
  oudrAutoArea: number;
  oudrAutoUtcnt: number;
  oudrMechArea: number;
  oudrMechUtcnt: number;
  platArea: number;
  platGbCd: number;
  platPlc: string;
  pmsDay: number;
  pmsnoGbCd: number;
  pmsnoGbCdNm: string;
  pmsnoKikCd: number;
  pmsnoKikCdNm: string;
  pmsnoYear: number;
  regstrGbCd: number;
  regstrGbCdNm: string;
  regstrKindCd: number;
  regstrKindCdNm: string;
  rideUseElvtCnt: number;
  rnum: number;
  roofCd: number;
  roofCdNm: string;
  rserthqkAblty: string;
  rserthqkDsgnApplyYn: number;
  sigunguCd: number;
  splotNm: string;
  stcnsDay: number;
  strctCd: number;
  strctCdNm: string;
  totArea: number;
  totDongTotArea: number;
  ugrndFlrCnt: number;
  useAprDay: number;
  vlRat: number;
  vlRatEstmTotArea: number;
};

type GetBrJijiguInfo = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: GetBrJijiguInfoItem | GetBrJijiguInfoItem[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
};

type GetBrJijiguInfoItem = {
  bjdongCd: number;
  block: string;
  bun: string;
  crtnDay: number;
  etcJijigu: string;
  ji: string;
  jijiguCd: string;
  jijiguCdNm: string;
  jijiguGbCd: number;
  jijiguGbCdNm: string;
  lot: string;
  mgmBldrgstPk: string;
  newPlatPlc: string;
  platGbCd: number;
  platPlc: string;
  reprYn: number;
  rnum: number;
  sigunguCd: number;
  splotNm: string;
};
// {
//   "bjdongCd": 16200,
//   "block": " ",
//   "bun": "0340",
//   "crtnDay": 20240415,
//   "etcJijigu": "준주거지역",
//   "ji": "0127",
//   "jijiguCd": "UQA130",
//   "jijiguCdNm": "준주거지역",
//   "jijiguGbCd": 1,
//   "jijiguGbCdNm": "용도지역코드",
//   "lot": " ",
//   "mgmBldrgstPk": "11140-100207053",
//   "newPlatPlc": " 서울특별시 중구 다산로14길 17",
//   "platGbCd": 0,
//   "platPlc": "서울특별시 중구 신당동 340-127번지",
//   "reprYn": 1,
//   "rnum": 1,
//   "sigunguCd": 11140,
//   "splotNm": " "
// }
