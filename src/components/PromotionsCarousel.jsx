import React from 'react';
import Slider from 'react-slick';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    useTheme,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

const GradientCard = styled(Card)(({ theme }) => ({
    borderRadius: 16,
    background: 'linear-gradient(135deg, #7280c3, #ffa3ff)',
    color: '#fff',
    padding: theme.spacing(2),
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    minHeight: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}));

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

export default function PromotionsCarousel({ promotions }) {
    const theme = useTheme();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '120px', // mostra bordi delle card accanto
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: null,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    centerPadding: '60px',
                },
            },
            {
                breakpoint: 600,
                settings: {
                    centerPadding: '0px',
                },
            },
        ],
    };

    if (!promotions || promotions.length === 0) {
        return <Typography align="center">Nessuna promozione disponibile.</Typography>;
    }

    return (
        <Box>
            <Slider {...settings}>
                {promotions.map((promo, index) => (
                    <Box key={promo.id} px={1}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GradientCard>
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
                                        sx={{ mb: 1, mr: 1, color: '#fff', borderColor: '#fff' }}
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={`Destinata a: ${getAudienceLabel(promo.applicableTo)}`}
                                        sx={{ color: '#fff', borderColor: '#fff' }}
                                        variant="outlined"
                                    />
                                </CardContent>
                            </GradientCard>
                        </motion.div>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

// Freccia custom con doppia >>
function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                right: 10,
                zIndex: 10,
                fontSize: 24,
                color: '#fff',
                cursor: 'pointer',
            }}
        >
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{'>>'}</span>
        </div>
    );
}