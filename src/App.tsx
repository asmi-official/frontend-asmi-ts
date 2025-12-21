import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import DashboardPage from './page/Dashboard/dashboard';
import StockProduct from './page/Product/product';
import ManagementMoney from './page/Management/management';
import NotFound from './page/notfound';
import Login from './page/Login';
import Register from './page/Registrasi';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Default route → redirect ke dashboard */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Dashboard layout tanpa username & role */}
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <DashboardPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/product"
            element={
              <DashboardLayout>
                <StockProduct />
              </DashboardLayout>
            }
          />
          <Route
            path="/keuangan"
            element={
              <DashboardLayout>
                <ManagementMoney />
              </DashboardLayout>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
