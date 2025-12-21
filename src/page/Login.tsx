import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Stack,
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  ArrowForwardRounded,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Background soft agar Paper terlihat kontras
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 420,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          // Shadow yang lebih halus & modern
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
          border: '1px solid #E2E8F0',
          bgcolor: '#ffffff',
        }}
      >
        {/* LOGO / HEADER */}
        <Box mb={4} textAlign="center">
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              color: '#1E293B',
              letterSpacing: '-0.02em',
              mb: 1,
            }}
          >
            Asmi<span style={{ color: '#1976d2' }}>System</span>
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 400 }}>
            Silakan masuk untuk akses dashboard
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@perusahaan.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlined sx={{ color: '#94A3B8', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5,
                  '&:hover fieldset': { borderColor: '#1976d2' },
                },
              }}
            />

            <Box>
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: '#94A3B8', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end" size="small">
                        {showPassword ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2.5,
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              disableElevation
              endIcon={<ArrowForwardRounded />}
              sx={{
                py: 1.6,
                borderRadius: 2.5,
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                },
              }}
            >
              Masuk ke Sistem
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }}>
            <Typography variant="caption" sx={{ color: '#CBD5E1', px: 1, fontWeight: 500 }}>
              ATAU
            </Typography>
          </Divider>

          <Typography variant="body2" textAlign="center" sx={{ color: '#64748B' }}>
            Belum bergabung sebagai mitra?{' '}
            <Typography
              component="span"
              variant="body2"
              sx={{
                color: '#1976d2',
                fontWeight: 700,
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': { opacity: 0.7 },
              }}
              onClick={() => navigate('/register')}
            >
              Daftar Sekarang
            </Typography>
          </Typography>
        </Box>

        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          sx={{ mt: 5, color: '#94A3B8', fontWeight: 500 }}
        >
          © 2025 Asmi System Management
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
