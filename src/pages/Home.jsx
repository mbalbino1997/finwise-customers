import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Box,
    Typography,
    Chip,
    Stack,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

export default function HomePage() {
    const [accounts, setAccounts] = useState([]);
    const { isLoading, setIsLoading } = useContext(GlobalContext);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get('/api/bankaccount')
            .then((res) => {
                const data = res.data;
                if (Array.isArray(data)) {
                    setAccounts(data);
                } else if (Array.isArray(data.content)) {
                    setAccounts(data.content);
                } else {
                    console.error('Dati inattesi da API:', data);
                    setAccounts([]);
                }
            })
            .catch((err) => {
                console.error('Errore nel recupero:', err);
                setAccounts([]);
            })
            .finally(() => setIsLoading(false));
    }, [setIsLoading]);

    return (
        <>
            {/* HERO SECTION AGGIORNATA */}
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
                    px: 2,
                }}
            >
                <Box sx={{ backdropFilter: 'blur(4px)', p: 4, borderRadius: 2, maxWidth: 600 }}>
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
            </Box>

            {/* OFFERS SECTION */}
            <Container id="offers" sx={{ py: 8, backgroundColor: 'grey.100' }}>
                <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 6 }}>
                    Offerte in evidenza
                </Typography>
                {isLoading ? (
                    <Typography align="center">Caricamento offerte...</Typography>
                ) : (
                    <Grid container spacing={6}>
                        {accounts.map((account) => (
                            <Grid item xs={12} md={6} key={account.id}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        borderRadius: 4,
                                        boxShadow: 8,
                                        overflow: 'hidden',
                                        transition: 'transform 0.3s',
                                        '&:hover': { transform: 'scale(1.02)' },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{ width: { sm: 200 }, height: { xs: 180, sm: 'auto' } }}
                                        image={`/images/banks/${account.accountType.toLowerCase()}.jpg`}
                                        alt={account.accountType}
                                    />
                                    <CardContent sx={{ flex: 1 }}>
                                        <Chip
                                            icon={<StarIcon />}
                                            label="Top"
                                            color="secondary"
                                            size="small"
                                            sx={{ mb: 1 }}
                                        />
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                            Conto {account.accountType}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Promozione:</strong> {account.promotionNumber}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Canone:</strong> €{account.monthlyFee.toFixed(2)}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            <strong>Tasso interesse:</strong> {account.interestRate}%
                                        </Typography>
                                        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
                                            {account.cards?.map((card, index) => (
                                                <Chip
                                                    key={index}
                                                    icon={<CreditCardIcon />}
                                                    label={card.cardType}
                                                    variant="outlined"
                                                    color="primary"
                                                />
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </>
    );
}
