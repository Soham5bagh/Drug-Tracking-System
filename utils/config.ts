import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  mongodbUri: process.env.MONGODB_URI,
  blockchainNetworkUrl: process.env.BLOCKCHAIN_NETWORK_URL,
  contractAddress: process.env.CONTRACT_ADDRESS,
};

export default config; 