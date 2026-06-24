import { useForm, Controller } from 'react-hook-form';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import type { Product } from './types';

export interface DiscountFormValues {
    name: string;
    description: string;
    percentage: number | '';
    start_date: string;
    end_date: string;
}

interface DiscountDialogProps {
    open: boolean;
    product: Product | null;
    onClose: () => void;
    onSubmit: (productId: string, values: DiscountFormValues) => void;
}

export default function DiscountDialog({ open, product, onClose, onSubmit }: DiscountDialogProps) {
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm<DiscountFormValues>({
        defaultValues: {
            name: '',
            description: '',
            percentage: '',
            start_date: '',
            end_date: '',
        },
    });

    const startDate = watch('start_date');

    const handleClose = () => {
        reset();
        onClose();
    };

    const handleFormSubmit = (values: DiscountFormValues) => {
        if (!product) return;
        onSubmit(product.id, values);
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                bgcolor: '#7C2D3E',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <LocalOfferOutlinedIcon sx={{ color: '#fff', fontSize: 18 }} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={700} color="#7C2D3E" lineHeight={1.2}>
                                Buat Diskon
                            </Typography>
                            {product && (
                                <Typography variant="caption" color="text.secondary">
                                    {product.name}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <IconButton size="small" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Nama diskon wajib diisi' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Nama Diskon"
                                size="small"
                                required
                                placeholder="Contoh: Diskon Lebaran 2025"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Deskripsi"
                                size="small"
                                multiline
                                minRows={2}
                                maxRows={5}
                                placeholder="Contoh: Diskon spesial dalam rangka Hari Raya Lebaran"
                            />
                        )}
                    />

                    <Controller
                        name="percentage"
                        control={control}
                        rules={{
                            required: 'Persentase wajib diisi',
                            min: { value: 1, message: 'Minimal 1%' },
                            max: { value: 100, message: 'Maksimal 100%' },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (e.target.value === '') return field.onChange('');
                                    if (val > 100) return;
                                    if (val < 0) return;
                                    field.onChange(val);
                                }}
                                fullWidth
                                label="Persentase Diskon"
                                size="small"
                                required
                                type="number"
                                placeholder="Contoh: 10"
                                error={!!errors.percentage}
                                helperText={errors.percentage?.message ?? 'Masukkan angka antara 1 - 100'}
                                slotProps={{
                                    input: { endAdornment: <InputAdornment position="end">%</InputAdornment> },
                                    htmlInput: { min: 1, max: 100 },
                                }}
                            />
                        )}
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Controller
                            name="start_date"
                            control={control}
                            rules={{
                                required: 'Tanggal mulai wajib diisi',
                                validate: (val) =>
                                    val >= new Date().toISOString().split('T')[0] || 'Tanggal mulai tidak boleh di masa lalu',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tanggal Mulai"
                                    size="small"
                                    required
                                    type="date"
                                    error={!!errors.start_date}
                                    helperText={errors.start_date?.message}
                                    slotProps={{
                                        inputLabel: { shrink: true },
                                        htmlInput: { min: new Date().toISOString().split('T')[0] },
                                    }}
                                />
                            )}
                        />

                        <Controller
                            name="end_date"
                            control={control}
                            rules={{
                                required: 'Tanggal selesai wajib diisi',
                                validate: (val) => {
                                    const today = new Date().toISOString().split('T')[0];
                                    if (val < today) return 'Tanggal selesai tidak boleh di masa lalu';
                                    if (startDate && val <= startDate) return 'Tanggal selesai harus setelah tanggal mulai';
                                    return true;
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Tanggal Selesai"
                                    size="small"
                                    required
                                    type="date"
                                    error={!!errors.end_date}
                                    helperText={errors.end_date?.message}
                                    slotProps={{
                                        inputLabel: { shrink: true },
                                        htmlInput: {
                                            min: startDate
                                                ? new Date(new Date(startDate).getTime() + 86400000).toISOString().split('T')[0]
                                                : new Date().toISOString().split('T')[0],
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button variant="outlined" onClick={handleClose} sx={{ borderColor: '#7C2D3E', color: '#7C2D3E' }}>
                    Batal
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit(handleFormSubmit)}
                    sx={{ bgcolor: '#7C2D3E', '&:hover': { bgcolor: '#5f0000' } }}
                >
                    Simpan Diskon
                </Button>
            </DialogActions>
        </Dialog>
    );
}
