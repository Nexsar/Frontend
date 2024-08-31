import { useConnect } from 'wagmi';
import { useIsMounted } from '../hooks/useIsMounted';

const WalletMethods = ({ authWithEthWallet, setView }) => {
  const isMounted = useIsMounted();
  const { connectors } = useConnect();

  if (!isMounted) return null;

  return (
    <>
      <h1>Connect your web3 wallet</h1>
      <p>
        Connect your wallet then sign a message to verify you&apos;re the owner
        of the address.
      </p>
      <div className="buttons-container">
        {connectors.map(connector => (
          <button
            type="button"
            className="btn btn--outline"
            disabled={connector.ready}
            key={connector.id}
            onClick={() => authWithEthWallet({ connector })}
          >
            {connector.name.toLowerCase() === 'metamask' && (
              <div className="btn__icon">
              </div>
            )}
            {connector.name.toLowerCase() === 'coinbase wallet' && (
              <div className="btn__icon">
                {/* <Image
                  src="/coinbase.png"
                  alt="Coinbase logo"
                  fill={true}
                ></Image> */}
              </div>
            )}
            <span className="btn__label">Continue with {connector.name}</span>
          </button>
        ))}
        <button onClick={() => setView('default')} className="btn btn--link">
          Back
        </button>
      </div>
    </>
  );
};

export default WalletMethods;