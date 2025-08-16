// File: src/app/layout.tsx
// Description: Wagmi, QueryClient, and Tailwind CSS providers for the entire application.
// This is required to make all blockchain-related hooks available to your components.
// ------------------------------------
'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { coreDao, coreDaoTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import './globals.css';
import Header from '../components/Header';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// Define the Wagmi configuration
const config = createConfig({
  chains: [coreDao, coreDaoTestnet],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({ projectId: 'YOUR_WALLETCONNECT_PROJECT_ID' }),
  ],
  ssr: true,
  transports: {
    [coreDao.id]: http(),
    [coreDaoTestnet.id]: http(),
  },
});

// Create a QueryClient instance for data caching
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Header />
            <main className="min-h-screen bg-gray-950 text-white p-6 md:p-12">
              {children}
            </main>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
