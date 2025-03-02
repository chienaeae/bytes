export default function Footer() {
  return (
    <footer className="bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section */}
          <div className="space-y-6 max-w-md">
            <h3 className="font-medium">xxxxxxxx</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
              <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
            </div>
            <div className="flex gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-8 h-8 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">BITES</h3>
            <div className="grid grid-cols-2 gap-x-16 gap-y-2 text-sm text-gray-600">
              {Array.from({ length: 8 }).map((_, i) => (
                <p key={i}>xxxxxxxxxxxxx</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
