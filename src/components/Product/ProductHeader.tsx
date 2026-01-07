import {
  Box,
  Typography,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InventoryIcon from '@mui/icons-material/Inventory2';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

interface ProductHeaderProps {
  viewMode: 'list' | 'grid';
  onViewModeChange: (mode: 'list' | 'grid') => void;
  onAddStock?: () => void;
  onAddProduct?: () => void;
}

export default function ProductHeader({
  viewMode,
  onViewModeChange,
  onAddStock,
  onAddProduct,
}: ProductHeaderProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #7C2D3E 0%, #5a1f2e 100%)',
        borderRadius: 3,
        p: 3,
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(124, 45, 62, 0.15)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          background: 'rgba(255, 255, 255, 0.03)',
          borderRadius: '50%',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 1,
          gap: 3,
          flexWrap: { xs: 'wrap', md: 'nowrap' },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                color: 'white',
                letterSpacing: '-0.5px',
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Produk Parfum ASMI
            </Typography>
            <Chip
              icon={<LocalOfferIcon sx={{ fontSize: 16, color: 'white !important' }} />}
              label="Premium"
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 400,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            Kelola dan pantau seluruh koleksi produk parfum Anda dalam satu tempat
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            flexShrink: 0,
            width: { xs: '100%', md: 'auto' },
          }}
        >
          <ToggleButtonGroup
            size="small"
            exclusive
            value={viewMode}
            onChange={(_, value) => value && onViewModeChange(value)}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              '& .MuiToggleButton-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                border: 'none',
                borderRadius: '8px !important',
                px: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  color: 'white',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  },
                },
              },
            }}
          >
            <ToggleButton value="list">
              <ViewListIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="grid">
              <GridViewIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>

          <Button
            variant="outlined"
            startIcon={<InventoryIcon />}
            onClick={onAddStock}
            sx={{
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              px: 2.5,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Add Stock
          </Button>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddProduct}
            sx={{
              backgroundColor: 'white',
              color: '#7C2D3E',
              px: 2.5,
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            Add Product
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
