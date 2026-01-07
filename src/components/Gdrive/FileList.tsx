import { Box } from '@mui/material';
import type { GDriveFile } from './types';
import FileListItem from './FileListItem';

interface FileListProps {
  files: GDriveFile[];
  onMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
}

export default function FileList({ files, onMenuOpen }: FileListProps) {
  return (
    <Box sx={{ bgcolor: 'white', borderRadius: 2, overflow: 'hidden' }}>
      {files.map((file, index) => (
        <FileListItem
          key={file.id}
          file={file}
          onMenuOpen={onMenuOpen}
          showBorder={index < files.length - 1}
        />
      ))}
    </Box>
  );
}
