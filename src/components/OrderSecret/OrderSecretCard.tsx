import { Paper, Stack, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PrintIcon from '@mui/icons-material/Print';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import { QRCodeCanvas } from 'qrcode.react';
import type { OrderFromBE } from './types';
import { printQr } from '../../utils/printQr';

interface Props {
  item: OrderFromBE;
}

export default function OrderSecretCard({ item }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 1.5,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 2,
          borderColor: 'primary.main',
        },
      }}
    >
      <Stack spacing={1}>
        {/* Header - Order Number & Product dalam satu baris */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            pb: 1,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" fontSize={9} sx={{ textTransform: 'uppercase' }}>
              Order
            </Typography>
            <Typography variant="body2" fontWeight={700} color="primary.main" fontSize={13}>
              {item.order_number}
            </Typography>
          </Box>
          <ShoppingBagIcon sx={{ fontSize: 16, color: 'primary.main', opacity: 0.7 }} />
        </Box>

        {/* Product & Recipient - Compact */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" fontSize={12} fontWeight={600} color="text.primary" noWrap>
            {item.product_name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" fontSize={11} color="text.secondary" noWrap>
              {item.recipient_name}
            </Typography>
          </Box>
        </Box>

        {/* Secret Message - Compact */}
        <Box
          sx={{
            p: 1,
            bgcolor: 'grey.50',
            borderRadius: 1,
            border: '1px dashed',
            borderColor: 'grey.300',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.3 }}>
            <LockIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
            <Typography variant="caption" fontSize={9} color="text.secondary" fontWeight={600}>
              SECRET
            </Typography>
          </Box>
          <Typography
            variant="body2"
            fontSize={11}
            fontStyle="italic"
            color="text.primary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            "{item.secret_message}"
          </Typography>
        </Box>

        {/* QR Code - Lebih kecil */}
        <Box
          textAlign="center"
          position="relative"
          sx={{
            p: 1,
            bgcolor: 'white',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <QRCodeCanvas
            id={`qr-canvas-${item.order_number}`}
            value={item.qr_link}
            size={256}
            level="H"
            style={{ display: 'none', position: 'absolute' }}
          />
          <QRCodeCanvas value={item.qr_link} size={110} level="H" />
        </Box>

        {/* Print Button - Compact */}
        <button
          onClick={() => printQr(item.order_number)}
          className="px-3 py-1.5 bg-primary text-white rounded text-xs font-semibold shadow hover:shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1"
        >
          <PrintIcon sx={{ fontSize: 14 }} />
          Print
        </button>
      </Stack>
    </Paper>
  );
}
