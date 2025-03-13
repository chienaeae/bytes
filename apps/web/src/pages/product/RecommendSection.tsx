import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

import { ProductCard } from '@/components/card/ProductCard';
import { Image } from '@/model/image';
import { Product } from '@/model/product';
import { ProductCardProps } from '@/model/product-card';

import { useProducts } from '../home/useProducts';

export default function RecommendSection() {
  const { products } = useProducts({ searchTerm: '', selectedFilterOptions: {} });
  const [recommendations, setRecommendations] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    if (products.length === 0) return;

    const shuffled = [...products]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((product: Product) => ({
        id: product.productId,
        title: product.productName,
        description: product.featuresDesc,
        contentWeight: product.weightVolume || 'N/A',
        imageUrl:
          product.images.find((img: Image) => img.mainImage === '1')?.imageUrl ||
          product.images[0]?.imageUrl ||
          '/placeholder.svg',
      }));

    setRecommendations(shuffled);
  }, [products]);

  return (
    <section className="mt-16">
      <h2 className="text-center font-medium text-xl mb-8">RECOMMENDATION</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.length > 0 ? (
          recommendations.map((item) => (
            <NavLink to={`/product/${item.id}`} key={item.id}>
              <ProductCard {...item} />
            </NavLink>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No recommendations available</p>
        )}
      </div>
    </section>
  );
}
