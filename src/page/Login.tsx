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
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  LoginOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const darkRedTheme = createTheme({
  palette: {
    primary: {
      main: '#8b0000',
      dark: '#5f0000',
      light: '#b22222',
    },
  },
  shape: { borderRadius: 12 },
});

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
    <ThemeProvider theme={darkRedTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 6,
              boxShadow: '0 25px 50px -12px rgba(139, 0, 0, 0.15)',
              border: '1px solid rgba(139, 0, 0, 0.1)',
              bgcolor: '#ffffff',
            }}
          >
            {/* LOGO / HEADER */}
            <Box mb={4} textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'rgba(139, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 16px rgba(139, 0, 0, 0.1)',
                }}
              >
                <LoginOutlined sx={{ fontSize: 40, color: '#8b0000' }} />
              </Box>
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: '#4a0000',
                  letterSpacing: '-0.02em',
                  mb: 1,
                }}
              >
                Asmi<span style={{ color: '#8b0000' }}>System</span>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                Masuk untuk akses dashboard Anda
              </Typography>
            </Box>

            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: '#4a0000',
                      fontSize: '0.875rem',
                    }}
                  >
                    Email Address
                  </Typography>
                  <TextField
                    type="email"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)',
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)',
                        },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      color: '#4a0000',
                      fontSize: '0.875rem',
                    }}
                  >
                    Password
                  </Typography>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password Anda"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                            sx={{
                              transition: 'transform 0.2s',
                              '&:hover': {
                                transform: 'scale(1.1)',
                              },
                            }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)',
                        },
                        '&.Mui-focused': {
                          boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)',
                        },
                      },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disableElevation
                  startIcon={<LoginOutlined />}
                  sx={{
                    py: 1.8,
                    mt: 2,
                    fontSize: '1rem',
                    fontWeight: 800,
                    textTransform: 'none',
                    bgcolor: '#8b0000',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover': {
                      bgcolor: '#5f0000',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(139, 0, 0, 0.3)',
                      '&::before': {
                        left: '100%',
                      },
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                  }}
                >
                  Masuk ke Sistem
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3, borderColor: 'rgba(139, 0, 0, 0.1)' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    px: 2,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px',
                  }}
                >
                  ATAU
                </Typography>
              </Divider>

              <Box
                sx={{
                  textAlign: 'center',
                  p: 2.5,
                  borderRadius: 3,
                  bgcolor: 'rgba(139, 0, 0, 0.03)',
                  border: '1px dashed rgba(139, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(139, 0, 0, 0.06)',
                    borderColor: 'rgba(139, 0, 0, 0.3)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(139, 0, 0, 0.08)',
                  },
                }}
                onClick={() => navigate('/register')}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Belum bergabung sebagai mitra?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#8b0000',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  Daftar Sekarang →
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              sx={{
                mt: 4,
                color: 'text.secondary',
                fontWeight: 500,
                opacity: 0.7,
              }}
            >
              © 2025 Asmi System Management
            </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
