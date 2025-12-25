import type { FilterConfig } from '../../components/Table/DataTableFilter';
import type { Product } from './type';

export const filterConfigs: FilterConfig<Product>[] = [
  {
    key: 'sku',
    label: 'SKU',
    type: 'text',
    operators: ['equals', 'contains', 'startsWith'],
  },
  {
    key: 'name',
    label: 'Nama Produk',
    type: 'text',
    operators: ['contains', 'startsWith', 'endsWith'],
  },
  {
    key: 'category',
    label: 'Kategori',
    type: 'select',
    options: [
      { label: 'Man', value: 'Man' },
      { label: 'Women', value: 'Women' },
      { label: 'Unisex', value: 'Unisex' },
    ],
  },
  {
    key: 'brand',
    label: 'Brand',
    type: 'text',
    operators: ['contains', 'startsWith', 'endsWith'],
  },
  {
    key: 'price',
    label: 'Harga',
    type: 'number',
    operators: ['equals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
  },
  {
    key: 'stock',
    label: 'Stok',
    type: 'number',
    operators: ['equals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Aktif', value: 'active' },
      { label: 'Nonaktif', value: 'inactive' },
      { label: 'Stok Habis', value: 'out_of_stock' },
    ],
  },
  {
    key: 'created_at',
    label: 'Tanggal Dibuat',
    type: 'date',
  },
];
