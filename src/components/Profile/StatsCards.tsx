import { Box, Card, CardContent, Typography } from '@mui/material';
import { AttachMoney, Business, People } from '@mui/icons-material';

interface StatsCardsProps {
  role: 'admin' | 'agent' | 'affiliate';
  stats: {
    totalSales?: number;
    totalCommission?: number;
    activeReferrals?: number;
    totalOrders?: number;
  };
}

export default function StatsCards({ role, stats }: StatsCardsProps) {
  if (role === 'admin') return null;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: role === 'affiliate' ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
        },
        gap: 2,
        mb: 3,
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #8b0000 0%, #b22222 100%)',
          color: 'white',
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <AttachMoney />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Total Penjualan
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={700}>
            Rp {stats.totalSales?.toLocaleString('id-ID') || 0}
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #a52a2a 0%, #cd5c5c 100%)',
          color: 'white',
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <AttachMoney />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Total Komisi
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={700}>
            Rp {stats.totalCommission?.toLocaleString('id-ID') || 0}
          </Typography>
        </CardContent>
      </Card>

      {role === 'affiliate' && (
        <Card
          sx={{
            borderRadius: 3,
            background: 'linear-gradient(135deg, #dc143c 0%, #ff6b6b 100%)',
            color: 'white',
          }}
        >
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <People />
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Referral Aktif
              </Typography>
            </Box>
            <Typography variant="h5" fontWeight={700}>
              {stats.activeReferrals || 0}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Card
        sx={{
          borderRadius: 3,
          background: 'linear-gradient(135deg, #c41e3a 0%, #e74c3c 100%)',
          color: 'white',
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Business />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Total Pesanan
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight={700}>
            {stats.totalOrders || 0}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
