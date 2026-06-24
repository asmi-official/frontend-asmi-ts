import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../Table/DataTable';
import type { FilterItem } from '../Table/DataTable';
import { createColumnsProduct } from './productColumns';
import { filterConfigs } from './productFilterConfig';
import type { Product } from './types';
import DiscountDialog from './DiscountDialog';
import type { DiscountFormValues } from './DiscountDialog';
import { ConfirmDialog } from '../Global';

interface ProductTableProps {
  data: Product[];
}

export default function ProductTable({ data }: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setFilters] = useState<FilterItem[]>([]);
  const [discountProduct, setDiscountProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDiscountSubmit = (productId: string, values: DiscountFormValues) => {
    console.log('Diskon untuk produk:', productId, values);
  };

  const handleDelete = (id: string) => {
    console.log('Delete product:', id);
    // TODO: panggil API delete di sini
  };

  return (
    <>
      <DataTable<Product>
        columns={createColumnsProduct(navigate, setDiscountProduct, setDeleteId)}
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
