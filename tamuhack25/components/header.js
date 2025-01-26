'use client';

import Link from 'next/link'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      <nav className="flex space-x-4">
        <Link href="/home" className="hover:underline">Home</Link>
        <Link href="/budget" className="hover:underline">Budget</Link>
        <Link href="/market" className="hover:underline">Market</Link>
      </nav>
    </header>
  );
};

export default Header;