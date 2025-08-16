// src/components/ListNFTForm.tsx
'use client';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useCreateListing } from '../hooks/useListing';
import { parseEther } from 'viem';

export function ListNFTForm() {
  const { address, isConnected } = useAccount();
  const [form, setForm] = useState({ nft: '', tokenId: '', price: '' });
  const createListing = useCreateListing();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) return alert('Connect wallet');

    // prepare listing shape — use BigInt for numeric values
    const listing = {
      maker: address,
      nft: form.nft,
      tokenId: BigInt(form.tokenId),
      amount: 1n,
      currency: '0x0000000000000000000000000000000000000000',
      price: BigInt(parseEther(form.price || '0').toString()),
      startTime: BigInt(Math.floor(Date.now() / 1000)),
      endTime: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7),
      nonce: 0n // optionally query userNonces from contract
    };

    try {
      const { listing: signedListing, signature } = await createListing.mutateAsync(listing);
      // Send signed listing to your backend so marketplace can index it for buyers
      // Example: POST /api/listings { listing, signature }
      console.log('Signed listing', signedListing, signature);
      alert('Listing signed. Send to your backend indexer.');
    } catch (err) {
      console.error(err);
      alert('Signing failed');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold">Create Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input-text" placeholder="NFT contract address" value={form.nft} onChange={e=>setForm({...form, nft:e.target.value})} />
        <input className="input-text" placeholder="Token ID" value={form.tokenId} onChange={e=>setForm({...form, tokenId:e.target.value})} />
        <input className="input-text" placeholder="Price in CORE (e.g., 0.1)" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} />
        <button className="btn-primary w-full">Sign Listing</button>
      </form>
    </div>
  );
}
