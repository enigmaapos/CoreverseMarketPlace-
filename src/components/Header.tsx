'use client'

import Link from 'next/link'
import WalletConnect from './WalletConnect'

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow">
      <Link href="/" className="font-bold text-xl">
        Coreverse
      </Link>
      <nav className="space-x-4">
        <Link href="/explore">Explore</Link>
        <Link href="/nft">NFTs</Link>
        <Link href="/profile">Profile</Link>
      </nav>
      <WalletConnect />
    </header>
  )
}
