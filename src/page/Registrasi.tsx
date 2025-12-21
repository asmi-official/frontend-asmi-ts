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
interface RegisterForm {
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
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    password: '',
  });

  // 2. Perbaikan Error ts(7006): Tambahkan tipe pada parameter 'field' dan 'event'
  const handleChange =
    (field: keyof RegisterForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  // 3. Tambahkan tipe pada parameter 'event' di submit
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Registering Supplier:', form);
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
        <Container maxWidth="xs">
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
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{ color: '#4a0000', letterSpacing: '-0.02em', mb: 1 }}
              >
                Daftar <span style={{ color: '#8b0000' }}>Mitra</span>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lengkapi profil bisnis Asmi System Anda
              </Typography>
            </Box>

            <form onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.5}>
                <TextField
                  label="Nama Perusahaan"
                  fullWidth
                  required
                  value={form.companyName}
                  onChange={handleChange('companyName')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StorefrontOutlined color="primary" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Nama Penanggung Jawab"
                  fullWidth
                  required
                  value={form.contactName}
                  onChange={handleChange('contactName')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline color="primary" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="No. Telepon"
                  fullWidth
                  required
                  value={form.phone}
                  onChange={handleChange('phone')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneOutlined color="primary" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Email Bisnis"
                  fullWidth
                  required
                  value={form.email}
                  onChange={handleChange('email')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined color="primary" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Password"
                  fullWidth
                  required
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
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disableElevation
                  sx={{
                    py: 1.8,
                    mt: 1,
                    fontSize: '1rem',
                    fontWeight: 800,
                    textTransform: 'none',
                    bgcolor: '#8b0000',
                    '&:hover': {
                      bgcolor: '#5f0000',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Daftar Sekarang
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
