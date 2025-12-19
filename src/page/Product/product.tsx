import { Edit, Trash2 } from 'lucide-react';

export default function StockProduct() {
  const products = [
    { id: 1, name: 'Asmi Nocture (Male)', stock: 120, sold: 234 },
    { id: 2, name: 'Asmi Bloom (Female)', stock: 95, sold: 189 },
  ];

  return (
    <div className="min-h-screen bg-primary/5 p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Stok Produk</h1>
        <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-all hover:scale-105">
          Tambah Produk
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Nama Produk</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Stok</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Terjual</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="py-4 px-4 font-medium text-gray-900">{product.name}</td>
                <td className="py-4 px-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                    {product.stock} unit
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                    {product.sold} unit
                  </span>
                </td>
                <td className="py-4 px-4 flex justify-center space-x-2">
                  <button className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all">
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all">
                    <Trash2 size={16} className="mr-1" /> Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
