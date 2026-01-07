export interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'expense';
  amount: string;
  date: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  title?: string;
  period?: string;
}

export default function TransactionTable({
  transactions,
  title = 'Transaksi Terbaru',
  period = 'Bulan ini',
}: TransactionTableProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500">{period}</span>
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
  );
}
