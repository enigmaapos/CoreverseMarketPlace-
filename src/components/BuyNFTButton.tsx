// File: src/components/BuyNFTButton.tsx
// Description: The button to execute an on-chain purchase of an NFT.
// This component would receive `listing` and `signature` from the backend.
// ------------------------------------
'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { marketplaceAbi, marketplaceAddress } from '../contracts/index';
import { parseEther } from 'viem';
import { useState } from 'react';

export function BuyNFTButton({ listing, signature }) {
  const { writeContract, data: hash, isPending: isTxPending } = useWriteContract();
  const { isLoading: isTxConfirming, isSuccess: isTxSuccess } = useWaitForTransactionReceipt({ hash });
  const [error, setError] = useState('');

  const handleBuy = async () => {
    setError('');
    try {
      writeContract({
        address: marketplaceAddress,
        abi: marketplaceAbi,
        functionName: 'buy',
        args: [listing, signature],
        value: parseEther(listing.price),
      });
    } catch (err) {
      console.error('Transaction failed:', err);
      setError('Transaction failed. Check the console for details.');
    }
  };

  let buttonText = 'Buy NFT';
  if (isTxPending) {
    buttonText = 'Confirming...';
  } else if (isTxConfirming) {
    buttonText = 'Processing...';
  } else if (isTxSuccess) {
    buttonText = 'Success!';
  }

  return (
    <>
      <button
        onClick={handleBuy}
        disabled={isTxPending || isTxConfirming || isTxSuccess}
        className="w-full px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-green-400 to-teal-500 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 shadow-lg disabled:opacity-50"
      >
        {buttonText}
      </button>
      {error && <p className="text-red-500 mt-2 text-center text-sm">{error}</p>}
    </>
  );
}
