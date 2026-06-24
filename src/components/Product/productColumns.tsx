import type { Product } from './types';
import type { Column } from '../Table/DataTable';
import { Typography, Avatar, IconButton, Box, Tooltip, Chip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import type { NavigateFunction } from 'react-router-dom';

export const createColumnsProduct = (navigate: NavigateFunction, onDiscount?: (product: Product) => void, onDelete?: (id: string) => void): Column<Product>[] => [
  {
    id: 'image',
    label: 'Image',
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
    label: 'Product Name',
    minWidth: 220,
    format: (value) => (
      <Typography variant="body2" fontWeight={500}>
        {String(value)}
      </Typography>
    ),
  },
  {
    id: 'description',
    label: 'Description',
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
    label: 'Category',
    minWidth: 150,
    format: (value) => <Typography variant="body2">{value ? String(value) : '-'}</Typography>,
  },
  {
    id: 'price',
    label: 'Selling Price',
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
    label: 'On-Hand Qty',
    minWidth: 100,
    align: 'center',
    format: (value) => <Typography variant="body2">{Number(value)}</Typography>,
  },
  {
    id: 'type_product',
    label: 'Product Type',
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
        active: 'Active',
        inactive: 'Inactive',
        out_of_stock: 'Out of Stock',
      };

      return (
        <Typography variant="body2">{map[value as NonNullable<Product['status']>]}</Typography>
      );
    },
  },
  {
    id: 'discount',
    label: 'Discount',
    minWidth: 100,
    align: 'center',
    format: (_value, row) => {
      const discount = row.discount as { percentage: number } | undefined;
      if (!discount) return <Typography variant="body2" color="text.disabled">-</Typography>;
      return <Chip label={`-${discount.percentage}%`} size="small" sx={{ bgcolor: '#7C2D3E', color: '#fff', fontWeight: 700, fontSize: 11, height: 20 }} />;
    },
  },
  {
    id: 'discount',
    label: 'Start Date',
    minWidth: 120,
    align: 'center',
    format: (_value, row) => {
      const discount = row.discount as { start_date: string } | undefined;
      if (!discount) return <Typography variant="body2" color="text.disabled">-</Typography>;
      return <Typography variant="body2">{new Date(discount.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</Typography>;
    },
  },
  {
    id: 'discount',
    label: 'Expire Date',
    minWidth: 120,
    align: 'center',
    format: (_value, row) => {
      const discount = row.discount as { end_date: string } | undefined;
      if (!discount) return <Typography variant="body2" color="text.disabled">-</Typography>;
      return <Typography variant="body2">{new Date(discount.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</Typography>;
    },
  },
  {
    id: 'created_at',
    label: 'Created Date',
    minWidth: 130,
    align: 'center',
    format: (value) => (value ? new Date(String(value)).toLocaleDateString('id-ID') : '-'),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 120,
    align: 'center',
    format: (_value, row) => {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Tooltip title="View detail">
            <IconButton size="small" aria-label="view" sx={{ color: '#2563EB' }} onClick={() => navigate(`/product/${row.id}`)}>
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit product">
            <IconButton size="small" aria-label="edit" sx={{ color: '#D97706' }} onClick={() => navigate(`/product/${row.id}/edit`)}>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Create discount">
            <IconButton size="small" aria-label="discount" sx={{ color: '#7C2D3E' }} onClick={() => onDiscount?.(row)}>
              <LocalOfferOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete product">
            <IconButton size="small" aria-label="delete" sx={{ color: '#DC2626' }} onClick={() => onDelete?.(row.id)}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      );
    },
  },
];
