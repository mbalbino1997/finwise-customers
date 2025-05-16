// src/components/PromotionsCarousel.jsx
import React from 'react';
import Slider from 'react-slick';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    CardMedia,
    useTheme,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function PromotionsCarousel({ promotions }) {
    const theme = useTheme();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 960, settings: { slidesToShow: 2 } },
            { breakpoint: 600, settings: { slidesToShow: 1 } },
        ],
    };

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

    if (!promotions || promotions.length === 0) {
        return <Typography align="center">Nessuna promozione disponibile.</Typography>;
    }

    return (
        <Box>
            <Slider {...settings}>
                {promotions.map((promo) => (
                    <Box key={promo.id} px={2}>
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: 4,
                                boxShadow: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                backgroundColor: theme.palette.background.paper,
                            }}
                        >
                            {/* Optional Image Placeholder */}
                            <CardMedia
                                component="img"
                                height="180"
                                image="/assets/promo-placeholder.jpg" // fallback
                                alt={promo.name}
                                sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                                    {promo.name}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {promo.description}
                                </Typography>
                                <Chip
                                    icon={<CalendarMonthIcon />}
                                    label={`Dal ${promo.startDate} al ${promo.endDate}`}
                                    sx={{ mb: 1 }}
                                    color="primary"
                                />
                                <Chip
                                    label={`Destinata a: ${getAudienceLabel(promo.applicableTo)}`}
                                    color="secondary"
                                    variant="outlined"
                                />
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}
