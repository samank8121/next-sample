'use client';

import React, { useState } from 'react';
import Autocomplete from '@/components/auto-complete/auto-complete';
import { ProductType } from '@/types/ProductType';
import { Products } from '@/shared/data/products';
import commonQueryClient from '@/shared/getQueryClient';
import { queryKeys } from '@/shared/constant';

export default function ProductAutoComplete() {
  const [filterValue,setFilterValue]=useState<string|undefined>();
  const handleProductSelected = (p?: ProductType) => {
    if(p)
    {
      commonQueryClient.setQueryData([queryKeys.products], { products: [p] });
    }
    else if(!(filterValue && filterValue.length > 0))
    {
      commonQueryClient.setQueryData([queryKeys.products], { products: Products });
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
      suggestions={Products}
      onSuggestionSelected={handleProductSelected}
      renderSuggestion={renderProductSuggestion}
      filterSuggestions={filterProducts}
    />
  );
}
