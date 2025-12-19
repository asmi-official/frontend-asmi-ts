import { DollarSign, ArrowUpRight, ArrowDownRight, Calendar, Clock } from 'lucide-react';

export default function ManagementMoney() {
  const stats = [
    {
      title: 'Total Pendapatan',
      value: 'Rp 125.4M',
      trend: 'up',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      title: 'Total Pengeluaran',
      value: 'Rp 58.2M',
      trend: 'down',
      change: '-5.3%',
      icon: DollarSign,
    },
    {
      title: 'Saldo Saat Ini',
      value: 'Rp 67.2M',
      trend: 'up',
      change: '+7.2%',
      icon: DollarSign,
    },
  ];

  const transactions = [
    {
      id: 1,
      description: 'Penjualan Asmi Nocture (Male)',
      type: 'income',
      amount: 'Rp 12.5M',
      date: '19/12/2024',
    },
    {
      id: 2,
      description: 'Pembelian bahan parfum',
      type: 'expense',
      amount: 'Rp 2.3M',
      date: '18/12/2024',
    },
    {
      id: 3,
      description: 'Penjualan Asmi Bloom (Female)',
      type: 'income',
      amount: 'Rp 9.8M',
      date: '18/12/2024',
    },
    {
      id: 4,
      description: 'Biaya Operasional',
      type: 'expense',
      amount: 'Rp 1.2M',
      date: '17/12/2024',
    },
  ];

  return (
    <div className="min-h-screen bg-primary/5 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Keuangan</h1>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              19 Desember 2024
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1" />
              Update terakhir: 2 menit lalu
            </div>
          </div>
        </div>
        <button className="mt-4 md:mt-0 px-6 py-2 bg-primary text-white rounded-lg font-medium shadow hover:bg-primary/90 transition-all hover:scale-105">
          Tambah Transaksi
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition flex flex-col justify-between"
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

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Transaksi Terbaru</h2>
          <span className="text-sm text-gray-500">Bulan ini</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Deskripsi</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Tanggal</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  <td className="py-4 px-4 text-gray-900">{tx.description}</td>
                  <td className="py-4 px-4 text-gray-500">{tx.date}</td>
                  <td
                    className={`py-4 px-4 text-right font-semibold ${
                      tx.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {tx.type === 'income' ? `+ ${tx.amount}` : `- ${tx.amount}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
