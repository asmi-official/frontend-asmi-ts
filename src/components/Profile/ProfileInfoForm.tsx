import React from 'react';
import { Paper, Typography, TextField, Stack, InputAdornment } from '@mui/material';
import { Email, Phone, Business, Person } from '@mui/icons-material';

interface ProfileInfoFormProps {
  role: 'admin' | 'agent' | 'affiliate';
  formData: {
    name: string;
    email: string;
    phone: string;
    companyName?: string;
  };
  isEditing: boolean;
  onChange: (field: 'name' | 'email' | 'phone' | 'companyName') => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileInfoForm({
  role,
  formData,
  isEditing,
  onChange,
}: ProfileInfoFormProps) {
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
        Informasi Profile
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Nama Lengkap"
          fullWidth
          disabled={!isEditing}
          value={formData.name}
          onChange={onChange('name')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="Email"
          type="email"
          fullWidth
          disabled={!isEditing}
          value={formData.email}
          onChange={onChange('email')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          label="No. Telepon"
          fullWidth
          disabled={!isEditing}
          value={formData.phone}
          onChange={onChange('phone')}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        {role === 'agent' && (
          <TextField
            label="Nama Perusahaan"
            fullWidth
            disabled={!isEditing}
            value={formData.companyName || ''}
            onChange={onChange('companyName')}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Business color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      </Stack>
    </Paper>
  );
}
