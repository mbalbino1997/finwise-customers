import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import BackgroundImage from '../assets/bank-bg.jpg';
import FinwiseLogo from './FinwiseLogo'; // 👈 Importa il logo SVG

export default function Header() {
    return (
        <Box
            component="header"
            sx={{
                position: 'relative',
                height: 320,
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* Overlay scuro */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            />

            {/* ✅ Logo posizionato */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 20,
                    left: 80,
                    zIndex: 10,
                }}
            >
            </Box>

            {/* Testi e bottoni */}
            <Container sx={{ position: 'relative', textAlign: 'center', color: 'common.white' }}>
                <Typography variant="h1" sx={{ fontWeight: 'bold', textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                    Finwise
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                    Il Conto Corrente Innovativo
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, mb: 3, textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                    Semplifica le tue finanze con promozioni dedicate e assistenza H24
                </Typography>
                <Box sx={{ display: 'inline-flex', gap: 2 }}>
                    <Button variant="contained" size="large" color="secondary">
                        Scopri di più
                    </Button>
                    <Button variant="outlined" size="large" color="inherit">
                        Apri Conto Ora
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}
