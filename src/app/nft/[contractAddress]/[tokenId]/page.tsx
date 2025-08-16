interface NFTDetailProps {
  params: { contractAddress: string; tokenId: string }
}

export default function NFTDetailPage({ params }: NFTDetailProps) {
  const { contractAddress, tokenId } = params

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-4">NFT Detail</h1>
      <p>Contract: {contractAddress}</p>
      <p>Token ID: {tokenId}</p>
    </div>
  )
}
