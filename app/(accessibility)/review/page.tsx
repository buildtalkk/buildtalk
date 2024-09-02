"use client";
import { Button } from "@/components/ui/button";
import Table from "@/components/Table";
import BuildingInfoTr from "@/components/BuildingInfoTr";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Loader2, Info } from "lucide-react";
import useSessionStorageState from "use-session-storage-state";
import { BuildingInfo, SelectedInfo } from "@/types";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
import { OnValueChange } from "react-number-format/types/types";

const categories = [
  {
    main: "제1종 근린생활시설",
    sub: ["소매점 등", "휴게음식점, 제과점 등", "사무소 등"],
  },
  {
    main: "제2종 근린생활시설",
    sub: [
      "공연장",
      "종교집회장",
      "휴게음식점",
      "일반음식점",
      "동물병원, 동물미용실",
      "학원, 교습소 등",
      "독서실",
      "테니스장, 체력단련장, 골프연습장 등",
      "사무소 등",
      "청소년게임제공업소, 복합유통게임제공업소, 인터넷컴퓨터게임시설제공업소, 가상현실체험 제공업소",
      "노래연습장",
    ],
  },
];

interface InputGroupProps {
  title: React.ReactNode;
  readonly?: boolean;
  selectedMainCategory: string;
  selectedSubCategory: string;
  setSelectedMainCategory?: (category: string) => void;
  setSelectedSubCategory?: (category: string) => void;
  area?: number;
  setArea?: (area: number) => void;
  totalArea?: number;
}

const InputGroup = ({
  title,
  readonly = false,
  selectedMainCategory,
  setSelectedMainCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  area,
  setArea,
  totalArea,
}: InputGroupProps) => {
  const style = `border border-primary-500 rounded px-2 py-1 text-sm w-full h-8 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus-visible:outline-none`;
  const selectTagStyle = twMerge(style, readonly ? "appearance-none" : "");

  const handleAreaChange: OnValueChange = ({ floatValue }) => {
    // if (floatValue && totalArea && floatValue > totalArea) {
    //   return setArea?.(totalArea);
    // }
    setArea?.(floatValue ?? 0);
  };

  return (
    <fieldset
      className="w-full relative min-w-[300px]  flex-1"
      disabled={readonly}
      id={"Input Group"}
    >
      <div
        className={
          "w-1/2 flex items-center justify-center absolute left-1/4 -top-10"
        }
      >
        {title}
      </div>

      <div className="space-y-2">
        <div className="flex flex-col lg:flex-row items-center  space-x-0 space-y-2 lg:space-x-2 lg:space-y-0 ">
          <select
            className={twMerge(
              selectTagStyle,
              selectedMainCategory ? "" : "text-gray-400 text-xs"
            )}
            onChange={e => {
              setSelectedMainCategory?.(e.target.value);
              setSelectedSubCategory?.("");
            }}
          >
            {readonly ? (
              <option>{selectedMainCategory}</option>
            ) : (
              <>
                <option
                  disabled
                  hidden
                  value={""}
                  selected={!selectedMainCategory}
                >
                  건축물 용도 대분류
                </option>
                {categories.map(category => (
                  <option
                    label={category.main}
                    key={category.main}
                    value={category.main}
                    selected={selectedMainCategory === category.main}
                  >
                    {category.main}
                  </option>
                ))}
              </>
            )}
          </select>
          <select
            className={twMerge(
              selectTagStyle,
              selectedSubCategory ? "" : "text-gray-400 text-xs"
            )}
            onChange={e => {
              setSelectedSubCategory?.(e.target.value);
            }}
          >
            {readonly ? (
              <option>{selectedSubCategory}</option>
            ) : (
              <>
                <option
                  disabled
                  hidden
                  value={""}
                  selected={!selectedSubCategory}
                >
                  건축물 용도 소분류
                </option>
                {categories
                  .find(category => category.main === selectedMainCategory)
                  ?.sub.map(subCategory => (
                    <option
                      label={subCategory}
                      key={subCategory}
                      value={subCategory}
                      selected={selectedSubCategory === subCategory}
                    >
                      {subCategory}
                    </option>
                  ))}
              </>
            )}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={twMerge(
              style,
              "flex items-center gap-4 justify-between"
            )}
          >
            <NumericFormat
              value={area}
              className={
                "appearance-none bg-transparent border-none text-gray-700 p-0 leading-tight focus:outline-none text-xs"
              }
              thousandSeparator=","
              suffix="m²"
              max={totalArea}
              displayType={readonly ? "text" : "input"}
              onValueChange={handleAreaChange}
              decimalScale={2}
            />
            {!readonly && totalArea && (
              <span className="text-xs text-primary-500">
                남은 면적 : {(totalArea - (area ?? 0)).toFixed(2)}m²
              </span>
            )}
          </div>
        </div>
      </div>
    </fieldset>
  );
};

const ReviewPage = () => {
  const [buildingInfo, , { removeItem: resetBuildingInfo }] =
    useSessionStorageState<BuildingInfo | undefined>("buildingInfo");
  const [floorInfo, , { removeItem: resetFloorInfo }] =
    useSessionStorageState<any>("floorInfo");
  const [, setSelectedInfo] = useSessionStorageState<SelectedInfo | undefined>(
    "selectedInfo"
  );
  const searchParams = useSearchParams();

  const router = useRouter();
  const [area, setArea] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  /* storage에 저장된 정보가 없거나, 주소가 일치하지 않을 경우 */
  const buildingInfoMatched = useMemo(() => {
    return searchParams.get("address") === buildingInfo?.address;
  }, [buildingInfo, searchParams]);

  const [selectedMainCategory, setSelectedMainCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);

    /* storage에서 데이터 가져오는 동안 잠시 기다리기 위해서 비동기 처리 */
    setLoading(false);
  }, []);

  const isValid = useMemo(() => {
    return Boolean(selectedMainCategory && selectedSubCategory && area);
  }, [selectedMainCategory, selectedSubCategory, area]);

  if (loading) {
    return (
      <section
        id="howItWorks"
        className="container text-center py-12 sm:py-16  min-h-80 flex justify-center items-center flex-col"
      >
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        <p className="mt-4">현재 건축물 정보를</p>
        <p>불러오고 있습니다</p>
      </section>
    );
  }

  if (!buildingInfo || !floorInfo || !buildingInfoMatched) {
    return (
      <section
        id="howItWorks"
        className="container text-center py-12 sm:py-16  min-h-80 flex justify-center items-center flex-col"
      >
        <p className="mt-4">층 정보를 찾을 수 없습니다.</p>
        <Button onClick={() => router.back()} className="mt-4">
          뒤로가기
        </Button>
      </section>
    );
  }

  return (
    <>
      <Table title="건축물 현황" className="mb-10">
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
      <div className="border rounded-lg divide-y divide-gray-200 min-w-full">
        <header className="py-3 px-4 flex items-center justify-start">
          <div className={"flex items-end"}>
            <h2 className="text-lg font-bold text-gray-800">용도변경</h2>
            <Link className={"ml-1.5 mb-1"} href={"/change"} target={"_blank"}>
              <Info size={12} />
            </Link>
          </div>
        </header>

        <div className={"flex flex-col min-w-full"}>
          <div className="flex flex-row items-start py-10 px-12 mt-10 gap-8 overflow-x-scroll">
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
                selectedMainCategory={selectedMainCategory}
                selectedSubCategory={selectedSubCategory}
                setSelectedMainCategory={setSelectedMainCategory}
                setSelectedSubCategory={setSelectedSubCategory}
                area={area}
                setArea={setArea}
                totalArea={floorInfo.area}
              />
            </form>
          </div>
          <div className={"my-8 flex flex-col"}>
            <Button
              className={"w-1/4 mx-auto"}
              disabled={!isValid}
              onClick={() => {
                setSelectedInfo({
                  mainCategory: selectedMainCategory,
                  subCategory: selectedSubCategory,
                  area: area ?? 0,
                });
                router.push("/report");
              }}
            >
              <span>검토 리포트 생성하기</span>
            </Button>
            <Link
              href="https://naver.com"
              className="text-sm text-gray-600 underline text-center mt-2"
              target={"_blank"}
            >
              용도 분류를 모르시겠나요? 전문가에게 문의주세요.
            </Link>
          </div>
        </div>
      </div>
      <div
        className={
          "flex flex-col items-start w-fit mx-auto text-gray-400 text-sm mt-2"
        }
      >
        <p>* 본 서비스는 상업용 부동산을 대상으로 제공됩니다.</p>
        <p>
          (현재 제주시 대상이며 빠른 시일 내에 전국 범위로 확대될 예정입니다)
        </p>
      </div>
    </>
  );
};

export default ReviewPage;
