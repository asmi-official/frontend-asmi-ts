import type { FilterConfig } from '../../components/Table/DataTable';

export const orderFilterConfigs: FilterConfig[] = [
  {
    id: 'marketplace',
    label: 'Platform',
    type: 'select',
    options: [
      { value: 'shopee', label: '🛍️ Shopee' },
      { value: 'tokopedia', label: '🛒 Tokopedia' },
      { value: 'tiktok', label: '🎵 TikTok Shop' },
      { value: 'lazada', label: '💙 Lazada' },
      { value: 'bukalapak', label: '📦 Bukalapak' },
      { value: 'website', label: '🌐 Website' },
    ],
  },
  {
    id: 'status',
    label: 'Status Order',
    type: 'select',
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'processing', label: 'Diproses' },
      { value: 'shipped', label: 'Dikirim' },
      { value: 'delivered', label: 'Selesai' },
      { value: 'cancelled', label: 'Dibatalkan' },
    ],
  },
  {
    id: 'payment_status',
    label: 'Status Pembayaran',
    type: 'select',
    options: [
      { value: 'unpaid', label: 'Belum Bayar' },
      { value: 'paid', label: 'Lunas' },
      { value: 'refunded', label: 'Refund' },
    ],
  },
];
