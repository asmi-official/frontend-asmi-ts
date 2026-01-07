import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

interface GDriveHeaderProps {
  fileCount: number;
}

export default function GDriveHeader({ fileCount }: GDriveHeaderProps) {
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1,
          gap: 3,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color: 'white',
                letterSpacing: '-0.5px',
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Google Drive Files
            </Typography>
            <Chip
              label={`${fileCount} Files`}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 400,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            Kelola dan akses file Anda dari Google Drive
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            sx={{
              backgroundColor: 'white',
              color: '#7C2D3E',
              px: 2.5,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Upload
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
