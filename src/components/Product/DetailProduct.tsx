import { useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Divider,
    IconButton,
    Paper,
} from '@mui/material';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { ChevronLeft, ChevronRight, ArrowBack } from '@mui/icons-material';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
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

function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {label}
            </Typography>
            <Box sx={{ mt: 0.5 }}>
                {typeof value === 'string' || typeof value === 'number' ? (
                    <Typography variant="body2" fontWeight={600}>{value}</Typography>
                ) : (
                    value
                )}
            </Box>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <IconButton onClick={() => navigate(-1)} sx={{ color: '#7C2D3E' }}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h6" fontWeight={700}>
                    Detail Produk
                </Typography>
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
                    <Box sx={{ flex: 1, p: 4 }}>

                        {/* Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, pb: 2.5, borderBottom: '2px solid', borderColor: '#7C2D3E' }}>
                            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#7C2D3E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <InventoryOutlinedIcon sx={{ color: '#fff', fontSize: 22 }} />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                    <Typography variant="h6" fontWeight={700} color="#7C2D3E" lineHeight={1.2}>
                                        {product.name}
                                    </Typography>
                                    {status && <Chip label={status.label} color={status.color} size="small" />}
                                </Box>
                                {product.sku && (
                                    <Typography variant="caption" color="text.secondary">SKU: {product.sku}</Typography>
                                )}
                            </Box>
                        </Box>

                        {/* Harga */}
                        <Box sx={{ display: 'flex', gap: 4, mb: product.discount ? 2 : 3, flexWrap: 'wrap' }}>
                            <Box>
                                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    Selling Price
                                </Typography>
                                {product.discount ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                        <Typography variant="h5" fontWeight={800} color="#7C2D3E">
                                            Rp {Math.round(product.price * (1 - product.discount.percentage / 100)).toLocaleString('id-ID')}
                                        </Typography>
                                        <Typography variant="body1" fontWeight={500} color="text.disabled" sx={{ textDecoration: 'line-through' }}>
                                            Rp {product.price.toLocaleString('id-ID')}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography variant="h5" fontWeight={800} color="#7C2D3E">
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </Typography>
                                )}
                            </Box>
                            {product.cost_price != null && (
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                        COGS / HPP
                                    </Typography>
                                    <Typography variant="h5" fontWeight={800} color="text.primary">
                                        Rp {product.cost_price.toLocaleString('id-ID')}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Diskon */}
                        {product.discount && (
                            <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, mb: 3, borderRadius: 2, borderColor: '#7C2D3E', bgcolor: '#fdf5f6' }}>
                                <LocalOfferOutlinedIcon sx={{ color: '#7C2D3E', fontSize: 20, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                                        <Typography variant="body2" fontWeight={700} color="#7C2D3E">
                                            {product.discount.name}
                                        </Typography>
                                        <Chip label={`-${product.discount.percentage}%`} size="small" sx={{ bgcolor: '#7C2D3E', color: '#fff', fontWeight: 700, height: 20, fontSize: 11 }} />
                                    </Box>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(product.discount.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        {' — '}
                                        {new Date(product.discount.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </Typography>
                                </Box>
                            </Paper>
                        )}

                        <Divider sx={{ mb: 3 }} />

                        {/* Info Grid 2 kolom */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2.5, mb: 3 }}>
                            <InfoItem
                                label="Kategori"
                                value={
                                    product.category
                                        ? <Chip label={product.category} size="small" sx={{ bgcolor: '#f3e8eb', color: '#7C2D3E', fontWeight: 600 }} />
                                        : <Typography variant="body2" color="text.disabled">-</Typography>
                                }
                            />
                            <InfoItem
                                label="Tipe Produk"
                                value={
                                    (product as Record<string, unknown>).type_product
                                        ? <Chip label={(product as Record<string, unknown>).type_product as string} size="small" sx={{ bgcolor: '#f3e8eb', color: '#7C2D3E', fontWeight: 600 }} />
                                        : <Typography variant="body2" color="text.disabled">-</Typography>
                                }
                            />
                            <InfoItem label="Brand" value={product.brand ?? '-'} />
                            <InfoItem label="UoM" value={product.unit ?? '-'} />
                            <InfoItem label="On-Hand Qty" value={`${product.stock} ${product.unit ?? ''}`} />
                            <InfoItem label="Reorder Point (ROP)" value={product.min_stock != null ? `${product.min_stock} ${product.unit ?? ''}` : '-'} />
                            <InfoItem label="Qty per Karton" value={product.qty_per_carton != null ? `${product.qty_per_carton} unit` : '-'} />
                            <InfoItem label="Stok Karton" value={product.carton_stock != null ? `${product.carton_stock} ctn` : '-'} />
                            {product.created_at && (
                                <InfoItem label="Created Date" value={new Date(product.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
                            )}
                            {product.updated_at && (
                                <InfoItem label="Last Modified" value={new Date(product.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
                            )}
                        </Box>

                        {/* Deskripsi */}
                        {product.description && (
                            <>
                                <Divider sx={{ mb: 3 }} />
                                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: '#fafafa' }}>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                                        Deskripsi
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                        {product.description}
                                    </Typography>
                                </Paper>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
