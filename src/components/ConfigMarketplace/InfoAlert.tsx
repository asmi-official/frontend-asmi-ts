import { Alert, Typography } from '@mui/material';

export default function InfoAlert() {
  return (
    <Alert severity="info" sx={{ mb: 3 }}>
      <Typography variant="body2" fontWeight={600} gutterBottom>
        Cara Mendapatkan API Key:
      </Typography>
      <Typography variant="body2" component="div">
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          <li>
            <strong>Shopee:</strong> Seller Center → Settings → Open API
          </li>
          <li>
            <strong>Tokopedia:</strong> Seller Dashboard → Integrasi → API
          </li>
          <li>
            <strong>TikTok Shop:</strong> Seller Center → Settings → Developer Tools
          </li>
          <li>
            <strong>Lazada:</strong> Seller Center → App Integration
          </li>
          <li>
            <strong>Bukalapak:</strong> Mitra Bukalapak → API Developer
          </li>
        </ul>
      </Typography>
    </Alert>
  );
}
