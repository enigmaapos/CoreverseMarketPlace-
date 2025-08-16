'use client'

export default function BuyNFTButton() {
  const handleBuy = () => {
    alert('NFT Purchased!')
  }

  return (
    <button onClick={handleBuy} className="px-4 py-2 bg-purple-600 text-white rounded">
      Buy NFT
    </button>
  )
}
