import { NavLink } from 'react-router';

import { ProductCard } from '@/components/card/ProductCard';

export default function RecommendSection() {
  // Sample data - replace with your actual data
  const items = Array(3).fill({
    title: 'XXXXXXXXXXXXX',
    description: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    contentWeight: 'XXX',
    bestBefore: 'XXXX-XX-XX',
    imageUrl: '/placeholder.svg',
  });
  return (
    <section className="mt-16">
      <h2 className="text-center font-medium text-xl mb-8">RECOMMENDATION</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <NavLink to={`/product/${index}`} key={index}>
            <ProductCard key={index} {...item} />
          </NavLink>
        ))}
      </div>
    </section>
  );
}
