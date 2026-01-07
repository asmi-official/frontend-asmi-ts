import { Box } from '@mui/material';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { OrderHeader, OrderTable } from '../../components/Order';
import type { Order } from '../../components/Order';

/* =======================
   DUMMY DATA
======================= */
const DUMMY_ORDERS: Order[] = [
  {
    id: '1',
    order_number: 'ORD-20240101-001',
    customer_name: 'Budi Santoso',
    customer_phone: '081234567890',
    marketplace: 'shopee',
    product_name: 'Parfum ASMI Original',
    quantity: 2,
    total_price: 300000,
    status: 'delivered',
    payment_status: 'paid',
    shipping_address: 'Jl. Merdeka No. 123, Jakarta Pusat',
    order_date: '2024-01-15',
    notes: 'Mohon dikemas dengan bubble wrap',
  },
  {
    id: '2',
    order_number: 'ORD-20240102-002',
    customer_name: 'Siti Nurhaliza',
    customer_phone: '082345678901',
    marketplace: 'tokopedia',
    product_name: 'Parfum ASMI Premium',
    quantity: 1,
    total_price: 225000,
    status: 'shipped',
    payment_status: 'paid',
    shipping_address: 'Jl. Sudirman No. 456, Bandung',
    order_date: '2024-01-16',
  },
  {
    id: '3',
    order_number: 'ORD-20240103-003',
    customer_name: 'Ahmad Zaki',
    customer_phone: '083456789012',
    marketplace: 'tiktok',
    product_name: 'Parfum ASMI Exclusive',
    quantity: 3,
    total_price: 900000,
    status: 'processing',
    payment_status: 'paid',
    shipping_address: 'Jl. Asia Afrika No. 789, Surabaya',
    order_date: '2024-01-17',
  },
  {
    id: '4',
    order_number: 'ORD-20240104-004',
    customer_name: 'Dewi Lestari',
    customer_phone: '084567890123',
    marketplace: 'lazada',
    product_name: 'Parfum ASMI Signature',
    quantity: 1,
    total_price: 275000,
    status: 'pending',
    payment_status: 'unpaid',
    shipping_address: 'Jl. Diponegoro No. 321, Yogyakarta',
    order_date: '2024-01-18',
  },
  {
    id: '5',
    order_number: 'ORD-20240105-005',
    customer_name: 'Rizky Pratama',
    customer_phone: '085678901234',
    marketplace: 'website',
    product_name: 'Parfum ASMI Floral Touch',
    quantity: 2,
    total_price: 390000,
    status: 'delivered',
    payment_status: 'paid',
    shipping_address: 'Jl. Gatot Subroto No. 654, Semarang',
    order_date: '2024-01-14',
  },
  {
    id: '6',
    order_number: 'ORD-20240106-006',
    customer_name: 'Linda Wijaya',
    customer_phone: '086789012345',
    marketplace: 'bukalapak',
    product_name: 'Parfum ASMI Original',
    quantity: 1,
    total_price: 150000,
    status: 'cancelled',
    payment_status: 'refunded',
    shipping_address: 'Jl. Ahmad Yani No. 987, Malang',
    order_date: '2024-01-13',
    notes: 'Pembeli membatalkan pesanan',
  },
];

function ListOrder() {
  // Calculate statistics
  const totalOrders = DUMMY_ORDERS.length;
  const pendingOrders = DUMMY_ORDERS.filter((o) => o.status === 'pending').length;
  const totalRevenue = DUMMY_ORDERS.filter((o) => o.payment_status === 'paid').reduce(
    (sum, o) => sum + o.total_price,
    0
  );

  const handleRefresh = () => {
    console.log('Refresh orders');
  };

  const handleExport = () => {
    console.log('Export orders');
  };

  return (
    <Box>
      <OrderHeader
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        totalRevenue={totalRevenue}
        onRefresh={handleRefresh}
        onExport={handleExport}
      />
      <OrderTable data={DUMMY_ORDERS} />
    </Box>
  );
}

export default function ListOrderPage() {
  return (
    <DashboardLayout>
      <ListOrder />
    </DashboardLayout>
  );
}
