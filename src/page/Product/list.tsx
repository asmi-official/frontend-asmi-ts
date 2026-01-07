import { useState } from 'react';
import { Box } from '@mui/material';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { ProductHeader, ProductTable, ProductGrid } from '../../components/Product';
import type { Product } from '../../components/Product';

/* =======================
   DUMMY DATA
======================= */
const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'ASMI-PRF-001',
    name: 'Parfum ASMI Original',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl-49VAym8YiPR4J87lyDG3lnkJqya7V2WSw&s',
    category: 'Man',
    brand: 'ASMI',
    price: 150000,
    stock: 25,
    min_stock: 5,
    unit: 'botol',
    status: 'active',
    created_at: '2024-01-10',
  },
  {
    id: '2',
    sku: 'ASMI-PRF-002',
    name: 'Parfum ASMI Premium',
    image:
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    category: 'Women',
    brand: 'ASMI',
    price: 225000,
    stock: 3,
    min_stock: 5,
    unit: 'botol',
    status: 'active',
    created_at: '2024-02-05',
  },
  {
    id: '3',
    sku: 'ASMI-PRF-003',
    name: 'Parfum ASMI Exclusive',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3rgvTuG6OVJ0VRhLqdeKvo-a0UbyfR_3BAw&s',
    category: 'Unisex',
    brand: 'ASMI',
    price: 300000,
    stock: 0,
    min_stock: 5,
    unit: 'botol',
    status: 'out_of_stock',
    created_at: '2024-03-12',
  },
  {
    id: '4',
    sku: 'ASMI-PRF-004',
    name: 'Parfum ASMI Signature',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlC3TMC0eCSGh4WhAIRiz7XBciHUNyo7HsdQ&s',
    category: 'Man',
    brand: 'ASMI',
    price: 275000,
    stock: 12,
    min_stock: 5,
    unit: 'botol',
    status: 'active',
    created_at: '2024-04-02',
  },
  {
    id: '5',
    sku: 'ASMI-PRF-005',
    name: 'Parfum ASMI Floral Touch',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYrYrK1INCNYDDP7fM4EHTAGSNw2xkbeSMg&s',
    category: 'Women',
    brand: 'ASMI',
    price: 195000,
    stock: 7,
    min_stock: 5,
    unit: 'botol',
    status: 'active',
    created_at: '2024-05-18',
  },
];

type ViewMode = 'list' | 'grid';

function ListProduct() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  const handleAddStock = () => {
    console.log('Add stock');
  };

  const handleAddProduct = () => {
    console.log('Add product');
  };

  return (
    <Box>
      <ProductHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddStock={handleAddStock}
        onAddProduct={handleAddProduct}
      />

      {viewMode === 'list' && <ProductTable data={DUMMY_PRODUCTS} />}
      {viewMode === 'grid' && <ProductGrid data={DUMMY_PRODUCTS} />}
    </Box>
  );
}

export default function ListProductPage() {
  return (
    <DashboardLayout>
      <ListProduct />
    </DashboardLayout>
  );
}
