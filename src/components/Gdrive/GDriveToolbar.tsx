import { Box, TextField, InputAdornment, Stack, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ViewList as ViewListIcon,
  GridView as GridViewIcon,
} from '@mui/icons-material';
import type { ViewMode } from './types';

interface GDriveToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function GDriveToolbar({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: GDriveToolbarProps) {
  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        placeholder="Cari file atau folder..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{
          flex: { xs: '1 1 100%', sm: '1 1 auto' },
          maxWidth: { sm: 400 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: 'white',
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack direction="row" spacing={1} sx={{ flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            flex: { xs: 1, sm: 'initial' },
          }}
        >
          Filter
        </Button>

        <ToggleButtonGroup
          size="small"
          exclusive
          value={viewMode}
          onChange={(_, value) => value && onViewModeChange(value)}
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            '& .MuiToggleButton-root': {
              border: 'none',
              borderRadius: '8px !important',
              px: 2,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            },
          }}
        >
          <ToggleButton value="grid">
            <GridViewIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Box>
  );
}
