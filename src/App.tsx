import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import DashboardPage from './page/Dashboard/dashboard';
import StockProduct from './page/Product/product';
import ManagementMoney from './page/Management/management';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route → redirect ke dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

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
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
