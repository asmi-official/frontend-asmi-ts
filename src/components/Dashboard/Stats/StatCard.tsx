import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
}

interface StatCardProps {
  stat: StatCardData;
}

export default function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;

  return (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col justify-between">
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
}
