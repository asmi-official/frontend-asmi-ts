import { Card, CardContent, CardMedia, Box, Typography, IconButton, Chip, Avatar, Tooltip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import type { GDriveFile } from './types';
import { getFileIcon } from './utils';

interface FileCardProps {
  file: GDriveFile;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function FileCard({ file, onMenuOpen }: FileCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          height: 160,
          bgcolor: file.thumbnail ? 'transparent' : 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {file.thumbnail ? (
          <CardMedia
            component="img"
            height="160"
            image={file.thumbnail}
            alt={file.name}
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          getFileIcon(file.type, 'large')
        )}

        {file.shared && (
          <Chip
            label="Shared"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: 'white',
              fontSize: '0.7rem',
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Tooltip title={file.name}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {file.name}
              </Typography>
            </Tooltip>
            <Typography variant="caption" color="text.secondary">
              {file.size} • {file.modified}
            </Typography>
          </Box>
          <IconButton size="small" onClick={(e) => onMenuOpen(e)} sx={{ flexShrink: 0 }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto' }}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: 'primary.main' }}>
            {file.owner[0]}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {file.owner}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
