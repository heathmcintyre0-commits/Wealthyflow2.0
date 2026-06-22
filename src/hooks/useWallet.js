import { useState, useCallback } from 'react';
import { BrowserProvider } from 'ethers';

export function useWallet() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    setError(null);

    if (!window.ethereum) {
      setError('MetaMask is not installed. Please install it from metamask.io');
      return;
    }

    // Remove any existing listeners before re-registering to avoid duplicates
    window.ethereum.removeAllListeners?.('accountsChanged');
    window.ethereum.removeAllListeners?.('chainChanged');

    setConnecting(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const network = await provider.getNetwork();

      setAccount(accounts[0]);
      setChainId(Number(network.chainId));

      window.ethereum.on('accountsChanged', (accs) => {
        setAccount(accs[0] ?? null);
      });
      window.ethereum.on('chainChanged', (id) => {
        setChainId(Number(id));
      });
    } catch (err) {
      if (err.code === 4001) {
        setError('Connection rejected. Please accept the MetaMask request.');
      } else {
        setError(err.message ?? 'Failed to connect wallet.');
      }
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setError(null);
    window.ethereum?.removeAllListeners?.('accountsChanged');
    window.ethereum?.removeAllListeners?.('chainChanged');
  }, []);

  return { account, chainId, error, connecting, connect, disconnect };
}
