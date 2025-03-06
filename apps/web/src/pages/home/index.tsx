import main_banner from '@/assets/main_banner.png';
import { FilterForm } from '@/components/filter-form/FilterForm';
import { NewsCarousel } from '@/components/news-carousel';
import { SearchBar } from '@/components/search-bar/SearchBar';

import { ProductGrid } from './product-grid/ProductGrid';

export function HomePage() {
  return (
    <div className="container mx-auto">
      <div className="relative">
        <img src={main_banner} alt="main banner" className="w-full object-cover" />
        <SearchBar />
      </div>
      <NewsCarousel />
      <div className="flex gap-10">
        <div className="w-3/7">
          {/* <SearchBar /> */}
          <FilterForm
            onChange={(selectedOptions1, selectedOptions2) => {
              console.log(selectedOptions1, selectedOptions2);
            }}
          />
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
