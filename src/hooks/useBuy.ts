// src/hooks/useBuy.ts
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { MARKETPLACE_ABI, MARKETPLACE_ADDRESS } from '../contracts';
import { parseEther } from 'viem';

export function useBuy() {
  const prepare = usePrepareContractWrite({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: 'buy',
    // args must be set at call time via `write({ args, value })` so omit here if dynamic
    enabled: false
  });

  const { data, write } = useContractWrite(prepare.config ?? { address: MARKETPLACE_ADDRESS, abi: MARKETPLACE_ABI, functionName: 'buy' });
  const wait = useWaitForTransaction({ hash: data?.hash });

  return {
    buy: async (listing, signature, priceInCore) => {
      // listing should match typed struct expected by contract; signature shaped accordingly (v,r,s)
      // signature from signTypedData is a hex string; we need to split into v,r,s
      const sig = signature;
      const r = '0x' + sig.slice(2).slice(0, 64);
      const s = '0x' + sig.slice(2).slice(64, 128);
      const v = parseInt(sig.slice(2).slice(128, 130), 16);

      const tx = await write?.({
        args: [listing, { v, r, s }],
        value: BigInt(priceInCore) // already in wei as bigint
      });
      if (!tx) throw new Error('tx failed');
      const receipt = await wait.wait();
      return receipt;
    },
    state: { data, wait }
  };
}
