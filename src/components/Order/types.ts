export interface Order extends Record<string, unknown> {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  marketplace: 'shopee' | 'tokopedia' | 'tiktok' | 'lazada' | 'bukalapak' | 'website';
  product_name: string;
  quantity: number;
  total_price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'unpaid' | 'paid' | 'refunded';
  shipping_address: string;
  order_date: string;
  notes?: string;
}

export type OrderStatus = Order['status'];
export type PaymentStatus = Order['payment_status'];
export type Marketplace = Order['marketplace'];
