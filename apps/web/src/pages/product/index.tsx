import ProductContentList from './ProductContentList';
import ProductContentSection from './ProductContentSection';
import ProductDescSection from './ProductDescSection';
import ProductImageCard from './ProductImageCard';
import ProductInfoCard from './ProductInfoCard';
import RecommendSection from './RecommendSection';
export default function ProductPage() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="w-full lg:w-2/3 space-y-8">
          <ProductImageCard />
          <ProductDescSection />
          <ProductContentSection />
        </div>

        {/* Right column */}
        <div className="w-full lg:w-1/3 space-y-8">
          <ProductInfoCard />
          <ProductContentList />
        </div>
      </div>

      <RecommendSection />
    </div>
  );
}
