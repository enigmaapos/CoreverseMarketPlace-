import { useState, useEffect, createContext, useContext } from 'react';

// CSS - a self-contained single-file solution
const css = `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html, body {
    height: 100%;
    @apply bg-slate-50 text-slate-800 font-sans;
  }
}
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors;
}
.btn-secondary {
  @apply px-4 py-2 bg-slate-200 text-slate-800 rounded-lg shadow-md hover:bg-slate-300 transition-colors;
}
.input-text {
  @apply w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors;
}
`;

// Global context for mocking data
const MockDataContext = createContext();

// Mock data and API
const MOCK_NFTS = [
  {
    id: 'nft-1',
    name: 'Genesis Coreverse #1',
    collection: 'Coreverse Genesis',
    image: 'https://placehold.co/400x400/1e293b/a5b4fc?text=Coreverse+%231',
    nftAddress: '0xabc...123',
    tokenId: '1',
    price: '0.1', // price in CORE
    seller: '0x8f2d...456'
  },
  {
    id: 'nft-2',
    name: 'Genesis Coreverse #2',
    collection: 'Coreverse Genesis',
    image: 'https://placehold.co/400x400/1e293b/a5b4fc?text=Coreverse+%232',
    nftAddress: '0xabc...123',
    tokenId: '2',
    price: '0.25',
    seller: '0x8f2d...456'
  },
  {
    id: 'nft-3',
    name: 'Coreverse Explorer #1',
    collection: 'Coreverse Explorers',
    image: 'https://placehold.co/400x400/1e293b/a5b4fc?text=Explorer+%231',
    nftAddress: '0xdef...456',
    tokenId: '3',
    price: '0.5',
    seller: '0x1c1a...789'
  }
];

const mockListings = [];

async function getNFTs() {
  return new Promise(resolve => setTimeout(() => resolve(MOCK_NFTS), 500));
}

async function getNFTDetails(contractAddress, tokenId) {
  return new Promise(resolve => {
    const nft = MOCK_NFTS.find(n => n.nftAddress === contractAddress && n.tokenId === tokenId);
    setTimeout(() => resolve(nft), 300);
  });
}

async function getMyNFTs(address) {
  return new Promise(resolve => {
    const myNFTs = MOCK_NFTS.filter(n => n.seller?.toLowerCase() === address?.toLowerCase());
    setTimeout(() => resolve(myNFTs), 400);
  });
}

// Mock Web3 Hooks to simulate wallet connection and transactions without external libraries
const mockWalletAddress = '0x1c1a...789'; // A mock connected address
const mockIsConnected = true;

const useMockAccount = () => ({
  address: mockIsConnected ? mockWalletAddress : undefined,
  isConnected: mockIsConnected,
});

const useMockQuery = ({ queryKey, queryFn, enabled = true }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);
    queryFn().then(result => {
      setData(result);
      setIsLoading(false);
    }).catch(() => {
      setIsError(true);
      setIsLoading(false);
    });
  }, [JSON.stringify(queryKey), enabled]);

  return { data, isLoading, isError };
};

// Component: MockConnectButton
function MockConnectButton() {
  const { address, isConnected } = useMockAccount();
  return (
    <div>
      {isConnected ? (
        <span className="text-sm font-medium text-slate-600">
          Connected: <span className="font-mono">{address.substring(0, 6)}...{address.substring(address.length - 4)}</span>
        </span>
      ) : (
        <button className="btn-primary">Connect Wallet</button>
      )}
    </div>
  );
}

// Reusable Link component to handle routing
const Link = ({ href, children, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.hash = href;
  };
  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};

// Main App Layout
function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto p-6 w-full">
        {children}
      </main>
    </div>
  );
}

// Component: Header
function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl text-blue-600 hover:text-blue-700 transition-colors">
            Coreverse
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="#/explore" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Explore</Link>
            <Link href="#/list" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">List NFT</Link>
            <Link href="#/profile" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">My NFTs</Link>
          </nav>
        </div>
        <div>
          <MockConnectButton />
        </div>
      </div>
    </header>
  );
}

// Component: NFTCard
function NFTCard({ nft }) {
  const { address } = useMockAccount();
  const isOwner = address?.toLowerCase() === nft.seller?.toLowerCase();
  
  return (
    <Link 
      href={`#/nft/${nft.nftAddress}/${nft.tokenId}`} 
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all duration-300"
    >
      <div className="w-full h-64 overflow-hidden bg-slate-100">
        <img src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="mt-1 text-lg font-semibold truncate">{nft.name}</h3>
        <p className="text-sm text-slate-500">{nft.collection}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="text-md font-bold text-blue-600">{nft.price} CORE</div>
          {isOwner ? (
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Your NFT</span>
          ) : (
              <div className="btn-primary text-sm">View</div>
          )}
        </div>
      </div>
    </Link>
  );
}

// Component: ListNFTForm
function ListNFTForm() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold">Create Gasless Listing</h2>
      <p className="text-sm text-slate-500">
        This is a front-end simulation. In a real application, you would sign a transaction to create a listing.
      </p>
      <input placeholder="NFT contract address" className="input-text" disabled />
      <input placeholder="Token ID" className="input-text" disabled />
      <input placeholder="Price in CORE (e.g., 0.1)" className="input-text" disabled />
      <button className="btn-primary w-full cursor-not-allowed" disabled>
        Sign Listing (Disabled)
      </button>
      <p className="text-sm mt-4 text-center text-slate-600">Simulated signing process. No real transaction will be created.</p>
    </div>
  );
}

// Component: BuyNFTButton
function BuyNFTButton({ listing }) {
  return (
    <div>
      <button className="btn-primary w-full cursor-not-allowed" disabled>
        Buy for {listing.price} CORE (Disabled)
      </button>
      <p className="mt-2 text-center text-sm text-slate-600">
        This is a front-end simulation. In a real application, a transaction would be sent here.
      </p>
    </div>
  );
}

// Page: Home
function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center p-8">
      <h1 className="text-5xl font-extrabold text-slate-900 mb-4 animate-fade-in">Welcome to Coreverse Marketplace</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl animate-fade-in-delay">
        The premier destination for gasless NFT listings on the Core Chain.
      </p>
      <div className="flex space-x-4">
        <Link href="#/explore" className="btn-primary text-lg">Explore NFTs</Link>
        <Link href="#/list" className="btn-primary text-lg">List Your NFT</Link>
      </div>
    </div>
  );
}

// Page: Explore
function ExplorePage() {
  const { data: nfts, isLoading, isError } = useMockQuery({
    queryKey: ['nfts'],
    queryFn: getNFTs,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Explore Marketplace</h1>
      {isLoading ? (
        <div className="text-center text-slate-500">Loading NFTs...</div>
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load NFTs.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map(nft => <NFTCard key={nft.id} nft={nft} />)}
        </div>
      )}
    </div>
  );
}

// Page: Profile (My NFTs)
function ProfilePage() {
  const { address, isConnected } = useMockAccount();
  const { data: myNfts, isLoading, isError } = useMockQuery({
    queryKey: ['myNfts', address],
    queryFn: () => getMyNFTs(address),
    enabled: isConnected,
  });

  if (!isConnected) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-slate-500">
          <p className="text-lg mb-4">Please connect your wallet to view your NFTs.</p>
          <MockConnectButton />
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My NFTs</h1>
      {isLoading ? (
        <div className="text-center text-slate-500">Loading your NFTs...</div>
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load your NFTs.</div>
      ) : myNfts.length === 0 ? (
        <div className="text-center text-slate-500">You don't have any NFTs listed on this marketplace.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myNfts.map(nft => <NFTCard key={nft.id} nft={nft} />)}
        </div>
      )}
    </div>
  );
}

// Page: NFT Detail
function NFTDetailPage() {
  const router = useMockRouter();
  const { contractAddress, tokenId } = router.query;
  const { address } = useMockAccount();

  const { data: nft, isLoading, isError } = useMockQuery({
    queryKey: ['nftDetails', contractAddress, tokenId],
    queryFn: () => getNFTDetails(contractAddress, tokenId),
    enabled: !!contractAddress && !!tokenId,
  });

  const isOwner = address?.toLowerCase() === nft?.seller?.toLowerCase();
  
  if (isLoading) return <div className="text-center text-slate-500">Loading NFT details...</div>;
  if (isError || !nft) return <div className="text-center text-red-500">NFT not found or failed to load.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 w-full md:w-1/2">
        <img src={nft.image} alt={nft.name} className="w-full h-auto rounded-xl shadow-md" />
      </div>
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{nft.name}</h1>
        <p className="text-lg text-slate-600">{nft.collection}</p>
        <p className="text-xl font-semibold text-blue-600">Price: {nft.price} CORE</p>
        <div className="text-sm text-slate-500 space-y-1">
          <p>Seller: <code className="bg-slate-100 p-1 rounded">{nft.seller}</code></p>
          <p>NFT Address: <code className="bg-slate-100 p-1 rounded">{nft.nftAddress}</code></p>
          <p>Token ID: <code className="bg-slate-100 p-1 rounded">{nft.tokenId}</code></p>
        </div>
        <div className="pt-4 border-t border-slate-200">
            {isOwner ? (
                <div>
                    <p className="text-green-600 font-medium">This is your NFT. You can manage its listing.</p>
                    <ListNFTForm />
                </div>
            ) : (
              <BuyNFTButton listing={nft} />
            )}
        </div>
      </div>
    </div>
  );
}

// Custom hook to mimic Next.js router
function useMockRouter() {
  const [pathname, setPathname] = useState('/');
  const [query, setQuery] = useState({});

  useEffect(() => {
    function handleHashChange() {
      const path = window.location.hash.substring(1) || '/';
      const [urlPath, queryString] = path.split('?');
      const params = {};
      if (queryString) {
        queryString.split('&').forEach(param => {
          const [key, value] = param.split('=');
          params[key] = value;
        });
      }
      setPathname(urlPath || '/');
      setQuery(params);
    }
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const push = (url) => {
    window.location.hash = url;
  };

  return { pathname, query, push };
}

// Main App Router Component
function App() {
  const router = useMockRouter();
  
  // Custom router logic to mimic Next.js file-based routing
  const PageComponent = () => {
    const { pathname, query } = router;

    if (pathname === '/explore') return <ExplorePage />;
    if (pathname === '/list') return <ListNFTForm />;
    if (pathname === '/profile') return <ProfilePage />;
    if (pathname.startsWith('/nft/')) {
        const parts = pathname.split('/');
        router.query = { contractAddress: parts[2], tokenId: parts[3] };
        return <NFTDetailPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen">
      <style>{css}</style>
      <MockDataContext.Provider value={{ MOCK_NFTS, getNFTs, getNFTDetails, getMyNFTs, mockListings }}>
        <AppLayout>
          <PageComponent />
        </AppLayout>
      </MockDataContext.Provider>
    </div>
  );
}

// Export the main App component
export default App;
