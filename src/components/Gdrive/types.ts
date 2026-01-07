export type FileType = 'folder' | 'image' | 'pdf' | 'doc' | 'sheet' | 'slide' | 'video' | 'audio' | 'other';

export interface GDriveFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  modified: string;
  thumbnail?: string;
  mimeType: string;
  owner: string;
  shared: boolean;
}

export type ViewMode = 'grid' | 'list';
