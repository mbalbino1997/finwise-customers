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

            {/* Flip-Card Detail */}
            {selectedCard && (
                <div className="flip-card-detail">
                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <p className="heading_8264">{selectedCard.type ? selectedCard.type.toUpperCase() : 'CARD'}</p>
                                <svg className="logo" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
                                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                                </svg>
                                <svg className="chip" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50">
                                    <circle cx="25" cy="25" r="10" fill="#ccc" />
                                </svg>
                                <svg className="contactless" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 50 50">
                                    <path d="M10,25a1,1 0 0 1 10,0" stroke="#fff" strokeWidth="2" fill="none" />
                                </svg>
                                <p className="number">
                                    {showDetails ? selectedCard.cardNumber : '**** **** **** ' + selectedCard.cardNumber.slice(-4)}
                                </p>
                                <p className="valid_thru">VALID THRU</p>
                                <p className="date_8264">
                                    {showDetails ? selectedCard.expirationDate.replace('-', '/') : selectedCard.expirationDate.slice(2)}
                                </p>
                                <p className="name">{profile.firstName.toUpperCase()} {profile.lastName.toUpperCase()}</p>
                            </div>
                            <div className="flip-card-back">
                                <div className="strip" />
                                <div className="mstrip" />
                                <div className="sstrip">
                                    <p className="code">{showDetails ? selectedCard.cvv : '***'}</p>
                                </div>
                            </div>
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
