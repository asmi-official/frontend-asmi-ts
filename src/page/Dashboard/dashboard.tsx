import { Package, ShoppingCart, Users } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import {
  DashboardHeader,
  StatsGrid,
  TopProductsCard,
  RecommendationCard,
} from '../../components/Dashboard/Stats';
import type { StatCardData, TopProduct } from '../../components/Dashboard/Stats';

// Data
const stats: StatCardData[] = [
  {
    title: 'Total Produk',
    value: '2',
    change: '+0%',
    trend: 'up',
    icon: Package,
  },
  {
    title: 'Pesanan Hari Ini',
    value: '56',
    change: '-3.1%',
    trend: 'down',
    icon: ShoppingCart,
  },
  {
    title: 'Total Order',
    value: '320',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
  },
];

const topProducts: TopProduct[] = [
  { name: 'Asmi Nocture (Male)', sales: 234, revenue: 'Rp 58.5M', trend: 12 },
  { name: 'Asmi Bloom (Female)', sales: 189, revenue: 'Rp 45.2M', trend: 8 },
];

const usageRecommendations = [
  'Asmi Nocture (Male) – Cocok untuk malam hari atau acara formal, aroma maskulin lembut, tahan lama hingga 8 jam.',
  'Asmi Bloom (Female) – Cocok untuk siang hari dan acara santai, aroma floral manis segar, tahan lama hingga 6 jam.',
];

function DashboardContent() {
  const handleDownloadReport = () => {
    console.log('Downloading report...');
    // Implement download logic here
  };

  return (
    <div className="min-h-screen bg-primary/5 p-8">
      <DashboardHeader onDownloadReport={handleDownloadReport} />
      <StatsGrid stats={stats} />
      <TopProductsCard products={topProducts} />
      <RecommendationCard items={usageRecommendations} />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
}
