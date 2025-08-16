'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { publicClient } from 'viem';
import { coreDao } from 'wagmi/chains'; // if not available, create custom chain object

const inter = Inter({ subsets: ['latin'] });

// Configure chains (using Core Chain chain id from env)
const CORE_CHAIN = {
  id: Number(process.env.NEXT_PUBLIC_CORE_CHAIN_ID || 8453),
  name: 'Core Chain',
  network: 'core',
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_CORE_RPC || 'https://rpc.corechain.example'] }
  },
  nativeCurrency: { name: 'CORE', symbol: 'CORE', decimals: 18 }
};

const { chains, publicClient: wagmiPublicClient } = configureChains(
  [CORE_CHAIN],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default.http[0] }) })]
);

const { connectors } = getDefaultWallets({
  appName: 'Coreverse',
  chains
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: wagmiPublicClient
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <div className="min-h-screen bg-slate-50 text-slate-800">
              {children}
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
