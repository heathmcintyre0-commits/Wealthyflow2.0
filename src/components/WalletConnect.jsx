import { useWallet } from '../hooks/useWallet';
import './WalletConnect.css';

const CHAIN_NAMES = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
  137: 'Polygon',
  80001: 'Mumbai Testnet',
};

function shortAddress(addr) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function WalletConnect() {
  const { account, chainId, error, connecting, connect, disconnect } = useWallet();

  return (
    <div className="wallet-card">
      <h1 className="wallet-title">WealthyFlow</h1>
      <p className="wallet-subtitle">Your crypto wallet &amp; trading dashboard</p>

      {!account ? (
        <button
          className="btn btn-connect"
          onClick={connect}
          disabled={connecting}
        >
          {connecting ? 'Connecting…' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-info">
          <div className="wallet-badge">
            <span className="wallet-dot" />
            Connected
          </div>
          <p className="wallet-address" title={account}>
            {shortAddress(account)}
          </p>
          {chainId && (
            <p className="wallet-network">
              Network: {CHAIN_NAMES[chainId] ?? `Chain ID ${chainId}`}
            </p>
          )}
          <button className="btn btn-disconnect" onClick={disconnect}>
            Disconnect
          </button>
        </div>
      )}

      {error && <p className="wallet-error">{error}</p>}
    </div>
  );
}
