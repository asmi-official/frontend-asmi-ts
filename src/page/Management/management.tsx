import { DollarSign } from 'lucide-react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import {
  ManagementHeader,
  FinancialStatCard,
  TransactionTable,
} from '../../components/Management';
import type { FinancialStat, Transaction } from '../../components/Management';

// Data
const stats: FinancialStat[] = [
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

const transactions: Transaction[] = [
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

function ManagementMoneyContent() {
  const handleAddTransaction = () => {
    console.log('Add transaction clicked');
    // Implement add transaction logic
  };

  return (
    <div className="min-h-screen bg-primary/5 p-8">
      <ManagementHeader onAddTransaction={handleAddTransaction} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <FinancialStatCard key={idx} stat={stat} />
        ))}
      </div>

      <TransactionTable transactions={transactions} />
    </div>
  );
}

export default function ManagementMoney() {
  return (
    <DashboardLayout>
      <ManagementMoneyContent />
    </DashboardLayout>
  );
}
