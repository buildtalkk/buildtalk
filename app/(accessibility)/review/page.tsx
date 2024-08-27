"use client";
import { useStateContext } from "@/store/StateContext";
import { Button } from "@/components/ui/button";
import Table from "@/components/Table";
import BuildingInfoTr from "@/components/BuildingInfoTr";

const ReviewPage = () => {
  const { buildingInfo, floorInfo } = useStateContext();

  if (!buildingInfo || !floorInfo) {
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
          {/*// 주소, 용도지역, 주차 2개, 오수정화시설*/}
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
          />
        </tbody>
      </Table>
    </>
  );
};

export default ReviewPage;
