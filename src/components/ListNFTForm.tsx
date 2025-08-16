// File: src/components/ListNFTForm.tsx
// Description: A form for gasless NFT listing using EIP-712 typed data signing.
// This sends the signed data to a backend for indexing.
// ------------------------------------
'use client';

import { useState } from 'react';
import { useAccount, useSignTypedData, useReadContracts, useChainId } from 'wagmi';
import { marketplaceAbi, marketplaceAddress } from '../contracts/index';
import { listingTypes } from '../contracts/typedData';
import { formatEther } from 'viem';

export function ListNFTForm() {
  const [formData, setFormData] = useState({
    nft: '',
    tokenId: '',
    price: '',
  });

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signTypedDataAsync } = useSignTypedData();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Fetch the user's current nonce for the listing
  const { data: nonceData, isLoading: isNonceLoading } = useReadContracts({
    contracts: [{
      address: marketplaceAddress,
      abi: marketplaceAbi,
      functionName: 'userNonces',
      args: [address],
    }],
    query: {
        enabled: isConnected,
    }
  });
  const nonce = nonceData?.[0]?.result || 0n;

  const handleList = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setStatus('Signing...');

    if (!address || !formData.nft || !formData.tokenId || !formData.price) {
      setError('Please fill in all fields.');
      setStatus('');
      return;
    }

    const listing = {
      maker: address as `0x${string}`,
      nft: formData.nft as `0x${string}`,
      tokenId: BigInt(formData.tokenId),
      amount: 1n, // ERC721 for MVP
      currency: '0x0000000000000000000000000000000000000000' as `0x${string}`, // CORE token
      price: BigInt(formatEther(formData.price)),
      startTime: BigInt(Math.floor(Date.now() / 1000)),
      endTime: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7), // 7 days from now
      nonce: nonce,
    };

    const domain = {
      name: 'CoreverseMarketplace',
      version: '1',
      chainId: BigInt(chainId),
      verifyingContract: marketplaceAddress,
    };

    try {
      const signature = await signTypedDataAsync({
        domain,
        types: listingTypes,
        primaryType: 'Listing',
        message: listing,
      });

      setStatus('Sending listing to backend...');
      // IMPORTANT: Here, you would send the `listing` and `signature`
      // to your backend API to be indexed and made public.
      console.log('Signed listing and signature:', { listing, signature });
      setStatus('Listing created successfully!');
      // Reset form after successful submission
      setFormData({ nft: '', tokenId: '', price: '' });
    } catch (err) {
      console.error('Signing failed:', err);
      setError('Failed to list NFT. Check the console for details.');
      setStatus('');
    }
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-200">Connect your wallet to list an NFT.</h2>
        <p className="text-gray-400 mt-2">You need to connect to the Core Chain.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">List Your NFT</h2>
      <form onSubmit={handleList} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="NFT Contract Address"
          value={formData.nft}
          onChange={(e) => setFormData({ ...formData, nft: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Token ID"
          value={formData.tokenId}
          onChange={(e) => setFormData({ ...formData, tokenId: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Price (in Wei)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200 shadow-lg"
          disabled={isNonceLoading || status === 'Signing...' || status === 'Sending listing to backend...'}
        >
          {isNonceLoading ? 'Fetching Nonce...' : status || 'List NFT'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}
