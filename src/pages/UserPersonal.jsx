import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

    const toggleDetails = (e) => {
        e.stopPropagation();
        setShowDetails(prev => !prev);
    };

    if (!profile) return null;

    return (
        <div className="user-page">
            <header className="banner">
                <h1>Benvenuto, {profile.firstName} {profile.lastName}</h1>
                <button className="Btn" onClick={handleLogout}>
                    <div className="sign">
                        <svg viewBox="0 0 512 512">
                            <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"></path>
                        </svg>
                    </div>
                    <div className="text">Logout</div>
                </button>
            </header>

            <div className="content layout-main">
                {/* Dati personali */}
                <aside className="section user-info-card">
                    <h3 className="personal-data-banner">I tuoi dati personali</h3>
                    {/* Icona utente personalizzata */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="avatar size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
                    <div className="info">
                        <p><strong>Data di nascita:</strong> {new Date(profile.birthDate).toLocaleDateString()}</p>
                        <p><strong>Range reddito:</strong> €{profile.incomeRange.toLocaleString()}</p>
                        <p><strong>Tolleranza rischio:</strong> {profile.riskTolerance}</p>
                        <p><strong>Ruoli:</strong> {profile.roles.join(', ')}</p>
                    </div>
                </aside>

                <section className="section card-list">
                    <h2>Le tue carte</h2>
                    <div className="cards-container">
                        {profile.cards.map(card => (
                            <div
                                key={card.id}
                                className={`card-item ${selectedCard?.id === card.id ? 'active' : ''}`}
                                onClick={() => { setSelectedCard(card); setShowDetails(false); }}
                            >
                                <div className="card-mask">**** **** **** {card.cardNumber.slice(-4)}</div>
                                <div className="card-type-label">{card.cardType}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="section detail-panel">

                    <link
                        rel="stylesheet"
                        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
                    />

                    <div class="volume">
                        <input type="checkbox" class="volume-input" />
                        <div class="volume-icon">
                            <i class="fas fa-snowflake volume-icon-fa"></i>
                        </div>
                    </div>

                    {selectedCard ? (
                        <div className="visa-card-container">
                            <div className="visa-card">
                                <div className="logoContainer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 48 48" className="svgLogo">
                                        <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                                        <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                                        <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48C20.376,15.05,18,19.245,18,24z" />
                                    </svg>
                                </div>
                                <div className="number-container">
                                    <label className="input-label">CARD NUMBER</label>
                                    <input
                                        className="inputstyle"
                                        placeholder={showDetails ? selectedCard.cardNumber.match(/.{1,4}/g).join(' ') : 'XXXX XXXX XXXX XXXX'}
                                        readOnly
                                    />
                                </div>
                                <div className="name-date-cvv-container">
                                    <div className="name-wrapper">
                                        <label className="input-label">CARD HOLDER</label>
                                        <input className="inputstyle" placeholder={`${profile.firstName} ${profile.lastName}`} readOnly />
                                    </div>
                                    <div className="expiry-wrapper">
                                        <label className="input-label">VALID THRU</label>
                                        <input
                                            className="inputstyle"
                                            placeholder={
                                                showDetails
                                                    ? `${String(new Date(selectedCard.expirationDate).getMonth() + 1).padStart(2, '0')}/${new Date(selectedCard.expirationDate).getFullYear()}`
                                                    : 'MM/YYYY'
                                            }
                                            readOnly
                                        />
                                    </div>
                                    <div className="cvv-wrapper">
                                        <label className="input-label">CVV</label>
                                        <input className="inputstyle" placeholder={showDetails ? selectedCard.cvv : '***'} readOnly type="password" />
                                    </div>
                                </div>
                            </div>
                            <div className="eye-container">
                                <IconButton className="eye-icon-large" onClick={toggleDetails}>
                                    {showDetails ? <VisibilityOffIcon fontSize="large" /> : <VisibilityIcon fontSize="large" />}
                                </IconButton>
                            </div>
                        </div>
                    ) : (
                        <div className="placeholder-box">Seleziona una carta</div>
                    )}
                </aside>
            </div>

            <section className="transactions-table-section section">
                <div className="transactions-banner">Verifica qui le tue transazioni</div>
                <div className="transactions-wrapper">
                    <table className="transactions-table">
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Descrizione</th>
                                <th>Tipo</th>
                                <th>Importo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedCard?.transactions.map((tx, idx) => {
                                const isEntrata = tx.type.toLowerCase() === 'entrate';
                                return (
                                    <tr key={tx.id} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                                        <td>{new Date(tx.date).toLocaleDateString()}</td>
                                        <td>{tx.description}</td>
                                        <td className="tipo-cell">
                                            {isEntrata
                                                ? <span className="arrow up" title="Entrata">▲</span>
                                                : <span className="arrow down" title="Uscita">▼</span>
                                            }
                                        </td>
                                        <td>€{tx.amount.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
