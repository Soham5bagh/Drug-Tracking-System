# Drug Tracking System

A blockchain-based drug tracking system built on Arbitrum Sepolia network for tracking pharmaceutical drugs from manufacturer to pharmacy. This system ensures transparency and authenticity in the pharmaceutical supply chain.

## Features

- **Drug Batch Registration**: Manufacturers can register new drug batches with details like:
  - Batch number
  - Drug name
  - Quantity
  - Manufacturing date
  - Expiry date

- **Role-Based Access Control**:
  - Manufacturer role for drug registration
  - Distributor role for drug distribution
  - Pharmacy role for drug dispensing
  - Admin role for system management

- **Supply Chain Tracking**:
  - Track drug batches from manufacturer to pharmacy
  - Transfer ownership between stakeholders
  - Verify drug authenticity
  - Monitor inventory levels

- **Smart Contract Security**:
  - Built with OpenZeppelin contracts
  - Role-based access control
  - Pausable functionality for emergencies

## Tech Stack

- **Frontend**:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - wagmi/viem for blockchain interactions

- **Blockchain**:
  - Solidity
  - Hardhat
  - Arbitrum Sepolia Network
  - OpenZeppelin Contracts

## Smart Contract

The main contract is deployed on Arbitrum Sepolia:
- Address: `0x2b5ece50fae9fc4c72102c794927f9e4a694f2ab`
- Network: Arbitrum Sepolia (Chain ID: 421614)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MetaMask wallet
- Arbitrum Sepolia ETH for transactions

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Soham5bagh/Drug-Tracking-System.git
   cd Drug-Tracking-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x2b5ece50fae9fc4c72102c794927f9e4a694f2ab
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Smart Contract Development

1. Install Hardhat dependencies:
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
   ```

2. Compile contracts:
   ```bash
   npx hardhat compile
   ```

3. Run tests:
   ```bash
   npx hardhat test
   ```

4. Deploy to Arbitrum Sepolia:
   ```bash
   npx hardhat run scripts/deploy.js --network arbitrum-sepolia
   ```

## Usage

### For Manufacturers

1. Connect wallet with manufacturer role
2. Navigate to `/manufacturer`
3. Fill in drug batch details
4. Submit transaction through MetaMask

### For Distributors

1. Connect wallet with distributor role
2. Navigate to `/distributor`
3. View available batches
4. Transfer drugs to pharmacies

### For Pharmacies

1. Connect wallet with pharmacy role
2. Navigate to `/pharmacy`
3. View received batches
4. Verify drug authenticity
5. Record drug dispensing

## Project Structure

```
├── contracts/
│   └── DrugTracking.sol    # Main smart contract
├── pages/
│   ├── index.tsx           # Home page
│   ├── manufacturer.tsx    # Manufacturer interface
│   ├── distributor.tsx     # Distributor interface
│   ├── pharmacy.tsx        # Pharmacy interface
│   └── verify.tsx         # Drug verification page
├── hooks/
│   └── useDrugTracking.ts  # Contract interaction hooks
├── lib/
│   └── wagmi.ts           # wagmi configuration
└── styles/
    └── globals.css        # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Soham Bagh - [@sohambagh01](https://x.com/sohambagh01))

Project Link: [https://github.com/Soham5bagh/Drug-Tracking-System](https://github.com/Soham5bagh/Drug-Tracking-System)
