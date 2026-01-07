import { Chip, Avatar, Box, Typography } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import type { Column } from '../Table/DataTable';
import type { Order } from './types';

const getMarketplaceColor = (marketplace: Order['marketplace']) => {
  const colors = {
    shopee: '#EE4D2D',
    tokopedia: '#42B549',
    tiktok: '#000000',
    lazada: '#0F156D',
    bukalapak: '#E31E52',
    website: '#7C2D3E',
  };
  return colors[marketplace];
};

const getMarketplaceIcon = (marketplace: Order['marketplace']) => {
  const icons = {
    shopee: '🛍️',
    tokopedia: '🛒',
    tiktok: '🎵',
    lazada: '💙',
    bukalapak: '📦',
    website: '🌐',
  };
  return icons[marketplace];
};

const getStatusColor = (status: Order['status']) => {
  const colors: Record<Order['status'], 'default' | 'primary' | 'info' | 'success' | 'error'> = {
    pending: 'default',
    processing: 'primary',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
  };
  return colors[status];
};

const getStatusLabel = (status: Order['status']) => {
  const labels: Record<Order['status'], string> = {
    pending: 'Pending',
    processing: 'Diproses',
    shipped: 'Dikirim',
    delivered: 'Selesai',
    cancelled: 'Dibatalkan',
  };
  return labels[status];
};

const getPaymentStatusColor = (status: Order['payment_status']) => {
  const colors: Record<Order['payment_status'], 'default' | 'success' | 'error'> = {
    unpaid: 'default',
    paid: 'success',
    refunded: 'error',
  };
  return colors[status];
};

const getPaymentStatusLabel = (status: Order['payment_status']) => {
  const labels: Record<Order['payment_status'], string> = {
    unpaid: 'Belum Bayar',
    paid: 'Lunas',
    refunded: 'Refund',
  };
  return labels[status];
};

export const orderColumns: Column<Order>[] = [
  {
    id: 'order_number',
    label: 'Order ID',
    minWidth: 140,
    format: (value) => (
      <Typography variant="body2" fontWeight={600} color="primary.main">
        {String(value)}
      </Typography>
    ),
  },
  {
    id: 'marketplace',
    label: 'Platform',
    minWidth: 120,
    align: 'center',
    format: (value) => {
      const marketplace = value as Order['marketplace'];
      return (
        <Chip
          avatar={<Avatar sx={{ bgcolor: 'transparent', fontSize: 16 }}>{getMarketplaceIcon(marketplace)}</Avatar>}
          label={marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}
          size="small"
          sx={{
            bgcolor: `${getMarketplaceColor(marketplace)}15`,
            color: getMarketplaceColor(marketplace),
            fontWeight: 600,
            fontSize: 11,
          }}
        />
      );
    },
  },
  {
    id: 'customer_name',
    label: 'Customer',
    minWidth: 160,
    format: (value, row) => (
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {String(value)}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontSize={11}>
          {row.customer_phone}
        </Typography>
      </Box>
    ),
  },
  {
    id: 'product_name',
    label: 'Produk',
    minWidth: 200,
    format: (value, row) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <ShoppingBagIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {String(value)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Qty: {row.quantity}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 'total_price',
    label: 'Total',
    minWidth: 120,
    align: 'right',
    format: (value) => (
      <Typography variant="body2" fontWeight={700} color="primary.main">
        Rp {Number(value).toLocaleString('id-ID')}
      </Typography>
    ),
  },
  {
    id: 'payment_status',
    label: 'Pembayaran',
    minWidth: 120,
    align: 'center',
    format: (value) => {
      const status = value as Order['payment_status'];
      return (
        <Chip
          label={getPaymentStatusLabel(status)}
          color={getPaymentStatusColor(status)}
          size="small"
          sx={{ fontWeight: 600, fontSize: 11 }}
        />
      );
    },
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'center',
    format: (value) => {
      const status = value as Order['status'];
      return (
        <Chip
          label={getStatusLabel(status)}
          color={getStatusColor(status)}
          size="small"
          sx={{ fontWeight: 600, fontSize: 11 }}
        />
      );
    },
  },
  {
    id: 'order_date',
    label: 'Tanggal',
    minWidth: 110,
    format: (value) => (
      <Typography variant="caption" color="text.secondary">
        {new Date(String(value)).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </Typography>
    ),
  },
];
