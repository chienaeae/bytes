export default function ProductDescSection() {
  return (
    <div className="space-y-4 my-8">
      <h2 className="text-xl font-bold">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</h2>
      <div className="space-y-2 text-gray-600">
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i} className="text-sm">
            {'x'.repeat(80)}
          </p>
        ))}
      </div>
    </div>
  );
}
