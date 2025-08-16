// File: src/contracts/typedData.ts
// Description: Defines the EIP-712 typed data structure for the `Listing` object.
// ------------------------------------
export const listingTypes = {
  Listing: [
    { name: 'maker', type: 'address' },
    { name: 'nft', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'amount', type: 'uint256' },
    { name: 'currency', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'startTime', type: 'uint256' },
    { name: 'endTime', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
  ],
} as const;
