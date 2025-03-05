interface ProductTableProps {
  data: { label: string; value: string }[];
  headerBgColor?: string; // 可自訂表頭顏色
}
export default function ProductTable({ data, headerBgColor = 'bg-gray-200' }: ProductTableProps) {
  return (
    <table className="w-full border-collapse text-left">
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <th className={`${headerBgColor} p-2 whitespace-nowrap`}>{item.label}</th>
            <td className="p-2 w-lg">{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
