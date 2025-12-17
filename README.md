# ChainSkills Arena (Base-arc)

<div align="center">

**A blockchain-based competitive gaming platform on Base where players stake cryptocurrency and compete to earn rewards.**

[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?logo=solidity)](https://soliditylang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-000000?logo=next.js)](https://nextjs.org/)
[![Base Network](https://img.shields.io/badge/Base-Blockchain-0052FF?logo=ethereum)](https://base.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Overview

**ChainSkills Arena** is a Web3 gaming hub where players connect their wallets, compete in blockchain-powered games, and earn cryptocurrency rewards. Built on the Base blockchain, it features smart contract-managed escrow, transparent prize distribution, and a strategic powerup system.

### Key Features

- **Stake-Based Gaming**: Players stake ETH to compete, winner takes 95% of the pot
- **Smart Contract Escrow**: Secure fund management with automatic distribution
- **Powerup System**: Strategic items that enhance gameplay (Shield, Multiball, Pad Stretch)
- **Decentralized & Transparent**: All game results and fund distribution on-chain
- **Multi-Wallet Support**: MetaMask, Coinbase Wallet, WalletConnect, Gemini Wallet
- **Currently Featured**: Pong (more games coming soon via GameHub)

## Architecture

This is a monorepo containing both smart contracts and frontend application:

```
Base-arc/
├── contract/           # Hardhat smart contract development
│   ├── contracts/      # Solidity contracts (PingPong.sol)
│   ├── test/          # Comprehensive Foundry + Mocha tests
│   ├── scripts/       # Deployment & verification utilities
│   └── ignition/      # Hardhat Ignition deployment modules
│
├── frontend/          # Next.js web application
│   ├── app/           # Next.js 16 app router
│   ├── components/    # React components (UI, game, wallet)
│   ├── lib/           # Wagmi + Reown AppKit wallet integration
│   └── pages/         # Game pages (Pong)
│
└── README.md          # This file
```

## Tech Stack

### Smart Contracts
- **Solidity 0.8.28** - Smart contract language
- **Hardhat 3.1.0** - Development framework
- **Foundry** - Testing framework (Forge-std)
- **OpenZeppelin 5.4.0** - Security libraries (ReentrancyGuard, Ownable)
- **ethers.js 6.14.0** - Blockchain interaction library

### Frontend
- **Next.js 16.0.7** (React 19.2.0) - Web framework
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS 4.1.17** - Styling
- **Wagmi 3.1.0** - Ethereum wallet hooks
- **Reown AppKit 1.8.15** - Multi-chain wallet connection UI
- **Framer Motion 12.23.26** - Animations
- **TanStack Query 5.90.12** - Data fetching & caching

### Blockchain
- **Base Mainnet** (Chain ID: 8453) - Production network
- **Base Sepolia** - Testnet for development

## Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Hardhat for smart contract development
- MetaMask or compatible Web3 wallet

### 1. Clone the Repository

```bash
git clone https://github.com/Rafikace/Base-arc.git
cd Base-arc
```

### 2. Smart Contract Setup

```bash
cd contract

# Install dependencies
npm install

# Run tests
npx hardhat test

# Run Solidity tests only
npx hardhat test solidity

# Run TypeScript tests only
npx hardhat test mocha
```

#### Environment Variables (Contract)

Create `contract/.env`:

```env
BASE_RPC_URL=https://mainnet.base.org
BASE_NAME_WALLET_PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

#### Deploy to Base

```bash
# Deploy to local network
npx hardhat ignition deploy ignition/modules/PingPong.ts

# Deploy to Base Sepolia (testnet)
npx hardhat ignition deploy --network baseSepolia ignition/modules/PingPong.ts

# Estimate deployment cost
npx hardhat run scripts/estimateDeploy.ts
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

#### Environment Variables (Frontend)

Create `frontend/.env.local`:

```env
# Required for WalletConnect v2 (get from https://cloud.reown.com)
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id

# Contract addresses (after deployment)
NEXT_PUBLIC_PINGPONG_CONTRACT_ADDRESS=0x...
```

The application will be available at `http://localhost:3000`

## Smart Contracts

### PingPong.sol

The core game contract implementing stake-based Pong with escrow management.

**Key Features:**
- Create/join games with custom stakes
- Secure escrow holding player funds
- Winner gets 95%, dev fee 5%
- 7-day timeout protection with refunds
- Three powerup types (Multiball, Pad Stretch, Shield)
- Pausable for emergencies

**Main Functions:**
```solidity
createGame() payable           // Create game with stake
joinGame(gameId) payable       // Join existing game
endGame(gameId, winner)        // Owner declares winner (off-chain result)
requestRefund(gameId)          // Cancel waiting game
claimTimeoutRefund(gameId)     // Claim refund after 7 days
grantPowerup(recipient, type)  // Owner grants powerups
usePowerup(gameId, type)       // Use powerup during game
```

**Game States:**
- `WAITING (1)` - Created, waiting for second player
- `ACTIVE (2)` - Both players joined, game in progress
- `ENDED (3)` - Game completed, funds distributed
- `CANCELLED (4)` - Game cancelled, refunds issued

### Testing

Comprehensive test suite with 2,468+ lines of tests:

```bash
cd contract

# Run all tests
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test

# Run specific test file
npx hardhat test test/Pingpong.t.sol
```

## Frontend Features

### Current Implementation Status

**✅ Implemented:**
- Wallet connection (Wagmi + Reown AppKit)
- Multi-wallet support (MetaMask, Coinbase, WalletConnect)
- UI components (Navbar, Game modes, Inventory, Leaderboard UI)
- Dark mode support
- Responsive design with animations

**🚧 In Progress:**
- Smart contract integration (wagmi hooks)
- Actual Pong game logic (Canvas, physics, multiplayer)
- Real-time leaderboard data fetching
- Live games display
- Daily powerup reward system

### Game Modes (Planned)

1. **Quick Match** - Fast-paced free play
2. **Create/Join** - Custom game lobbies
3. **Friendly Stake** - Low-stakes competitive play
4. **Compete** - High-stakes tournaments

## Project Status

**Current Phase:** Development

- ✅ Smart contracts fully implemented and tested
- ✅ Frontend UI components built
- ⏳ Contract-frontend integration (in progress)
- ⏳ Pong game logic implementation (in progress)
- ⏳ Deployment to Base mainnet (pending)

## Contributing

We welcome contributions! Here's how to get started:

### Fork & Branch Workflow

1. **Fork the repository** to your GitHub account
2. **Clone your fork**: `git clone https://github.com/YOUR_USERNAME/Base-arc.git`
3. **Add upstream remote**: `git remote add upstream https://github.com/Rafikace/Base-arc.git`
4. **Create a feature branch**: `git checkout -b feature/your-feature-name`

### Branch Naming Convention

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Build/tooling updates

### Contribution Areas

**Beginner-Friendly:**
- Documentation improvements
- UI/UX enhancements
- Adding environment variable templates
- Writing tests

**Intermediate:**
- Smart contract integration with wagmi
- Leaderboard data fetching
- State management implementation
- Component refactoring

**Advanced:**
- Pong game Canvas implementation with physics
- Multiplayer synchronization (WebSockets)
- GameHub contract development
- Automated game result verification backend

### Pull Request Process

1. Make your changes and commit with clear messages
2. Push to your fork: `git push origin feature/your-feature-name`
3. Open a PR from your fork to `Rafikace/Base-arc:main`
4. Describe your changes clearly in the PR description
5. Wait for review and address any feedback

### Code Standards

- Follow existing code style (ESLint + Prettier configured)
- Write tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

## Deployment

### Contract Deployment

```bash
cd contract

# Estimate gas costs
npx hardhat run scripts/estimateDeploy.ts

# Deploy to Base mainnet
npx hardhat ignition deploy --network base ignition/modules/PingPong.ts

# Verify on Etherscan
npx hardhat verify --network base DEPLOYED_CONTRACT_ADDRESS
```

### Frontend Deployment

```bash
cd frontend

# Build for production
npm run build

# Start production server
npm start
```

**Recommended Hosting:**
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify

## Security

- Smart contracts use OpenZeppelin's audited libraries
- ReentrancyGuard prevents reentrancy attacks
- Ownable pattern for access control
- Comprehensive test coverage (100+ test cases)

**Note:** Contracts are not yet audited. Use at your own risk.

## Roadmap

- [x] PingPong smart contract implementation
- [x] Frontend UI components
- [ ] Smart contract integration (wagmi hooks)
- [ ] Pong game Canvas implementation
- [ ] Daily reward system
- [ ] Real-time leaderboard
- [ ] GameHub multi-game support
- [ ] Tournament system
- [ ] Professional security audit
- [ ] Mainnet deployment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Resources

- **Base Network**: https://base.org/
- **Hardhat Docs**: https://hardhat.org/
- **Next.js Docs**: https://nextjs.org/docs
- **Wagmi Docs**: https://wagmi.sh/
- **Reown AppKit**: https://docs.reown.com/appkit/overview

## Support

For questions or issues:
- Open an issue in this repository
- Join our community discussions

---

**Built with ❤️ on Base**
