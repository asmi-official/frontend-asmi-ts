import { useNavigate } from 'react-router-dom';
import DataGridCardContainer from '../Grid/DataGridCardContainer';
import { gridColumnsProduct } from './productGridColumns';
import type { Product } from './types';

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data }: ProductGridProps) {
  const navigate = useNavigate();

  return (
    <DataGridCardContainer
      data={data}
      columns={gridColumnsProduct}
      searchKeys={['name', 'sku', 'brand', 'category']}
      getImage={(row) => row.image as { url: string; alt?: string }[] | undefined}
      getTitle={(row) => row.name}
      getSubTitle={(row) => row.sku}
      getStatus={(row) => {
        const minStock = row.min_stock ?? 0;
        return {
          label: row.stock <= minStock ? 'Stok Rendah' : 'Tersedia',
          color: row.stock <= minStock ? 'warning' : 'success',
        };
      }}
      onView={(row) => navigate(`/product/${row.id}`)}
      onEdit={(row) => navigate(`/product/${row.id}/edit`)}
      onDelete={(row) => console.log('Delete product:', row.id)}
    />
  );
}
