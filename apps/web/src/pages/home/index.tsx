import { useRef, useState } from 'react';

import main_banner from '@/assets/main_banner.png';
import { FilterForm } from '@/components/filter-form/FilterForm';
import { NewsCarousel } from '@/components/news-carousel';
import { SearchBar } from '@/components/search-bar/SearchBar';

import { ProductGrid } from './product-grid/ProductGrid';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const filterFormRef = useRef<HTMLDivElement>(null);

  const handleSearch = (keyword: string, shouldScroll = false) => {
    setSearchTerm(keyword);

    if (shouldScroll && filterFormRef.current) {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetOffset =
        filterFormRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="relative">
        <img src={main_banner} alt="main banner" className="w-full object-cover" />
        <SearchBar
          value={searchTerm}
          onChange={handleSearch}
          onSearch={() => handleSearch(searchTerm, true)}
          variant="top"
        />
      </div>
      <NewsCarousel />
      <div className="flex gap-10">
        <div className="w-3/7" ref={filterFormRef}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={() => handleSearch(searchTerm, true)}
            variant="bottom"
          />
          <FilterForm
            onChange={(selectedOption) => {
              console.log(selectedOption);
            }}
          />
        </div>
        <ProductGrid />
      </div>
    </div>
  );
}
