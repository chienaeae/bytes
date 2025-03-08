import { useCallback, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

import main_banner from '@/assets/main_banner.png';
import { FilterForm } from '@/components/filter-form/FilterForm';
import { NewsCarousel } from '@/components/news-carousel';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { FilterKey, FilterOptionItem, SelectedFilterOptions } from '@/model/filter-option';

import { ProductGrid } from './product-grid/ProductGrid';
import { useProducts } from './useProducts';

const initialFilterOptions: SelectedFilterOptions = {};

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 250);
  const filterFormRef = useRef<HTMLDivElement>(null);
  const [selectedFilterOptions, setSelectedFilterOptions] =
    useState<SelectedFilterOptions>(initialFilterOptions);

  const handleSearch = useCallback((keyword: string, shouldScroll = false) => {
    setSearchTerm(keyword);
    if (shouldScroll && filterFormRef.current) {
      const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
      const targetOffset =
        filterFormRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetOffset, behavior: 'smooth' });
    }
  }, []);

  const handleSelectedFilterOptionsChange = useCallback(
    (key: FilterKey, newValues: FilterOptionItem[]) => {
      setSelectedFilterOptions((prev) => ({ ...prev, [key]: newValues }));
    },
    []
  );

  const { filterOptions, products } = useProducts({
    searchTerm: debouncedSearchTerm,
    selectedFilterOptions,
  });

  console.log('products', products);

  return (
    <div className="container mx-auto">
      <div className="relative bg-white p-10 flex items-center gap-16 2xl:gap-28 break-words">
        <img src={main_banner} alt="main banner" className="w-[50%] object-cover" />
        <div>
          <h1 className="font-bold text-5xl dark:text-black text-balance">
            Bridging gaps, Building sustainable food systems
          </h1>
          <p className="text-xl mb-6 mt-3 dark:text-black">
            Unlocking the full potential of ingredients and partnerships
          </p>
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            onSearch={() => handleSearch(searchTerm, true)}
          />
        </div>
      </div>
      <NewsCarousel />
      <div className="flex gap-10">
        <div className="w-3/7" ref={filterFormRef}>
          <SearchBar
            value={searchTerm}
            onChange={handleSearch}
            onSearch={() => handleSearch(searchTerm, true)}
            isBottom={true}
          />
          <FilterForm
            filterOptions={filterOptions}
            value={selectedFilterOptions}
            onChange={handleSelectedFilterOptionsChange}
            onClearAll={() => setSelectedFilterOptions(initialFilterOptions)}
          />
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
