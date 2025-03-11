import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { Product } from '@/model/product';
import { getProducts } from '@/service/core/products';

import ProductImageCard from './ProductImageCard';
import ProductTable from './ProductTable';
import RecommendSection from './RecommendSection';

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        console.error('pid is undefined.');
        return;
      }

      try {
        const response = await getProducts(id);
        setProduct(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  console.log(product);
  const productInfo = [
    { label: 'Supplier', value: product?.suppliers[0]?.supplierName ?? 'N/A' },
    { label: 'Place of Origin', value: product?.placeOfOrigin ?? 'N/A' },
    { label: 'Manufacturing Location', value: product?.manufacturingLocation ?? 'N/A' },
    { label: 'Product Weight/Volume', value: product?.weightVolume ?? 'N/A' },
    { label: 'Price', value: 'CAD 25 per 500g package (excl. tax)' },
    { label: 'Minimum Delivery Unit', value: '50 packages' },
    { label: 'Supply Situation', value: 'Year-round supply with peak production during summer' },
    { label: 'Preparation Period', value: '2–3 business days after order confirmation' },
  ];
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column */}
        <div className="w-full lg:w-1/3 space-y-8">
          <ProductImageCard images={product?.images ?? []} />
        </div>

        {/* Right column */}
        <div className="w-full lg:w-2/3 space-y-8">
          <h1 className="text-2xl font-bold mb-1">{product?.productName}</h1>
          <p className="mb-2 text-wrap">{product?.featuresDesc}</p>
          <button type="button" className="rounded-2xl bg-primary px-3 py-1 mr-1 text-white">
            hashtag1
          </button>
          <button type="button" className="rounded-2xl bg-primary px-3 py-1 mr-1 text-white">
            hashtag2
          </button>
          <button type="button" className="rounded-2xl bg-primary px-3 py-1 mr-1 text-white">
            hashtag3
          </button>
          <h2 className="text-xl font-bold">PRODUCT INFORMATION</h2>
          <ProductTable data={productInfo} headerBgColor="bg-secondary" />
        </div>
      </div>

      <RecommendSection />
    </div>
  );
}
