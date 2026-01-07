import { Calendar, Clock } from 'lucide-react';

interface DashboardHeaderProps {
  currentDate?: string;
  lastUpdate?: string;
  onDownloadReport?: () => void;
}

export default function DashboardHeader({
  currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  lastUpdate = '2 menit lalu',
  onDownloadReport,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{currentDate}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>Update terakhir: {lastUpdate}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onDownloadReport}
        className="mt-4 md:mt-0 px-5 py-2 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary/90 transition"
      >
        Download Laporan
      </button>
    </div>
  );
}
