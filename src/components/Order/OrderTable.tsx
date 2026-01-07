import { useState } from 'react';
import DataTable from '../Table/DataTable';
import type { FilterItem } from '../Table/DataTable';
import { orderColumns } from './orderColumns';
import { orderFilterConfigs } from './orderFilterConfig';
import type { Order } from './types';

interface OrderTableProps {
  data: Order[];
}

export default function OrderTable({ data }: OrderTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setFilters] = useState<FilterItem[]>([]);

  return (
    <DataTable<Order>
      columns={orderColumns}
      data={data}
      emptyMessage="Belum ada pesanan"
      enableFilter
      filterConfigs={orderFilterConfigs}
      onFiltersApplied={setFilters}
      enableSearch
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      searchPlaceholder="Cari order (ID, customer, produk)..."
      serverSide={false}
    />
  );
}
