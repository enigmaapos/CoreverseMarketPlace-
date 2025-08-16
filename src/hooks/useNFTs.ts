// src/hooks/useNFTs.ts
import { useQuery } from '@tanstack/react-query';
import { usePublicClient } from 'wagmi';
import { ERC721_ABI } from '../contracts';
import axios from 'axios';
import { resolveIPFS } from '../utils/ipfs';

export function useTokenMetadata(contractAddress: string, tokenId: string | number) {
  const publicClient = usePublicClient();

  return useQuery(['tokenMetadata', contractAddress, tokenId], async () => {
    // read tokenURI
    const tokenUri = await publicClient.readContract({
      address: contractAddress,
      abi: ERC721_ABI,
      functionName: 'tokenURI',
      args: [BigInt(tokenId)]
    }).catch(() => null);

    if (!tokenUri) throw new Error('tokenURI not available');

    const url = resolveIPFS(tokenUri.toString());
    const res = await axios.get(url).catch(() => null);
    if (!res?.data) throw new Error('failed to fetch metadata');

    // normalize image ipfs links
    if (res.data.image) res.data.image = resolveIPFS(res.data.image);
    return res.data;
  }, { enabled: !!contractAddress && !!tokenId });
}
