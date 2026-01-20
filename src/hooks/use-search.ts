'use client';

import { useState, useCallback } from 'react';
import { useDebounce } from './use-debounce';
import { useSearchProducts } from './use-products';
import { SEARCH_DEBOUNCE_MS, MIN_SEARCH_CHARS } from '@/config/constants';

export function useProductSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const { data: results, isLoading } = useSearchProducts(
    debouncedQuery,
    5
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const isSearching = searchQuery !== debouncedQuery || isLoading;
  const showResults = debouncedQuery.length >= MIN_SEARCH_CHARS && results;

  return {
    searchQuery,
    results: results || [],
    isSearching,
    showResults,
    handleSearch,
    clearSearch,
  };
}
