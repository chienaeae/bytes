import { NavLink } from 'react-router';

import { ProductCard } from '@/components/card/ProductCard';
import { Button } from '@/components/ui/button';

export function ProductGrid() {
  // Sample data - replace with your actual data
  const items = Array(6).fill({
    title: 'XXXXXXXXXXXXX',
    description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    contentWeight: 'XXX',
    bestBefore: 'XXXX-XX-XX',
    imageUrl: '/placeholder.svg',
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {items.map((item, index) => (
          <NavLink to={`/product/${index}`} className="w-full h-full">
            <ProductCard key={index} {...item} />
          </NavLink>
        ))}
      </div>
      <div className="flex justify-center">
        <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
          SEE MORE
        </Button>
      </div>
    </div>
  );
}
