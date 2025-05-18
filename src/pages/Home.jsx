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
    Modal,
    TextField,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import OffersCarousel from '../components/OffersCarousel';
import PromotionsCarousel from '../components/PromotionsCarousel';
import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [accounts, setAccounts] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const { isLoading, setIsLoading } = useContext(GlobalContext);
    const [promoTitleVisible, setPromoTitleVisible] = useState(false);
    const promoRef = useRef(null);
    const [openLogin, setOpenLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setPromoTitleVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );
        if (promoRef.current) observer.observe(promoRef.current);
        return () => { if (promoRef.current) observer.unobserve(promoRef.current); };
    }, []);

    const handleOpenLogin = () => setOpenLogin(true);
    const handleClose = () => {
        setOpenLogin(false);
        setUsername('');
        setPassword('');
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const resp = await axios.get('/api/profile', {
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
                },
            });
            sessionStorage.setItem('token', resp.data.token);
            handleClose();
            navigate('/profile');
        } catch {
            setError('Credenziali errate, riprova');
        }
    };

    return (
        <>
            {/* PERSONALE BUTTON */}
            <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1400 }}>
                <Button variant="contained" color="secondary" onClick={handleOpenLogin}>
                    Accedi alla tua area personale
                </Button>
            </Box>

            {/* LOGIN MODAL */}
            <Modal open={openLogin} onClose={handleClose}>
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: 300, bgcolor: 'background.paper', p: 4, borderRadius: 2,
                        boxShadow: 24,
                        background: 'linear-gradient(135deg, #7b1fa2 0%, #9c27b0 100%)',
                        display: 'flex', flexDirection: 'column', gap: 2,
                    }}
                >
                    {/* Close Button */}
                    <IconButton
                        size="small"
                        onClick={handleClose}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'common.white' }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" align="center" sx={{ color: 'common.white', mb: 1 }}>
                        Login
                    </Typography>
                    <TextField
                        fullWidth
                        variant="filled"
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        InputLabelProps={{ style: { color: 'rgba(255,255,255,0.8)' } }}
                        sx={{ input: { color: 'common.white' }, '& .MuiFilledInput-root': { background: 'rgba(255,255,255,0.2)' } }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        InputLabelProps={{ style: { color: 'rgba(255,255,255,0.8)' } }}
                        sx={{ input: { color: 'common.white' }, '& .MuiFilledInput-root': { background: 'rgba(255,255,255,0.2)' } }}
                    />
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    <Button type="submit" variant="contained" fullWidth>
                        Accedi
                    </Button>
                </Box>
            </Modal>

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
