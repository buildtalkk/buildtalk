type Regulation = {
  id: string;
  title: string;
  condition:
    | {
        type: "must";
      }
    | {
        type: "greather_than_or_equal_to";
        value: number;
      };
  category: string;
};

export const 용도지역건축물용도가능매트릭스: boolean[][] = [
  [
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  [
    true,
    false,
    false,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
];

export function getRegulations({
  building,
  location,
}: {
  location: number;
  building: number;
}): Regulation[] {
  const result: Regulation[] = [];

  if (!용도지역건축물용도가능매트릭스[location][building]) {
    result.push({
      id: "1",
      title: "용도지역과 건축물용도가 일치하지 않습니다.",
      condition: { type: "must" },
      category: "용도지역",
    });
    return result;
  }

  result.push({
    id: "2",
    title: "건축물용도가 허용되는 지역입니다.",
    condition: { type: "must" },
    category: "용도지역",
  });

  // 다른 조건들
  switch (building) {
    case 0:
    case 1:
    case 2:
    case 3:
  }

  return result;
}
