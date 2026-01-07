export type MarketplaceType = 'shopee' | 'tokopedia' | 'tiktok' | 'lazada' | 'bukalapak';

export interface MarketplaceConfig {
  id: MarketplaceType;
  name: string;
  logo: string;
  enabled: boolean;
  apiKey: string;
  apiSecret: string;
  shopId: string;
  webhookUrl: string;
  lastSync?: string;
  status: 'connected' | 'disconnected' | 'error';
  color: string;
}

export const initialMarketplaces: MarketplaceConfig[] = [
  {
    id: 'shopee',
    name: 'Shopee',
    logo: '🛍️',
    enabled: false,
    apiKey: '',
    apiSecret: '',
    shopId: '',
    webhookUrl: '',
    status: 'disconnected',
    color: '#EE4D2D',
  },
  {
    id: 'tokopedia',
    name: 'Tokopedia',
    logo: '🟢',
    enabled: false,
    apiKey: '',
    apiSecret: '',
    shopId: '',
    webhookUrl: '',
    status: 'disconnected',
    color: '#42B549',
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    logo: '🎵',
    enabled: false,
    apiKey: '',
    apiSecret: '',
    shopId: '',
    webhookUrl: '',
    status: 'disconnected',
    color: '#000000',
  },
  {
    id: 'lazada',
    name: 'Lazada',
    logo: '🔵',
    enabled: false,
    apiKey: '',
    apiSecret: '',
    shopId: '',
    webhookUrl: '',
    status: 'disconnected',
    color: '#0F146D',
  },
  {
    id: 'bukalapak',
    name: 'Bukalapak',
    logo: '🔴',
    enabled: false,
    apiKey: '',
    apiSecret: '',
    shopId: '',
    webhookUrl: '',
    status: 'disconnected',
    color: '#E31E52',
  },
];
