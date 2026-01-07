import { Box, Typography, IconButton, Chip } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import type { GDriveFile } from './types';
import { getFileIcon } from './utils';

interface FileListItemProps {
  file: GDriveFile;
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  showBorder?: boolean;
}

export default function FileListItem({ file, onMenuOpen, showBorder = true }: FileListItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 2,
        gap: 2,
        borderBottom: showBorder ? '1px solid' : 'none',
        borderColor: 'divider',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
          bgcolor: 'grey.50',
        },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1,
          bgcolor: file.thumbnail ? 'transparent' : 'grey.100',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {file.thumbnail ? (
          <img
            src={file.thumbnail}
            alt={file.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          getFileIcon(file.type, 'medium')
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
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
          {file.shared && (
            <Chip
              label="Shared"
              size="small"
              sx={{
                ml: 1,
                height: 20,
                fontSize: '0.65rem',
              }}
            />
          )}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {file.owner} • {file.modified}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ display: { xs: 'none', sm: 'block' }, minWidth: 80 }}
      >
        {file.size}
      </Typography>

      <IconButton size="small" onClick={(e) => onMenuOpen(e)}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
