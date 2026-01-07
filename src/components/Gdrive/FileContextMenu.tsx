import { Menu, MenuItem } from '@mui/material';
import {
  Download as DownloadIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface FileContextMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export default function FileContextMenu({ anchorEl, onClose }: FileContextMenuProps) {
  return (
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      <MenuItem onClick={onClose}>
        <DownloadIcon fontSize="small" sx={{ mr: 1 }} />
        Download
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ShareIcon fontSize="small" sx={{ mr: 1 }} />
        Share
      </MenuItem>
      <MenuItem onClick={onClose}>
        <InfoIcon fontSize="small" sx={{ mr: 1 }} />
        Details
      </MenuItem>
      <MenuItem onClick={onClose} sx={{ color: 'error.main' }}>
        <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
        Delete
      </MenuItem>
    </Menu>
  );
}
