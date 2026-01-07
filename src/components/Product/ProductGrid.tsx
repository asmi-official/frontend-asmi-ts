import DataGridCardContainer from '../Grid/DataGridCardContainer';
import { gridColumnsProduct } from './productGridColumns';
import type { Product } from './types';

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data }: ProductGridProps) {
  return (
    <DataGridCardContainer
      data={data}
      columns={gridColumnsProduct}
      searchKeys={['name', 'sku', 'brand', 'category']}
      getImage={(row) => row.image}
      getTitle={(row) => row.name}
      getSubTitle={(row) => row.sku}
      getStatus={(row) => {
        const minStock = row.min_stock ?? 0;

        return {
          label: row.stock <= minStock ? 'Stok Rendah' : 'Tersedia',
          color: row.stock <= minStock ? 'warning' : 'success',
        };
      }}
    />
  );
}
