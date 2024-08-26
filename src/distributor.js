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