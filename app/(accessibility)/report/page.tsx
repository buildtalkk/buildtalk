"use client";
import useSessionStorageState from "use-session-storage-state";
import { BuildingInfo, ReportResult, SelectedInfo } from "@/types";
import { Loader2 } from "lucide-react";
import {
  getAreaLimitations,
  getFacilityRequirements,
  getFireRequirements,
  getParking,
} from "@/utils/get-report-result";

const getReportResult = (
  selectedInfo: SelectedInfo,
  buildingInfo: BuildingInfo,
  floorInfo: any
): ReportResult => {
  return {
    // 1.용도지역: 근생1,2만 하기 때문에 일단 모두 통과임
    zoning: {
      isPassed: true,
    },
    /* 2.면적 제한:  용도별 건축물 종류: 안내 문구에 띄울 수 있도록 (면적 m2이상/미만) 충족여부 불리언으로 표시 */
    areaLimitations: getAreaLimitations(selectedInfo),
    // 3.주차장: 주차 몇대 필요한지 숫자 + 예외상황 해당 유무
    parking: getParking(selectedInfo, buildingInfo),
    // 4.장애인 편의시설
    accessibility: getFacilityRequirements(selectedInfo),
    // 5.소방
    // 소방1: 일단 휴게음식점만 구현. (지상층 && 100㎡이상 || 지하층 && 66㎡이상)
    // 소방2: 용도로 하는건데, 모든 근린생활시설이 특정소방대상물임
    fire: getFireRequirements(selectedInfo, floorInfo),
  };
};

const ReportPage = () => {
  const [selectedInfo] = useSessionStorageState<SelectedInfo | undefined>(
    "selectedInfo"
  );
  const [buildingInfo] = useSessionStorageState<BuildingInfo | undefined>(
    "buildingInfo"
  );
  const [floorInfo] = useSessionStorageState("floorInfo");

  if (!selectedInfo || !buildingInfo || !floorInfo) {
    return (
      <section
        id="howItWorks"
        className="container text-center py-12 sm:py-16  min-h-80 flex justify-center items-center flex-col"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        <p className="mt-4">현재 리포트를</p>
        <p>생성하고 있습니다</p>
      </section>
    );
  }

  const reportResult = getReportResult(selectedInfo, buildingInfo, floorInfo);
  console.log("=====> 계산된 결과", reportResult);

  return (
    <div>
      <h2 className={"font-bold"}>분석 결과</h2>
      <ul>
        <li>1.용도지역: {reportResult.zoning.isPassed ? "통과" : "불통"}</li>
        <li>
          2.면적 제한:{" "}
          {reportResult.areaLimitations.isPassed
            ? "통과"
            : `${reportResult.areaLimitations.limit?.amount}㎡ ${reportResult.areaLimitations.limit?.comparisonTerms}`}
        </li>
        <li>
          3.주차장:{" "}
          {reportResult.parking.isException
            ? 0
            : reportResult.parking.requiredParkingSpace}
          대
          {reportResult.parking.isException && (
            <p>* 사용승인 후 5년이 지난 연면적 1,000㎡ 미만 건축물에 해당함</p>
          )}
        </li>
        <h3>4.장애인 편의시설</h3>
        <li>
          - 주출입구 접근:{" "}
          {reportResult.accessibility.mainEntranceAccess
            ? "검토필요"
            : "검토필요x"}
        </li>
        <li>
          - 장애인 주차구역:{" "}
          {reportResult.accessibility.accessibleParkingSpaces
            ? "검토필요"
            : "검토필요x"}
        </li>
        <li>
          - 주출입구 높이차이:{" "}
          {reportResult.accessibility.mainEntranceHeightDifference
            ? "검토필요"
            : "검토필요x"}
        </li>
        <li>
          - 출입구:{" "}
          {reportResult.accessibility.entrances ? "검토필요" : "검토필요x"}
        </li>
        <h3>5.소방</h3>
        <li>
          - 다중이용업소:{" "}
          {reportResult.fire.isMultiUserBusiness ? "해당" : "비해당"}
        </li>
        <li>
          - 특정소방대상물:{" "}
          {reportResult.fire.isSpecialFireFacility ? "해당" : "비해당"}
        </li>
      </ul>
    </div>
  );
};

export default ReportPage;
