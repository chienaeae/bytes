import { NavLink } from 'react-router';

import { ProductCard } from '@/components/card/ProductCard';
import { Button } from '@/components/ui/button';

export function ProductGrid() {
  const items = Array(6).fill({
    title: 'XXXXXXXXXXXXX',
    description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    contentWeight: 'XXX',
    bestBefore: 'XXXX-XX-XX',
    imageUrl: '/placeholder.svg',
  });

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <NavLink to={`/product/${index}`} className="w-full h-full">
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
