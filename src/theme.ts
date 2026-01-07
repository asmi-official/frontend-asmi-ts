import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7C2D3E', // Tailwind primary.500
      light: '#965765', // Tailwind primary.400
      dark: '#632432', // Tailwind primary.600
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FBBF24', // Tailwind warning.500
      light: '#FCCC50', // Tailwind warning.400
      dark: '#C9991D', // Tailwind warning.600
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#22C55E', // Tailwind success.500
      light: '#4ED17E', // Tailwind success.400
      dark: '#1B9E4B', // Tailwind success.600
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF0808', // Tailwind danger.500
      light: '#FF3939', // Tailwind danger.400
      dark: '#CC0606', // Tailwind danger.600
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FBBF24', // Tailwind warning.500
      light: '#FCCC50', // Tailwind warning.400
      dark: '#C9991D', // Tailwind warning.600
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
    text: {
      primary: '#0B0F1A', // neutral.500
      secondary: '#7C2D3E', // primary.500
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif', 'Amiri'].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#7C2D3E', // primary.500
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#7C2D3E', // primary.500
    },
    body1: {
      fontSize: '1rem',
      color: '#0B0F1A', // neutral.500
    },
  },
  components: {
    // Ensure MUI components work with Tailwind
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(124, 45, 62, 0.1)', // primary.500 shadow
        },
      },
    },
  },
});

export default theme;
