import { WagmiConfig, createClient, configureChains } from 'wagmi';
import { goerli, mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';


const { provider, chains } = configureChains(
  [mainnet, goerli, sepolia],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
  ],
  provider,
});



export default function MyApp({ Component, pageProps }) {
  return (
      <WagmiConfig client={client}>
        
        <main>
          <Component {...pageProps} />
        </main>
       
      </WagmiConfig>
  
  );
}
