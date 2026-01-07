import { Box, Typography, Stack, ToggleButtonGroup, ToggleButton, Chip } from '@mui/material';
import TableViewIcon from '@mui/icons-material/TableView';
import GridViewIcon from '@mui/icons-material/GridView';
import LockIcon from '@mui/icons-material/Lock';
import QrCode2Icon from '@mui/icons-material/QrCode2';

interface Props {
  viewMode: 'table' | 'grid';
  onChange: (v: 'table' | 'grid') => void;
}

export default function OrderSecretHeader({ viewMode, onChange }: Props) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg,#7C2D3E,#5a1f2e)',
        borderRadius: 3,
        p: 3,
        mb: 3,
      }}
    >
      <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <LockIcon sx={{ color: 'white' }} />
            <Typography variant="h4" color="white" fontWeight={700}>
              Pesan Rahasia
            </Typography>
            <Chip
              icon={<QrCode2Icon sx={{ color: 'white !important' }} />}
              label="QR Code"
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,.2)', color: 'white' }}
            />
          </Stack>
          <Typography color="rgba(255,255,255,.85)">
            Kelola pesan rahasia dan QR code pesanan
          </Typography>
        </Box>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={viewMode}
          onChange={(_, v) => v && onChange(v)}
          sx={{
            '& .MuiToggleButton-root': {
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
              },
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.25)',
                },
              },
            },
          }}
        >
          <ToggleButton value="table">
            <TableViewIcon sx={{ color: 'white' }} />
          </ToggleButton>
          <ToggleButton value="grid">
            <GridViewIcon sx={{ color: 'white' }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
