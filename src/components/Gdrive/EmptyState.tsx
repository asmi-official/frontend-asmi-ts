import { Box, Typography } from '@mui/material';
import { Folder as FolderIcon } from '@mui/icons-material';

export default function EmptyState() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
        bgcolor: 'white',
        borderRadius: 2,
      }}
    >
      <FolderIcon sx={{ fontSize: 80, color: 'grey.300', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Tidak ada file ditemukan
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Coba ubah kata kunci pencarian Anda
      </Typography>
    </Box>
  );
}
