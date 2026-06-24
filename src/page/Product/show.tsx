import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import type { Product } from '../../components/Product';
import DetailProduct from '../../components/Product/DetailProduct';

const DUMMY_PRODUCT: Product = {
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
  brand: 'ASMI',
  unit: 'pcs',
  description: 'Parfum ASMI Original dengan aroma yang khas dan tahan lama.',
  price: 150000,
  cost_price: 90000,
  stock: 25,
  min_stock: 5,
  qty_per_carton: 24,
  carton_stock: 10,
  status: 'active',
  created_at: '2024-01-10',
  discount: {
    name: 'Diskon Lebaran 2025',
    percentage: 20,
    start_date: '2025-03-20',
    end_date: '2025-04-05',
  },
};

function ShowProduct() {
  return (
    <DashboardLayout>
      <DetailProduct product={DUMMY_PRODUCT} />
    </DashboardLayout>
  );
}

export default ShowProduct;
