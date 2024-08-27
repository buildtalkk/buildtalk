export const get용도지역 = (jijiguItem: any): string =>
  Array.isArray(jijiguItem)
    ? jijiguItem.find(item => item.jijiguGbCd === 1)?.jijiguCdNm
    : (jijiguItem?.jijiguCdNm ?? "-");

export const get오수정화시설 = (item: any): string => {
  const items = Array.isArray(item) ? item : [item];
  return items
    .map(
      (WclfItem: any, index: number) =>
        `${WclfItem?.modeCdNm ?? "-"} / ${WclfItem?.capaPsper ?? "-"}인, ${WclfItem?.capaLube ?? "-"}㎥`
    )
    .join(" | ");
};
