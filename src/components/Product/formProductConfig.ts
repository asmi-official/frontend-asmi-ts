export interface DropdownOption {
  value: string;
  label: string;
  description: string;
}

export interface FormProductValues {
  name: string;
  sku: string;
  category: string;
  type_product: string;
  description: string;
  price: number | '';
  cost_price: number | '';
  stock: number | '';
  min_stock: number | '';
  unit: string;
  brand: string;
  images: File[];
}


export const categoryOptions: DropdownOption[] = [
  { value: 'Man', label: 'Man', description: 'Parfum khusus pria dengan aroma maskulin' },
  { value: 'Women', label: 'Women', description: 'Parfum khusus wanita dengan aroma feminin' },
  { value: 'Unisex', label: 'Unisex', description: 'Parfum netral cocok untuk semua gender' },
];

export const typeOptions: DropdownOption[] = [
  { value: 'Premium', label: 'Premium', description: 'Kualitas terjangkau dengan aroma tahan lama' },
  { value: 'Exclusive', label: 'Exclusive', description: 'Edisi terbatas dengan bahan baku pilihan' },
  { value: 'Signature', label: 'Signature', description: 'Aroma khas ASMI yang menjadi ciri khas brand' },
  { value: 'Floral', label: 'Floral', description: 'Aroma bunga segar yang ringan dan elegan' },
];
