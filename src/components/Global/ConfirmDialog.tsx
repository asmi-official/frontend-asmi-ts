import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmDialogProps {
    open: boolean;
    id: string | null;
    title: string;
    message: string;
    confirmLabel?: string;
    onConfirm: (id: string) => void;
    onClose: () => void;
}

export default function ConfirmDialog({
    open,
    id,
    title,
    message,
    confirmLabel = 'Delete',
    onConfirm,
    onClose,
}: ConfirmDialogProps) {
    const handleConfirm = () => {
        if (!id) return;
        onConfirm(id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 2,
                                bgcolor: '#FEF2F2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <WarningAmberRoundedIcon sx={{ color: '#DC2626', fontSize: 20 }} />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={700} color="#DC2626">
                            {title}
                        </Typography>
                    </Box>
                    <IconButton size="small" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            </DialogTitle>

            <DialogContent dividers>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {message}
                </Typography>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button variant="outlined" onClick={onClose} sx={{ borderColor: 'divider', color: 'text.secondary' }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleConfirm}
                    sx={{ bgcolor: '#DC2626', '&:hover': { bgcolor: '#B91C1C' } }}
                >
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
