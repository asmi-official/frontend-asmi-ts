import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Stack,
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  EmailOutlined,
  LockOutlined,
  StorefrontOutlined,
  PersonOutline,
  PhoneOutlined,
  ArrowBackIosNew,
  GroupsOutlined,
  ShareOutlined,
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

// 1. Definisikan Interface untuk State Form
type UserType = 'agent' | 'affiliate';

interface RegisterForm {
  userType: UserType;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [form, setForm] = useState<RegisterForm>({
    userType: 'agent',
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
  });

  // 2. Handler untuk mengubah tipe user
  const handleUserTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newUserType: UserType | null,
  ): void => {
    if (newUserType !== null) {
      setForm((prev) => ({
        ...prev,
        userType: newUserType,
      }));
    }
  };

  // 3. Perbaikan Error ts(7006): Tambahkan tipe pada parameter 'field' dan 'event'
  const handleChange =
    (field: keyof RegisterForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  // 4. Tambahkan tipe pada parameter 'event' di submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Registering:', form.userType, form);
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
          <Button
            startIcon={<ArrowBackIosNew sx={{ fontSize: 14 }} />}
            onClick={() => navigate('/login')}
            sx={{
              mb: 2,
              textTransform: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
            }}
          >
            Kembali ke Login
          </Button>

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
                <GroupsOutlined sx={{ fontSize: 40, color: '#8b0000' }} />
              </Box>
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{ color: '#4a0000', letterSpacing: '-0.02em', mb: 1 }}
              >
                Daftar <span style={{ color: '#8b0000' }}>Mitra</span>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3, fontSize: '0.95rem' }}
              >
                Pilih tipe registrasi Anda
              </Typography>

              {/* Toggle Button untuk memilih Agent atau Affiliate */}
              <ToggleButtonGroup
                value={form.userType}
                exclusive
                onChange={handleUserTypeChange}
                fullWidth
                sx={{
                  mb: 2,
                  boxShadow: '0 2px 8px rgba(139, 0, 0, 0.1)',
                  '& .MuiToggleButton-root': {
                    py: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    border: '2px solid',
                    borderColor: 'rgba(139, 0, 0, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&.Mui-selected': {
                      bgcolor: '#8b0000',
                      color: 'white',
                      borderColor: '#8b0000',
                      transform: 'scale(1.02)',
                      zIndex: 1,
                      boxShadow: '0 4px 12px rgba(139, 0, 0, 0.25)',
                      '&:hover': {
                        bgcolor: '#5f0000',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'rgba(139, 0, 0, 0.05)',
                      transform: 'translateY(-1px)',
                    },
                  },
                }}
              >
                <ToggleButton value="agent">
                  <GroupsOutlined sx={{ mr: 1, fontSize: 22 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Agent
                    </Typography>
                  </Box>
                  {form.userType === 'agent' && (
                    <Chip
                      label="✓"
                      size="small"
                      sx={{
                        ml: 1,
                        height: 22,
                        minWidth: 22,
                        bgcolor: 'rgba(255,255,255,0.25)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        '& .MuiChip-label': {
                          px: 0.5,
                        },
                      }}
                    />
                  )}
                </ToggleButton>
                <ToggleButton value="affiliate">
                  <ShareOutlined sx={{ mr: 1, fontSize: 22 }} />
                  <Box>
                    <Typography variant="body2" fontWeight={700}>
                      Affiliate
                    </Typography>
                  </Box>
                  {form.userType === 'affiliate' && (
                    <Chip
                      label="✓"
                      size="small"
                      sx={{
                        ml: 1,
                        height: 22,
                        minWidth: 22,
                        bgcolor: 'rgba(255,255,255,0.25)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        '& .MuiChip-label': {
                          px: 0.5,
                        },
                      }}
                    />
                  )}
                </ToggleButton>
              </ToggleButtonGroup>

              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(139, 0, 0, 0.04)',
                  border: '1px solid rgba(139, 0, 0, 0.1)',
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: '0.875rem', lineHeight: 1.6 }}
                >
                  {form.userType === 'agent'
                    ? '🏢 Agent: Bergabung sebagai agen penjualan produk dengan komisi menarik'
                    : '🤝 Affiliate: Dapatkan komisi dari setiap referral yang berhasil'}
                </Typography>
              </Box>
            </Box>

            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                {/* Field khusus untuk Agent */}
                {form.userType === 'agent' && (
                  <>
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 600, color: '#4a0000', fontSize: '0.875rem' }}
                      >
                        Nama Perusahaan
                      </Typography>
                      <TextField
                        fullWidth
                        required
                        placeholder="PT. Contoh Perusahaan"
                        value={form.companyName}
                        onChange={handleChange('companyName')}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <StorefrontOutlined color="primary" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            transition: 'all 0.3s ease',
                            '&:hover': { boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)' },
                            '&.Mui-focused': { boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)' },
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 600, color: '#4a0000', fontSize: '0.875rem' }}
                      >
                        Nama Penanggung Jawab
                      </Typography>
                      <TextField
                        fullWidth
                        required
                        placeholder="John Doe"
                        value={form.contactName}
                        onChange={handleChange('contactName')}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonOutline color="primary" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            transition: 'all 0.3s ease',
                            '&:hover': { boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)' },
                            '&.Mui-focused': { boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)' },
                          },
                        }}
                      />
                    </Box>
                  </>
                )}

                {/* Field untuk Affiliate */}
                {form.userType === 'affiliate' && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, fontWeight: 600, color: '#4a0000', fontSize: '0.875rem' }}
                    >
                      Nama Lengkap
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      placeholder="John Doe"
                      value={form.contactName}
                      onChange={handleChange('contactName')}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutline color="primary" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          transition: 'all 0.3s ease',
                          '&:hover': { boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)' },
                          '&.Mui-focused': { boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)' },
                        },
                      }}
                    />
                  </Box>
                )}

                {/* Field untuk semua user type */}
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 600, color: '#4a0000', fontSize: '0.875rem' }}
                  >
                    No. Telepon
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="08123456789"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlined color="primary" fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        transition: 'all 0.3s ease',
                        '&:hover': { boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)' },
                        '&.Mui-focused': { boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)' },
                      },
                    }}
                  />
                </Box>

                {form.userType === 'agent' && (
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, fontWeight: 600, color: '#4a0000', fontSize: '0.875rem' }}
                    >
                      Email Bisnis
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      placeholder="email@perusahaan.com"
                      value={form.email}
                      onChange={handleChange('email')}
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
                          '&:hover': { boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)' },
                          '&.Mui-focused': { boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)' },
                        },
                      }}
                    />
                  </Box>
                )}

                <Box>
                  <Typography
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 600, color: '#4a0000', fontSize: '0.875rem' }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="Minimal 8 karakter"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange('password')}
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
                            edge="end"
                            onClick={() => setShowPassword(!showPassword)}
                            sx={{
                              transition: 'transform 0.2s',
                              '&:hover': { transform: 'scale(1.1)' },
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
                        '&:hover': { boxShadow: '0 4px 8px rgba(139, 0, 0, 0.08)' },
                        '&.Mui-focused': { boxShadow: '0 4px 12px rgba(139, 0, 0, 0.15)' },
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
                  startIcon={form.userType === 'agent' ? <GroupsOutlined /> : <ShareOutlined />}
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
                  {form.userType === 'agent' ? 'Daftar sebagai Agent' : 'Daftar sebagai Affiliate'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
