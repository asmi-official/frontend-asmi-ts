import { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import TableViewIcon from '@mui/icons-material/TableView';
import GridViewIcon from '@mui/icons-material/GridView';
import PrintIcon from '@mui/icons-material/Print';
import LockIcon from '@mui/icons-material/Lock';
import QrCode2Icon from '@mui/icons-material/QrCode2';

import { QRCodeCanvas } from 'qrcode.react';
import DataTable from '../../components/Table/DataTable';
import type { Column } from '../../components/Table/DataTable';

interface OrderFromBE extends Record<string, unknown> {
  id: number;
  order_number: string;
  product_name: string;
  recipient_name: string;
  secret_message: string;
  qr_link: string;
}

const DUMMY_FROM_BE: OrderFromBE[] = [
  {
    id: 1,
    order_number: 'ORD-001',
    product_name: 'Parfum ASMI Original',
    recipient_name: 'Ahmad',
    secret_message: 'Semoga harimu wangi seperti parfum ini 🌸',
    qr_link: 'https://asmi.id/secret/ORD-001',
  },
  {
    id: 2,
    order_number: 'ORD-002',
    product_name: 'Parfum ASMI Premium',
    recipient_name: 'Aisyah',
    secret_message: 'Hadiah kecil penuh makna 💝',
    qr_link: 'https://asmi.id/secret/ORD-002',
  },
];

/* =======================
   TABLE COLUMNS
======================= */
const columns: Column<OrderFromBE>[] = [
  {
    id: 'order_number',
    label: 'Order',
    minWidth: 120,
  },
  {
    id: 'product_name',
    label: 'Produk',
    minWidth: 200,
  },
  {
    id: 'recipient_name',
    label: 'Penerima',
    minWidth: 160,
  },
  {
    id: 'secret_message',
    label: 'Pesan Rahasia',
    minWidth: 260,
    format: (value) => (
      <Typography variant="body2" sx={{ maxWidth: 240 }}>
        {String(value)}
      </Typography>
    ),
  },
  {
    id: 'qr_link',
    label: 'QR',
    minWidth: 140,
    align: 'center',
    format: (value) => <QRCodeCanvas value={String(value)} size={72} />,
  },
];

/* =======================
   MAIN COMPONENT
======================= */
export default function OrderSecretList() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const orders = useMemo<OrderFromBE[]>(() => DUMMY_FROM_BE, []);

  const handlePrint = (orderNumber: string) => {
    // Ambil element canvas berdasarkan ID unik tadi
    const canvas = document.getElementById(`qr-canvas-${orderNumber}`) as HTMLCanvasElement;

    if (!canvas) {
      alert('QR Code tidak ditemukan');
      return;
    }

    // Ubah canvas menjadi data URL (Gambar PNG)
    const qrImageData = canvas.toDataURL('image/png');

    const win = window.open('', '_blank');
    if (!win) return;

    win.document.write(`
    <html>
      <head>
        <title>Print QR - ${orderNumber}</title>
        <style>
          body { 
            margin: 0; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .container { text-align: center; border: 1px solid #eee; padding: 40px; border-radius: 20px; }
          img { width: 250px; height: 250px; margin-bottom: 20px; }
          .order-id { font-size: 24px; font-weight: bold; color: #7C2D3E; margin: 0; }
          .label { color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <img src="${qrImageData}" />
          <p class="label">Order Number</p>
          <p class="order-id">${orderNumber}</p>
        </div>
        <script>
          // Tunggu gambar dimuat baru print
          window.onload = function() {
            window.print();
            window.onafterprint = function() { window.close(); };
          };
        </script>
      </body>
    </html>
  `);

    win.document.close();
  };

  return (
    <Box>
      {/* ========== IMPROVED HEADER ========== */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #7C2D3E 0%, #5a1f2e 100%)',
          borderRadius: 3,
          p: 3,
          mb: 3,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(74, 20, 140, 0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '50%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -40,
            left: -40,
            width: 180,
            height: 180,
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '50%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            position: 'relative',
            zIndex: 1,
            gap: 3,
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <LockIcon sx={{ color: 'white', fontSize: 22 }} />
                </Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    color: 'white',
                    letterSpacing: '-0.5px',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                  }}
                >
                  Pesan Rahasia
                </Typography>
              </Box>
              <Chip
                icon={<QrCode2Icon sx={{ fontSize: 16, color: 'white !important' }} />}
                label="QR Code"
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              />
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400,
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}
            >
              Kelola pesan rahasia dan QR code untuk setiap pesanan pelanggan
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              flexShrink: 0,
              width: { xs: '100%', md: 'auto' },
              justifyContent: { xs: 'flex-end', md: 'flex-start' },
            }}
          >
            <ToggleButtonGroup
              size="small"
              exclusive
              value={viewMode}
              onChange={(_, value) => value && setViewMode(value)}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
                '& .MuiToggleButton-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  border: 'none',
                  borderRadius: '8px !important',
                  px: 2,
                  py: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    },
                  },
                },
              }}
            >
              <ToggleButton value="table">
                <TableViewIcon fontSize="small" />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridViewIcon fontSize="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Box>
      </Box>
      {/* ========== END IMPROVED HEADER ========== */}

      {/* =======================
          TABLE VIEW
      ======================= */}
      {viewMode === 'table' && (
        <DataTable<OrderFromBE>
          columns={columns}
          data={orders}
          emptyMessage="Belum ada data"
          enableSearch
          searchPlaceholder="Cari order, produk, penerima..."
          serverSide={false}
        />
      )}

      {/* =======================
          GRID VIEW - IMPROVED
      ======================= */}
      {viewMode === 'grid' && (
        <Grid container spacing={3}>
          {orders.map((item) => (
            <Grid key={item.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 3,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                  '&:hover': {
                    boxShadow: '0 12px 32px rgba(74, 20, 140, 0.12)',
                    transform: 'translateY(-6px)',
                    borderColor: '#7C2D3E',
                  },
                }}
              >
                <Stack spacing={2.5}>
                  {/* Order Info */}
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: '16px',
                      background:
                        'linear-gradient(135deg, rgba(124, 45, 62, 0.08) 0%, rgba(90, 31, 46, 0.04) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(124, 45, 62, 0.15)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: '#7C2D3E',
                        opacity: 0.7,
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        mb: 0.5,
                      }}
                    >
                      ORDER NUMBER
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        color: '#5a1f2e',
                        lineHeight: 1,
                        fontFamily: 'monospace',
                      }}
                    >
                      {item.order_number}
                    </Typography>
                  </Box>
                  {/* Product & Recipient */}
                  <Stack spacing={1.5}>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        PRODUK
                      </Typography>
                      <Typography fontWeight={600}>{item.product_name}</Typography>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        PENERIMA
                      </Typography>
                      <Typography fontWeight={600}>{item.recipient_name}</Typography>
                    </Box>
                  </Stack>
                  <Divider />
                  {/* Secret Message */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background: '#fafafa',
                      border: '1px dashed #e0e0e0',
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                      <LockIcon sx={{ fontSize: 16, color: '#7C2D3E' }} />
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        PESAN RAHASIA
                      </Typography>
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        color: 'text.primary',
                      }}
                    >
                      "{item.secret_message}"
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex', // Memastikan container adalah flex
                      justifyContent: 'center', // Memusatkan QR secara Horizontal
                      alignItems: 'center', // Memusatkan QR secara Vertikal
                      width: '100%', // Mengambil lebar penuh kartu
                      p: 2,
                      borderRadius: 2,
                      background: 'white',
                      border: '2px solid rgba(124, 45, 62, 0.1)',
                    }}
                  >
                    <QRCodeCanvas
                      value={item.qr_link}
                      size={160}
                      includeMargin={true}
                      // Tambahkan properti style ini agar selector di handlePrint bisa menemukannya
                      id={`qr-canvas-${item.order_number}`}
                    />
                  </Box>
                  {/* Print Button */}
                  <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    onClick={() => handlePrint(item.order_number)}
                    sx={{
                      background: 'linear-gradient(135deg, #7C2D3E 0%, #5a1f2e 100%)',
                      color: 'white',
                      fontWeight: 600,
                      textTransform: 'none',
                      py: 1.2,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(90, 31, 46, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #96374B 0%, #72273a 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(90, 31, 46, 0.45)',
                      },
                    }}
                  >
                    Print QR Code
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
