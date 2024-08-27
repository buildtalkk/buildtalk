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

export default BuildingInfoTr;
