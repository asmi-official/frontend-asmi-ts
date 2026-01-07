import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  InputAdornment,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import type { MarketplaceConfig, MarketplaceType } from './types';

interface MarketplaceCardProps {
  marketplace: MarketplaceConfig;
  showSecret: boolean;
  saveSuccess: boolean;
  onToggle: (id: MarketplaceType) => void;
  onInputChange: (id: MarketplaceType, field: keyof MarketplaceConfig, value: string) => void;
  onToggleSecretVisibility: (id: MarketplaceType) => void;
  onTestConnection: (id: MarketplaceType) => void;
  onSave: (id: MarketplaceType) => void;
}

export default function MarketplaceCard({
  marketplace,
  showSecret,
  saveSuccess,
  onToggle,
  onInputChange,
  onToggleSecretVisibility,
  onTestConnection,
  onSave,
}: MarketplaceCardProps) {
  const getStatusColor = (status: MarketplaceConfig['status']) => {
    switch (status) {
      case 'connected':
        return 'success';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: MarketplaceConfig['status']) => {
    switch (status) {
      case 'connected':
        return 'Terhubung';
      case 'error':
        return 'Error';
      default:
        return 'Tidak Terhubung';
    }
  };

  return (
    <Card
      sx={{
        border: marketplace.enabled ? `2px solid ${marketplace.color}` : '1px solid',
        borderColor: marketplace.enabled ? marketplace.color : 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                bgcolor: `${marketplace.color}15`,
                border: `2px solid ${marketplace.color}30`,
              }}
            >
              {marketplace.logo}
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {marketplace.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip
                  size="small"
                  label={getStatusText(marketplace.status)}
                  color={getStatusColor(marketplace.status)}
                  icon={
                    marketplace.status === 'connected' ? (
                      <CheckCircleIcon />
                    ) : marketplace.status === 'error' ? (
                      <ErrorIcon />
                    ) : undefined
                  }
                />
                {marketplace.lastSync && (
                  <Typography variant="caption" color="text.secondary">
                    Sync terakhir: {marketplace.lastSync}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={marketplace.enabled}
                onChange={() => onToggle(marketplace.id)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: marketplace.color,
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: marketplace.color,
                  },
                }}
              />
            }
            label={marketplace.enabled ? 'Aktif' : 'Nonaktif'}
          />
        </Box>

        {/* Configuration Form */}
        {marketplace.enabled && (
          <>
            <Divider sx={{ mb: 3 }} />

            {saveSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Konfigurasi {marketplace.name} berhasil disimpan!
              </Alert>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {/* Shop ID */}
              <TextField
                fullWidth
                label="Shop ID / Store ID"
                placeholder={`Masukkan ${marketplace.name} Shop ID`}
                value={marketplace.shopId}
                onChange={(e) => onInputChange(marketplace.id, 'shopId', e.target.value)}
                helperText={`ID toko Anda di ${marketplace.name}`}
              />

              {/* API Key */}
              <TextField
                fullWidth
                label="API Key / App Key"
                placeholder="Masukkan API Key"
                value={marketplace.apiKey}
                onChange={(e) => onInputChange(marketplace.id, 'apiKey', e.target.value)}
                type={showSecret ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => onToggleSecretVisibility(marketplace.id)}
                          edge="end"
                        >
                          {showSecret ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                helperText="API Key dari developer console marketplace"
              />

              {/* API Secret */}
              <TextField
                fullWidth
                label="API Secret / App Secret"
                placeholder="Masukkan API Secret"
                value={marketplace.apiSecret}
                onChange={(e) => onInputChange(marketplace.id, 'apiSecret', e.target.value)}
                type={showSecret ? 'text' : 'password'}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => onToggleSecretVisibility(marketplace.id)}
                          edge="end"
                        >
                          {showSecret ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                helperText="API Secret untuk autentikasi"
              />

              {/* Webhook URL */}
              <TextField
                fullWidth
                label="Webhook URL (Opsional)"
                placeholder="https://your-domain.com/webhook/marketplace"
                value={marketplace.webhookUrl}
                onChange={(e) => onInputChange(marketplace.id, 'webhookUrl', e.target.value)}
                helperText="URL untuk menerima notifikasi order baru"
              />

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={() => onSave(marketplace.id)}
                  sx={{
                    bgcolor: marketplace.color,
                    '&:hover': {
                      bgcolor: marketplace.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Simpan Konfigurasi
                </Button>

                <Tooltip title="Test koneksi ke marketplace">
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => onTestConnection(marketplace.id)}
                    sx={{
                      borderColor: marketplace.color,
                      color: marketplace.color,
                      '&:hover': {
                        borderColor: marketplace.color,
                        bgcolor: `${marketplace.color}10`,
                      },
                    }}
                  >
                    Test Koneksi
                  </Button>
                </Tooltip>
              </Stack>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}
