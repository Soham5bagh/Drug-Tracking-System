const { ethers } = require('ethers');
require('dotenv').config();

async function checkConnection() {
    try {
        // Connect to local Ganache instance
        const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545');
        
        // Get the network information
        const network = await provider.getNetwork();
        console.log('Connected to network:', {
            name: network.name,
            chainId: network.chainId
        });

        // Get the latest block number to verify connection
        const blockNumber = await provider.getBlockNumber();
        console.log('Latest block number:', blockNumber);

        // Get some accounts to verify access
        const accounts = await provider.listAccounts();
        console.log('Available accounts:', accounts);

        console.log('Blockchain connection successful!');
        return true;
    } catch (error) {
        console.error('Failed to connect to blockchain:', error);
        return false;
    }
}

// Run the check
checkConnection()
    .then(result => {
        if (!result) {
            process.exit(1);
        }
    })
    .catch(error => {
        console.error('Error running connection check:', error);
        process.exit(1);
    }); 