import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import DrugTrackingABI from '../contracts/DrugTracking.json';

declare global {
  interface Window {
    ethereum: any;
  }
}

let web3: Web3;
let drugTrackingContract: Contract;

export const initWeb3 = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      
      // Get the network ID
      const networkId = await web3.eth.net.getId();
      
      // Get the contract address from the deployed network
      const deployedNetwork = (DrugTrackingABI.networks as any)[networkId];
      
      if (!deployedNetwork) {
        throw new Error('Contract not deployed on the current network');
      }

      // Create the contract instance
      drugTrackingContract = new web3.eth.Contract(
        DrugTrackingABI.abi as any,
        deployedNetwork.address
      );

      return true;
    } catch (error) {
      console.error('Error initializing Web3:', error);
      throw error;
    }
  } else {
    throw new Error('Please install MetaMask to use this application');
  }
};

export const registerDrug = async (
  drugName: string,
  batchNumber: string,
  quantity: number,
  manufacturingDate: number,
  expiryDate: number
) => {
  if (!web3 || !drugTrackingContract) {
    await initWeb3();
  }

  try {
    const accounts = await web3.eth.getAccounts();
    const manufacturerAddress = accounts[0];

    // Convert dates to Unix timestamps if they aren't already
    const mfgDate = typeof manufacturingDate === 'number' 
      ? manufacturingDate 
      : Math.floor(new Date(manufacturingDate).getTime() / 1000);
    
    const expDate = typeof expiryDate === 'number'
      ? expiryDate
      : Math.floor(new Date(expiryDate).getTime() / 1000);

    // Call the smart contract function
    const result = await drugTrackingContract.methods
      .registerDrugBatch(
        drugName,
        batchNumber,
        quantity,
        mfgDate,
        expDate
      )
      .send({ from: manufacturerAddress });

    return {
      success: true,
      transactionHash: result.transactionHash,
      batchId: result.events.DrugBatchRegistered.returnValues.batchId
    };
  } catch (error) {
    console.error('Error registering drug batch:', error);
    throw error;
  }
};

export const getDrugBatchDetails = async (batchId: string) => {
  if (!web3 || !drugTrackingContract) {
    await initWeb3();
  }

  try {
    const batchDetails = await drugTrackingContract.methods
      .getDrugBatch(batchId)
      .call();

    return {
      drugName: batchDetails.drugName,
      batchNumber: batchDetails.batchNumber,
      quantity: parseInt(batchDetails.quantity),
      manufacturingDate: new Date(batchDetails.manufacturingDate * 1000),
      expiryDate: new Date(batchDetails.expiryDate * 1000),
      manufacturer: batchDetails.manufacturer,
      status: batchDetails.status
    };
  } catch (error) {
    console.error('Error getting drug batch details:', error);
    throw error;
  }
};

export const getManufacturerBatches = async (manufacturerAddress: string) => {
  if (!web3 || !drugTrackingContract) {
    await initWeb3();
  }

  try {
    const batches = await drugTrackingContract.methods
      .getManufacturerBatches(manufacturerAddress)
      .call();

    return batches.map(async (batchId: string) => {
      return await getDrugBatchDetails(batchId);
    });
  } catch (error) {
    console.error('Error getting manufacturer batches:', error);
    throw error;
  }
}; 