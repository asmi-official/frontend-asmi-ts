import {
  // DollarSign,
  Package,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    // {
    //   title: 'Total Pendapatan',
    //   value: 'Rp 125.4M',
    //   change: '+12.5%',
    //   trend: 'up',
    //   icon: DollarSign,
    // },
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

  const topProducts = [
    { name: 'Asmi Nocture (Male)', sales: 234, revenue: 'Rp 58.5M', trend: 12 },
    { name: 'Asmi Bloom (Female)', sales: 189, revenue: 'Rp 45.2M', trend: 8 },
  ];

  const usageList = [
    'Asmi Nocture (Male) – Cocok untuk malam hari atau acara formal, aroma maskulin lembut, tahan lama hingga 8 jam.',
    'Asmi Bloom (Female) – Cocok untuk siang hari dan acara santai, aroma floral manis segar, tahan lama hingga 6 jam.',
  ];

  return (
    <div className="min-h-screen bg-primary/5 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>19 Desember 2024</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              <span>Update terakhir: 2 menit lalu</span>
            </div>
          </div>
        </div>
        <button className="mt-4 md:mt-0 px-5 py-2 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary/90 transition">
          Download Laporan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-primary" size={24} />
                </div>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}
                >
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Produk Terlaris</h2>
          <span className="text-sm text-gray-500">Bulan ini</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition"
            >
              <div>
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sales} terjual</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{product.revenue}</p>
                <p
                  className={`text-sm font-medium ${
                    product.trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {product.trend > 0 ? `+${product.trend}%` : `${product.trend}%`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage List */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-3">Rekomendasi Penggunaan Produk</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          {usageList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
