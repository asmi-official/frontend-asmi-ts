import Grid from '@mui/material/Grid';
import type { OrderFromBE } from './types';
import OrderSecretCard from './OrderSecretCard';

interface Props {
  data: OrderFromBE[];
}

export default function OrderSecretGrid({ data }: Props) {
  return (
    <Grid container spacing={3}>
      {data.map((item) => (
        <Grid key={item.id} size={{ xs: 12, md: 6, lg: 4 }}>
          <OrderSecretCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
