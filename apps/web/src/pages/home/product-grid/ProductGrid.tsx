import { Button } from '@/components/ui/button';

import { ProductCard } from '.';

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {items.map((item, index) => (
          <ProductCard key={index} {...item} />
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
