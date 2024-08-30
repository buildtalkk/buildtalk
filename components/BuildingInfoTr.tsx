const BuildingInfoTr = ({
  title,
  content,
  comment,
}: {
  title: React.ReactNode;
  content: React.ReactNode;
  comment?: React.ReactNode;
}) => {
  return (
    <tr>
      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
        {title}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-800">
        {content}
        {comment && (
          <span className="ml-6 text-xs text-gray-600">{comment}</span>
        )}
      </td>
    </tr>
  );
};

export default BuildingInfoTr;
