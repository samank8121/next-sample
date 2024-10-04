'use client';

import React, { useState } from 'react';
import Autocomplete from '@/components/auto-complete/auto-complete';
import { GetProductsType, ProductType } from '@/types/ProductType';
import commonQueryClient from '@/shared/getQueryClient';
import { queryKeys } from '@/shared/constant';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';
import { GET_PRODUCTS } from '@/shared/graphql/products';

export default function ProductAutoComplete() {
  const [filterValue, setFilterValue] = useState<string | undefined>();
  const { data, isLoading } = useQuery<GetProductsType>({
    queryKey: [queryKeys.allProducts],
    queryFn: async () =>
      request(process.env.NEXT_PUBLIC_API_ADDRESS!, GET_PRODUCTS),
  });
  if (isLoading) {
    return null;
  }
  const handleProductSelected = (p?: ProductType) => {
    if (p) {
      commonQueryClient.setQueryData([queryKeys.products], { products: [p] });
    } else if (!(filterValue && filterValue.length > 0)) {
      commonQueryClient.setQueryData([queryKeys.products], {
        products: data?.products,
      });
    }
  };

  const renderProductSuggestion = (p?: ProductType) => {
    return p ? p.caption : '';
  };

  const filterProducts = (p: ProductType, inputValue: string) => {
    setFilterValue(inputValue);
    return inputValue && inputValue.length > 0
      ? p.caption.toLowerCase().includes(inputValue.toLowerCase())
      : false;
  };

  return (
    <Autocomplete<ProductType>
      suggestions={data ? data.products : []}
      onSuggestionSelected={handleProductSelected}
      renderSuggestion={renderProductSuggestion}
      filterSuggestions={filterProducts}
    />
  );
}
