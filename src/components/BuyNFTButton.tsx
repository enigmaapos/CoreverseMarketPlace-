// src/components/BuyNFTButton.tsx
'use client';
import { useBuy } from '../hooks/useBuy';
import { useAccount } from 'wagmi';
import { parseEther } from 'viem';

export function BuyNFTButton({ listing, signature }) {
  const { address } = useAccount();
  const { buy, state } = useBuy();

  const handleBuy = async () => {
    if (!signature) return alert('Listing signature missing');
    try {
      // price is e.g. '0.1' CORE string — convert to wei
      const priceWei = BigInt(parseEther(listing.price.toString()).toString());
      await buy(listing, signature, priceWei);
      alert('Purchase tx sent — check your wallet/explorer');
    } catch (err) {
      console.error(err);
      alert('Buy failed: ' + (err?.message || err));
    }
  };

  return (
    <button onClick={handleBuy} className="btn-primary w-full">
      Buy for {listing.price} CORE
    </button>
  );
}
