interface RecommendationCardProps {
  title?: string;
  items: string[];
}

export default function RecommendationCard({
  title = 'Rekomendasi Penggunaan Produk',
  items,
}: RecommendationCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
