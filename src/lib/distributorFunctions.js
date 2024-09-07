import { initializeWallet, getWallet } from './walletManager';
import { ethers } from 'ethers';
import { contractABI,contractAddress } from './contract';


export async function initDistributor() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        console.log("wallet is ",wallet.address);


        const params = [
            true,
            1,
            100,
            "s",
            "hel",
            ["hesfdsassed2","bolflssddsdd2","chalffddssfsd2"],
            ["hedsl","boglsg","chasj"]
        ];
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);

        const functionData = contract.interface.encodeFunctionData("initDistributor", params);

        const valueInWei = ethers.utils.parseEther("0.001");
        try {
            await contract.callStatic.initDistributor(
                true, 
                100, 
                100, 
                "s",
                "hel", 
                ["hesfdsassed2","bolflssddsdd2","chalffddssfsd2"],
                ["hedsl","boglsg","chasj"],
                { value: valueInWei }

            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error for Init Dist:', error);
        }
        const estimatedGas = await contract.estimateGas.initDistributor(
            true, 
            100 , 
            100, 
            "s",
            "hel", 
            ["hesfdsassed2","bolflssddsdd2","chalffddssfsd2"],
            ["hedsl","boglsg","chasj"],
            { value: valueInWei }
          );
      
          console.log('Estimated Gas:', estimatedGas.toString());
          const gasPrice = await wallet.provider.getGasPrice();
          console.log("Gas Price:", gasPrice.toString());


        const tx = {
            to: contractAddress,
            data: functionData,
            value: valueInWei,
            gasLimit: estimatedGas.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)),
        };

        const txResponse = await wallet.sendTransaction(tx);
        console.log(txResponse);
        await txResponse.wait();
        console.log('Transaction Confirmed');
        return txResponse.hash;
    } catch (error) {
        console.error('Error initialising Distributor:', error);
    }
}

export async function addPost() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();

        const address = await  wallet.address;
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = [
            "ads", 
            "hel", 
            ["csd","bsd","nsd"], 
            ["hedl","boglg","chaj"],
            address
        ]
        console.log(contract);
        console.log(param);
        const functionData = contract.interface.encodeFunctionData("AddPost",param);

        try {
            await contract.callStatic.AddPost(
                "ads", 
                "hel", 
                ["csd","bsd","nsd"], 
                ["hedl","boglg","chaj"],
                address
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error for Add post:', error);
        }

        const estimatedGas = await contract.estimateGas.AddPost(
            "ads",  
            "hel", 
            ["csd","bsd","nsd"],  
            ["hedl","boglg","chaj"],
            address
        );
    
        console.log('Estimated Gas:', estimatedGas.toString());

        const gasPrice = await wallet.provider.getGasPrice();
        console.log("gasprice is ",gasPrice);
        const adjustedGasPrice = gasPrice.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)); // 10% higher


        const tx = {
            from:address,
            to: contractAddress,
            data: functionData,
            gasLimit: estimatedGas.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)),
        };

        const txHash = await wallet.sendTransaction(tx);
        console.log('Transaction Hash:', txHash);
        return txHash;
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

export async function updateBudget() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = [347,address]

        const functionData = contract.interface.encodeFunctionData("updateBudget",param)

        try {
            await contract.callStatic.updateBudget(
                347,
                address
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error updating budget:', error);
        }
        const estimatedGas = await contract.estimateGas.updateBudget(
            347,
            address
        );
      
        console.log('Estimated Gas:', estimatedGas.toString());

        const gasPrice = await wallet.provider.getGasPrice();
        console.log("gasprice is ",gasPrice);
        const adjustedGasPrice = gasPrice.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)); // 10% higher


        const tx = {
            from:address,
            to: contractAddress,
            data: functionData,
            gasLimit: estimatedGas
        };

        const txHash = await wallet.sendTransaction(tx);
        console.log('Transaction Hash:', txHash);
        return txHash;
    } catch (error) {
        console.error('Error updating budget:', error);
    }
}

export async function updateDescription() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = ["hello buddy","ads",address]

        const functionData = contract.interface.encodeFunctionData("updateDescription",param)

        try {
            await contract.callStatic.updateDescription(
                "hello buddy",
                "ads",
                address
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error updating description:', error);
        }
        const estimatedGas = await contract.estimateGas.updateDescription(
           "hello buddy",
            "ads",
            address
        );
      
        console.log('Estimated Gas:', estimatedGas.toString());

        const gasPrice = await wallet.provider.getGasPrice();
        console.log("gasprice is ",gasPrice);
        const adjustedGasPrice = gasPrice.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)); // 10% higher


        const tx = {
            from:address,
            to: contractAddress,
            data: functionData,
            gasLimit: estimatedGas
        };

        const txHash = await wallet.sendTransaction(tx);
        console.log('Transaction Hash:', txHash);
        return txHash;
    } catch (error) {
        console.error('Error updating description:', error);
    }
}

export async function withdrawETH() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const param = [12]

        const functionData = contract.interface.encodeFunctionData("withdrawETH",param)

        try {
            await contract.callStatic.withdrawETH(
               12
            );
            console.log('Call Static succeeded');
        } catch (error) {
            console.error('Call Static Error:', error);
        }
        const estimatedGas = await contract.estimateGas.withdrawETH(
           12
        );
      
        console.log('Estimated Gas:', estimatedGas.toString());

        const gasPrice = await wallet.provider.getGasPrice();
        console.log("gasprice is ",gasPrice);
        const adjustedGasPrice = gasPrice.mul(ethers.BigNumber.from(110)).div(ethers.BigNumber.from(100)); // 10% higher


        const tx = {
            to: contractAddress,
            data: functionData,
            chainId: 11155111, // For non-EIP-1559 networks
            gasLimit: estimatedGas
        };

        const txHash = await wallet.sendTransaction(tx);
        console.log('Transaction Hash:', txHash);
        return txHash;
    } catch (error) {
        console.error('Error adding post:', error);
    }
}

export async function getBudget() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getBudget(address);
     
        console.log('Transaction Hash:', result.toNumber());
        return result;
    } catch (error) {
        console.error('Error getting budget:', error);
    }
}

export async function getAllPosts() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getAllPosts(address);
     
        console.log('Transaction Hash:', result.toJSON);
        return result;
    } catch (error) {
        console.error('Error getting all posts:', error);
    }
}

export async function getParticularPost() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        const postid = "s";

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getParticularPost(address,postid);
     
        console.log('Transaction Hash:', result.toJSON);
        return result;
    } catch (error) {
        console.error('Error getting post:', error);
    }
}

export async function getAllOptions() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;
        const postid = "s"
        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getAllOptions(postid);
     
        console.log('Transaction Hash:', result.toJSON);
        return result;
    } catch (error) {
        console.error('Error getting options:', error);
    }
}

export async function getAllVotesOnPost() {
    try {
        const authMethod = JSON.parse(localStorage.getItem("authMethod"));

        await initializeWallet(authMethod);

        const wallet = await getWallet();
        const address = await wallet.address;

        const contract = new ethers.Contract(contractAddress, contractABI, wallet.provider);
        const result = await contract.getAllOptions(postid);
     
        console.log('Transaction Hash:', result);
        return result;
    } catch (error) {
        console.error('Error getting votes:', error);
    }
}

