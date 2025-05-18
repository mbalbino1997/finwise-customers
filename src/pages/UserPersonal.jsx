import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './UserPersonal.css';

export default function UserPersonal() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) fetchProfile(token);
    }, []);

    const fetchProfile = async (token) => {
        try {
            const resp = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!resp.ok) throw new Error();
            const data = await resp.json();
            setProfile(data.profile);
        } catch {
            handleLogout();
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    };

    if (!profile) return null;

    return (
        <div className="user-page">
            {/* Banner */}
            <header className="banner">
                <h1>Benvenuto, {profile.firstName} {profile.lastName}</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </header>

            <div className="content">
                {/* Left: User Info */}
                <aside className="section user-info-card">
                    <Avatar className="avatar" alt="Avatar" src="/assets/avatar-placeholder.png" sx={{ width: 80, height: 80 }} />
                    <div className="info">
                        <p><strong>Data di nascita:</strong> {profile.birthDate}</p>
                        <p><strong>Range reddito:</strong> €{profile.incomeRange}</p>
                        <p><strong>Tolleranza rischio:</strong> {profile.riskTolerance}</p>
                        <p><strong>Ruoli:</strong> {profile.roles.join(', ')}</p>
                    </div>
                </aside>

                {/* Right: Card List */}
                <section className="section card-list">
                    <h2>Le mie carte</h2>
                    {profile.cards.map(card => (
                        <div
                            key={card.id}
                            className={`card-item ${selectedCard && selectedCard.id === card.id ? 'active' : ''}`}
                            onClick={() => { setSelectedCard(card); setShowDetails(false); }}
                        >
                            <div className="card-figure" />
                            <span className="card-mask">**** **** **** {card.cardNumber.slice(-4)}</span>
                        </div>
                    ))}
                </section>
            </div>

            {/* Card Detail Overlay */}
            {selectedCard && (
                <div className="card-detail">
                    <div className="card-large">
                        <p className="card-number">
                            {showDetails ? selectedCard.cardNumber : '**** **** **** ' + selectedCard.cardNumber.slice(-4)}
                        </p>
                        <div className="card-info-line">
                            <span className="expiry">
                                {showDetails ? selectedCard.expirationDate : '**/**'}
                            </span>
                            <span className="cvv">
                                {showDetails ? selectedCard.cvv : '***'}
                            </span>
                            <IconButton size="small" onClick={() => setShowDetails(!showDetails)}>
                                {showDetails ? <VisibilityOffIcon color="primary" /> : <VisibilityIcon color="primary" />}
                            </IconButton>
                        </div>
                    </div>
                    <div className="transactions">
                        <h3>Transazioni</h3>
                        {selectedCard.transactions.map(tx => (
                            <div key={tx.id} className="tx-item">
                                <span className={`amount ${tx.type === 'entrate' ? 'credit' : 'debit'}`}>
                                    €{tx.amount.toFixed(2)}
                                </span>
                                <div className="tx-info">
                                    <p>{tx.description}</p>
                                    <p className="date">{new Date(tx.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
