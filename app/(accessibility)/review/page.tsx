"use client";
import { Button } from "@/components/ui/button";
import Table from "@/components/Table";
import BuildingInfoTr from "@/components/BuildingInfoTr";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Loader2, Info } from "lucide-react";
import useSessionStorageState from "use-session-storage-state";
import {
  BuildingInfo,
  MainCategories,
  SelectedInfo,
  SubCategories1,
  SubCategories2,
} from "@/types";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
import { OnValueChange } from "react-number-format/types/types";
import ContactLink from "@/components/ContactLink";
import CardHeader from "@/components/CardHeader";

const categories = [
  {
    main: MainCategories.First,
    sub: Object.values(SubCategories1),
  },
  {
    main: MainCategories.Second,
    sub: Object.values(SubCategories2),
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
    setArea?.(floatValue ?? 0);
  };
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputContainerClick = () => {
    if (!readonly && inputRef.current) {
      inputRef.current.focus();
    }
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
            onClick={handleInputContainerClick}
          >
            <NumericFormat
              value={area}
              className={
                "appearance-none bg-transparent border-none text-gray-700 p-0 leading-tight focus:outline-none text-xs"
              }
              isAllowed={values => {
                const { floatValue } = values;
                if (floatValue === undefined || !totalArea) {
                  return true;
                }
                if (floatValue < 0) {
                  return false;
                }
                return floatValue <= totalArea;
              }}
              thousandSeparator=","
              suffix="m²"
              displayType={readonly ? "text" : "input"}
              onValueChange={handleAreaChange}
              decimalScale={2}
              getInputRef={inputRef}
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
      <div
        id={"review-card"}
        className="border rounded-lg divide-y divide-gray-200 min-w-full"
      >
        <CardHeader
          title={"용도변경"}
          Icon={
            <Link className={"ml-1.5 mb-1"} href={"/change"} target={"_blank"}>
              <Info size={12} />
            </Link>
          }
        />

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
              className={"w-1/4 mx-auto min-w-[200px]"}
              disabled={!isValid}
              onClick={() => {
                if (floorInfo.area < (area ?? 0)) {
                  return alert("입력한 면적이 현재 층의 면적보다 큽니다.");
                }
                /* 예외 처리: 사무소 - 면적에 따른 올바른 근생 선택 여부 토스트 띄우기 */
                if (selectedSubCategory.includes("사무소")) {
                  if (
                    selectedMainCategory === MainCategories.First &&
                    (area ?? 0) >= 30
                  ) {
                    return alert(
                      "사무소의 면적에 따른 근생을 선택해주세요. 30m² 이상인 경우 제2종 근생을 선택해주세요."
                    );
                  }
                  if (
                    selectedMainCategory === MainCategories.Second &&
                    (area ?? 0) < 30
                  ) {
                    return alert(
                      "사무소의 면적에 따른 근생을 선택해주세요. 30m² 미만인 경우 제1종 근생을 선택해주세요."
                    );
                  }
                }
                /* 예외 처리: 휴게음식점 - 면적에 따른 올바른 근생 선택 여부 토스트 띄우기 */
                if (selectedSubCategory.includes("휴게음식점")) {
                  if (
                    selectedMainCategory === MainCategories.First &&
                    (area ?? 0) >= 300
                  ) {
                    return alert(
                      "휴게음식점의 면적에 따른 근생을 선택해주세요. 300m² 이상인 경우 제2종 근생을 선택해주세요."
                    );
                  }
                  if (
                    selectedMainCategory === MainCategories.Second &&
                    (area ?? 0) < 300
                  ) {
                    return alert(
                      "휴게음식점의 면적에 따른 근생을 선택해주세요. 300m² 미만인 경우 제1종 근생을 선택해주세요."
                    );
                  }
                }
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
            <ContactLink />
          </div>
        </div>
      </div>
      <div
        className={
          "flex flex-col items-center w-fit mx-auto text-gray-400 text-sm mt-2"
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
