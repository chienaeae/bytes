export default function ProductInfoCard() {
  return (
    <div className="border rounded-lg p-4 w-full">
      <h3 className="font-medium mb-3">Product basic info</h3>

      <div className="text-xs space-y-1 mb-6">
        <p className="text-gray-500">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        <p className="text-gray-500">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        <p className="text-gray-500">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        <p className="text-gray-500">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        <p className="text-gray-500">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        <p className="text-gray-500">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="bg-gray-400 rounded-full h-8 w-24"></div>
          <div className="bg-gray-400 rounded-full h-8 w-32"></div>
        </div>
        <div className="bg-gray-400 rounded-full h-8 w-40"></div>
      </div>
    </div>
  );
}
