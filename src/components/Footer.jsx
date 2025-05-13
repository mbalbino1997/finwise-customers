import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 border-t mt-12">
            <div className="max-w-7xl mx-auto px-4 py-6 text-center">
                <p>&copy; {new Date().getFullYear()} Finwise. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
}
