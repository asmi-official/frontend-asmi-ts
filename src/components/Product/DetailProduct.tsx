import { useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Divider,
    IconButton,
} from '@mui/material';
import { ChevronLeft, ChevronRight, ArrowBack } from '@mui/icons-material';
import type { Product } from './types';
import { useNavigate } from 'react-router-dom';

interface DetailProductProps {
    product: Product;
}

const statusMap: Record<NonNullable<Product['status']>, { label: string; color: 'success' | 'error' | 'warning' }> = {
    active: { label: 'Aktif', color: 'success' },
    inactive: { label: 'Nonaktif', color: 'error' },
    out_of_stock: { label: 'Stok Habis', color: 'warning' },
};

function Row({ label, value }: { label: string; value: string | undefined }) {
    if (!value) return null;
    return (
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>{label}</Typography>
            <Typography variant="body2" fontWeight={600}>{value}</Typography>
        </Box>
    );
}

export default function DetailProduct({ product }: DetailProductProps) {
    const [imgIndex, setImgIndex] = useState(0);
    const navigate = useNavigate();

    const images = product.image ?? [];
    const status = product.status ? statusMap[product.status] : null;

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: '#7C2D3E' }}>
                    <ArrowBack />
                </IconButton>
            </Box>

            <Box sx={{ bgcolor: 'white', borderRadius: 3, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                    {/* Kiri: Image Slider */}
                    <Box sx={{ width: { xs: '100%', md: '42%' }, flexShrink: 0 }}>
                        <Box sx={{ position: 'relative', bgcolor: '#F5F5F5', aspectRatio: '1 / 1' }}>
                            {images.length > 0 ? (
                                <>
                                    <Box
                                        component="img"
                                        src={images[imgIndex].url}
                                        alt={images[imgIndex].alt ?? product.name}
                                        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />

                                    {images.length > 1 && (
                                        <>
                                            <IconButton
                                                onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                                                size="small"
                                                sx={{
                                                    position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                                                    bgcolor: 'rgba(0,0,0,0.35)', color: 'white',
                                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                                                }}
                                            >
                                                <ChevronLeft />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                                                size="small"
                                                sx={{
                                                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                                                    bgcolor: 'rgba(0,0,0,0.35)', color: 'white',
                                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                                                }}
                                            >
                                                <ChevronRight />
                                            </IconButton>

                                            <Box sx={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 0.75 }}>
                                                {images.map((_, i) => (
                                                    <Box
                                                        key={i}
                                                        onClick={() => setImgIndex(i)}
                                                        sx={{
                                                            width: i === imgIndex ? 20 : 8, height: 8,
                                                            borderRadius: 4,
                                                            bgcolor: i === imgIndex ? '#7C2D3E' : 'rgba(0,0,0,0.25)',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s ease',
                                                        }}
                                                    />
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                </>
                            ) : (
                                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography color="text.secondary">Tidak ada gambar</Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Thumbnail strip */}
                        {images.length > 1 && (
                            <Box sx={{ display: 'flex', gap: 1, p: 2, overflowX: 'auto' }}>
                                {images.map((img, i) => (
                                    <Box
                                        key={i}
                                        component="img"
                                        src={img.url}
                                        alt={img.alt}
                                        onClick={() => setImgIndex(i)}
                                        sx={{
                                            width: 64, height: 64, objectFit: 'cover',
                                            borderRadius: 1.5, flexShrink: 0, cursor: 'pointer',
                                            border: '2px solid',
                                            borderColor: i === imgIndex ? '#7C2D3E' : 'transparent',
                                            opacity: i === imgIndex ? 1 : 0.55,
                                            transition: 'all 0.2s ease',
                                        }}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>

                    {/* Kanan: Info */}
                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1, gap: 2 }}>
                                <Typography variant="h5" fontWeight={700}>{product.name}</Typography>
                                {status && <Chip label={status.label} color={status.color} size="small" />}
                            </Box>

                            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                SKU: {product.sku ?? '-'}
                            </Typography>

                            <Typography variant="h4" fontWeight={800} color="#7C2D3E" sx={{ mb: 3 }}>
                                Rp {product.price.toLocaleString('id-ID')}
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Row label="Kategori" value={product.category} />
                                <Row label="Tipe Produk" value={(product as Record<string, unknown>).type_product as string | undefined} />
                                <Row label="Stok" value={String(product.stock)} />
                                <Row label="Satuan" value={product.unit} />
                                <Row label="Merk" value={product.brand} />
                                {product.cost_price != null && (
                                    <Row label="Harga Modal" value={`Rp ${product.cost_price.toLocaleString('id-ID')}`} />
                                )}
                                {product.created_at && (
                                    <Row label="Dibuat" value={new Date(product.created_at).toLocaleDateString('id-ID')} />
                                )}
                            </Box>

                            {product.description && (
                                <>
                                    <Divider sx={{ my: 3 }} />
                                    <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>Deskripsi</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                        {product.description}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
