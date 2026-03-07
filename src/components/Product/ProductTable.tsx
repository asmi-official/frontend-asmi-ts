import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../Table/DataTable';
import type { FilterItem } from '../Table/DataTable';
import { createColumnsProduct } from './productColumns';
import { filterConfigs } from './productFilterConfig';
import type { Product } from './types';

interface ProductTableProps {
  data: Product[];
}

export default function ProductTable({ data }: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setFilters] = useState<FilterItem[]>([]);
  const navigate = useNavigate();

  return (
    <DataTable<Product>
      columns={createColumnsProduct(navigate)}
      data={data}
      emptyMessage="Belum ada produk"
      enableFilter
      filterConfigs={filterConfigs}
      onFiltersApplied={setFilters}
      enableSearch
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari produk (nama, SKU, brand)..."
      serverSide={false}
    />
  );
}
