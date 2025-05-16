import React from 'react';
import { Box, Container, Typography, Grid, Link, Button } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ mt: 8, py: 6, backgroundColor: '#212121', color: '#fff' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                            Finwise S.p.A.
                        </Typography>
                        <Typography variant="body2">
                            Via Roma 123, 00100 Roma, Italia
                        </Typography>
                        <Typography variant="body2">P.IVA 01234567890</Typography>
                        <Typography variant="body2">Cod. ABI 1234 - CAB 56789</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                            Contatti
                        </Typography>
                        <Typography variant="body2">Assistenza Clienti: 800-123-456</Typography>
                        <Typography variant="body2">Help Desk H24: +39 06 1234 5678</Typography>
                        <Typography variant="body2">Email: <Link href="mailto:assistenza@finwise.it" color="inherit">assistenza@finwise.it</Link></Typography>
                        <Button variant="outlined" size="small" sx={{ mt: 1, color: '#fff', borderColor: '#fff' }}>
                            Chat Live
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                            Link Utili
                        </Typography>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
                            FAQ
                        </Link>
                        <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
                            Termini e Condizioni
                        </Link>
                        <Link href="#" color="inherit" display="block">
                            Privacy Policy
                        </Link>
                    </Grid>
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="body2">© {new Date().getFullYear()} Finwise. Tutti i diritti riservati.</Typography>
                </Box>
            </Container>
        </Box>
    );
}