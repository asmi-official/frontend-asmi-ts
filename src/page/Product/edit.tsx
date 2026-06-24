import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Paper, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import FormProduct from '../../components/Product/FormProduct';
import type { FormProductValues } from '../../components/Product/formProductConfig';

// TODO: ganti dengan API call sesungguhnya
const DUMMY_PRODUCT: FormProductValues = {
    product_name: 'ASMI Noir Edition',
    sku: 'ASMI-PRF-001',
    category: 'Man',
    product_type: 'Exclusive',
    description: 'Parfum eksklusif dengan aroma oud dan musk yang tahan lama.',
    selling_price: 350000,
    cogs: 180000,
    on_hand_qty: 42,
    reorder_point: 10,
    uom: 'pcs',
    brand: 'ASMI',
    images: [],
    qty_per_carton: 24,
    carton_stock: 5,
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <IconButton onClick={() => navigate('/product')} sx={{ color: '#7C2D3E' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" fontWeight={700}>
                    Edit Produk
                </Typography>
            </Box>

            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <FormProduct
                        action='EDIT'
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
