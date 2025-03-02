export default function ProductContentList() {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-4">xxxxxxxxxxxxx</h3>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="bg-muted w-16 h-16 rounded-lg shrink-0"></div>
            <div className="space-y-1 text-sm text-gray-600">
              {Array.from({ length: 3 }).map((_, j) => (
                <p key={j}>{'x'.repeat(30)}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
