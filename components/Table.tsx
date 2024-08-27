import { twMerge } from "tailwind-merge";

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

export default Table;
