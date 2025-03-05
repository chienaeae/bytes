import ProductImageCard from './ProductImageCard';
import ProductTable from './ProductTable';
import RecommendSection from './RecommendSection';
export default function ProductPage() {
  const productInfo = [
    { label: 'Supplier', value: 'Sunrise Organics Ltd.' },
    { label: 'Place of Origin', value: 'Canada > Ontario > Niagara' },
    { label: 'Manufacturing Location', value: 'Toronto, Ontario, Canada' },
    { label: 'Price', value: 'CAD 25 per 500g package (excl. tax)' },
    { label: 'Minimum Delivery Unit', value: '50 packages' },
    { label: 'Supply Situation', value: 'Year-round supply with peak production during summer' },
    { label: 'Preparation Period', value: '2–3 business days after order confirmation' },
  ];
  const ingredientInfo = [
    { label: 'Ingredients', value: 'Tomato(100%)' },
    { label: 'Product Weight', value: 'Net: 500g; Gross: 550g' },
    { label: 'Packaging Form', value: '12 bags/box (eco-friendly, tamper-proof seal)' },
    { label: 'Storage Conditions', value: 'Store in a cool, dry place at room temperature' },
    { label: 'Shelf Life', value: '24 months' },
    { label: 'Allergy Information', value: 'Allergen-free; nut, dairy, gluten-free facility' },
    { label: 'Usage Instructions', value: 'Mix with water or add to sauces, soups, dressings' },
  ];
  const others = [
    { label: 'Relevant Certifications', value: 'Certified Organic, ISO 22000, HACCP, Non-GMO' },
    {
      label: 'Packaging Form',
      value: 'Product datasheet (PDF, not detected), certification documents (PDF, not detected)',
    },
    { label: 'Listing Date', value: '3/1/2025' },
  ];
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="w-full lg:w-1/3 space-y-8">
          <ProductImageCard />
        </div>

        {/* Right column */}
        <div className="w-full lg:w-2/3 space-y-8">
          <h1 className="text-2xl font-bold mb-1">Product Name</h1>
          <p className="mb-2 text-wrap">
            Made from sun-dried, organic tomatoes to retain natural flavor and nutrients
          </p>
          <button type="button" className="rounded-2xl bg-primary px-3 py-1 mr-1 text-white">
            hashtag1
          </button>
          <button type="button" className="rounded-2xl bg-primary px-3 py-1 mr-1 text-white">
            hashtag2
          </button>
          <button type="button" className="rounded-2xl bg-primary px-3 py-1 mr-1 text-white">
            hashtag3
          </button>
          <ProductTable data={productInfo} headerBgColor="bg-secondary" />
          <h2 className="text-xl font-bold">PRODUCT INFORMATION</h2>
          <ProductTable data={ingredientInfo} />
          <h2 className="text-xl font-bold">OTHERS</h2>
          <ProductTable data={others} />
        </div>
      </div>

      <RecommendSection />
    </div>
  );
}
