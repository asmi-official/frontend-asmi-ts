import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
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
            name: '',
            sku: '',
            category: '',
            type_product: '',
            description: '',
            price: '',
            cost_price: '',
            stock: '',
            min_stock: '',
            unit: '',
            brand: '',
            images: [],
        },
    });

    const onSubmit = (data: FormProductValues) => {
        console.log('Create product:', data);
        // TODO: panggil API create di sini
        navigate('/product');
    };

    return (
        <Box>

            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Tambah Produk Baru
            </Typography>

            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormProduct
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
