import { FilterForm } from '@/components/filter-form/FilterForm';
import { Header } from '@/components/header/Header';
import { NewsCarousel } from '@/components/news-carousel';
import { SearchBar } from '@/components/search-bar/SearchBar';

import { ProductGrid } from './product-grid/ProductGrid';

export function Home() {
  return (
    <div className="min-w-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-screen-xl mx-auto">
        <NewsCarousel />
        <div className="container mx-auto px-4 flex">
          <div className="flex flex-col gap-4 w-2/5">
            <SearchBar />
            <FilterForm />
          </div>
          <ProductGrid />
        </div>
      </main>
    </div>
  );
}
