import {
  Folder as FolderIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  TableChart as SheetIcon,
  Slideshow as SlideIcon,
  VideoLibrary as VideoIcon,
  AudioFile as AudioIcon,
} from '@mui/icons-material';
import type { FileType } from './types';

export const getFileIcon = (type: FileType, size: 'small' | 'medium' | 'large' = 'medium') => {
  const iconSize = size === 'small' ? 20 : size === 'medium' ? 40 : 60;
  const iconProps = { sx: { fontSize: iconSize } };

  switch (type) {
    case 'folder':
      return <FolderIcon {...iconProps} sx={{ ...iconProps.sx, color: '#FBBF24' }} />;
    case 'image':
      return <ImageIcon {...iconProps} sx={{ ...iconProps.sx, color: '#22C55E' }} />;
    case 'pdf':
      return <PdfIcon {...iconProps} sx={{ ...iconProps.sx, color: '#EF4444' }} />;
    case 'doc':
      return <DocIcon {...iconProps} sx={{ ...iconProps.sx, color: '#3B82F6' }} />;
    case 'sheet':
      return <SheetIcon {...iconProps} sx={{ ...iconProps.sx, color: '#10B981' }} />;
    case 'slide':
      return <SlideIcon {...iconProps} sx={{ ...iconProps.sx, color: '#F59E0B' }} />;
    case 'video':
      return <VideoIcon {...iconProps} sx={{ ...iconProps.sx, color: '#8B5CF6' }} />;
    case 'audio':
      return <AudioIcon {...iconProps} sx={{ ...iconProps.sx, color: '#EC4899' }} />;
    default:
      return <FileIcon {...iconProps} sx={{ ...iconProps.sx, color: '#6B7280' }} />;
  }
};
