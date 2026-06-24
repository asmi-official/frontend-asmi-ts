import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import FormProduct from '../../components/Product/FormProduct';
import type { FormProductValues } from '../../components/Product/formProductConfig';

function CreateProductPage() {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormProductValues>({
        defaultValues: {
            product_name: '',
            sku: '',
            category: '',
            product_type: '',
            description: '',
            selling_price: '',
            cogs: '',
            on_hand_qty: '',
            reorder_point: '',
            uom: '',
            brand: '',
            images: [],
            qty_per_carton: '',
            carton_stock: '',
        },
    });

    const onSubmit = (data: FormProductValues) => {
        console.log('Create product:', data);
        // TODO: panggil API create di sini
        navigate('/product');
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <IconButton onClick={() => navigate('/product')} sx={{ color: '#7C2D3E' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight={700}>
                    Tambah Produk Baru
                </Typography>
            </Box>

            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormProduct
                        action='CREATE'
                        control={control}
                        errors={errors}
                        onCancel={() => navigate('/product')}
                        submitLabel="Simpan Produk"
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default function CreateProduct() {
    return (
        <DashboardLayout>
            <CreateProductPage />
        </DashboardLayout>
    );
}
