import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ mt: 8, py: 4, backgroundColor: 'primary.main', color: 'primary.contrastText' }}>
            <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()} Finwise. Tutti i diritti riservati.
                </Typography>
            </Container>
        </Box>
    );
}