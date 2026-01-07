import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import { Lock, Visibility, VisibilityOff, CheckCircle } from '@mui/icons-material';

interface SecuritySettingsProps {
  roleInfo: {
    label: string;
    color: string;
    icon: React.ReactElement;
  };
  newPassword: string;
  showPassword: boolean;
  isEditing: boolean;
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
}

export default function SecuritySettings({
  roleInfo,
  newPassword,
  showPassword,
  isEditing,
  onPasswordChange,
  onTogglePassword,
}: SecuritySettingsProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={3}>
        Keamanan
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Password Baru"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          disabled={!isEditing}
          value={newPassword}
          onChange={onPasswordChange}
          placeholder={isEditing ? 'Masukkan password baru' : '••••••••'}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: isEditing ? (
                <InputAdornment position="end">
                  <IconButton onClick={onTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
            },
          }}
        />

        <Divider />

        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Status Akun
          </Typography>
          <Chip label="Aktif" color="success" size="small" icon={<CheckCircle />} />
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Role
          </Typography>
          <Chip
            label={roleInfo.label}
            size="small"
            icon={roleInfo.icon}
            sx={{
              bgcolor: `${roleInfo.color}20`,
              color: roleInfo.color,
              fontWeight: 600,
              '& .MuiChip-icon': { color: roleInfo.color },
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
