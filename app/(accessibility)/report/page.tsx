"use client";
import useSessionStorageState from "use-session-storage-state";
import { SelectedInfo } from "@/types";

type ReportResult = {
  zoning: {
    isPassed: boolean;
  };
  areaLimitations: {
    isPassed: boolean;
    message: string;
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

const getReportResult = (selectedInfo: SelectedInfo): ReportResult => {
  return {
    // 1.용도지역: 근생1,2만 하기 때문에 일단 모두 통과임
    zoning: {
      isPassed: true,
    },
    /* 2.면적 제한:  용도별 건축물 종류: 안내 문구에 띄울 수 있도록 (면적 m2이상/미만) 충족여부 불리언으로 표시 */
    areaLimitations: {
      isPassed: true,
      message: "",
    },
    // 3.주차장: 주차 몇대 필요한지 숫자 + 예외상황 해당 유무
    parking: {
      requiredParkingSpace: 0,
      isException: false, // true이면 예외상황으로 주차가 필요없음
    },
    // 4.장애인 편의시설
    accessibility: {
      mainEntranceAccess: true,
      accessibleParkingSpaces: true,
      mainEntranceHeightDifference: true,
      entrances: true,
    },
    // 5.소방
    // 소방1: 일단 휴게음식점만 구현. (지상층 && 100㎡이상 || 지하층 && 66㎡이상)
    // 소방2: 용도로 하는건데, 모든 근린생활시설이 특정소방대상물임
    fire: {
      isMultiUserBusiness: true, // 소방1 조건 충족 여부
      isSpecialFireFacility: true, // 특정소방대상물 여부(근생은 모두 특정소방대상물임)
    },
  };
};

const ReportPage = () => {
  const [selectedInfo] = useSessionStorageState<SelectedInfo | undefined>(
    "selectedInfo"
  );

  if (!selectedInfo) {
    return <div>분석 결과가 없습니다.</div>;
  }

  const reportResult = getReportResult(selectedInfo);
  // TODO: 분석 결과를 가져오는 함수 로직 작성

  return (
    <div>
      <p>분석 결과</p>
      {/* TODO: 화면에 모든 결과 뿌리기 */}
    </div>
  );
};

export default ReportPage;
