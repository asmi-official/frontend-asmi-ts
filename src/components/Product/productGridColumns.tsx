import type { GridColumn } from '../Grid/DataGridCard';
import type { Product } from './types';

export const gridColumnsProduct: GridColumn<Product>[] = [
  {
    key: 'price',
    highlight: true,
    render: (value) => `Rp ${Number(value).toLocaleString('id-ID')}`,
  },
  {
    key: 'stock',
    render: (value, row) => `On-Hand: ${value} ${row.unit ?? ''}`,
  },
  {
    key: 'category',
  },
];
