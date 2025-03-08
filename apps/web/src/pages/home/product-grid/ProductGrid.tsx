import { NavLink } from 'react-router';

import { ProductCard } from '@/components/card/ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/model/product';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const items = products.map((product) => ({
    id: product.productId,
    title: product.productName,
    description: product.featuresDesc,
    contentWeight: product.weightVolume,
    bestBefore: 'xxx',
    imageUrl: '',
  }));

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <NavLink to={`/product/${item.id}`} className="w-full h-full" key={item.id}>
            <ProductCard key={index} {...item} />
          </NavLink>
        ))}
      </div>
      <div className="flex justify-center my-5">
        <Button variant="ghost" className="text-white text-sm rounded-full bg-primary">
          SEE MORE
        </Button>
      </div>
    </div>
  );
}
