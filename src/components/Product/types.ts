export interface Product extends Record<string, unknown> {
  id: string;
  sku?: string; // kode produk
  name: string; // nama produk
  image?: string; // URL gambar
  category?: string; // kategori
  brand?: string; // merk
  description?: string; // deskripsi singkat

  stock: number; // stok tersedia
  min_stock?: number; // batas stok minimum
  price: number; // harga jual
  cost_price?: number; // harga modal
  unit?: string; // pcs, box, kg, dll

  status?: 'active' | 'inactive' | 'out_of_stock';
  created_at?: string;
  updated_at?: string;
}
