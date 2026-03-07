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
  description: 'Parfum ASMI Original dengan aroma yang khas dan tahan lama.',
  price: 150000,
  stock: 25,
  status: 'active',
  created_at: '2024-01-10',
};

function ShowProduct() {
  return (
    <DashboardLayout>
      <DetailProduct product={DUMMY_PRODUCT} />
    </DashboardLayout>
  );
}

export default ShowProduct;
