import {
  BuildingInfo,
  ComparisonTerms,
  MainCategories,
  ReportResult,
  SelectedInfo,
  SubCategories1,
  SubCategories2,
} from "@/types";

const checkAreaLimit = (
  area: number,
  limit: number,
  comparisonTerm: ComparisonTerms
) => {
  // 미만
  if (comparisonTerm === ComparisonTerms.LessThan && area < limit) {
    return { isPassed: true };
  }

  // 이상
  if (
    comparisonTerm === ComparisonTerms.GreaterThanOrEqualTo &&
    area >= limit
  ) {
    return { isPassed: true };
  }
  return {
    isPassed: false,
    limit: {
      amount: limit,
      comparisonTerms: comparisonTerm,
    },
  };
};

export const getAreaLimitations = (
  selectedInfo: SelectedInfo
): ReportResult["areaLimitations"] => {
  const { mainCategory, subCategory, area } = selectedInfo;
  /* 1종 */
  if (mainCategory === MainCategories.First) {
    switch (subCategory) {
      case SubCategories1.RetailStore:
        return checkAreaLimit(area, 1000, ComparisonTerms.LessThan);
      case SubCategories1.FoodAndBeverageAndBakery:
        return checkAreaLimit(area, 300, ComparisonTerms.LessThan);
      case SubCategories1.Office:
        return checkAreaLimit(area, 30, ComparisonTerms.LessThan);
    }
  }
  /* 2종 */
  if (mainCategory === MainCategories.Second) {
    switch (subCategory) {
      // case SubCategories2.PerformanceHall:
      // case SubCategories2.ReligiousGatheringPlace:
      // case SubCategories2.AcademyAndCramSchool:
      case SubCategories2.TennisCourtAndGym:
      case SubCategories2.Office:
      case SubCategories2.YouthGameFacility:
        return checkAreaLimit(area, 500, ComparisonTerms.LessThan);
      case SubCategories2.FoodAndBeverage:
        return checkAreaLimit(area, 300, ComparisonTerms.GreaterThanOrEqualTo);
      /* 제한없음 */
      case SubCategories2.GeneralFoodAndBeverage:
      // case SubCategories2.AnimalHospitalAndGroomingSalon:
      case SubCategories2.StudyRoom:
      case SubCategories2.KaraokeRoom:
        return { isPassed: true };
    }
  }

  return {
    isPassed: true,
  };
};

function checkApprovalDatePassed5Years(approvalDate: number) {
  // 날짜 형식으로 변환
  const approvalDateStr = approvalDate.toString();
  const year = parseInt(approvalDateStr.slice(0, 4), 10);
  const month = parseInt(approvalDateStr.slice(4, 6), 10) - 1; // JavaScript의 월은 0부터 시작
  const day = parseInt(approvalDateStr.slice(6), 10);

  const approvalDateTime = new Date(year, month, day);
  const today = new Date();

  // 5년 전 날짜 계산
  const fiveYearsAgo = new Date(
    today.getFullYear() - 5,
    today.getMonth(),
    today.getDate()
  );

  // 5년이 경과했는지 확인
  return approvalDateTime <= fiveYearsAgo;
}

export const getParking = (
  selectedInfo: SelectedInfo,
  buildingInfo: BuildingInfo
) => {
  // 사용승인 후 5년이 지난 연면적 1,000㎡ 미만 건축물의 용도변경(and 조건 사용승인일 기준 5년이 지났고, 1000m2 미만일경우 )
  const { authorizationDate, totalFloorArea } = buildingInfo;

  // 주차 필요 대수 계산(135㎡당 1대, 반올림, 1대 미만일 경우 0대로 처리)
  const isException =
    checkApprovalDatePassed5Years(authorizationDate) && totalFloorArea < 1000;
  const requiredParkingSpace = selectedInfo.area / 135;

  return {
    requiredParkingSpace:
      requiredParkingSpace < 1 ? 0 : Math.round(requiredParkingSpace),
    isException, // 예외상황이면 주차가 필요없음
  };
};

export const getFacilityRequirements = (selectedInfo: SelectedInfo) => {
  const { mainCategory, subCategory, area } = selectedInfo;
  // const result = ;

  if (mainCategory === MainCategories.First) {
    switch (subCategory) {
      case SubCategories1.RetailStore:
      case SubCategories1.FoodAndBeverageAndBakery:
        return {
          mainEntranceAccess: true,
          accessibleParkingSpaces: false,
          mainEntranceHeightDifference: true,
          entrances: true,
        };
    }
  }
  /* 2종 */
  if (mainCategory === MainCategories.Second) {
    switch (subCategory) {
      case SubCategories2.GeneralFoodAndBeverage:
        if (area >= 50) {
          return {
            mainEntranceAccess: true,
            accessibleParkingSpaces: area >= 300,
            mainEntranceHeightDifference: true,
            entrances: true,
          };
        }
        break;
      case SubCategories2.FoodAndBeverage:
        return {
          mainEntranceAccess: true,
          accessibleParkingSpaces: true,
          mainEntranceHeightDifference: true,
          entrances: true,
        };
    }
  }
  return {
    mainEntranceAccess: false,
    accessibleParkingSpaces: false,
    mainEntranceHeightDifference: false,
    entrances: false,
  };
};

export const getFireRequirements = (
  selectedInfo: SelectedInfo,
  floorInfo: any
) => {
  const { flrGbCdNm } = floorInfo;
  const { subCategory, area } = selectedInfo;
  const areaStandard = flrGbCdNm === "지하" ? 66 : 100;

  /* isMultiUserBusiness */
  /* 1. 노래연습장, 게임제공업 무조건 해당 */
  /* 2. 휴게음식점 조건부 해당 */
  /* 3. 나머지는 무조건 비해당(학원 포함) */

  return {
    isMultiUserBusiness:
      subCategory === SubCategories2.YouthGameFacility ||
      subCategory === SubCategories2.KaraokeRoom ||
      (subCategory.includes("휴게음식점") && area >= areaStandard),
    isSpecialFireFacility: true, // 특정소방대상물 여부(근생은 모두 특정소방대상물임)
  };
};
