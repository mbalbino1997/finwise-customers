import React from 'react';
import Slider from 'react-slick';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Chip,
    useTheme,
    styled as muiStyled
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';

// Styled rectangular card (no rounded corners)
const GradientCard = styled(Card)(({ theme }) => ({
    borderRadius: 0,
    background: 'linear-gradient(135deg, #7280c3, #ffa3ff)',
    color: '#fff',
    padding: theme.spacing(2),
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    minHeight: 200,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // smooth hover transition
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)' // enhanced depth on hover
    }
}));

// Oval 3D badge in top-right for validity (purple background, white text and icon)
const ValidityBadge = muiStyled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: '#9c27b0',  // purple
    color: '#fff',
    fontWeight: 600,
    borderRadius: '999px',
    padding: '4px 12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transform: 'rotate(-2deg)',
    '& .MuiChip-icon': {
        marginRight: theme.spacing(0.5)
    },
    // ensure icon is white
    '& .MuiChip-icon > svg': {
        color: '#fff',
        fill: '#fff'
    }
}));

const getAudienceLabel = (audience) => {
    switch (audience) {
        case 'personal': return 'Privati';
        case 'business': return 'Aziende';
        case 'both':
        default: return 'Tutti';
    }
};

// Wrapper to overlay slides: main slide on top, others shifted
const SlideWrapper = styled(Box)(() => ({
    position: 'relative',
    padding: 0,
    boxSizing: 'border-box',
    '&.slick-slide': {
        transition: 'transform 0.5s',
    },
    '&.slick-slide:not(.slick-center)': {
        transform: 'translateX(-50%) scale(0.9)',
        zIndex: 1
    },
    '&.slick-center': {
        transform: 'translateX(0) scale(1)',
        zIndex: 2
    }
}));

export default function PromotionsCarousel({ promotions }) {
    const theme = useTheme();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: '0px',
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 960, settings: { slidesToShow: 1, centerMode: true } },
            { breakpoint: 600, settings: { slidesToShow: 1, centerMode: true } },
        ]
    };

    if (!promotions || promotions.length === 0) {
        return <Typography align="center">Nessuna promozione disponibile.</Typography>;
    }

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden', px: 3 }}>
            <Slider {...settings}>
                {promotions.map((promo) => (
                    <SlideWrapper key={promo.id} className="slick-slide">
                        <motion.div
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <GradientCard>
                                <ValidityBadge
                                    icon={<CalendarMonthIcon fontSize="small" />}
                                    label={`${promo.startDate} - ${promo.endDate}`}
                                    size="small"
                                />
                                <CardContent>
                                    <Typography variant="h5" fontWeight={700} gutterBottom>
                                        {promo.name}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {promo.description}
                                    </Typography>
                                    <Chip
                                        label={`Destinata a: ${getAudienceLabel(promo.applicableTo)}`}
                                        sx={{ mt: 1, color: '#fff', borderColor: '#fff' }}
                                        variant="outlined"
                                    />
                                </CardContent>
                            </GradientCard>
                        </motion.div>
                    </SlideWrapper>
                ))}
            </Slider>
        </Box>
    );
}

// Custom Arrows
function SampleNextArrow({ className, onClick }) {
    return (
        <div
            className={className}
            onClick={onClick}
            style={{ right: 10, zIndex: 10, fontSize: 24, color: '#fff', cursor: 'pointer' }}
        />
    );
}

function SamplePrevArrow({ className, onClick }) {
    return (
        <div
            className={className}
            onClick={onClick}
            style={{ left: 10, zIndex: 10, fontSize: 24, color: '#fff', cursor: 'pointer' }}
        />
    );
}
