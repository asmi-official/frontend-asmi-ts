import { Box, Typography } from '@mui/material';

export default function ConfigHeader() {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #7C2D3E 0%, #5a1f2e 100%)',
        borderRadius: 3,
        p: 3,
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(124, 45, 62, 0.15)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            color: 'white',
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            mb: 1,
          }}
        >
          Konfigurasi Marketplace
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 400,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Kelola integrasi dengan berbagai marketplace untuk sinkronisasi order otomatis
        </Typography>
      </Box>
    </Box>
  );
}
