import { FilterForm } from '@/components/filter-form/FilterForm';
import { NewsCarousel } from '@/components/news-carousel';
import { SearchBar } from '@/components/search-bar/SearchBar';

import { ProductGrid } from './product-grid/ProductGrid';

export function HomePage() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <NewsCarousel />
      <div className="container mx-auto flex gap-10">
        <div className="flex flex-col gap-4 w-2/7">
          <SearchBar />
          <FilterForm />
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
