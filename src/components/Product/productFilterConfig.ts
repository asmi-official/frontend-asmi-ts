import type { FilterConfig } from '../Table/DataTableFilter';
import type { Product } from './types';

export const filterConfigs: FilterConfig<Product>[] = [
  {
    key: 'sku',
    label: 'SKU',
    type: 'text',
    operators: ['equals', 'contains', 'startsWith'],
  },
  {
    key: 'name',
    label: 'Product Name',
    type: 'text',
    operators: ['contains', 'startsWith', 'endsWith'],
  },
  {
    key: 'description',
    label: 'Description',
    type: 'text',
    operators: ['contains', 'startsWith', 'endsWith'],
  },
  {
    key: 'category',
    label: 'Category',
    type: 'select',
    options: [
      { label: 'Man', value: 'Man' },
      { label: 'Women', value: 'Women' },
      { label: 'Unisex', value: 'Unisex' },
    ],
  },
  {
    key: 'price',
    label: 'Selling Price',
    type: 'number',
    operators: ['equals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
  },
  {
    key: 'stock',
    label: 'On-Hand Qty',
    type: 'number',
    operators: ['equals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
  },
  {
    key: 'type_product',
    label: 'Product Type',
    type: 'text',
    operators: ['equals', 'contains', 'startsWith'],
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Out of Stock', value: 'out_of_stock' },
    ],
  },
  {
    key: 'created_at',
    label: 'Created Date',
    type: 'date',
  },
];
