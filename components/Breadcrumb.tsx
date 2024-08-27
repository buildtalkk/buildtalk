import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

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

const Breadcrumb = () => {
  const pathname = usePathname();
  return (
    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base mb-10">
      <Item num={1} checked={pathname === "/result"}>
        건축물 현황
      </Item>
      <Item num={2} checked={pathname === "/review"}>
        건축 규제 검토
      </Item>
      <Item num={3} checked={pathname === "/report"} isLast>
        리포트
      </Item>
    </ol>
  );
};
export default Breadcrumb;
