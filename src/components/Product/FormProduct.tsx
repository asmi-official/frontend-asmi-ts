import { useRef } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    FormHelperText,
    Paper,
    InputAdornment,
    IconButton,
    Chip,
} from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { categoryOptions, typeOptions } from './formProductConfig';
import type { FormProductValues } from './formProductConfig';

const MAX_IMAGES = 10;
const MIN_IMAGES = 1;

interface FormProductProps {
    control: Control<FormProductValues>;
    errors: FieldErrors<FormProductValues>;
    onCancel?: () => void;
    submitLabel?: string;
}

export default function FormProduct({ control, errors, onCancel, submitLabel = 'Simpan Produk' }: FormProductProps) {
    const watchCategory = useWatch({ control, name: 'category' });
    const watchType = useWatch({ control, name: 'type_product' });
    const selectedCategory = categoryOptions.find((o) => o.value === watchCategory);
    const selectedType = typeOptions.find((o) => o.value === watchType);

    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <Box>
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 3,
                    pb: 2.5,
                    borderBottom: '2px solid',
                    borderColor: '#7C2D3E',
                }}
            >
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: '#7C2D3E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <InventoryOutlinedIcon sx={{ color: '#fff', fontSize: 22 }} />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight={700} color="#7C2D3E" lineHeight={1.2}>
                        Informasi Produk
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Lengkapi semua informasi produk dengan benar
                    </Typography>
                </Box>
            </Box>

            {/* Section: Upload Gambar */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Foto Produk
            </Typography>

            <Controller
                name="images"
                control={control}
                rules={{
                    validate: (files: File[]) => {
                        if (!files || files.length < MIN_IMAGES) return `Minimal ${MIN_IMAGES} foto produk wajib diunggah`;
                        return true;
                    },
                }}
                render={({ field }) => {
                    const files: File[] = field.value ?? [];

                    const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const selected = Array.from(e.target.files ?? []);
                        const merged = [...files, ...selected].slice(0, MAX_IMAGES);
                        field.onChange(merged);
                        e.target.value = '';
                    };

                    const handleRemove = (index: number) => {
                        const next = files.filter((_, i) => i !== index);
                        field.onChange(next);
                    };

                    return (
                        <Box>
                            {/* Preview grid */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 1.5 }}>
                                {files.map((file, idx) => {
                                    const url = URL.createObjectURL(file);
                                    return (
                                        <Box
                                            key={idx}
                                            sx={{
                                                position: 'relative',
                                                width: 90,
                                                height: 90,
                                                borderRadius: 2,
                                                overflow: 'hidden',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <img
                                                src={url}
                                                alt={`preview-${idx}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => handleRemove(idx)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 2,
                                                    right: 2,
                                                    bgcolor: 'rgba(0,0,0,0.55)',
                                                    color: '#fff',
                                                    p: 0.3,
                                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                                                }}
                                            >
                                                <CloseIcon sx={{ fontSize: 14 }} />
                                            </IconButton>
                                            {idx === 0 && (
                                                <Chip
                                                    label="Utama"
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        bottom: 4,
                                                        left: 4,
                                                        fontSize: 9,
                                                        height: 18,
                                                        bgcolor: '#7C2D3E',
                                                        color: '#fff',
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    );
                                })}

                                {/* Add button */}
                                {files.length < MAX_IMAGES && (
                                    <Box
                                        onClick={() => fileInputRef.current?.click()}
                                        sx={{
                                            width: 90,
                                            height: 90,
                                            borderRadius: 2,
                                            border: '2px dashed',
                                            borderColor: errors.images ? 'error.main' : '#7C2D3E',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: errors.images ? 'error.main' : '#7C2D3E',
                                            '&:hover': { bgcolor: 'rgba(124,45,62,0.05)' },
                                        }}
                                    >
                                        <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 28 }} />
                                        <Typography variant="caption" fontWeight={600} mt={0.3}>
                                            Tambah
                                        </Typography>
                                    </Box>
                                )}
                            </Box>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={handleAddFiles}
                            />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="caption" color={errors.images ? 'error' : 'text.secondary'}>
                                    {errors.images
                                        ? (errors.images as { message?: string }).message
                                        : `${files.length}/${MAX_IMAGES} foto • Foto pertama jadi gambar utama`}
                                </Typography>
                            </Box>
                        </Box>
                    );
                }}
            />

            <Divider sx={{ my: 3 }} />

            {/* Section: Info Dasar */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Informasi Dasar
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Nama produk wajib diisi' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Nama Produk"
                                size="small"
                                required
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        name="sku"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="SKU" size="small" placeholder="Contoh: ASMI-PRF-001" />
                        )}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    {/* Dropdown Category */}
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: 'Kategori wajib dipilih' }}
                        render={({ field }) => (
                            <FormControl fullWidth size="small" error={!!errors.category} required>
                                <InputLabel>Kategori</InputLabel>
                                <Select
                                    {...field}
                                    label="Kategori"
                                    renderValue={(val) => categoryOptions.find((o) => o.value === val)?.label ?? val}
                                >
                                    {categoryOptions.map((opt) => (
                                        <MenuItem key={opt.value} value={opt.value}>
                                            <Box>
                                                <Typography variant="body2" fontWeight={600}>{opt.label}</Typography>
                                                <Typography variant="caption" color="text.secondary">{opt.description}</Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.category && <FormHelperText>{errors.category.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />

                    {/* Dropdown Type Product */}
                    <Controller
                        name="type_product"
                        control={control}
                        rules={{ required: 'Tipe produk wajib dipilih' }}
                        render={({ field }) => (
                            <FormControl fullWidth size="small" error={!!errors.type_product} required>
                                <InputLabel>Tipe Produk</InputLabel>
                                <Select
                                    {...field}
                                    label="Tipe Produk"
                                    renderValue={(val) => typeOptions.find((o) => o.value === val)?.label ?? val}
                                >
                                    {typeOptions.map((opt) => (
                                        <MenuItem key={opt.value} value={opt.value}>
                                            <Box>
                                                <Typography variant="body2" fontWeight={600}>{opt.label}</Typography>
                                                <Typography variant="caption" color="text.secondary">{opt.description}</Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.type_product && <FormHelperText>{errors.type_product.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Controller
                        name="brand"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Merk" size="small" />
                        )}
                    />
                    <Controller
                        name="unit"
                        control={control}
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Satuan" size="small" placeholder="pcs, box, kg, dll" />
                        )}
                    />
                </Box>

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <TextField {...field} fullWidth label="Deskripsi" size="small" multiline rows={3} />
                    )}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Section: Harga */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Harga
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Controller
                    name="price"
                    control={control}
                    rules={{
                        required: 'Harga wajib diisi',
                        min: { value: 1, message: 'Harga harus lebih dari 0' },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Harga Jual"
                            size="small"
                            required
                            type="number"
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            slotProps={{
                                input: { startAdornment: <InputAdornment position="start">Rp</InputAdornment> },
                            }}
                        />
                    )}
                />
                <Controller
                    name="cost_price"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Harga Modal"
                            size="small"
                            type="number"
                            slotProps={{
                                input: { startAdornment: <InputAdornment position="start">Rp</InputAdornment> },
                            }}
                        />
                    )}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Section: Stok */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Stok
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Controller
                    name="stock"
                    control={control}
                    rules={{ min: { value: 0, message: 'Stok tidak boleh negatif' } }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Stok"
                            size="small"
                            type="number"
                            error={!!errors.stock}
                            helperText={errors.stock?.message}
                        />
                    )}
                />
                <Controller
                    name="min_stock"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Minimum Stok"
                            size="small"
                            type="number"
                            helperText="Notifikasi muncul jika stok di bawah ini"
                        />
                    )}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Preview pilihan dropdown */}
            {(selectedCategory || selectedType) && (
                <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: '#fafafa' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
                        RINGKASAN PILIHAN
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        {selectedCategory && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">Kategori</Typography>
                                <Typography variant="body2" fontWeight={700}>{selectedCategory.label}</Typography>
                                <Typography variant="caption" color="text.secondary">{selectedCategory.description}</Typography>
                            </Box>
                        )}
                        {selectedType && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">Tipe Produk</Typography>
                                <Typography variant="body2" fontWeight={700}>{selectedType.label}</Typography>
                                <Typography variant="caption" color="text.secondary">{selectedType.description}</Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            )}

            {/* Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {onCancel && (
                    <Button variant="outlined" onClick={onCancel} sx={{ borderColor: '#7C2D3E', color: '#7C2D3E' }}>
                        Batal
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: '#7C2D3E', '&:hover': { bgcolor: '#5f0000' } }}
                >
                    {submitLabel}
                </Button>
            </Box>
        </Box>
    );
}
