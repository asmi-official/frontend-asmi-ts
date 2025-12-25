import { Paper, Stack, Typography, Box, Divider, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PrintIcon from '@mui/icons-material/Print';
import { QRCodeCanvas } from 'qrcode.react';
import type { OrderFromBE } from './types';
import { printQr } from '../../utils/printQr';

interface Props {
  item: OrderFromBE;
}

export default function OrderSecretCard({ item }: Props) {
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography fontWeight={700}>{item.order_number}</Typography>
        <Typography>{item.product_name}</Typography>
        <Typography>{item.recipient_name}</Typography>

        <Divider />

        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <LockIcon fontSize="small" />
            <Typography variant="caption">Pesan Rahasia</Typography>
          </Stack>
          <Typography variant="body2" fontStyle="italic">
            "{item.secret_message}"
          </Typography>
        </Box>

        <Box textAlign="center">
          <QRCodeCanvas
            id={`qr-canvas-${item.order_number}`}
            value={item.qr_link}
            size={160}
            includeMargin
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={() => printQr(item.order_number)}
        >
          Print QR
        </Button>
      </Stack>
    </Paper>
  );
}
