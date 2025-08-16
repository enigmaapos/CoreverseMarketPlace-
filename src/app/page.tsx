"use client";
import { useAccount, useContractRead } from 'wagmi';
import marketplaceAbi from '../contracts/Marketplace.json';

export default function Home() {
  const { address, isConnected } = useAccount();

  const { data: listedItems } = useContractRead({
    address: '0xYourMarketplaceAddress',
    abi: marketplaceAbi,
    functionName: 'getAllListings',
  });

  return (
    <div>
      <h1>Coreverse Marketplace</h1>
      {isConnected ? (
        <p>Connected as {address}</p>
      ) : (
        <p>Please connect wallet</p>
      )}
      <pre>{JSON.stringify(listedItems, null, 2)}</pre>
    </div>
  );
}
