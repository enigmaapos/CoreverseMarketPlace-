'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export default function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({ connector: new InjectedConnector() })
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <button onClick={() => disconnect()} className="px-4 py-2 bg-red-500 text-white rounded">
        Disconnect {address.slice(0, 6)}...
      </button>
    )
  }

  return (
    <button onClick={() => connect()} className="px-4 py-2 bg-green-500 text-white rounded">
      Connect Wallet
    </button>
  )
}
