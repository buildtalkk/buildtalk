import { twMerge } from "tailwind-merge";
import { OnValueChange } from "react-number-format/types/types";
import { useRef } from "react";
import { NumericFormat } from "react-number-format";
import { MainCategories, SubCategories1, SubCategories2 } from "@/types";

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

export const InputGroup = ({
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
