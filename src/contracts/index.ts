// src/contracts/index.ts
import { parseAbi } from 'viem';

// Marketplace address from .env
export const MARKETPLACE_ADDRESS = (process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '').trim();

// Minimal marketplace ABI used by frontend:
// - buy(listing, signature) payable
// - userNonces(address) view
export const MARKETPLACE_ABI = parseAbi([
  'function buy((address maker,address nft,uint256 tokenId,uint256 amount,address currency,uint256 price,uint256 startTime,uint256 endTime,uint256 nonce), (uint8 v, bytes32 r, bytes32 s)) payable',
  'function userNonces(address) view returns (uint256)'
]);

// ERC721 ABI bits we need
export const ERC721_ABI = parseAbi([
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
]);

// Export EIP-712 typed data structure for Listing
export const LISTING_TYPED_DATA = {
  name: 'CoreverseMarketplace',
  version: '1',
  // domain.chainId and verifyingContract set at signing time
  types: {
    Listing: [
      { name: 'maker', type: 'address' },
      { name: 'nft', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'currency', type: 'address' },
      { name: 'price', type: 'uint256' },
      { name: 'startTime', type: 'uint256' },
      { name: 'endTime', type: 'uint256' },
      { name: 'nonce', type: 'uint256' }
    ]
  }
};
