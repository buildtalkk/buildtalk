"use client";
import { Button } from "@/components/ui/button";
import Table from "@/components/Table";
import BuildingInfoTr from "@/components/BuildingInfoTr";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import useSessionStorageState from "use-session-storage-state";
import { BuildingInfo } from "@/types";

const ReviewPage = () => {
  const [buildingInfo, , { removeItem: resetBuildingInfo }] =
    useSessionStorageState<BuildingInfo | undefined>("buildingInfo");
  const [floorInfo, , { removeItem: resetFloorInfo }] =
    useSessionStorageState<any>("floorInfo");
  const searchParams = useSearchParams();

  const router = useRouter();
  const [area, setArea] = useState<string>("1,342.9m²");
  const [resultArea, setResultArea] = useState<string>("1,229m²");
  const [loading, setLoading] = useState(true);
  /* storage에 저장된 정보가 없거나, 주소가 일치하지 않을 경우 */
  const buildingInfoMatched = useMemo(() => {
    return searchParams.get("address") === buildingInfo?.address;
  }, [buildingInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);

    /* storage에서 데이터 가져오는 동안 잠시 기다리기 위해서 비동기 처리 */
    setLoading(false);
  }, []);

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
        <Button onClick={() => window.history.back()} className="mt-4">
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
      <div className="border rounded-lg divide-y divide-gray-200">
        <div className="py-3 px-4 flex items-start">
          <h2 className="text-lg font-semibold text-gray-800">용도변경</h2>
        </div>
        <div className="flex items-center space-x-4 p-6">
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2">용도변경 전(현재)</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="text-sm w-20">
                  {floorInfo.flrGbCdNm} {floorInfo.flrNo}층
                </label>
                <select className="border rounded px-2 py-1 text-sm flex-1">
                  <option>제 1종 근린생활시설</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm w-20">건축물 용도</label>
                <select className="border rounded px-2 py-1 text-sm flex-1">
                  <option>소매점</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm w-20">면적</label>
                <input
                  type="text"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  className="border rounded px-2 py-1 text-sm flex-1"
                />
              </div>
            </div>
          </div>
          <ChevronRight className="text-blue-500" />
          <div className="flex-1">
            <h3 className="text-sm font-medium mb-2">용도변경 후</h3>
            <div className="space-y-2">
              <select className="border rounded px-2 py-1 text-sm w-full">
                <option>건축물 용도 미정</option>
              </select>
              <select className="border rounded px-2 py-1 text-sm w-full">
                <option>세부용도 선택</option>
              </select>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={resultArea}
                  readOnly
                  className="border rounded px-2 py-1 text-sm flex-1"
                />
                <span className="text-xs text-gray-500 ml-2">
                  남은 면적: 123m²
                </span>
              </div>
            </div>
          </div>
        </div>
        <Button
          className={"mb-8"}
          disabled={true}
          onClick={() => {
            router.push("/report");
          }}
        >
          <span>검토 리포트 생성하기</span>
        </Button>
      </div>
    </>
  );
};

export default ReviewPage;
