import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';
import { Box, Container, Typography, Chip, Stack, Button } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import OffersCarousel from '../components/OffersCarousel';
import PromotionsCarousel from '../components/PromotionsCarousel'; // nuovo componente

export default function HomePage() {
    const [accounts, setAccounts] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const { isLoading, setIsLoading } = useContext(GlobalContext);

    useEffect(() => {
        const fetchHomepageData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get('/api/bankaccount');
                const { accounts, promotions } = res.data;
                setAccounts(accounts || []);
                setPromotions(promotions || []);
            } catch {
                setAccounts([]);
                setPromotions([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchHomepageData();
    }, [setIsLoading]);

    return (
        <>
            {/* BOTTONE AREA PERSONALE */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 20,
                    right: 20,
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    borderRadius: 1,
                    p: 1,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    zIndex: 9999,
                }}
            >
                <Button variant="contained" color="secondary">
                    Accedi alla tua area personale
                </Button>
            </Box>

            {/* HERO SECTION */}
            <Box
                id="hero"
                sx={{
                    height: 500,
                    backgroundImage: 'url(/assets/hero-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                    textAlign: 'center',
                    marginBottom: 2.5,
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ backdropFilter: 'blur(4px)', p: 4, borderRadius: 2 }}>
                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Abbraccia il futuro delle tue finanze
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4 }}>
                            Unisciti a migliaia di clienti soddisfatti e scopri la libertà di gestire il tuo denaro con semplicità.
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                            <Chip icon={<EmojiPeopleIcon />} label="10k+ clienti" color="secondary" />
                            <Chip icon={<TrendingUpIcon />} label="Crescita garantita" color="secondary" />
                            <Chip icon={<BusinessCenterIcon />} label="Digital banking" color="secondary" />
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* OFFERS SECTION */}
            <Box
                id="offers"
                sx={{
                    py: 8,
                    px: { xs: 2, md: 8 },
                    backgroundColor: 'secondary.main',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 800,
                        mb: 6,
                        fontFamily: 'Aeonik Pro Capitalised", sans-serif',
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        color: 'common.white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        transform: 'perspective(500px) rotateX(5deg)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                    }}
                >
                    Offerte in evidenza
                </Typography>

                {isLoading ? (
                    <Typography align="center">Caricamento offerte...</Typography>
                ) : (
                    <OffersCarousel accounts={accounts} />
                )}
            </Box>

            {/* PROMOTIONS SECTION */}
            <Box
                id="promotions"
                sx={{
                    py: 8,
                    px: { xs: 2, md: 8 },
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: 800,
                        mb: 6,
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: { xs: '2.5rem', md: '4rem' },
                        color: 'primary.main',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                    }}
                >
                    Promozioni Attive
                </Typography>

                {isLoading ? (
                    <Typography align="center">Caricamento promozioni...</Typography>
                ) : (
                    <PromotionsCarousel promotions={promotions} />
                )}
            </Box>
        </>
    );
}
