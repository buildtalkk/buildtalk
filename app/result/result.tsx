"use client";

import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { getBuildingInfo } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const Item: React.FC<{
  children?: React.ReactNode;
  isLast?: boolean;
  num: number;
  checked?: boolean;
}> = ({ children, isLast, num, checked }) => {
  return !isLast ? (
    <li
      className={twMerge(
        "flex md:w-full items-center sm:after:content-[''] after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10",
        checked && "text-primary-500"
      )}
    >
      <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 whitespace-nowrap">
        {checked ? (
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        ) : (
          <span className="me-2">{num}</span>
        )}
        {children}
      </span>
    </li>
  ) : (
    <li className="flex items-center whitespace-nowrap">
      {checked ? (
        <svg
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
      ) : (
        <span className="me-2">{num}</span>
      )}
      {children}
    </li>
  );
};

const BuildingInfoTr = ({
  title,
  content,
}: {
  title: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <tr>
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
        {title}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
        {content}
      </td>
    </tr>
  );
};

const Table = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("flex flex-col text-left", className)}>
      <div className="-m-1.5 overflow-x-auto ">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border rounded-lg divide-y divide-gray-200">
            <div className="py-3 px-4">
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                {children}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckFloorTr = ({
  floor,
  checked,
  area: area,
  purpose,
  floorType,
  onChange,
}: {
  floor: number;
  floorType: number;
  checked: boolean;
  area: React.ReactNode;
  purpose: React.ReactNode;
  onChange: (checked: boolean) => void;
}) => {
  const typeString =
    floorType === 10
      ? "지하"
      : floorType === 20
        ? "지상"
        : floorType === 30
          ? "옥탑"
          : "";
  return (
    <tr>
      <td className="py-3 ps-4">
        <div className="flex items-center h-5">
          <input
            id="hs-table-checkbox-all"
            type="checkbox"
            checked={checked}
            onChange={e => onChange(e.target.checked)}
            className="border-gray-200 rounded text-primary-600 focus:ring-primary-500 "
          />
          <label htmlFor="hs-table-checkbox-all" className="sr-only">
            Checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
        {typeString} {floor}층
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
        {area}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
        {purpose}
      </td>
    </tr>
  );
};

export const Result = () => {
  const searchParams = useSearchParams();
  const sigunguCd = searchParams.get("sigunguCd");
  const bjdongCd = searchParams.get("bjdongCd");
  const bun = searchParams.get("bun");
  const ji = searchParams.get("ji");
  const admCd = searchParams.get("admCd");
  const lnbrMnnm = searchParams.get("lnbrMnnm");
  const lnbrSlno = searchParams.get("lnbrSlno");
  const [result, setResult] = useState<{
    getBrFlrOulnInfo: any;
    getBrBasisOulnInfo: any;
    getBrRecapTitleInfo: any;
    getBrWclfInfo: any;
    getBrTitleInfo: GetBrTitleInfo;
    getBrJijiguInfo: GetBrJijiguInfo;
  } | null>(null);
  const [용적률건폐율result, set용적률건폐율result] = useState("");
  const [용적률건폐율loading, set용적률건폐율loading] = useState(false);
  const [checkedFloorIndex, setCheckedFloorIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sigunguCd && bjdongCd && bun && ji) {
      setLoading(true);
      getBuildingInfo({ sigunguCd, bjdongCd, bun, ji }).then(data => {
        console.log("data", data);
        setResult(data);
        setLoading(false);
      });
    }
  }, [sigunguCd, bjdongCd, bun, ji]);

  useEffect(() => {
    console.log("result", result);
  }, [result]);

  const titleItem = result?.getBrTitleInfo.response.body.items.item;
  const jijiguItem = result?.getBrJijiguInfo.response.body.items.item;
  const WclfItem = result?.getBrWclfInfo.response.body.items.item;

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

  if (!titleItem || Array.isArray(titleItem)) {
    return (
      <section
        id="howItWorks"
        className="container text-center py-12 sm:py-16  min-h-80 flex justify-center items-center flex-col"
      >
        <p className="mt-4">건축물 대장 정보를 찾을 수 없습니다.</p>
        <Button onClick={() => window.history.back()} className="mt-4">
          뒤로가기
        </Button>
      </section>
    );
  }

  /* 먼저 flrGbCd로 내림차순으로 정렬하고 그 다음 flrNo 내림차순으로 정렬한다. */
  const floorItems = Array.isArray(
    result?.getBrFlrOulnInfo.response.body.items.item
  )
    ? result?.getBrFlrOulnInfo.response.body.items.item
        .filter((item: any) => item.flrGbCd === 10 || item.flrGbCd === 20)
        .sort((a: any, b: any) => {
          const diff1 = b.flrGbCd - a.flrGbCd;
          if (diff1 !== 0) {
            return diff1;
          }
          if (b.flrGbCd === 10) {
            return a.flrNo - b.flrNo;
          } else {
            return b.flrNo - a.flrNo;
          }
        })
    : [result?.getBrFlrOulnInfo.response.body.items.item];

  return (
    <section id="howItWorks" className="container text-center py-12 sm:py-16">
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base mb-10">
        <Item num={1} checked>
          건축물 현황
        </Item>
        <Item num={2}>건축 규제 검토</Item>
        <Item num={3} isLast>
          리포트
        </Item>
      </ol>
      <div className="mb-10">
        <Search />
      </div>

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
          <BuildingInfoTr
            title="주소"
            content={`${titleItem.platPlc} / ${titleItem.newPlatPlc}`}
          />
          <BuildingInfoTr
            title="용도지역"
            content={
              Array.isArray(jijiguItem)
                ? jijiguItem.find(item => item.jijiguGbCd === 1)?.jijiguCdNm
                : (jijiguItem?.jijiguCdNm ?? "-")
            }
          />
          <BuildingInfoTr
            title="주용도 / 구조"
            content={`${titleItem.mainPurpsCdNm} / ${titleItem.etcStrct}`}
          />
          <BuildingInfoTr
            title="사용승인일"
            content={`${String(titleItem.useAprDay).slice(0, 4)}년 ${String(
              titleItem.useAprDay
            ).slice(4, 6)}월 ${String(titleItem.useAprDay).slice(6, 8)}일`}
          />
          <BuildingInfoTr
            title="대지면적"
            content={
              // `"337.87㎡ / 102.21평"`
              `${titleItem.platArea}㎡ / ${(
                titleItem.platArea / 3.3058
              ).toFixed(2)}평`
            }
          />
          <BuildingInfoTr
            title="건축면적"
            content={
              // "167.37㎡ / 50.63평"
              `${titleItem.archArea}㎡ / ${(
                titleItem.archArea / 3.3058
              ).toFixed(2)}평`
            }
          />

          <BuildingInfoTr
            title="연면적"
            content={
              // "1342.9㎡ / 406.23평"
              `${titleItem.totArea}㎡ / ${(titleItem.totArea / 3.3058).toFixed(
                2
              )}평`
            }
          />
          <BuildingInfoTr
            title="용적률산정연면적"
            content={
              // "1181.37㎡ / 357.36평"
              `${titleItem.vlRatEstmTotArea}㎡ / ${(
                titleItem.vlRatEstmTotArea / 3.3058
              ).toFixed(2)}평`
            }
          />
          <BuildingInfoTr title="건폐율" content={`${titleItem.bcRat}%`} />
          <BuildingInfoTr title="용적률" content={`${titleItem.vlRat}%`} />
          <BuildingInfoTr
            title="높이 / 층수"
            content={`${titleItem.heit}m / 지하 ${titleItem.ugrndFlrCnt}층, 지상 ${titleItem.grndFlrCnt}층`}
          />
          <BuildingInfoTr
            title="세대 / 호 / 가구"
            content={`${titleItem.hhldCnt}세대 / ${titleItem.hoCnt}호 / ${titleItem.fmlyCnt}가구`}
          />
          <BuildingInfoTr
            title="기계식주차"
            content={`옥내 ${titleItem.indrMechUtcnt}대 / 옥외 ${titleItem.oudrMechUtcnt}대`}
          />
          <BuildingInfoTr
            title="자주식주차"
            content={`옥내 ${titleItem.indrAutoUtcnt}대 / 옥외 ${titleItem.oudrAutoUtcnt}대`}
          />
          <BuildingInfoTr
            title="오수정화시설 (형식/용량)"
            content={`${WclfItem.modeCdNm} / ${WclfItem.capaPsper}인, ${WclfItem.capaLube}㎥`}
          />
        </tbody>
      </Table>

      <Table title={"검토를 원하는 층을 선택해주세요"}>
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3 ps-4"></th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              층
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              면적
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
            >
              용도
            </th>
          </tr>
        </thead>
        <tbody>
          {floorItems.map((item: any, index: number) => (
            <CheckFloorTr
              key={index}
              floorType={item.flrGbCd}
              floor={item.flrNo}
              checked={checkedFloorIndex === index}
              area={`${item.area}㎡ / ${(item.area / 3.3058).toFixed(2)}평`}
              purpose={`${item.mainPurpsCdNm} - ${item.etcPurps}`}
              onChange={checked => {
                setCheckedFloorIndex(checked ? index : null);
              }}
            />
          ))}
        </tbody>
      </Table>

      {searchParams.get("debug") ? (
        <pre className="text-left">{JSON.stringify(result, null, 2)}</pre>
      ) : null}

      {/* <Button
        disabled={용적률건폐율loading}
        onClick={() => {
          set용적률건폐율loading(true);
          get용적률건폐율({
            admCd: admCd ?? "",
            lnbrMnnm: lnbrMnnm ?? "",
            lnbrSlno: lnbrSlno ?? "",
          }).then((result) => {
            set용적률건폐율result(result);
            set용적률건폐율loading(false);
          });
        }}
      >
        {용적률건폐율loading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        <span>용적률/건폐율 분석하기</span>
      </Button>
      <pre className="text-left">{용적률건폐율result}</pre> */}
    </section>
  );
};
