// src/hooks/useListing.ts
import { useSigner, useChainId, usePublicClient } from 'wagmi';
import { LISTING_TYPED_DATA, MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from '../contracts';
import { hexToBytes } from 'viem';
import { toHex } from 'viem';
import { useMutation } from '@tanstack/react-query';
import { signTypedData } from '@wagmi/core'; // or use useSignTypedData hook

export function useCreateListing() {
  const chainId = Number(process.env.NEXT_PUBLIC_CORE_CHAIN_ID || 8453);
  const verifyingContract = MARKETPLACE_ADDRESS;

  return useMutation(async (listing) => {
    // listing must use bigints for numeric values
    const domain = {
      name: LISTING_TYPED_DATA.name,
      version: '1',
      chainId,
      verifyingContract
    };

    const types = { EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      Listing: LISTING_TYPED_DATA.types.Listing
    };

    // Here we delegate signing to the wallet via wagmi's signTypedData
    // The runtime environment must have a connected signer (RainbowKit will provide)
    const signature = await signTypedData({
      domain,
      types: { Listing: LISTING_TYPED_DATA.types.Listing },
      primaryType: 'Listing',
      message: listing
    });

    // signature is a hex string — send listing+signature to your backend indexer
    return { listing, signature };
  });
}
