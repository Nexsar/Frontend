import React, { useEffect, useState } from "react";

const WalletConnector = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        const isConnected = sessionStorage.getItem('IsConnected') === 'true';
        const walletAddress = sessionStorage.getItem('WalletAddress');
        if (walletAddress) {
            setWalletAddress(walletAddress);
        }
        setIsConnected(isConnected);
    }, []);

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setIsConnected(true);
                sessionStorage.setItem('IsConnected', 'true');
                sessionStorage.setItem('WalletAddress', accounts[0]);
                setWalletAddress(accounts[0]);
            } else {
                console.error('MetaMask is not installed');
            }
        } catch (error) {
            console.error('Error connecting to wallet:', error);
        }
    };

    return (
        <div style={styles.container}>
            {isConnected ? (
                <div style={styles.connected}>
                    <p style={styles.walletAddress}>Connected: {walletAddress}</p>
                </div>
            ) : (
                <button onClick={connectWallet} style={styles.button}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
        padding: '20px',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    connected: {
        backgroundColor: '#e1f5e4',
        border: '1px solid #a5d6a7',
        borderRadius: '5px',
        padding: '10px 20px',
        textAlign: 'center',
        fontSize: '16px',
    },
    walletAddress: {
        margin: '0',
        fontWeight: 'bold',
    }
};

export default WalletConnector;
