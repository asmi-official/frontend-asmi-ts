import { Box, Card, CardContent, Typography, Chip, IconButton, Divider, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight, VisibilityOutlined, EditOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
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
}

function ImageSlider({ images, title }: { images: ProductImage[]; title: string }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <Box sx={{ width: '100%', aspectRatio: '4 / 3', position: 'relative', bgcolor: '#F5F5F5', overflow: 'hidden' }}>
      <Box
        component="img"
        src={images[index].url}
        alt={images[index].alt ?? title}
        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />

      {images.length > 1 && (
        <>
          <IconButton
            onClick={prev}
            size="small"
            sx={{
              position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.35)', color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
              width: 28, height: 28,
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
          <IconButton
            onClick={next}
            size="small"
            sx={{
              position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.35)', color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
              width: 28, height: 28,
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>

          {/* Dots */}
          <Box sx={{ position: 'absolute', bottom: 6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 0.5 }}>
            {images.map((_, i) => (
              <Box
                key={i}
                onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                sx={{
                  width: i === index ? 16 : 6, height: 6,
                  borderRadius: 3,
                  bgcolor: i === index ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              />
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
}: DataGridCardProps<T>) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 2.5,
      }}
    >
      {data.map((row, index) => {
        const title = getTitle(row);
        const rawImage = getImage?.(row);
        const images: ProductImage[] = Array.isArray(rawImage)
          ? rawImage
          : rawImage
          ? [{ url: rawImage }]
          : [];

        return (
          <Card
            key={index}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
              },
            }}
          >
            {getImage && <ImageSlider images={images} title={title} />}

            <CardContent
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography fontWeight={600} noWrap sx={{ mb: 0.5 }}>
                {title}
              </Typography>

              {getSubTitle && (
                <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                  {getSubTitle(row)}
                </Typography>
              )}

              <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {columns.map((col) => {
                  const value = row[col.key];
                  return (
                    <Typography
                      key={String(col.key)}
                      variant="body2"
                      fontWeight={col.highlight ? 600 : 400}
                      color={col.highlight ? '#7C2D3E' : 'text.secondary'}
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {col.render ? col.render(value, row) : String(value ?? '-')}
                    </Typography>
                  );
                })}
              </Box>

              {getStatus && (
                <Box mt={1.5}>
                  <Chip size="small" label={getStatus(row).label} color={getStatus(row).color ?? 'default'} />
                </Box>
              )}

              {(onView || onEdit || onDelete) && (
                <>
                  <Divider sx={{ mt: 1.5, mb: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    {onView && (
                      <Tooltip title="Lihat Detail">
                        <IconButton size="small" onClick={() => onView(row)}>
                          <VisibilityOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onEdit && (
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => onEdit(row)}>
                          <EditOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip title="Hapus">
                        <IconButton size="small" color="error" onClick={() => onDelete(row)}>
                          <DeleteOutlineOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
