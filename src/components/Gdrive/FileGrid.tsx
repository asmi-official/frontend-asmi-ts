import { Box } from '@mui/material';
import type { GDriveFile } from './types';
import FileCard from './FileCard';

interface FileGridProps {
  files: GDriveFile[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function FileGrid({ files, onMenuOpen }: FileGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {files.map((file) => (
        <FileCard key={file.id} file={file} onMenuOpen={onMenuOpen} />
      ))}
    </Box>
  );
}
