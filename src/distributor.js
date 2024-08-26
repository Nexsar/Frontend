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

/////////////////////////////// DISTRIBUTORS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const initDistributor = async (listed, budget, frequency, posts) => {
    try {
        const contract = await getContract();
        const tx = await contract.initDistributor(listed, budget, frequency, posts, { value: ethers.utils.parseEther(budget.toString()) });
        await tx.wait();
        console.log("Distributor Initialized:", tx);
    } catch (error) {
        console.error("Error in initializing distributor:", error);
    }
};

export const updateBudget = async (budget, distributorAddress) => {
    try {
        const contract = await getContract();
        const tx = await contract.updateBudget(budget, distributorAddress, { value: ethers.utils.parseEther(budget.toString()) });
        await tx.wait();
        console.log("Budget Updated:", tx);
    } catch (error) {
        console.error("Error in updating budget:", error);
    }
};

export const withdrawFromBudget = async (amount, distributorAddress) => {
    try {
        const contract = await getContract();
        const tx = await contract.withdrawFromBudget(amount, distributorAddress)
        await tx.wait();
        console.log("Amount Withdrawn:", tx);
    } catch (error) {
        console.error("Error in withdrawing from budget:", error);
    }
}

export const updateFrequency = async (frequency, distributorAddress) => {
    try {
        const contract = await getContract();
        const tx = await contract.updateFrequency(frequency, distributorAddress);
        await tx.wait();
        console.log("Frequency Updated:", tx);
    } catch (error) {
        console.error("Error in updating frequency:", error);
    }
}

export const updatePosts = async (post, distributorAddress) => {
    try {
        const contract = await getContract();
        const tx = await contract.updatePosts(post, distributorAddress);
        await tx.wait();
        console.log("Posts Updated:", tx);
    } catch (error) {
        console.error("Error in updating posts:", error);
    }
}

/////////////////////////////// POSTS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const updateDescription = async (description, distributorAddress, post_id) => {
    try {
        const contract = await getContract();
        const tx = await contract.updateDescription(description, distributorAddress, post_id);
        await tx.wait();
        console.log("Description Updated:", tx);
    } catch (error) {
        console.error("Error in updating description:", error);
    }
}

export const updateOptions = async (options, distributorAddress, post_id) => {
    try {
        const contract = await getContract();
        if (!Array.isArray(options) && options.length !== 3) {
            throw new Error("Options should be an array of Length (3)");
        }
        const tx = await contract.updateOptions(options, distributorAddress, post_id);
        await tx.wait();
        console.log("Options Updated:", tx);
    } catch (error) {
        console.error("Error in updating options:", error);
    }
}

export const updateVotes = async (votes, distributorAddress, post_id) => {
    try {
        const contract = await getContract();
        if (!Array.isArray(votes) && votes.length !== 3) {
            throw new Error("Votes should be an array of Length (3)");
        }
        const tx = await contract.updateVotes(votes, distributorAddress, post_id);
        await tx.wait();
        console.log("Votes Updated:", tx);
    } catch (error) {
        console.error("Error in updating votes:", error);
    }
}

/////////////////////////////// OPTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\