// src/utils/ipfs.ts
export function resolveIPFS(uri: string) {
  if (!uri) return '';
  if (uri.startsWith('ipfs://')) {
    const path = uri.replace('ipfs://', '');
    return `https://ipfs.io/ipfs/${path}`;
  }
  return uri;
}
