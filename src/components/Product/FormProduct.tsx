import { useRef } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import {
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Paper,
    InputAdornment,
    IconButton,
    Chip,
} from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { categoryOptions, typeOptions, uomOptions } from './formProductConfig';
import type { FormProductValues } from './formProductConfig';
import SearchableSelect from '../Global/SearchableSelect';

const MAX_IMAGES = 10;
const MIN_IMAGES = 1;

interface FormProductProps {
    control: Control<FormProductValues>;
    errors: FieldErrors<FormProductValues>;
    onCancel?: () => void;
    submitLabel?: string;
    action: "CREATE" | "EDIT" | "VIEW";
}

export default function FormProduct({ control, errors, onCancel, submitLabel = 'Simpan Produk', action }: FormProductProps) {
    const watchCategory = useWatch({ control, name: 'category' });
    const watchType = useWatch({ control, name: 'product_type' });
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

            {/* Section: Product Images */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Product Images <Box component="span" sx={{ color: 'error.main' }}>*</Box>
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
                                                    label="Primary"
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
                                            Upload
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
                                        : `${files.length}/${MAX_IMAGES} images • First image will be the primary`}
                                </Typography>
                            </Box>
                        </Box>
                    );
                }}
            />

            <Divider sx={{ my: 3 }} />

            {/* Section: General Information */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                General Information
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Controller
                        name="product_name"
                        control={control}
                        rules={{ required: 'Product name is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Product Name"
                                size="small"
                                required
                                error={!!errors.product_name}
                                helperText={errors.product_name?.message}
                            />
                        )}
                    />
                    {action !== 'CREATE' && (
                        <Controller
                            name="sku"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth label="SKU" size="small" placeholder="e.g. ASMI-PRF-001" disabled />
                            )}
                        />
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                            <SearchableSelect
                                fullWidth
                                options={categoryOptions}
                                value={field.value}
                                onChange={field.onChange}
                                label="Category"
                                placeholder="Search category..."
                                required
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            />
                        )}
                    />

                    <Controller
                        name="product_type"
                        control={control}
                        rules={{ required: 'Product type is required' }}
                        render={({ field }) => (
                            <SearchableSelect
                                fullWidth
                                options={typeOptions}
                                value={field.value}
                                onChange={field.onChange}
                                label="Product Type"
                                placeholder="Search product type..."
                                required
                                error={!!errors.product_type}
                                helperText={errors.product_type?.message}
                            />
                        )}
                    />
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Controller
                        name="brand"
                        control={control}
                        rules={{ required: 'Brand is required' }}
                        render={({ field }) => (
                            <TextField {...field} fullWidth label="Brand" size="small" required error={!!errors.brand} helperText={errors.brand?.message} />
                        )}
                    />
                    <Controller
                        name="uom"
                        control={control}
                        render={({ field }) => (
                            <SearchableSelect
                                fullWidth
                                options={uomOptions}
                                value={field.value}
                                onChange={field.onChange}
                                label="UoM (Unit of Measure)"
                                placeholder="Search unit..."
                            />
                        )}
                    />
                </Box>

                <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Description is required' }}
                    render={({ field }) => (
                        <TextField {...field} fullWidth label="Description" size="small" multiline minRows={3} maxRows={12} required error={!!errors.description} helperText={errors.description?.message} />
                    )}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Section: Pricing */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Pricing
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Controller
                    name="selling_price"
                    control={control}
                    rules={{
                        required: 'Selling price is required',
                        min: { value: 1, message: 'Price must be greater than 0' },
                    }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="Selling Price"
                            size="small"
                            required
                            error={!!errors.selling_price}
                            helperText={errors.selling_price?.message}
                            value={field.value ? Number(field.value).toLocaleString('id-ID') : ''}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\./g, '');
                                if (raw === '' || /^\d+$/.test(raw)) field.onChange(raw === '' ? '' : Number(raw));
                            }}
                            slotProps={{
                                input: { startAdornment: <InputAdornment position="start">Rp</InputAdornment> },
                            }}
                        />
                    )}
                />
                <Controller
                    name="cogs"
                    control={control}
                    rules={{
                        required: 'COGS is required',
                        min: { value: 1, message: 'Price must be greater than 0' },
                    }}
                    render={({ field }) => (
                        <TextField
                            fullWidth
                            label="COGS / HPP"
                            size="small"
                            required
                            error={!!errors.cogs}
                            helperText={errors.cogs?.message}
                            value={field.value ? Number(field.value).toLocaleString('id-ID') : ''}
                            onChange={(e) => {
                                const raw = e.target.value.replace(/\./g, '');
                                if (raw === '' || /^\d+$/.test(raw)) field.onChange(raw === '' ? '' : Number(raw));
                            }}
                            slotProps={{
                                input: { startAdornment: <InputAdornment position="start">Rp</InputAdornment> },
                            }}
                        />
                    )}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Section: Inventory */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Inventory
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Controller
                    name="on_hand_qty"
                    control={control}
                    rules={{
                        required: 'On-Hand Qty is required',
                        min: { value: 0, message: 'Value cannot be negative' },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="On-Hand Qty"
                            size="small"
                            type="number"
                            required
                            error={!!errors.on_hand_qty}
                            helperText={errors.on_hand_qty?.message ?? 'Current physical stock available'}
                        />
                    )}
                />
                <Controller
                    name="reorder_point"
                    control={control}
                    rules={{
                        required: 'Reorder Point is required',
                        min: { value: 0, message: 'Value cannot be negative' },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Reorder Point (ROP)"
                            size="small"
                            type="number"
                            required
                            error={!!errors.reorder_point}
                            helperText={errors.reorder_point?.message ?? 'Minimum stock level before reorder'}
                        />
                    )}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Section: Carton */}
            <Typography variant="subtitle2" fontWeight={700} color="#7C2D3E" sx={{ mb: 2 }}>
                Carton
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <Controller
                    name="qty_per_carton"
                    control={control}
                    rules={{
                        required: 'Qty per carton is required',
                        min: { value: 1, message: 'Minimum 1' },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Qty per Carton"
                            size="small"
                            type="number"
                            required
                            error={!!errors.qty_per_carton}
                            helperText={errors.qty_per_carton?.message ?? 'Number of units in 1 carton'}
                            slotProps={{
                                input: { endAdornment: <InputAdornment position="end">unit</InputAdornment> },
                            }}
                        />
                    )}
                />
                <Controller
                    name="carton_stock"
                    control={control}
                    rules={{
                        required: 'Carton stock is required',
                        min: { value: 0, message: 'Value cannot be negative' },
                    }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            label="Carton Stock"
                            size="small"
                            type="number"
                            required
                            error={!!errors.carton_stock}
                            helperText={errors.carton_stock?.message ?? 'Total cartons available in warehouse'}
                            slotProps={{
                                input: { endAdornment: <InputAdornment position="end">ctn</InputAdornment> },
                            }}
                        />
                    )}
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Summary */}
            {(selectedCategory || selectedType) && (
                <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: '#fafafa' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 1, display: 'block' }}>
                        SELECTION SUMMARY
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        {selectedCategory && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">Category</Typography>
                                <Typography variant="body2" fontWeight={700}>{selectedCategory.label}</Typography>
                                <Typography variant="caption" color="text.secondary">{selectedCategory.description}</Typography>
                            </Box>
                        )}
                        {selectedType && (
                            <Box>
                                <Typography variant="body2" color="text.secondary">Product Type</Typography>
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
                        Cancel
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
