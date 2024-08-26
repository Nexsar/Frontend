import { ethers } from "ethers";
import { getSigner } from "./wallet";

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const contractABI = [
    // Add the ABI here from the compiled contract
];

export const getContract = async () => {
    const signer = getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
};

/////////////////////////////// WORKERS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const initWorker = async () => {
    try {
        const contract = await getContract();
        const tx = await contract.initWorker();
        await tx.wait();
        console.log("Worker Initialized:", tx);
    } catch (error) {
        console.error("Error in initializing worker:", error);
    }
}

export const removeWorker = async (wrokerAddress) => {
    try {
        const contract = await getContract();
        const tx = await contract.removeWorker(wrokerAddress);
        await tx.wait();
        console.log("Worker Removed:", tx);
    } catch (error) {
        console.error("Error in removing worker:", error);
    }
}

export const updateRewards = async (/*address List*/ workerAddresses, prizepool, postId) => {
    try {
        const contract = await getContract();
        const tx = await contract.updateRewards(workerAddresses, prizepool, postId);
        await tx.wait();
        console.log("Rewards Updated:", tx);
    } catch (error) {
        console.error("Error in updating rewards:", error);
    }
}

export const updateVotingMapping = async (/*list*/ workers, /*list*/ postId, /*list*/ option_id) => {
    try {
        const contract = await getContract();
        const tx = await contract.updateVotingMapping(workers, postId, option_id);
        await tx.wait();
        console.log("Voting Mapping Updated:", tx);
    } catch (error) {
        console.error("Error in updating voting mapping:", error);
    }
}

export const withdrawRewards = async () => {
    try {
        const contract = await getContract();
        const tx = await contract.withdrawRewards();
        await tx.wait();
        console.log("Rewards Withdrawn:", tx);
    } catch (error) {
        console.error("Error in withdrawing rewards:", error);
    }
}