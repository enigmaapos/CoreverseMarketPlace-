// File: src/components/WalletConnect.tsx
// Description: Handles connecting and disconnecting wallets.
// ------------------------------------
'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { formatAddress } from '../utils/format';
import { ChevronDown, Disconnect, Wallet } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, status } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200">
          <Wallet size={16} />
          <span>{formatAddress(address)}</span>
          <ChevronDown size={16} className="transition-transform duration-200 group-hover:rotate-180" />
        </button>
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => disconnect()}
            className="flex items-center space-x-2 px-4 py-2 w-full text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 rounded-md"
          >
            <Disconnect size={16} />
            <span>Disconnect</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200"
        >
          {status === 'pending' ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ))}
    </div>
  );
}
