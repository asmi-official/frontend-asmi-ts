import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import OrderSecretHeader from './OrderSecretHeader';
import OrderSecretTable from './OrderSecretTable';
import OrderSecretGrid from './OrderSecretGrid';
import type { OrderFromBE } from './types';

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

export default function OrderSecretList() {
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
