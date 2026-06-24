import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataGridCardContainer from '../Grid/DataGridCardContainer';
import { gridColumnsProduct } from './productGridColumns';
import type { Product } from './types';
import DiscountDialog from './DiscountDialog';
import type { DiscountFormValues } from './DiscountDialog';
import { ConfirmDialog } from '../Global';

interface ProductGridProps {
  data: Product[];
}

export default function ProductGrid({ data }: ProductGridProps) {
  const navigate = useNavigate();
  const [discountProduct, setDiscountProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDiscountSubmit = (productId: string, values: DiscountFormValues) => {
    console.log('Diskon untuk produk:', productId, values);
  };

  const handleDelete = (id: string) => {
    console.log('Delete product:', id);
    // TODO: panggil API delete di sini
  };

  return (
    <>
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
            label: row.stock <= minStock ? 'Low Stock' : 'Available',
            color: row.stock <= minStock ? 'warning' : 'success',
          };
        }}
        onView={(row) => navigate(`/product/${row.id}`)}
        onEdit={(row) => navigate(`/product/${row.id}/edit`)}
        onDiscount={(row) => setDiscountProduct(row)}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <DiscountDialog
        open={!!discountProduct}
        product={discountProduct}
        onClose={() => setDiscountProduct(null)}
        onSubmit={handleDiscountSubmit}
      />

      <ConfirmDialog
        open={!!deleteId}
        id={deleteId}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onClose={() => setDeleteId(null)}
      />
    </>
  );
}
