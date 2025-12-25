import DataTable from '../../components/Table/DataTable';
import type { OrderFromBE } from './types';
import { orderColumns } from './orderColumns';

interface Props {
  data: OrderFromBE[];
}

export default function OrderSecretTable({ data }: Props) {
  return (
    <DataTable<OrderFromBE>
      columns={orderColumns}
      data={data}
      enableSearch
      emptyMessage="Belum ada data"
      searchPlaceholder="Cari order, produk, penerima..."
    />
  );
}
