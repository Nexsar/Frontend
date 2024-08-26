import { ethers } from "ethers";
import Web3Modal from "web3modal";

let provider;
let signer;

export const connectWallet = async () => {
    try {
        const web3Modal = new Web3Modal();
        provider = new ethers.providers.Web3Provider(await web3Modal.connect());
        signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        console.log("Connected Wallet Address:", userAddress);
        return userAddress;
    } catch (error) {
        console.error("Wallet connection failed", error);
        return null;
    }
};

export const getProvider = () => provider;
export const getSigner = () => signer;
