"use client";
import useSessionStorageState from "use-session-storage-state";
import { SelectedInfo } from "@/types";

const ReportPage = () => {
  const [selectedInfo] = useSessionStorageState<SelectedInfo | undefined>(
    "selectedInfo"
  );

  if (!selectedInfo) {
    return <div>분석 결과가 없습니다.</div>;
  }

  return (
    <div>
      <p>분석 결과</p>
      <p>{selectedInfo.mainCategory}</p>
      <p>{selectedInfo.subCategory}</p>
      <p>{selectedInfo.area}</p>
    </div>
  );
};

export default ReportPage;
