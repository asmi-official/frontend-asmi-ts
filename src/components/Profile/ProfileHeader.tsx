import React from 'react';
import { Box, Paper, Typography, Avatar, Button, Chip, Stack, IconButton } from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  PhotoCamera,
} from '@mui/icons-material';

interface ProfileHeaderProps {
  profile: {
    name: string;
    email: string;
    avatar?: string;
    joinDate: string;
  };
  roleInfo: {
    label: string;
    color: string;
    icon: React.ReactElement;
  };
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileHeader({
  profile,
  roleInfo,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeaderProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 3,
        borderRadius: 4,
        background: `linear-gradient(135deg, ${roleInfo.color} 0%, ${roleInfo.color}dd 100%)`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      <Box display="flex" alignItems="center" gap={3} position="relative" zIndex={1}>
        <Box position="relative">
          <Avatar
            src={profile.avatar}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            }}
          >
            {profile.name.charAt(0)}
          </Avatar>
          {isEditing && (
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'white',
                boxShadow: 2,
                '&:hover': { bgcolor: 'white' },
              }}
              size="small"
            >
              <PhotoCamera sx={{ color: roleInfo.color, fontSize: 20 }} />
            </IconButton>
          )}
        </Box>

        <Box flex={1}>
          <Box display="flex" alignItems="center" gap={2} mb={1}>
            <Typography variant="h4" fontWeight={700}>
              {profile.name}
            </Typography>
            <Chip
              icon={roleInfo.icon}
              label={roleInfo.label}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.25)',
                color: 'white',
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'white' },
              }}
            />
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 1 }}>
            {profile.email}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Bergabung sejak{' '}
            {new Date(profile.joinDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Typography>
        </Box>

        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={onEdit}
            sx={{
              bgcolor: 'white',
              color: roleInfo.color,
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSave}
              sx={{
                bgcolor: 'white',
                color: roleInfo.color,
                fontWeight: 700,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Simpan
            </Button>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={onCancel}
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Batal
            </Button>
          </Stack>
        )}
      </Box>
    </Paper>
  );
}
