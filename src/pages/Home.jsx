import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import GlobalContext from '../context/GlobalContext';

export default function Home() {
    const [accounts, setAccounts] = useState([]);
    const { isLoading, setIsLoading } = useContext(GlobalContext);

    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:8080/api/bankaccount')
            .then(response => setAccounts(response.data))
            .catch(error => console.error('Errore nel recupero dei conti correnti:', error))
            .finally(() => setIsLoading(false));
    }, [setIsLoading]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-8 pb-12 px-4">
            <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-12">
                Finwise - Panoramica Conti Correnti
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {accounts.map(account => (
                    <div
                        key={account.id}
                        className="bg-white shadow-lg rounded-2xl p-6 border-l-8 border-indigo-500 hover:shadow-2xl transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                            Conto {account.accountType}
                        </h2>
                        <ul className="space-y-1 text-gray-700">
                            <li><span className="font-medium">Promozione:</span> {account.promotionNumber}</li>
                            <li><span className="font-medium">Canone Mensile:</span> €{account.monthlyFee.toFixed(2)}</li>
                            <li><span className="font-medium">Tasso Interesse:</span> {account.interestRate}%</li>
                            <li><span className="font-medium">Saldo Minimo:</span> €{account.minBalance}</li>
                        </ul>

                        {account.cards.map(card => (
                            <div key={card.id} className="mt-6">
                                <h3 className="text-indigo-600 font-medium text-lg">💳 Carta {card.cardType}</h3>
                                <p className="text-gray-700"><span className="font-medium">Limite:</span> €{card.spendingLimit}</p>

                                {card.cardPersonals.map(cardP => (
                                    <div
                                        key={cardP.id}
                                        className="bg-indigo-50 mt-4 p-4 rounded-lg border border-indigo-100"
                                    >
                                        <div className="flex justify-between">
                                            <p><span className="font-medium">Numero:</span> {cardP.cardNumber}</p>
                                            <p><span className="font-medium">Scadenza:</span> {cardP.expirationDate}</p>
                                        </div>
                                        <h4 className="mt-3 font-semibold text-indigo-700">📄 Transazioni</h4>
                                        <ul className="list-disc list-inside mt-2 text-gray-800 space-y-1">
                                            {cardP.transactions.map(tx => (
                                                <li key={tx.id} className="flex items-center">
                                                    <span className={tx.type === 'entrate' ? 'text-green-500' : 'text-red-500'}>
                                                        {tx.type === 'entrate' ? '⬆️' : '⬇️'}
                                                    </span>
                                                    <span className="ml-2">
                                                        {tx.description} - €{tx.amount} ({tx.date})
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}