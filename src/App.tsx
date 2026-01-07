import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import DashboardPage from './page/Dashboard/dashboard';
import ManagementMoney from './page/Management/management';
import NotFound from './page/notfound';
import Login from './page/Login';
import Register from './page/Registrasi';
import ListProduct from './page/Product/list';
import OrderSecretList from './page/OrderSecret/OrderSecretList';
import GDrivePage from './page/Gdrive/gdrive';
import ConfigMarketplace from './page/config/config-marketplace';
import ListOrderPage from './page/Order/list';
import Profile from './page/Profile/profile';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Default route → redirect ke login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Pages with DashboardLayout (layout handled inside each page) */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/product" element={<ListProduct />} />
          <Route path="/order" element={<ListOrderPage />} />
          <Route path="/messege" element={<OrderSecretList />} />
          <Route path="/keuangan" element={<ManagementMoney />} />
          <Route path="/gdrive" element={<GDrivePage />} />
          <Route path="/config-marketplace" element={<ConfigMarketplace />} />
          <Route path="/profile" element={<Profile />} />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
