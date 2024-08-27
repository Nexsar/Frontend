import { ethers } from "ethers";
import distributorJson from '../contract/Distributors.json' assert { type: "json" };

const contractAddress = "YOUR_CONTRACT_ADDRESS";
let contractABI = distributorJson.abi;
// console.log(contractABI); // WORKING....

const getContract = async () => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        throw new Error("Ethereum object not found, install MetaMask.");
    }
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

export const updateVotes = async (votes, distributorAddress, postId) => {
    try {
        const contract = await getContract();
        if (!Array.isArray(votes) && votes.length !== 3) {
            throw new Error("Votes should be an array of Length (3)");
        }
        const tx = await contract.updateVotes(votes, distributorAddress, postId);
        await tx.wait();
        console.log("Votes Updated:", tx);
    } catch (error) {
        console.error("Error in updating votes:", error);
    }
}

/////////////////////////////// OPTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const updateVote = async (votes, distributorAddress, postId, optionId) => {
    try {
        const contract = await getContract();
        const tx = await contract.updateVote(votes, distributorAddress, postId, optionId);
        await tx.wait();
        console.log("Vote Updated:", tx);
    } catch (error) {
        console.error("Error in updating vote:", error);
    }
}

export const updateImageUrl = async (url, distributorAddress, postId, optionId) => {
    try {
        const contract = await getContract();
        const tx = await contract.updateImageUrl(url, distributorAddress, postId, optionId);
        await tx.wait();
        console.log("Image URL Updated:", tx);
    } catch (error) {
        console.error("Error in updating image URL:", error);
    }
}

/////////////////////////////// Getters \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

export const getDistributorInfo = async (distributorAddress) => {
    try {
        const contract = await getContract();
        const distributorInfo = await contract.getDistributorInfo(distributorAddress);
        console.log("Distributor Info:", distributorInfo);

        return {
            id: ownerOfDistributor(distributorAddress),
            listed: true,
            posts: getAllPosts(distributorAddress),
            budget: getBudget(distributorAddress),
            frequency: getFrequency(distributorAddress),
        };
    } catch (error) {
        console.error("Error fetching distributor info:", error);
        return null;
    }
};

export const getBudget = async (distributorAddress) => {
    try {
        const contract = await getContract();
        const budget = await contract.getBudget(distributorAddress);
        return ethers.utils.formatEther(budget);
    } catch (error) {
        console.error("Error fetching budget:", error);
        return null;
    }
}

export const getFrequency = async (distributorAddress) => {
    try {
        const contract = await getContract();
        const frequency = await contract.getFrequency(distributorAddress);
        return frequency;
    } catch (error) {
        console.error("Error fetching frequency:", error);
        return null;
    }
}

export const getAllPosts = async (distributorAddress) => {
    try {
        const contract = await getContract();
        const posts = await contract.getAllPosts(distributorAddress);
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return null;
    }
}

export const ownerOfDistributor = async (distributorAddress) => {
    try {
        const contract = await getContract();
        const owner = await contract.ownerOfDistributor(distributorAddress);
        return owner;
    } catch (error) {
        console.error("Error fetching owner:", error);
        return null;
    }
}

// ======================================= \\

export const getParticularPost = async (distributorAddress, postId) => {
    try {
        const contract = await getContract();
        const post = await contract.getParticularPost(distributorAddress, postId);
        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

export const getAllOptions = async (distributorAddress, postId) => {
    try {
        const contract = await getContract();
        const options = await contract.getAllOptions(distributorAddress, postId);
        return options;
    } catch (error) {
        console.error("Error fetching options:", error);
        return null;
    }
}

export const getTotalVotesOnPost = async (distributorAddress, postId) => {
    try {
        const contract = await getContract();
        const totalVotes = await contract.getTotalVotesOnPost(distributorAddress, postId);
        return totalVotes;
    } catch (error) {
        console.error("Error fetching total votes:", error);
        return null;
    }
}

// ======================================= \\

export const getParticularOption = async (distributorAddress, postId, optionId) => {
    try {
        const contract = await getContract();
        const option = await contract.getParticularOption(distributorAddress, postId, optionId);
        return option;
    } catch (error) {
        console.error("Error fetching option:", error);
        return null;
    }
}

export const getVoteOnOption = async (distributorAddress, postId, optionId) => {
    try {
        const contract = await getContract();
        const vote = await contract.getVoteOnOption(distributorAddress, postId, optionId);
        return vote;
    } catch (error) {
        console.error("Error fetching vote:", error);
        return null;
    }
}

export const getImageUrlOption = async (distributorAddress, postId, optionId) => {
    try {
        const contract = await getContract();
        const imageUrl = await contract.getImageUrlOption(distributorAddress, postId, optionId);
        return imageUrl;
    } catch (error) {
        console.error("Error fetching image URL:", error);
        return null;
    }
}