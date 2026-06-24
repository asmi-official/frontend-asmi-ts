export interface Product extends Record<string, unknown> {
  id: string;
  sku?: string; // kode produk
  name: string; // nama produk
  image?: ProductImage[]; // URL gambar
  category?: string; // kategori
  brand?: string; // merk
  description?: string; // deskripsi singkat

  stock: number; // stok tersedia
  min_stock?: number; // batas stok minimum
  price: number; // harga jual
  cost_price?: number; // harga modal
  unit?: string; // pcs, box, kg, dll

  qty_per_carton?: number; // isi per kardus
  carton_stock?: number; // jumlah kardus di gudang

  status?: 'active' | 'inactive' | 'out_of_stock';
  created_at?: string;
  updated_at?: string;

  discount?: {
    name: string;
    percentage: number;
    start_date: string;
    end_date: string;
  };
}

interface ProductImage {
  url: string;
  alt?: string;
}
