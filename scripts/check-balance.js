const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
  // Create provider
  const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
  
  // Create wallet instance
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  
  console.log("\nWallet Details:");
  console.log("==============");
  console.log("Address:", wallet.address);
  
  const balance = await provider.getBalance(wallet.address);
  console.log("Balance (Wei):", balance.toString());
  console.log("Balance (ETH):", ethers.formatEther(balance));
  
  const network = await provider.getNetwork();
  console.log("\nNetwork Details:");
  console.log("===============");
  console.log("Chain ID:", network.chainId);
  console.log("Network Name:", network.name);
  
  const blockNumber = await provider.getBlockNumber();
  console.log("Current Block:", blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 