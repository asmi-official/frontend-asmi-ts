import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import FormProduct from '../../components/Product/FormProduct';
import type { FormProductValues } from '../../components/Product/formProductConfig';

// TODO: ganti dengan API call sesungguhnya
const DUMMY_PRODUCT: FormProductValues = {
    name: 'ASMI Noir Edition',
    sku: 'ASMI-PRF-001',
    category: 'Man',
    type_product: 'Exclusive',
    description: 'Parfum eksklusif dengan aroma oud dan musk yang tahan lama.',
    price: 350000,
    cost_price: 180000,
    stock: 42,
    min_stock: 10,
    unit: 'pcs',
    brand: 'ASMI',
    images: [],
};

function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isLoading },
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

    useEffect(() => {
        // TODO: fetch product by id lalu reset form dengan data-nya
        // contoh: fetchProduct(id).then(data => reset(data));
        console.log('Edit product id:', id);
        reset(DUMMY_PRODUCT);
    }, [id, reset]);

    const onSubmit = (data: FormProductValues) => {
        console.log('Update product:', data);
        // TODO: panggil API update di sini
        navigate(`/product/${id}`);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#7C2D3E' }} />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                Edit Produk
            </Typography>

            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormProduct
                        control={control}
                        errors={errors}
                        onCancel={() => navigate(`/product/${id}`)}
                        submitLabel="Simpan Perubahan"
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default function EditProduct() {
    return (
        <DashboardLayout>
            <EditProductPage />
        </DashboardLayout>
    );
}
