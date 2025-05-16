import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    useTheme,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { motion } from 'framer-motion';

const getAudienceLabel = (audience) => {
    switch (audience) {
        case 'personal':
            return 'Privati';
        case 'business':
            return 'Aziende';
        case 'both':
        default:
            return 'Tutti';
    }
};

export default function PromotionsList({ promotions }) {
    const theme = useTheme();

    if (!promotions || promotions.length === 0) {
        return <Typography align="center">Nessuna promozione disponibile.</Typography>;
    }

    return (
        <Box display="flex" flexDirection="column" gap={6}>
            {promotions.map((promo, index) => (
                <motion.div
                    key={promo.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                    }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <Card
                        sx={{
                            width: '100%',
                            borderRadius: 4,
                            boxShadow: 6,
                            backgroundColor: '#c0c0c0', // grigio metallico
                            color: '#000',
                        }}
                    >
                        <CardContent>
                            <Typography variant="h5" fontWeight={700} gutterBottom>
                                {promo.name}
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                {promo.description}
                            </Typography>
                            <Chip
                                icon={<CalendarMonthIcon />}
                                label={`Dal ${promo.startDate} al ${promo.endDate}`}
                                sx={{ mb: 1, mr: 1 }}
                                color="primary"
                            />
                            <Chip
                                label={`Destinata a: ${getAudienceLabel(promo.applicableTo)}`}
                                color="secondary"
                                variant="outlined"
                            />
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </Box>
    );
}
