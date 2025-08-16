'use client'

import { useState } from 'react'

export default function ListNFTForm() {
  const [price, setPrice] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`NFT listed for ${price} tokens`)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-xl shadow">
      <h2 className="font-bold mb-2">List NFT</h2>
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded p-2 w-full mb-3"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        List NFT
      </button>
    </form>
  )
}
