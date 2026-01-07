export interface OrderFromBE extends Record<string, unknown> {
  id: number;
  order_number: string;
  product_name: string;
  recipient_name: string;
  secret_message: string;
  qr_link: string;
}
