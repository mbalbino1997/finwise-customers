import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';
import {
    Box,
    Container,
    Typography,
    Chip,
    Stack,
    Button,
} from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import OffersCarousel from '../components/OffersCarousel';
import PromotionsCarousel from '../components/PromotionsCarousel';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [accounts, setAccounts] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const { isLoading, setIsLoading } = useContext(GlobalContext);
    const [promoTitleVisible, setPromoTitleVisible] = useState(false);
    const promoRef = useRef(null);

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

    // INTERSECTION OBSERVER LOGIC
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setPromoTitleVisible(entry.isIntersecting);
            },
            {
                threshold: 0.5, // si attiva quando metà è visibile
            }
        );

        if (promoRef.current) {
            observer.observe(promoRef.current);
        }

        return () => {
            if (promoRef.current) {
                observer.unobserve(promoRef.current);
            }
        };
    }, []);

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
                <Button component={Link}
                    to="/profile"
                    variant="contained"
                    color="secondary">
                    Accedi alla tua area personale
                </Button>
            </Box>

            {/* HERO SECTION */}
            <Box
                id="hero"
                sx={{
                    position: 'relative',
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
                    overflow: 'hidden',
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            backdropFilter: 'blur(4px)',
                            p: 4,
                            borderRadius: 2,
                            position: 'relative',
                        }}
                    >
                        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Abbraccia il futuro delle tue finanze
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 4 }}>
                            Unisciti a migliaia di clienti soddisfatti e scopri la libertà di
                            gestire il tuo denaro con semplicità.
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                            flexWrap="wrap"
                        >
                            <Chip icon={<EmojiPeopleIcon />} label="10k+ clienti" color="secondary" />
                            <Chip icon={<TrendingUpIcon />} label="Crescita garantita" color="secondary" />
                            <Chip icon={<BusinessCenterIcon />} label="Digital banking" color="secondary" />
                        </Stack>
                    </Box>
                </Container>

                {/* BANNER TOP */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 10,
                        left: 0,
                        width: '100%',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        py: 0.5,
                        whiteSpace: 'nowrap',
                        animation: 'scrollLeftToRight 20s linear infinite',
                        display: 'inline-block',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                        userSelect: 'none',
                    }}
                >
                    {'PartnerOne InnovateX NextGen FinTechPro AlphaCorp BetaSolutions GammaWorks DeltaDynamics EpsilonEnterprises ZetaSystems'
                        .split(' ')
                        .map((name, i) => (
                            <Typography component="span" key={i} sx={{ mx: 3 }}>
                                {name}
                            </Typography>
                        ))}
                </Box>

                {/* BANNER BOTTOM */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        width: '100%',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        py: 0.5,
                        whiteSpace: 'nowrap',
                        animation: 'scrollRightToLeft 20s linear infinite',
                        display: 'inline-block',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                        userSelect: 'none',
                    }}
                >
                    {'OmegaPartners SigmaGroup KappaTech LambdaLabs ThetaServices IotaInnovations NuVentures XiCorporation OmicronConsulting PiNetworks'
                        .split(' ')
                        .map((name, i) => (
                            <Typography component="span" key={i} sx={{ mx: 3 }}>
                                {name}
                            </Typography>
                        ))}
                </Box>

                <style>{`
          @keyframes scrollLeftToRight {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes scrollRightToLeft {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
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
                        fontFamily: '"Aeonik Pro Capitalised", sans-serif',
                        fontSize: { xs: '1rem', md: '3.2rem' },
                        color: 'common.white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                        transform: 'perspective(500px) rotateX(5deg)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                    }}
                >
                    OFFERTE IN EVIDENZA
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
                ref={promoRef}
                sx={{
                    py: 12,
                    px: { xs: 2, md: 8 },
                    backgroundColor: '#f5f5f5',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Split Animated Title */}
                <Box
                    sx={{
                        position: 'relative',
                        height: 120,
                        mb: 6,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: '50%',
                            transform: promoTitleVisible
                                ? 'translate(-50%, 0)'
                                : 'translate(-150%, -150%)',
                            transition: 'all 1.5s ease',
                            opacity: promoTitleVisible ? 1 : 0,
                            fontWeight: 'bold',
                            fontFamily: '"Aeonik Pro Capitalised", sans-serif',
                            fontSize: { xs: '1rem', md: '3.2rem' },
                            color: 'secondary.main',
                            fontWeight: 800,
                        }}
                    >
                        SCOPRI LE
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: '50%',
                            transform: promoTitleVisible
                                ? 'translate(50%, 0)'
                                : 'translate(150%, 150%)',
                            transition: 'all 1.5s ease',
                            opacity: promoTitleVisible ? 1 : 0,
                            fontWeight: 'bold',
                            fontFamily: '"Aeonik Pro Capitalised", sans-serif',
                            fontSize: { xs: '1rem', md: '3.2rem' },
                            color: 'secondary.main',
                            fontWeight: 800,
                        }}
                    >
                        NOSTRE PROMOZIONI
                    </Typography>
                </Box>

                {isLoading ? (
                    <Typography align="center">Caricamento promozioni...</Typography>
                ) : (
                    <PromotionsCarousel promotions={promotions} />
                )}
            </Box>
        </>
    );
}
