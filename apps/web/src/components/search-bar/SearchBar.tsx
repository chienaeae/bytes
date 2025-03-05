import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export function SearchBar() {
  return (
    <div className="absolute top-[63%] md:right-[13%] lg:right-[18%] max-w-2xl w-sm">
      <Input
        type="search"
        placeholder="SEARCH"
        className="w-full h-12 pl-5 rounded-full bg-muted/50 border-none placeholder:text-muted-foreground/50 placeholder:font-medium focus-visible:ring-2 transition-all duration-300"
      />
      <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50 cursor-pointer" />
    </div>
  );
}
