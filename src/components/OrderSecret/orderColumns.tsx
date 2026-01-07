import { Typography, IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import { QRCodeCanvas } from 'qrcode.react';
import type { Column } from '../../components/Table/DataTable';
import type { OrderFromBE } from './types';
import { printQr } from '../../utils/printQr';

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
    minWidth: 180,
    align: 'center',
    format: (value, row) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
        <QRCodeCanvas
          id={`qr-canvas-${row.order_number}`}
          value={String(value)}
          size={128}
          level="H"
          style={{ display: 'none' }}
        />
        <QRCodeCanvas
          value={String(value)}
          size={72}
          level="H"
        />
        <IconButton
          size="small"
          color="primary"
          onClick={() => printQr(row.order_number)}
          title="Print QR"
        >
          <PrintIcon fontSize="small" />
        </IconButton>
      </div>
    ),
  },
];
