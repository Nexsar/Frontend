import { ethers } from "ethers";
import { getSigner } from "./wallet.js";
import distributorJson from '../contract/Workers.json' assert { type: "json" };

const contractAddress = "YOUR_CONTRACT_ADDRESS";
let contractABI = distributorJson.abi;
console.log(contractABI);

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

/////////////////////////////// Getters \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const getWorker = async (workerAddress) => {
    try {
        const contract = await getContract();
        const worker = await contract.getWorker(workerAddress);
        return worker;
    } catch (error) {
        console.error("Error in getting worker:", error);
        return null;
    }
}

export const getRewards = async (workerAddress) => {
    try {
        const contract = await getContract();
        const rewards = await contract.getRewards(workerAddress);
        return rewards;
    } catch (error) {
        console.error("Error in getting rewards:", error);
        return null;
    }
}

export const getVotedOption = async (workerAddress, post_id) => {
    try {
        const contract = await getContract();
        const voted_option = await contract.getVotedOption(workerAddress, post_id);
        return voted_option;
    } catch (error) {
        console.error("Error in getting voted option:", error);
        return null;
    }
}

export const getAllWorkersRewards = async (/*list*/ workerAddresses) => {
    try {
        const contract = await getContract();
        const all_workers_rewards = await contract.getAllWorkersRewards(workerAddresses);
        return all_workers_rewards;
    } catch (error) {
        console.error("Error in getting all workers rewards:", error);
        return null;
    }
}