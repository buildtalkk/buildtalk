"use client";
import useSessionStorageState from "use-session-storage-state";
import {
  BuildingInfo,
  MainCategories,
  ReportResult,
  SelectedInfo,
} from "@/types";
import { Check, ChevronRight, Info, Loader2 } from "lucide-react";
import {
  getAreaLimitations,
  getFacilityRequirements,
  getFireRequirements,
  getParking,
} from "@/utils/get-report-result";
import BuildingInfoTr from "@/components/BuildingInfoTr";
import Table from "@/components/Table";
import { Button } from "@/components/ui/button";
import ContactLink from "@/components/ContactLink";
import { useEffect, useState } from "react";
import CardHeader from "@/components/CardHeader";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { InputGroup } from "@/components/InputGroup";
import { useRouter } from "next/navigation";

const ProgressItem = (props: {
  title: string;
  content: string[];
  isActivated: boolean;
  hasNext: boolean;
  onCompleted?: () => void;
}) => {
  const [currentItem, setCurrentItem] = useState(props.content[0]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(0);
  const { hasNext, title, content, isActivated, onCompleted } = props;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActivated) {
      interval = setInterval(() => {
        if (index < content.length) {
          setCurrentItem(content[index]);
          setIndex(prevIndex => prevIndex + 1);
        } else {
          interval && clearInterval(interval);
          onCompleted?.();
          setIsCompleted(true);
        }
      }, 700);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [index, content, onCompleted, isActivated]);

  const textColorStyle =
    isActivated || isCompleted ? "text-black" : "text-gray-400";

  return (
    <div className={"flex justify-start items-center h-8"}>
      <span className="relative flex h-2 w-2 mr-3">
        {/* pulse */}
        <span
          data-active={isActivated}
          className={`data-[active=false]:hidden absolute animate-ping inline-flex h-full w-full rounded-full bg-primary-400 opacity-75`}
        />
        {/* line */}
        {hasNext && (
          <span
            className={
              "absolute left-[50%] top-0 w-[1px] h-8 bg-gray-200 -translate-x-[0.5px]"
            }
          />
        )}
        {/* dot */}
        <span
          data-active={isActivated}
          className="relative inline-flex rounded-full h-2 w-2 bg-primary-500 data-[active=false]:bg-white data-[active=false]:border-2"
        />
        {/*  completed check */}
        {isCompleted && (
          <span
            className={
              "absolute top-0 left-0 h-2 w-2 bg-primary-500 rounded-full"
            }
          >
            <Check className={"absolute top-0 left-0 h-2 w-2 text-white"} />
          </span>
        )}
      </span>
      <span
        className={twMerge("flex justify-start text-start", textColorStyle)}
      >
        <span
          className={
            "transition text-sm min-w-[150px] font-semibold duration-300 ease-in"
          }
        >
          {title}
        </span>
        <span className={""}>
          {content.map(c => (
            <span
              key={c}
              className={`absolute text-sm line-clamp-1 transition-opacity ${c === currentItem ? "opacity-100" : "opacity-0"} duration-300 ease-in`}
            >
              {c + (isActivated ? " 검색중..." : "")}
            </span>
          ))}
        </span>
      </span>
    </div>
  );
};

type ReportItemProps = {
  count: number;
  title: string;
  descriptions?: string[];
  result: "가능" | "불가능" | "검토필요";
};

const getFontColor = (result: "가능" | "불가능" | "검토필요") => {
  switch (result) {
    case "가능":
      return "text-primary-500";
    case "불가능":
      return "text-red-500";
    case "검토필요":
      return "text-green-500";
  }
};

const ReportItemSkeleton = () => {
  return (
    <div className="flex flex-col min-h-20 items-start py-4 animate-pulse">
      <div className="flex items-center gap-4 w-full">
        <div className="h-6 bg-gray-200 rounded w-3/4 max-w-[300px]"></div>
        <span className="flex-1 h-[2px] bg-gray-200" />
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
      <ul className="mt-3 w-full">
        <li className="mt-2">
          <div className="h-4 bg-gray-200 rounded w-3/8"></div>
        </li>
      </ul>
    </div>
  );
};

const ReportItem = ({
  count,
  title,
  descriptions,
  result,
}: ReportItemProps) => {
  return (
    <div className={"flex flex-col min-h-24 items-start py-5"}>
      <div className="flex items-center gap-4 w-full">
        <span className="text-base font-bold">
          {count}
          {". "}
          {title}
        </span>
        <span
          className="flex-1 h-[2px]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(107, 114, 128) 1px, transparent 1px)",
            backgroundSize: "4px 8px",
            backgroundPosition: "0 center",
          }}
        />
        <span className={twMerge(getFontColor(result), "font-bold")}>
          {result}
        </span>
      </div>
      {descriptions?.length && (
        <ul className={"list-disc pl-5 space-y-1 mt-2"}>
          {descriptions.map(description => (
            <li key={description} className="text-sm">
              <span className="line-clamp-1">{description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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
  const [floorInfo] = useSessionStorageState<any>("floorInfo");
  const [step, setStep] = useState<
    "initial" | "animation1" | "animation2" | "animation3" | "completed"
  >("initial");

  const router = useRouter();
  useEffect(() => {
    setStep("animation1");
  }, []);

  if (!selectedInfo || !buildingInfo || !floorInfo) {
    return (
      <section
        id="howItWorks"
        className="container text-center py-12 sm:py-16  min-h-80 flex justify-center items-center flex-col"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </section>
    );
  }

  const reportResult = getReportResult(selectedInfo, buildingInfo, floorInfo);
  const { accessibility, fire } = reportResult;

  const parkingResult = reportResult.parking.isException
    ? 0
    : reportResult.parking.requiredParkingSpace;

  const getKoreanTerm = (key: string) => {
    switch (key) {
      case "mainEntranceAccess":
        return "주출입구 접근";
      case "accessibleParkingSpaces":
        return "장애인 주차구역";
      case "mainEntranceHeightDifference":
        return "주출입구 높이차이";
      case "entrances":
        return "출입구";
      default:
        return "";
    }
  };

  const accessibilityResult = Object.entries(accessibility)
    .filter(([key, value]) => value)
    .map(([key, value]) => getKoreanTerm(key));

  return (
    <div className={"flex flex-col gap-10"}>
      <Table title="건축물 현황" className="">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase"
            >
              항목
            </th>
            <th
              scope="col"
              className="px-6 py-2 text-start text-xs font-medium text-gray-500 uppercase"
            >
              내용
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <BuildingInfoTr title="주소" content={buildingInfo.address} />
          <BuildingInfoTr title="용도지역" content={buildingInfo.usage} />
          <BuildingInfoTr
            title="기계식주차"
            content={buildingInfo.mechanicalParking}
          />
          <BuildingInfoTr
            title="자주식주차"
            content={buildingInfo.selfParking}
          />
          <BuildingInfoTr
            title="오수정화시설 (형식/용량)"
            content={buildingInfo.sewageTreatmentFacility}
            comment={" *시,군,구청 확인 필요"}
          />
        </tbody>
      </Table>

      <div
        id={"review-card"}
        className="border rounded-lg divide-y divide-gray-200 min-w-full"
      >
        <CardHeader title={"용도변경"} />

        <div className={"flex flex-col min-w-full"}>
          <div className="flex flex-row items-start py-10 px-12 mt-10 gap-8 overflow-x-auto">
            <section id={"Label Group"} className={"h-full flex gap-4"}>
              <p className="text-sm w-20 h-8 flex items-center justify-start font-bold text-gray-800">
                {floorInfo.flrGbCdNm} {floorInfo.flrNo}층
              </p>
              <div className={"flex flex-col justify-start space-y-2"}>
                <label className="text-sm w-20 h-8 flex items-center justify-start">
                  건축물 용도
                </label>
                {/* NOTE: 대분류, 소분류 두줄 됐을때 필요한  */}
                <div className={"lg:hidden block w-20 h-8"} />
                {/* NOTE: 띄어쓰기 때문에 whitespace-pre-wrap 적용 */}
                <label className="text-sm w-20 h-8 flex items-center justify-start whitespace-pre-wrap">
                  {"면           적"}
                </label>
              </div>
            </section>
            <form className="flex flex-row items-center w-full">
              <InputGroup
                selectedMainCategory={floorInfo.etcPurps}
                title={
                  <h3 className="text-sm md:text-md font-bold mb-2 text-[#797979]">
                    <span>용도변경 전</span>
                    <span className={"hidden md:inline"}>(현재)</span>
                  </h3>
                }
                selectedSubCategory={floorInfo.mainPurpsCdNm}
                area={floorInfo.area}
                readonly
              />
              <div className={"p-6"}>
                <ChevronRight className="text-blue-500" size={20} />
              </div>
              <InputGroup
                title={
                  <h3 className="text-sm md:text-md font-bold mb-2">
                    용도변경 후
                  </h3>
                }
                selectedMainCategory={selectedInfo.mainCategory}
                selectedSubCategory={selectedInfo.subCategory}
                area={selectedInfo.area}
                totalArea={floorInfo.area}
                showRemainingArea
                readonly
              />
            </form>
          </div>
        </div>
      </div>

      <div id={"report-progress-card"} className="border rounded-lg min-w-full">
        <CardHeader title={step !== "completed" ? "검토중" : "검토완료"} />
        <ul className={"px-6 mb-4"}>
          <ProgressItem
            title={"용도 지역 검토"}
            isActivated={step === "animation1"}
            content={[
              "국토의 계획 및 이용에 관한 법률",
              "제주특별자치도 도시계획 조례",
            ]}
            hasNext
            onCompleted={() => {
              setStep("animation2");
            }}
          />
          <ProgressItem
            title={"건축물 용도 검토"}
            isActivated={step === "animation2"}
            content={["건축법", "제주특별자치도건축조례"]}
            hasNext
            onCompleted={() => {
              setStep("animation3");
            }}
          />
          <ProgressItem
            title={"기타 관련 법규 검토"}
            isActivated={step === "animation3"}
            content={[
              "주차장법",
              "제주시 주차장조례",
              "장애인 노인 임산부 등의 편의증진 보장에 관한 법률",
            ]}
            hasNext={false}
            onCompleted={() => {
              setStep("completed");
            }}
          />
        </ul>
      </div>

      <div id={"report-result-card"} className="border rounded-lg min-w-full">
        <CardHeader title={"검토결과"} />
        {step !== "completed" && (
          <div className={`w-full flex justify-center mt-10 mb-10`}>
            <ul className={"divide-y divide-slate-200 w-full mx-4 sm:mx-20"}>
              {Array.from({ length: 3 }).map((_, index) => (
                <ReportItemSkeleton key={index} />
              ))}
            </ul>
          </div>
        )}
        {step === "completed" && (
          <div className={`w-full flex justify-center mt-10`}>
            <ul className={"divide-y divide-slate-200 w-full mx-4 sm:mx-20"}>
              <ReportItem
                count={1}
                title={"용도지역"}
                descriptions={[
                  `${selectedInfo.mainCategory}의 용도지역 검토결과 해당 건축물 용도는 설치 가능합니다.`,
                ]}
                result={reportResult.zoning.isPassed ? "가능" : "불가능"}
              />
              <ReportItem
                count={2}
                title={"면적 제한"}
                descriptions={[
                  reportResult.areaLimitations.isPassed
                    ? `${selectedInfo.subCategory} 용도 건축물 면적 제한 검토결과 해당 건축물 용도는 설치 가능합니다.`
                    : "현재단계에서는 나올수 있는 조건이 없음",
                ]}
                result={
                  reportResult.areaLimitations.isPassed ? "가능" : "불가능"
                }
              />
              <ReportItem
                count={3}
                title={"주차장"}
                descriptions={[
                  parkingResult === 0
                    ? reportResult.parking.isException
                      ? "사용승인 완료 5년이상, 1,000m2 미만의 용도변경이기 때문에 주차장 설치는 불필요 합니다."
                      : "용도변경으로 인한 필요주차대수가 1대 미만의 용도변경이기 때문에 주차장 설치는 불필요 합니다."
                    : `용도변경으로 인한 필요 주차대수가 ${parkingResult}대 이상이기 때문에 부설주차장에 대한 현황 및 주차장 증설 가능 여부 등 추가적인 검토가 필요합니다.`,
                ]}
                result={parkingResult === 0 ? "가능" : "검토필요"}
              />
              <ReportItem
                count={4}
                title={"장애인 편의시설"}
                descriptions={[
                  accessibilityResult.length > 0
                    ? `해당 용도변경으로로 인해 필요한 편의시설의 종류는 ${accessibilityResult.join(", ")} 입니다. 이에 대한 현황조사 및 추가 검토가 필요합니다.`
                    : "해당 용도변경으로 인해 추가설치가 필요한 편의시설은 없습니다.",
                ]}
                result={accessibilityResult.length > 0 ? "검토필요" : "가능"}
              />
              <ReportItem
                count={5}
                title={"소방"}
                descriptions={[
                  `다중이용업소 ${fire.isMultiUserBusiness ? "해당" : "비해당"}`,
                  `특정소방대상물 ${fire.isSpecialFireFacility ? "해당" : "비해당"}`,
                ]}
                result={
                  fire.isMultiUserBusiness || fire.isSpecialFireFacility
                    ? "검토필요"
                    : "가능"
                }
              />
              <div className={"w-full flex justify-start py-6 pb-10"}>
                <span className={"text-xs text-gray-600 text-start"}>
                  * 주무관청과 용도변경 협의 과정에서 일부 추가 관련 법률 검토가
                  필요할 수 있습니다.
                </span>
              </div>
            </ul>
          </div>
        )}
      </div>

      <div className={"flex flex-col min-w-full"}>
        <div className={"my-8 flex flex-col"}>
          <Button
            className={"w-1/4 mx-auto min-w-[200px]"}
            onClick={() => {
              router.push("https://pf.kakao.com/_xnYaqn");
            }}
            disabled={step !== "completed"}
          >
            <span>전문 건축사 상담하기</span>
          </Button>
          <ContactLink />
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
