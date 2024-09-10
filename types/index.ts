export type BuildingInfo = {
  address: string;
  usage: string;
  mechanicalParking: string;
  selfParking: string;
  sewageTreatmentFacility: string;
  authorizationDate: number;
  totalFloorArea: number;
};

export type SelectedInfo = {
  mainCategory: string;
  subCategory: string;
  area: number;
};

export type ReportResult = {
  zoning: {
    isPassed: boolean;
  };
  areaLimitations:
    | { isPassed: true }
    | {
        isPassed: false;
        limit?: {
          amount: number;
          comparisonTerms: ComparisonTerms;
        };
      };
  parking: {
    requiredParkingSpace: number;
    isException: boolean;
  };
  accessibility: {
    mainEntranceAccess: boolean;
    accessibleParkingSpaces: boolean;
    mainEntranceHeightDifference: boolean;
    entrances: boolean;
  };
  fire: {
    isMultiUserBusiness: boolean;
    isSpecialFireFacility: boolean;
  };
};

export enum ComparisonTerms {
  LessThan = "미만",
  LessThanOrEqualTo = "이하",
  GreaterThan = "초과",
  GreaterThanOrEqualTo = "이상",
}

export enum MainCategories {
  First = "제1종 근린생활시설",
  Second = "제2종 근린생활시설",
}

export enum SubCategories1 {
  /* 1종 */
  RetailStore = "소매점 등",
  FoodAndBeverageAndBakery = "휴게음식점, 제과점 등",
  Office = "사무소 등",
}

export enum SubCategories2 {
  /* 2종 */
  PerformanceHall = "공연장",
  ReligiousGatheringPlace = "종교집회장",
  FoodAndBeverage = "휴게음식점",
  GeneralFoodAndBeverage = "일반음식점",
  AnimalHospitalAndGroomingSalon = "동물병원, 동물미용실",
  AcademyAndCramSchool = "학원, 교습소 등",
  StudyRoom = "독서실",
  TennisCourtAndGym = "테니스장, 체력단련장, 골프연습장 등",
  Office = "사무소 등",
  YouthGameFacility = "청소년게임제공업소, 복합유통게임제공업소, 인터넷컴퓨터게임시설제공업소, 가상현실체험 제공업소",
  KaraokeRoom = "노래연습장",
}
