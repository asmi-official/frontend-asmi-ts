import type { GridColumn } from '../../components/Grid/DataGridCard';
import type { Product } from './type';

export const gridColumnsProduct: GridColumn<Product>[] = [
  {
    key: 'price',
    highlight: true,
    render: (value) => `Rp ${Number(value).toLocaleString('id-ID')}`,
  },
  {
    key: 'stock',
    render: (value, row) => `Stok: ${value} ${row.unit}`,
  },
  {
    key: 'category',
  },
];
