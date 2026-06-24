export interface DropdownOption {
  id: string;
  value: string;
  label: string;
  description: string;
}

export interface FormProductValues {
  product_name: string;
  sku: string;
  category: string;
  product_type: string;
  description: string;
  selling_price: number | '';
  cogs: number | '';
  on_hand_qty: number | '';
  reorder_point: number | '';
  uom: string;
  brand: string;
  images: File[];
  qty_per_carton: number | '';
  carton_stock: number | '';
}


export const categoryOptions: DropdownOption[] = [
  { id: '1', value: 'Man',    label: 'Man',    description: 'Parfum khusus pria dengan aroma maskulin' },
  { id: '2', value: 'Women',  label: 'Women',  description: 'Parfum khusus wanita dengan aroma feminin' },
  { id: '3', value: 'Unisex', label: 'Unisex', description: 'Parfum netral cocok untuk semua gender' },
];

export const typeOptions: DropdownOption[] = [
  { id: '1', value: 'Premium',   label: 'Premium',   description: 'Kualitas terjangkau dengan aroma tahan lama' },
  { id: '2', value: 'Exclusive', label: 'Exclusive', description: 'Edisi terbatas dengan bahan baku pilihan' },
  { id: '3', value: 'Signature', label: 'Signature', description: 'Aroma khas ASMI yang menjadi ciri khas brand' },
  { id: '4', value: 'Floral',    label: 'Floral',    description: 'Aroma bunga segar yang ringan dan elegan' },
];

export const uomOptions = [
  { id: '1',  value: 'pcs',    label: 'Pcs (Pieces)' },
  { id: '2',  value: 'box',    label: 'Box' },
  { id: '3',  value: 'ctn',    label: 'Ctn (Carton)' },
  { id: '4',  value: 'pack',   label: 'Pack' },
  { id: '5',  value: 'set',    label: 'Set' },
  { id: '6',  value: 'unit',   label: 'Unit' },
  { id: '7',  value: 'kg',     label: 'Kg (Kilogram)' },
  { id: '8',  value: 'g',      label: 'G (Gram)' },
  { id: '9',  value: 'liter',  label: 'Liter' },
  { id: '10', value: 'ml',     label: 'ML (Mililiter)' },
  { id: '11', value: 'dozen',  label: 'Dozen' },
  { id: '12', value: 'roll',   label: 'Roll' },
  { id: '13', value: 'sheet',  label: 'Sheet' },
  { id: '14', value: 'bottle', label: 'Bottle' },
  { id: '15', value: 'can',    label: 'Can' },
  { id: '16', value: 'tube',   label: 'Tube' },
  { id: '17', value: 'sachet', label: 'Sachet' },
];
