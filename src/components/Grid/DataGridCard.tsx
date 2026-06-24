import { Box, Card, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight, VisibilityOutlined, EditOutlined, DeleteOutlineOutlined, LocalOfferOutlined } from '@mui/icons-material';
import React, { useState } from 'react';

export interface GridColumn<T> {
  key: keyof T;
  label?: string;
  highlight?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface ProductImage {
  url: string;
  alt?: string;
}

interface DataGridCardProps<T> {
  data: T[];
  columns: GridColumn<T>[];
  getImage?: (row: T) => ProductImage[] | string | undefined;
  getTitle: (row: T) => string;
  getSubTitle?: (row: T) => string | undefined;
  getStatus?: (row: T) => {
    label: string;
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onDiscount?: (row: T) => void;
}

function ImageSlider({ images, title }: { images: ProductImage[]; title: string }) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i - 1 + images.length) % images.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIndex((i) => (i + 1) % images.length); };

  return (
    <Box sx={{ width: '100%', aspectRatio: '4 / 3', position: 'relative', bgcolor: '#F9F9F9', overflow: 'hidden' }}>
      <Box
        component="img"
        src={images[index].url}
        alt={images[index].alt ?? title}
        sx={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.2s ease' }}
      />

      {images.length > 1 && (
        <>
          <IconButton onClick={prev} size="small" sx={{ position: 'absolute', left: 6, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: 'white', width: 26, height: 26, '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' } }}>
            <ChevronLeft sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton onClick={next} size="small" sx={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.4)', color: 'white', width: 26, height: 26, '&:hover': { bgcolor: 'rgba(0,0,0,0.65)' } }}>
            <ChevronRight sx={{ fontSize: 16 }} />
          </IconButton>
          <Box sx={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 0.5 }}>
            {images.map((_, i) => (
              <Box key={i} onClick={(e) => { e.stopPropagation(); setIndex(i); }} sx={{ width: i === index ? 18 : 6, height: 6, borderRadius: 3, bgcolor: i === index ? 'white' : 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.2s ease' }} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default function DataGridCard<T extends Record<string, unknown>>({
  data,
  columns,
  getImage,
  getTitle,
  getSubTitle,
  getStatus,
  onView,
  onEdit,
  onDelete,
  onDiscount,
}: DataGridCardProps<T>) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 2.5 }}>
      {data.map((row, index) => {
        const title = getTitle(row);
        const rawImage = getImage?.(row);
        const images: ProductImage[] = Array.isArray(rawImage) ? rawImage : rawImage ? [{ url: rawImage }] : [];
        const status = getStatus?.(row);
        const discount = row.discount as { percentage: number; name: string } | undefined;

        // kolom pertama = highlight (harga), sisanya info
        const [firstCol, ...restCols] = columns;

        return (
          <Card
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              bgcolor: '#fff',
              transition: 'all 0.2s ease',
              '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.09)' },
            }}
          >
            {/* Image */}
            {getImage && <ImageSlider images={images} title={title} />}

            {/* Body */}
            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>

              {/* Title + Status */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    fontWeight={700}
                    sx={{
                      fontSize: '0.95rem',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {title}
                  </Typography>
                  {getSubTitle && (
                    <Typography variant="caption" color="text.disabled" noWrap>
                      {getSubTitle(row)}
                    </Typography>
                  )}
                </Box>
                {status && (
                  <Chip label={status.label} color={status.color ?? 'default'} size="small" sx={{ flexShrink: 0, fontSize: 11, height: 22 }} />
                )}
              </Box>

              {/* Harga + Diskon */}
              {firstCol && (
                <Box>
                  {discount ? (
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                        <Typography fontWeight={800} sx={{ fontSize: '1.1rem', color: '#7C2D3E', lineHeight: 1 }}>
                          {(() => {
                            const raw = row[firstCol.key];
                            const price = typeof raw === 'number' ? raw : Number(raw);
                            const discounted = Math.round(price * (1 - discount.percentage / 100));
                            return `Rp ${discounted.toLocaleString('id-ID')}`;
                          })()}
                        </Typography>
                        <Chip label={`-${discount.percentage}%`} size="small" sx={{ bgcolor: '#7C2D3E', color: '#fff', fontWeight: 700, fontSize: 10, height: 18 }} />
                      </Box>
                      <Typography variant="caption" color="text.disabled" sx={{ textDecoration: 'line-through' }}>
                        {firstCol.render ? firstCol.render(row[firstCol.key], row) : String(row[firstCol.key] ?? '-')}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography fontWeight={800} sx={{ fontSize: '1.15rem', color: '#7C2D3E', lineHeight: 1 }}>
                      {firstCol.render ? firstCol.render(row[firstCol.key], row) : String(row[firstCol.key] ?? '-')}
                    </Typography>
                  )}
                </Box>
              )}

              {/* Info chips */}
              {restCols.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {restCols.map((col) => {
                    const val = col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '-');
                    return (
                      <Chip
                        key={String(col.key)}
                        label={val}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: 11, height: 22, borderColor: 'divider', color: 'text.secondary' }}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>

            {/* Action bar */}
            {(onView || onEdit || onDiscount || onDelete) && (
              <Box sx={{ display: 'flex', borderTop: '1px solid', borderColor: 'divider', bgcolor: '#fafafa' }}>
                {onView && (
                  <Tooltip title="View detail">
                    <IconButton size="small" onClick={() => onView(row)} sx={{ flex: 1, borderRadius: 0, py: 1, color: '#2563EB', '&:hover': { bgcolor: '#EFF6FF' } }}>
                      <VisibilityOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}
                {onEdit && (
                  <Tooltip title="Edit product">
                    <IconButton size="small" onClick={() => onEdit(row)} sx={{ flex: 1, borderRadius: 0, py: 1, color: '#D97706', borderLeft: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: '#FFFBEB' } }}>
                      <EditOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}
                {onDiscount && (
                  <Tooltip title="Create discount">
                    <IconButton size="small" onClick={() => onDiscount(row)} sx={{ flex: 1, borderRadius: 0, py: 1, color: '#7C2D3E', borderLeft: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: '#FDF5F6' } }}>
                      <LocalOfferOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip title="Delete product">
                    <IconButton size="small" onClick={() => onDelete(row)} sx={{ flex: 1, borderRadius: 0, py: 1, color: '#DC2626', borderLeft: '1px solid', borderColor: 'divider', '&:hover': { bgcolor: '#FEF2F2' } }}>
                      <DeleteOutlineOutlined sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}
          </Card>
        );
      })}
    </Box>
  );
}
