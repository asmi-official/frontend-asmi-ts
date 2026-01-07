import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import {
  OrderSecretHeader,
  OrderSecretTable,
  OrderSecretGrid,
} from '../../components/OrderSecret';
import type { OrderFromBE } from '../../components/OrderSecret';

const DUMMY_FROM_BE: OrderFromBE[] = [
  {
    id: 1,
    order_number: 'ORD-001',
    product_name: 'Parfum ASMI Original',
    recipient_name: 'Ahmad',
    secret_message: 'Semoga harimu wangi 🌸',
    qr_link: 'https://asmi.id/secret/ORD-001',
  },
];

function OrderSecretListContent() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const orders = useMemo(() => DUMMY_FROM_BE, []);

  return (
    <Box>
      <OrderSecretHeader viewMode={viewMode} onChange={setViewMode} />
      {viewMode === 'table' && <OrderSecretTable data={orders} />}
      {viewMode === 'grid' && <OrderSecretGrid data={orders} />}
    </Box>
  );
}

export default function OrderSecretList() {
  return (
    <DashboardLayout>
      <OrderSecretListContent />
    </DashboardLayout>
  );
}
