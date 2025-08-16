// File: src/utils/format.ts
// Description: Utility function for formatting Ethereum addresses.
// ------------------------------------
export function formatAddress(address: `0x${string}` | undefined): string {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
