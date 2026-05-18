'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const TemplateSearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const appliedSearchValue = searchParams.get('searchValue') ?? '';
  const [value, setValue] = useState(appliedSearchValue);

  useEffect(() => {
    setValue(appliedSearchValue);
  }, [appliedSearchValue]);

  const syncSearchToUrl = (next: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = next.trim();
    if (trimmed) {
      params.set('searchValue', trimmed);
    } else {
      params.delete('searchValue');
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const submitSearch = () => {
    syncSearchToUrl(value);
  };

  const removeSearch = () => {
    setValue('');
    syncSearchToUrl('');
  };

  return (
    <div className="relative w-full max-w-md flex-1">
      {appliedSearchValue ? (
        <Button
          type="button"
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
          variant="ghost"
          onClick={removeSearch}
          aria-label="Clear search"
        >
          <X />
        </Button>
      ) : (
        <Button
          type="button"
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
          variant="ghost"
          onClick={submitSearch}
          aria-label="Search"
        >
          <Search />
        </Button>
      )}
      <Input
        placeholder="Search templates"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            submitSearch();
          }
        }}
        className="h-10"
      />
    </div>
  );
};
