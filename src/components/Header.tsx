// File: src/components/Header.tsx
// Description: The main navigation bar with the wallet connect button.
// ------------------------------------
import Link from 'next/link';
import { WalletConnect } from './WalletConnect';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Coreverse
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/explore" className="text-gray-300 hover:text-white transition-colors duration-200">
            Explore
          </Link>
          <Link href="/list" className="text-gray-300 hover:text-white transition-colors duration-200">
            List NFT
          </Link>
          <WalletConnect />
        </nav>
      </div>
    </header>
  );
}
