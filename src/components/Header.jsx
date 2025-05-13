import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold hover:text-indigo-200">
                    Finwise
                </Link>
                <nav className="space-x-4">
                    <Link to="/" className="hover:text-indigo-200">
                        Home
                    </Link>
                    {/* Aggiungi altre voci di menu qui */}
                </nav>
            </div>
        </header>
    );
}