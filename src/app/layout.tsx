import './globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

const { chains, publicClient } = configureChains(
  [mainnet], // add Pi / Core chain when RPCs are available
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
})

export const metadata = {
  title: 'Coreverse Marketplace',
  description: 'Universal NFT Marketplace for Pi & Core Network',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={config}>
          <Header />
          <main className="container mx-auto px-4">{children}</main>
        </WagmiConfig>
      </body>
    </html>
  )
}
