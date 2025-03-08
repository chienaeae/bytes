import { useEffect, useState } from 'react';

import { FilterKey } from '@/model/filter-option';
import { FilterOptionItem } from '@/model/filter-option';
import { FilterOption } from '@/model/filter-option';
import { Product } from '@/model/product';
import { getProductsWithFilter } from '@/service/core/products-with-filter';

interface UseProductsProps {
  searchTerm: string;
  selectedFilterOptions: Partial<Record<FilterKey, FilterOptionItem[]>>;
}

export const useProducts = ({ searchTerm, selectedFilterOptions }: UseProductsProps) => {
  const [shouldUpdateOptions, setShouldUpdateOptions] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOption[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Should update fiter options only when searchTerm is changed
    setShouldUpdateOptions(true);
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const filterOptionParams: Record<FilterKey, string[]> = Object.entries(
        selectedFilterOptions
      ).reduce(
        (acc, [key, value]) => {
          acc[key as FilterKey] = value.map((item) => item.id);
          return acc;
        },
        {} as Record<FilterKey, string[]>
      );
      const response = await getProductsWithFilter(searchTerm, filterOptionParams);

      setProducts(response.products);

      if (shouldUpdateOptions) {
        setFilterOptions(response.filterOptions);
        setShouldUpdateOptions(false);
      }
    })()
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm, selectedFilterOptions, shouldUpdateOptions]);

  return { filterOptions, products, error, isLoading };
};
