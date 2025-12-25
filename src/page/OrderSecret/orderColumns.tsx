import { Typography } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import type { Column } from '../../components/Table/DataTable';
import type { OrderFromBE } from './types';

export const orderColumns: Column<OrderFromBE>[] = [
  { id: 'order_number', label: 'Order', minWidth: 120 },
  { id: 'product_name', label: 'Produk', minWidth: 200 },
  { id: 'recipient_name', label: 'Penerima', minWidth: 160 },
  {
    id: 'secret_message',
    label: 'Pesan Rahasia',
    minWidth: 260,
    format: (value) => (
      <Typography variant="body2" sx={{ maxWidth: 240 }}>
        {String(value)}
      </Typography>
    ),
  },
  {
    id: 'qr_link',
    label: 'QR',
    minWidth: 140,
    align: 'center',
    format: (value) => <QRCodeCanvas value={String(value)} size={72} />,
  },
];
