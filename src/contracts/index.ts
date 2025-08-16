// File: src/contracts/index.ts
// Description: Defines the smart contract ABI and address.
// ------------------------------------
import { parseAbi } from 'viem';

// This is a placeholder address. Replace with your deployed contract's address.
export const marketplaceAddress = '0x123...';

// The ABI for your marketplace contract
export const marketplaceAbi = parseAbi([
  'function userNonces(address) public view returns (uint256)',
  'function buy(tuple listing, bytes signature) public payable',
  // Add other functions and events from your contract
]);
