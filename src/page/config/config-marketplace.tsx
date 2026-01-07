import { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import {
  ConfigHeader,
  MarketplaceCard,
  InfoAlert,
  initialMarketplaces,
  type MarketplaceConfig,
  type MarketplaceType,
} from '../../components/ConfigMarketplace';

function ConfigMarketplaceContent() {
  const [marketplaces, setMarketplaces] = useState<MarketplaceConfig[]>(initialMarketplaces);
  const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const handleToggle = (id: MarketplaceType) => {
    setMarketplaces((prev) =>
      prev.map((mp) => (mp.id === id ? { ...mp, enabled: !mp.enabled } : mp)),
    );
  };

  const handleInputChange = (
    id: MarketplaceType,
    field: keyof MarketplaceConfig,
    value: string,
  ) => {
    setMarketplaces((prev) => prev.map((mp) => (mp.id === id ? { ...mp, [field]: value } : mp)));
  };

  const toggleSecretVisibility = (id: MarketplaceType) => {
    setShowSecrets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTestConnection = (id: MarketplaceType) => {
    setMarketplaces((prev) =>
      prev.map((mp) => {
        if (mp.id === id) {
          const isValid = mp.apiKey && mp.apiSecret && mp.shopId;
          return {
            ...mp,
            status: isValid ? 'connected' : 'error',
            lastSync: isValid ? new Date().toLocaleString('id-ID') : undefined,
          };
        }
        return mp;
      }),
    );
  };

  const handleSave = (id: MarketplaceType) => {
    setSaveSuccess(id);
    setTimeout(() => setSaveSuccess(null), 3000);
  };

  return (
    <Box>
      <ConfigHeader />

      <InfoAlert />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {marketplaces.map((marketplace) => (
          <MarketplaceCard
            key={marketplace.id}
            marketplace={marketplace}
            showSecret={!!showSecrets[marketplace.id]}
            saveSuccess={saveSuccess === marketplace.id}
            onToggle={handleToggle}
            onInputChange={handleInputChange}
            onToggleSecretVisibility={toggleSecretVisibility}
            onTestConnection={handleTestConnection}
            onSave={handleSave}
          />
        ))}
      </Box>

      {/* Add Custom Marketplace */}
      <Card
        sx={{
          mt: 3,
          border: '2px dashed',
          borderColor: 'divider',
          bgcolor: 'grey.50',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'primary.50',
          },
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <AddIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Tambah Marketplace Custom
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Butuh integrasi dengan marketplace lain? Hubungi administrator
          </Typography>
        </CardContent>
      </Card>

      {/* Information Box */}
      <Card sx={{ mt: 3, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.main' }}>
        <CardContent>
          <Typography variant="h6" color="primary.main" gutterBottom fontWeight={700}>
            ℹ️ Informasi Penting
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>Pastikan API Key dan Secret disimpan dengan aman</li>
              <li>Jangan bagikan kredensial API kepada pihak ketiga</li>
              <li>Test koneksi setelah menyimpan konfigurasi</li>
              <li>Webhook URL diperlukan untuk sinkronisasi real-time</li>
              <li>Order akan otomatis masuk setelah marketplace terhubung</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function ConfigMarketplace() {
  return (
    <DashboardLayout>
      <ConfigMarketplaceContent />
    </DashboardLayout>
  );
}
