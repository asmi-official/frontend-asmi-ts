import { Box, Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import React from 'react';

export interface GridColumn<T> {
  key: keyof T;
  label?: string;
  highlight?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface DataGridCardProps<T> {
  data: T[];
  columns: GridColumn<T>[];

  getImage?: (row: T) => string | undefined;
  getTitle: (row: T) => string;
  getSubTitle?: (row: T) => string | undefined;

  getStatus?: (row: T) => {
    label: string;
    color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  };
}

export default function DataGridCard<T extends Record<string, unknown>>({
  data,
  columns,
  getImage,
  getTitle,
  getSubTitle,
  getStatus,
}: DataGridCardProps<T>) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 2.5,
      }}
    >
      {data.map((row, index) => (
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
          {/* ================= IMAGE (FIXED RATIO) ================= */}
          {getImage && (
            <Box
              sx={{
                width: '100%',
                aspectRatio: '4 / 3',
                overflow: 'hidden',
                backgroundColor: '#F5F5F5',
              }}
            >
              {getImage(row) && (
                <CardMedia
                  component="img"
                  image={getImage(row)}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Box>
          )}

          <CardContent
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              fontWeight={600}
              noWrap
              sx={{
                mb: 0.5,
              }}
            >
              {getTitle(row)}
            </Typography>

            {getSubTitle && (
              <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                {getSubTitle(row)}
              </Typography>
            )}

            {/* Dynamic fields */}
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}
            >
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

            {/* Status always at bottom */}
            {getStatus && (
              <Box mt={1.5}>
                <Chip
                  size="small"
                  label={getStatus(row).label}
                  color={getStatus(row).color ?? 'default'}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
