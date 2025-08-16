// File: src/app/page.tsx
// Description: The Home Page.
// ------------------------------------
import Link from 'next/link';
import { Home, TrendingUp, Compass, User } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] text-center px-4">
      <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse-slow">
        Coreverse NFT Marketplace
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
        Discover, collect, and sell digital art and collectibles on the Core Chain.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/explore" className="flex items-center space-x-2 px-6 py-3 font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
          <Compass size={20} />
          <span>Explore Now</span>
        </Link>
        <Link href="/list" className="flex items-center space-x-2 px-6 py-3 font-bold text-white bg-gray-700 rounded-full shadow-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105">
          <TrendingUp size={20} />
          <span>Start Selling</span>
        </Link>
      </div>
    </div>
  );
}
