const hre = require("hardhat");

async function main() {
  try {
    // Get network information
    const network = await hre.ethers.provider.getNetwork();
    console.log("\nNetwork Information:");
    console.log("===================");
    console.log("Name:", network.name);
    console.log("Chain ID:", network.chainId);

    // Get deployer information
    const [deployer] = await hre.ethers.getSigners();
    const balance = await deployer.provider.getBalance(deployer.address);
    
    console.log("\nDeployer Information:");
    console.log("====================");
    console.log("Address:", deployer.address);
    console.log("Balance:", hre.ethers.formatEther(balance), "ETH");

    if (balance.toString() === "0") {
      throw new Error("Insufficient balance. Please fund your account with Sepolia ETH first.");
    }

    console.log("\nDeployment Process:");
    console.log("==================");
    console.log("1. Deploying DrugTracking contract...");

    const DrugTracking = await hre.ethers.getContractFactory("DrugTracking");
    const drugTracking = await DrugTracking.deploy();

    console.log("2. Waiting for deployment transaction...");
    await drugTracking.waitForDeployment();

    const address = await drugTracking.getAddress();
    console.log("3. Contract deployed to:", address);

    console.log("4. Waiting for block confirmations...");
    const deployTx = drugTracking.deploymentTransaction();
    await deployTx.wait(5);
    console.log("5. Deployment confirmed!");

    console.log("\nContract Information:");
    console.log("====================");
    console.log("Address:", address);
    console.log("Transaction Hash:", deployTx.hash);

    console.log("\n6. Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("7. Contract verified successfully!");
    } catch (error) {
      console.log("Verification error:", error.message);
    }

    return { address, deployTx };
  } catch (error) {
    console.error("\nDeployment Error:");
    console.error("================");
    console.error(error.message);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 