import { ethers } from "hardhat";

async function main() {
  console.log("Deploying DrugTracking contract...");

  const DrugTracking = await ethers.getContractFactory("DrugTracking");
  const drugTracking = await DrugTracking.deploy();

  await drugTracking.deployed();

  console.log("DrugTracking deployed to:", drugTracking.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 