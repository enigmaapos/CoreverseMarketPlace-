interface ProfileProps {
  params: { address: string }
}

export default function UserProfilePage({ params }: ProfileProps) {
  const { address } = params

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p>Wallet Address: {address}</p>
    </div>
  )
}
