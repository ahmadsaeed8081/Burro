import Routes from './Route.js';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';


import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai} from 'wagmi/chains'
// import {alchemyProvider} from ''

function App() {



  const chains = [polygonMumbai]
  const projectId = 'f385bf4e147a499aee6b6c2f17ded944'
  
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

  // const { chains, publicClient } = configureChains(
  //   [polygonMumbai],
  //   [alchemyProvider({ apiKey: 'Xr86iyHzmF6-yzBAqV5rd_PW7ds7QKlh' })],
  // )

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)



  return( 
    <>
      <WagmiConfig config={wagmiConfig}>
    
        <Routes />
    
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;