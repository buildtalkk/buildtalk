import { ReactNode } from "react";

const CardHeader = ({ title, Icon }: { title: string; Icon?: ReactNode }) => {
  return (
    <header className="py-3 px-4 flex items-center justify-start">
      <div className={"flex items-end"}>
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        {Icon}
      </div>
    </header>
  );
};

export default CardHeader;
