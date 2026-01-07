import { useState } from 'react';
import { Box } from '@mui/material';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import {
  GDriveHeader,
  GDriveToolbar,
  FileGrid,
  FileList,
  FileContextMenu,
  EmptyState,
  type GDriveFile,
  type ViewMode,
} from '../../components/Gdrive';

/* =======================
   DUMMY DATA
======================= */
const DUMMY_FILES: GDriveFile[] = [
  {
    id: '1',
    name: 'Produk Katalog 2024',
    type: 'folder',
    size: '—',
    modified: '2 hari lalu',
    mimeType: 'application/vnd.google-apps.folder',
    owner: 'Admin',
    shared: true,
  },
  {
    id: '2',
    name: 'Asmi Nocture Product.jpg',
    type: 'image',
    size: '2.4 MB',
    modified: '1 hari lalu',
    thumbnail: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300',
    mimeType: 'image/jpeg',
    owner: 'Admin',
    shared: false,
  },
  {
    id: '3',
    name: 'Laporan Penjualan Q1.pdf',
    type: 'pdf',
    size: '1.2 MB',
    modified: '3 hari lalu',
    mimeType: 'application/pdf',
    owner: 'Admin',
    shared: true,
  },
  {
    id: '4',
    name: 'Asmi Bloom Female.jpg',
    type: 'image',
    size: '3.1 MB',
    modified: '2 hari lalu',
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300',
    mimeType: 'image/jpeg',
    owner: 'Admin',
    shared: false,
  },
  {
    id: '5',
    name: 'Daftar Harga 2024.xlsx',
    type: 'sheet',
    size: '856 KB',
    modified: '5 hari lalu',
    mimeType: 'application/vnd.google-apps.spreadsheet',
    owner: 'Admin',
    shared: true,
  },
  {
    id: '6',
    name: 'Presentasi Produk.pptx',
    type: 'slide',
    size: '4.5 MB',
    modified: '1 minggu lalu',
    mimeType: 'application/vnd.google-apps.presentation',
    owner: 'Marketing',
    shared: true,
  },
  {
    id: '7',
    name: 'Panduan Brand.docx',
    type: 'doc',
    size: '512 KB',
    modified: '3 hari lalu',
    mimeType: 'application/vnd.google-apps.document',
    owner: 'Admin',
    shared: false,
  },
  {
    id: '8',
    name: 'Video Tutorial Aplikasi.mp4',
    type: 'video',
    size: '45.2 MB',
    modified: '2 minggu lalu',
    mimeType: 'video/mp4',
    owner: 'IT',
    shared: true,
  },
];

function GDriveContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredFiles = DUMMY_FILES.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <GDriveHeader fileCount={filteredFiles.length} />

      <GDriveToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {viewMode === 'grid' && <FileGrid files={filteredFiles} onMenuOpen={handleMenuOpen} />}

      {viewMode === 'list' && <FileList files={filteredFiles} onMenuOpen={handleMenuOpen} />}

      <FileContextMenu anchorEl={anchorEl} onClose={handleMenuClose} />

      {filteredFiles.length === 0 && <EmptyState />}
    </Box>
  );
}

export default function GDrivePage() {
  return (
    <DashboardLayout>
      <GDriveContent />
    </DashboardLayout>
  );
}
