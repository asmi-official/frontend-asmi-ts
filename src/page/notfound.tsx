import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #7C2D3E 0%, #5a1f2e 50%, #3d1420 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          borderRadius: '50%',
        },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* 404 Number */}
          <Typography
            sx={{
              fontSize: { xs: '120px', sm: '180px', md: '220px' },
              fontWeight: 800,
              color: 'rgba(255, 255, 255, 0.1)',
              lineHeight: 1,
              mb: -3,
              textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
              letterSpacing: '-0.05em',
            }}
          >
            404
          </Typography>

          {/* Main Content Box */}
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 4,
              p: { xs: 4, sm: 6 },
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Sad Icon using CSS */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '4px solid #7C2D3E',
                margin: '0 auto 24px',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: 12,
                  height: 12,
                  bgcolor: '#7C2D3E',
                  borderRadius: '50%',
                  top: 22,
                  left: 18,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: 12,
                  height: 12,
                  bgcolor: '#7C2D3E',
                  borderRadius: '50%',
                  top: 22,
                  right: 18,
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 18,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 40,
                  height: 20,
                  borderBottom: '4px solid #7C2D3E',
                  borderRadius: '0 0 40px 40px',
                }}
              />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#7C2D3E',
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.125rem' },
              }}
            >
              Oops! Halaman Tidak Ditemukan
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: 500,
                mx: 'auto',
                fontSize: { xs: '0.95rem', sm: '1rem' },
              }}
            >
              Sepertinya halaman yang Anda cari tidak ada atau telah dipindahkan. Mari kembali ke
              tempat yang aman!
            </Typography>

            {/* Action Buttons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="contained"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  bgcolor: '#7C2D3E',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(124, 45, 62, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#632432',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(124, 45, 62, 0.5)',
                  },
                }}
              >
                Ke Dashboard
              </Button>

              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{
                  borderColor: '#7C2D3E',
                  color: '#7C2D3E',
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  borderWidth: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: '#7C2D3E',
                    bgcolor: 'rgba(124, 45, 62, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Kembali
              </Button>
            </Box>
          </Box>

          {/* Bottom hint text */}
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 3,
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.875rem',
            }}
          >
            Jika masalah berlanjut, silakan hubungi administrator
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
