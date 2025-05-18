import React, { useState, useEffect } from 'react';
import './UserPersonal.css';

export default function UserPersonal() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Al caricamento componente, controllo se c'è il token e provo a caricare il profilo
        const token = sessionStorage.getItem('token');
        if (token) {
            fetchProfile(token);
        }
    }, []);

    const fetchProfile = async (token) => {
        try {
            const resp = await fetch('/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!resp.ok) throw new Error('Token non valido');
            const data = await resp.json();
            setProfile(data.profile);
        } catch {
            // Se token non valido o errore, logout forzato
            handleLogout();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const resp = await fetch('/api/profile', {
                headers: {
                    'Authorization': `Basic ${btoa(`${username}:${password}`)}`
                }
            });
            if (!resp.ok) throw new Error('Login failed');
            const data = await resp.json();
            setProfile(data.profile);
            sessionStorage.setItem('token', data.token);
        } catch {
            setError('Credenziali errate, riprova');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setProfile(null);
        setUsername('');
        setPassword('');
    };

    if (!profile) {
        return (
            <div className="main">
                <input type="checkbox" id="chk" aria-hidden="true" />
                <div className="login">
                    <form className="form" onSubmit={handleLogin}>
                        <label htmlFor="chk" aria-hidden="true">Log in</label>
                        <input
                            className="input"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error-text">{error}</p>}
                        <button type="submit" className="btn-login">Log in</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex justify-end">
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-500 hover:underline"
                        >
                            Logout
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold text-purple-800 mb-4">
                        Benvenuto, {profile.firstName} {profile.lastName}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <div><strong>Data di nascita:</strong> {profile.birthDate}</div>
                        <div><strong>Range reddito:</strong> €{profile.incomeRange}</div>
                        <div><strong>Tolleranza rischio:</strong> {profile.riskTolerance}</div>
                        <div><strong>Ruoli:</strong> {profile.roles.join(', ')}</div>
                    </div>
                </div>
                <div className="space-y-4">
                    {profile.cards.map(card => (
                        <div key={card.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                            <button
                                className="w-full flex justify-between items-center p-4 focus:outline-none"
                                onClick={() => document.getElementById(`card-${card.id}`).classList.toggle('hidden')}
                            >
                                <span className="font-medium text-purple-700">
                                    Carta **** **** **** {card.cardNumber.slice(-4)}
                                </span>
                                <span className="text-purple-500">▼</span>
                            </button>
                            <div id={`card-${card.id}`} className="hidden border-t border-gray-200 p-4 bg-gray-50">
                                <div className="mb-3">
                                    <div><strong>Scadenza:</strong> {card.expirationDate}</div>
                                    <div><strong>CVV:</strong> {card.cvv}</div>
                                </div>
                                <div className="border-t border-gray-300 pt-3">
                                    <h4 className="text-purple-700 font-semibold mb-2">Transazioni</h4>
                                    <div className="space-y-2">
                                        {card.transactions.map(tx => (
                                            <div key={tx.id} className="flex justify-between items-center p-3 bg-white rounded">
                                                <div>
                                                    <p className="font-medium">
                                                        {tx.type === 'entrate' ? '🔼' : '🔽'} {tx.description}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{tx.date}</p>
                                                </div>
                                                <div className={`font-semibold ${tx.type === 'entrate' ? 'text-green-600' : 'text-red-600'}`}>
                                                    €{tx.amount}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
