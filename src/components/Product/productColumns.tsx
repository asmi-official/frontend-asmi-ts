import type { Product } from './types';
import type { Column } from '../Table/DataTable';
import { Typography, Avatar, IconButton, Box } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import type { NavigateFunction } from 'react-router-dom';

export const createColumnsProduct = (navigate: NavigateFunction): Column<Product>[] => [
  {
    id: 'image',
    label: 'Gambar',
    minWidth: 80,
    align: 'center',
    format: (value, row) => {
      const images = value as { url: string; alt?: string }[] | undefined;
      const firstImage = images?.[0];
      const name = row.name;

      return firstImage ? (
        <Avatar src={firstImage.url} alt={firstImage.alt ?? name} sx={{ width: 36, height: 36 }} variant="rounded" />
      ) : (
        <Avatar sx={{ width: 36, height: 36 }} variant="rounded">
          {name.charAt(0)}
        </Avatar>
      );
    },
  },
  {
    id: 'sku',
    label: 'SKU',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'name',
    label: 'Nama Produk',
    minWidth: 220,
    format: (value) => (
      <Typography variant="body2" fontWeight={500}>
        {String(value)}
      </Typography>
    ),
  },
  {
    id: 'description',
    label: 'Deskripsi',
    minWidth: 220,
    format: (value) => (
      <Typography
        variant="body2"
        fontWeight={500}
        title={String(value)}
        sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}
      >
        {String(value)}
      </Typography>
    ),
  },
  {
    id: 'category',
    label: 'Kategori',
    minWidth: 150,
    format: (value) => <Typography variant="body2">{value ? String(value) : '-'}</Typography>,
  },
  {
    id: 'price',
    label: 'Harga',
    minWidth: 130,
    align: 'right',
    format: (value) => {
      const price = Number(value);
      return (
        <Typography variant="body2" fontWeight={500}>
          Rp {price.toLocaleString('id-ID')}
        </Typography>
      );
    },
  },
  {
    id: 'stock',
    label: 'Stok',
    minWidth: 100,
    align: 'center',
    format: (value) => <Typography variant="body2">{Number(value)}</Typography>,
  },
  {
    id: 'type_product',
    label: 'Tipe Produk',
    minWidth: 100,
    align: 'center',
    format: (value) => <Typography variant="body2">{String(value)}</Typography>,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'center',
    format: (value) => {
      if (!value) return '-';

      const map: Record<NonNullable<Product['status']>, string> = {
        active: 'Aktif',
        inactive: 'Nonaktif',
        out_of_stock: 'Stok Habis',
      };

      return (
        <Typography variant="body2">{map[value as NonNullable<Product['status']>]}</Typography>
      );
    },
  },
  {
    id: 'created_at',
    label: 'Dibuat',
    minWidth: 130,
    align: 'center',
    format: (value) => (value ? new Date(String(value)).toLocaleDateString('id-ID') : '-'),
  },
  {
    id: 'actions',
    label: 'Aksi',
    minWidth: 120,
    align: 'center',
    format: (_value, row) => {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <IconButton
            size="small"
            aria-label="view"
            onClick={() => {
              navigate(`/product/${row.id}`);
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            aria-label="edit"
            onClick={() => {
              navigate(`/product/${row.id}/edit`);
            }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            aria-label="delete"
            onClick={() => {
              console.log('Delete product:', row.id);
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      );
    },
  },
];
