export interface TopProduct {
  name: string;
  sales: number;
  revenue: string;
  trend: number;
}

interface TopProductsCardProps {
  products: TopProduct[];
  title?: string;
  period?: string;
}

export default function TopProductsCard({
  products,
  title = 'Produk Terlaris',
  period = 'Bulan ini',
}: TopProductsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <span className="text-sm text-gray-500">{period}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product, index) => (
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
  );
}
