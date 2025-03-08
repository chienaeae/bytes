import { useEffect, useRef, useState } from 'react';

import { FilterKey, SelectedFilterOptions } from '@/model/filter-option';
import { FilterOption } from '@/model/filter-option';
import { Product } from '@/model/product';
import { getProductsWithFilter } from '@/service/core/products-with-filter';

type FilterOptionParams = Record<FilterKey, string[]>;

interface UseProductsProps {
  searchTerm: string;
  selectedFilterOptions: SelectedFilterOptions;
}

export const useProducts = ({ searchTerm, selectedFilterOptions }: UseProductsProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const prevSearchTerm = useRef<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const filterOptionParams: FilterOptionParams = Object.entries(selectedFilterOptions).reduce(
          (acc, [key, value]) => {
            acc[key as FilterKey] = value.map((item) => item.id);
            return acc;
          },
          {} as FilterOptionParams
        );

        const response = await getProductsWithFilter(searchTerm, filterOptionParams);
        setProducts(response.products);

        // Only update filterOptions when searchTerm changes
        if (prevSearchTerm.current === null || prevSearchTerm.current !== searchTerm) {
          setFilterOptions(response.filterOptions);
          prevSearchTerm.current = searchTerm;
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('[useProducts] An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, selectedFilterOptions]);

  return { filterOptions, products, error, isLoading };
};
