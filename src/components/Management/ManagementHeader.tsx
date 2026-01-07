import { Calendar, Clock } from 'lucide-react';

interface ManagementHeaderProps {
  title?: string;
  currentDate?: string;
  lastUpdate?: string;
  onAddTransaction?: () => void;
}

export default function ManagementHeader({
  title = 'Manajemen Keuangan',
  currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  lastUpdate = '2 menit lalu',
  onAddTransaction,
}: ManagementHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            {currentDate}
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            Update terakhir: {lastUpdate}
          </div>
        </div>
      </div>
      <button
        onClick={onAddTransaction}
        className="mt-4 md:mt-0 px-6 py-2 bg-primary text-white rounded-lg font-medium shadow hover:bg-primary/90 transition-all hover:scale-105"
      >
        Tambah Transaksi
      </button>
    </div>
  );
}
