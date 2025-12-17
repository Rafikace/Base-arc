# ChainSkills Arena - Smart Contracts

Solidity smart contracts for ChainSkills Arena, a blockchain-based competitive gaming platform on the **Base** blockchain.

## Overview

This directory contains the smart contracts that power the ChainSkills Arena gaming platform. The contracts manage game sessions, escrow funds, powerups, and prize distribution in a decentralized manner.

Built with **Hardhat 3.1.0** using **Solidity 0.8.28** and tested with both **Foundry** (Forge) and **Mocha/ethers.js**.

## Contracts

### PingPong.sol

The main game contract implementing stake-based Pong with escrow and powerup management.

**Location**: `contracts/PingPong.sol` (493 lines)

#### Features

- **Game Session Management**
  - Create games with custom stake amounts
  - Join existing games by matching stakes
  - Automatic game state transitions (WAITING → ACTIVE → ENDED)
  - Owner-controlled game completion based on off-chain results

- **Secure Escrow System**
  - Holds player stakes in contract until game completion
  - Automatic distribution: 95% to winner, 5% developer fee
  - Timeout protection: 7-day refund window for stalled games
  - Safe refund mechanism for cancelled games

- **Powerup System**
  - Three powerup types with strategic gameplay effects
  - Owner-granted powerups via `grantPowerup()`
  - Player inventory management per address
  - In-game powerup consumption tracking

- **Security Features**
  - OpenZeppelin's `ReentrancyGuard` for reentrancy protection
  - `Ownable` for access control (owner-only functions)
  - Emergency pause mechanism via `togglePause()`
  - Input validation and state checks

#### Powerup Types

| Powerup | ID | Effect | Description |
|---------|-----|--------|-------------|
| **Pad Stretch** | 1 | Defensive | Increases paddle length for easier saves |
| **Multiball** | 2 | Offensive | Splits ball into multiple balls for chaos |
| **Shield** | 3 | Defensive | Energy barrier that blocks one goal |

#### Game States

```solidity
enum GameState {
    WAITING = 1,    // Created, waiting for second player
    ACTIVE = 2,     // Both players joined, game in progress
    ENDED = 3,      // Game completed, funds distributed
    CANCELLED = 4   // Game cancelled, refunds issued
}
```

#### Key Functions

##### Public/External Functions

```solidity
// Game Management
createGame() payable                      // Create new game with stake
joinGame(uint64 gameId) payable          // Join existing game
requestRefund(uint64 gameId)             // Cancel and refund waiting game
claimTimeoutRefund(uint64 gameId)        // Claim refund after 7 days

// Powerups
usePowerup(uint64 gameId, PowerupType powerupType)  // Use powerup in active game

// View Functions
getGame(uint64 gameId) -> GameSession    // Get game details
getPlayerGames(address player) -> uint64[] // Get player's game IDs
getPlayerInventory(address player) -> PowerupInventory // Get powerup counts
```

##### Owner-Only Functions

```solidity
endGame(uint64 gameId, address winner)   // Declare winner and distribute funds
grantPowerup(address recipient, PowerupType powerupType) // Give powerup to player
withdrawDevFees()                        // Withdraw accumulated developer fees
togglePause()                            // Emergency pause/unpause
```

#### Events

```solidity
event GameCreated(uint64 indexed gameId, address indexed creator, uint256 stake)
event GameJoined(uint64 indexed gameId, address indexed joiner)
event GameEnded(uint64 indexed gameId, address indexed winner, uint256 prize)
event GameCancelled(uint64 indexed gameId)
event PowerupGranted(address indexed recipient, PowerupType powerupType)
event PowerupUsed(uint64 indexed gameId, address indexed player, PowerupType powerupType)
event DevFeeWithdrawn(uint256 amount)
```

### Counter.sol

Simple example contract for testing Hardhat setup. Can be removed for production.

**Location**: `contracts/Counter.sol` (19 lines)

### GameHub.sol

Placeholder for future multi-game registry and tournament system.

**Location**: `contracts/GameHub.sol` (4 lines - stub)

**Planned Features:**
- Register multiple game contracts
- Global leaderboard across all games
- Tournament management
- Cross-game rewards

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Hardhat** | 3.1.0 | Development framework |
| **Solidity** | 0.8.28 | Smart contract language |
| **OpenZeppelin Contracts** | 5.4.0 | Security libraries |
| **Foundry (forge-std)** | 1.9.4 | Solidity testing framework |
| **ethers.js** | 6.14.0 | Blockchain interaction |
| **Mocha** | 11.0.0 | TypeScript test runner |
| **Chai** | 5.1.2 | Assertion library |
| **TypeScript** | 5.8.0 | Type safety for scripts |

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** package manager
- **Hardhat** (installed via npm)
- (Optional) **Foundry** for Solidity tests

### Installation

```bash
# Navigate to contract directory
cd contract

# Install dependencies
npm install
```

### Environment Variables

Create a `contract/.env` file:

```env
# Base Network RPC URL (required for deployment)
BASE_RPC_URL=https://mainnet.base.org

# Deployer wallet private key (required for deployment)
BASE_NAME_WALLET_PRIVATE_KEY=your_private_key_here

# Etherscan API key (required for contract verification)
ETHERSCAN_API_KEY=your_etherscan_api_key

# Optional: Base Sepolia RPC for testnet
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

**Get Base Sepolia testnet ETH:**
- Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- Bridge from Ethereum Sepolia: https://bridge.base.org/

## Development

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
# Run all tests (Solidity + TypeScript)
npx hardhat test

# Run only Solidity tests (Foundry-style)
npx hardhat test solidity

# Run only TypeScript tests (Mocha)
npx hardhat test mocha

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```

### Test Coverage

The PingPong contract has **comprehensive test coverage** with 2,468+ lines of tests:

**Test File**: `contracts/Pingpong.t.sol` (Foundry-style)

**Coverage Areas:**
- ✅ Contract deployment and initialization
- ✅ Game creation with various stake amounts
- ✅ Game joining mechanics and validation
- ✅ Powerup granting and usage
- ✅ Game ending and fund distribution
- ✅ Timeout refunds (7-day mechanism)
- ✅ Access control (owner-only functions)
- ✅ Edge cases and error conditions
- ✅ Reentrancy protection
- ✅ Pause functionality

### Local Development

```bash
# Start local Hardhat network
npx hardhat node

# In another terminal, deploy to local network
npx hardhat ignition deploy ignition/modules/PingPong.ts --network localhost
```

## Deployment

### Network Configuration

The project is configured for the following networks:

| Network | Chain ID | RPC | Explorer |
|---------|----------|-----|----------|
| **Base Mainnet** | 8453 | https://mainnet.base.org | https://basescan.org |
| **Base Sepolia** | 84532 | https://sepolia.base.org | https://sepolia.basescan.org |
| **Local Hardhat** | 31337 | http://localhost:8545 | - |

### Estimate Deployment Cost

Before deploying to mainnet, estimate gas costs:

```bash
npx hardhat run scripts/estimateDeploy.ts
```

This script:
- Forks Base mainnet locally
- Simulates contract deployment
- Calculates gas costs at current gas prices
- Estimates total deployment cost in ETH

### Deploy to Base Sepolia (Testnet)

```bash
# Deploy PingPong contract
npx hardhat ignition deploy ignition/modules/PingPong.ts --network baseSepolia

# Verify contract on Basescan
npx hardhat verify --network baseSepolia <DEPLOYED_CONTRACT_ADDRESS>
```

### Deploy to Base Mainnet (Production)

```bash
# Ensure you have sufficient ETH in your wallet
# Estimate costs first with estimateDeploy.ts

# Deploy PingPong contract
npx hardhat ignition deploy ignition/modules/PingPong.ts --network base

# Verify contract on Basescan
npx hardhat verify --network base <DEPLOYED_CONTRACT_ADDRESS>
```

**Important Notes:**
- Use a secure wallet with sufficient Base ETH
- Test thoroughly on Base Sepolia before mainnet
- Save deployment addresses for frontend integration
- Consider a professional security audit before production

### Contract Verification

Verify on Etherscan/Basescan:

```bash
npx hardhat verify --network base <CONTRACT_ADDRESS>
```

Or use the verification script:

```bash
npx hardhat run scripts/verifier.ts
```

## Deployment Modules

### Hardhat Ignition

The project uses **Hardhat Ignition** for deployments:

**Module**: `ignition/modules/PingPong.ts`

```typescript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules"

export default buildModule("PingPongModule", (m) => {
  const pingPong = m.contract("PingPong")
  return { pingPong }
})
```

Benefits:
- Reproducible deployments
- Automatic deployment state management
- Easy upgrade path for future versions

## Scripts

| Script | Purpose |
|--------|---------|
| `scripts/estimateDeploy.ts` | Estimate gas cost for mainnet deployment |
| `scripts/send-op-tx.ts` | Utilities for sending optimized transactions |
| `scripts/verifier.ts` | Contract verification on Blockscout/Etherscan |

## Interacting with Deployed Contracts

### Using Hardhat Console

```bash
npx hardhat console --network baseSepolia
```

```javascript
// Get contract instance
const PingPong = await ethers.getContractFactory("PingPong")
const pingPong = PingPong.attach("0x...") // deployed address

// Create a game with 0.01 ETH stake
await pingPong.createGame({ value: ethers.parseEther("0.01") })

// Join a game
await pingPong.joinGame(1, { value: ethers.parseEther("0.01") })

// Check game details
const game = await pingPong.getGame(1)
console.log(game)
```

### Using ethers.js (Frontend Integration)

```typescript
import { ethers } from 'ethers'
import PingPongABI from './abi/PingPong.json'

const provider = new ethers.BrowserProvider(window.ethereum)
const signer = await provider.getSigner()

const pingPong = new ethers.Contract(
  "0x...", // deployed address
  PingPongABI,
  signer
)

// Create game
const tx = await pingPong.createGame({
  value: ethers.parseEther("0.01")
})
await tx.wait()
```

## Security Considerations

### Current Security Measures

✅ **Implemented:**
- OpenZeppelin's `ReentrancyGuard` on all payable functions
- `Ownable` pattern for access control
- Input validation on all public functions
- Safe math (Solidity 0.8.28 has built-in overflow protection)
- Emergency pause mechanism
- 7-day timeout for refunds

⚠️ **Pending:**
- Professional security audit
- Bug bounty program
- Multi-sig wallet for owner functions
- Timelock for critical operations

### Known Trust Assumptions

- **Owner decides game winners**: The contract owner must call `endGame()` with the correct winner based on off-chain game results
- **Centralized result verification**: Game logic runs off-chain, results submitted on-chain
- **Owner can pause**: Emergency pause capability requires trust in owner

**Future Improvement**: Implement oracle-based or cryptographic game result verification for trustless operation.

## Contract Addresses

### Testnet (Base Sepolia)

```
PingPong: TBD (deploy first)
```

### Mainnet (Base)

```
PingPong: TBD (not yet deployed)
```

**Update these addresses after deployment and commit to repository.**

## Gas Optimization

The contracts are optimized for gas efficiency:

- Uses `uint64` for game IDs (saves storage vs `uint256`)
- Packs struct fields efficiently
- Minimal external calls
- Batch operations where possible

**Production Profile** (`hardhat.config.ts`):
- Optimizer enabled: `true`
- Optimizer runs: `200` (balanced for deployment vs execution cost)

## Troubleshooting

### Compilation Errors

```bash
# Clear cache and artifacts
npx hardhat clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Recompile
npx hardhat compile
```

### Deployment Failures

1. **Insufficient funds**: Ensure wallet has enough Base ETH
2. **Wrong network**: Check `--network` flag matches intended network
3. **Gas price too low**: Increase gas price in `hardhat.config.ts`
4. **Nonce issues**: Reset nonce in MetaMask or use `--reset` flag

### Verification Failures

1. **Contract not found**: Wait a few minutes after deployment
2. **Constructor arguments**: Ensure they match deployment (PingPong has none)
3. **Compiler version**: Must match exactly (0.8.28)
4. **Optimizer settings**: Must match deployment settings

## Contributing to Contracts

### Priority Tasks

1. **Security Audit** - Get contracts professionally audited
2. **GameHub Implementation** - Build multi-game registry
3. **Oracle Integration** - Decentralized game result verification
4. **Gas Optimization** - Further reduce transaction costs
5. **Upgrade Mechanism** - Implement proxy pattern for upgradeability

### Code Standards

- Follow Solidity style guide: https://docs.soliditylang.org/en/latest/style-guide.html
- Use NatSpec comments for all public/external functions
- Write tests for all new features
- Run existing tests before submitting PR
- Update documentation

### Testing New Features

```bash
# Run tests
npx hardhat test

# Check coverage (if coverage plugin installed)
npx hardhat coverage

# Run gas reporter
REPORT_GAS=true npx hardhat test
```

## Resources

- **Hardhat Documentation**: https://hardhat.org/docs
- **Solidity Docs**: https://docs.soliditylang.org/
- **OpenZeppelin Contracts**: https://docs.openzeppelin.com/contracts/
- **Base Documentation**: https://docs.base.org/
- **Foundry Book**: https://book.getfoundry.sh/

## License

MIT License - Part of the ChainSkills Arena project

---

**Need Help?** Open an issue in the main repository or consult the Base developer docs.
