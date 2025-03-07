import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  variant?: 'top' | 'bottom';
}

export function SearchBar({ value, onChange, onSearch, variant = 'top' }: SearchBarProps) {
  return (
    <div
      className={cn(
        'flex items-center content-around w-sm px-5 py-1 rounded-full border shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] ',
        variant === 'top' && 'absolute top-[63%] right-[13%] 2xl:right-[18%]',
        variant === 'bottom' && 'w-full mb-5'
      )}
    >
      <Search className="h-5 w-5 mr-3" onClick={() => onSearch?.(value)} />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch) {
            onSearch(value);
          }
        }}
        placeholder="search..."
        className="text-border !text-[16px] placeholder:text-gray-400 focus-visible:ring-0 shadow-none p-0"
      />
    </div>
  );
}
