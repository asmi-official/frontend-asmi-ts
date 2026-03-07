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
    image: [
      {
        alt: 'Parfum ASMI Original 1',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 2',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 3',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
    ],
    category: 'Man',
    type_product: 'Premium',
    description: 'Parfum ASMI Original dengan aroma yang khas dan tahan lama.',
    price: 150000,
    stock: 25,
    status: 'active',
    created_at: '2024-01-10',
  },
  {
    id: '2',
    sku: 'ASMI-PRF-002',
    name: 'Parfum ASMI Premium',
    image: [
      {
        alt: 'Parfum ASMI Original 1',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 2',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 3',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
    ],
    category: 'Women',
    type_product: 'Premium',
    description: 'Parfum ASMI Premium dengan aroma mewah dan elegan.',
    price: 225000,
    stock: 3,
    status: 'active',
    created_at: '2024-02-05',
  },
  {
    id: '3',
    sku: 'ASMI-PRF-003',
    name: 'Parfum ASMI Exclusive',
    image: [
      {
        alt: 'Parfum ASMI Original 1',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 2',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 3',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
    ],
    category: 'Unisex',
    type_product: 'Exclusive',
    description: 'Parfum ASMI Exclusive dengan aroma unik dan eksklusif.',
    price: 300000,
    stock: 0,
    status: 'out_of_stock',
    created_at: '2024-03-12',
  },
  {
    id: '4',
    sku: 'ASMI-PRF-004',
    name: 'Parfum ASMI Signature',
    image: [
      {
        alt: 'Parfum ASMI Original 1',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 2',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 3',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
    ],
    category: 'Man',
    type_product: 'Signature',
    description: 'Parfum ASMI Signature dengan aroma khas yang memikat.',
    price: 275000,
    stock: 12,
    status: 'active',
    created_at: '2024-04-02',
  },
  {
    id: '5',
    sku: 'ASMI-PRF-005',
    name: 'Parfum ASMI Floral Touch',
    image: [
      {
        alt: 'Parfum ASMI Original 1',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 2',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
      {
        alt: 'Parfum ASMI Original 3',
        url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80',
      },
    ],
    category: 'Women',
    type_product: 'Floral',
    description: 'Parfum ASMI Floral Touch dengan aroma bunga yang segar.',
    price: 195000,
    stock: 7,
    status: 'active',
    created_at: '2024-05-18',
  },
];

type ViewMode = 'list' | 'grid';

function ListProduct() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <Box>
      <ProductHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
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
