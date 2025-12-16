# ChainSkills Arena - Frontend

A Web3-powered gaming hub frontend built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Connect your wallet, play blockchain games, and earn cryptocurrency rewards on the **Base blockchain**.

## Overview

The frontend for ChainSkills Arena provides a modern, responsive user interface for blockchain-based competitive gaming. Players can connect their wallets, view their powerup inventory, compete in games, and track their performance on the leaderboard.

## Features

### ✅ Currently Implemented

- **🔗 Multi-Wallet Connection**
  - Wagmi 3.1.0 + Reown AppKit 1.8.15 integration
  - Support for MetaMask, Coinbase Wallet, WalletConnect, Gemini Wallet
  - Base mainnet and Base Sepolia testnet support
  - Cookie-based state persistence

- **🎨 Modern UI/UX**
  - Responsive design with Tailwind CSS 4.1.17
  - Dark mode support (next-themes)
  - Smooth animations (Framer Motion 12.23.26)
  - shadcn/ui component library
  - Toast notifications (Sonner)

- **🎮 Game Interface**
  - Game mode selection UI (Quick Match, Create/Join, Friendly Stake, Compete)
  - Powerup inventory display (Shield, Multiball, Pad Stretch)
  - Leaderboard UI component
  - Live games list component
  - "How to Play" guide

### 🚧 In Progress / Planned

- **Smart Contract Integration**
  - Wagmi hooks for PingPong contract interaction
  - Game creation/joining functionality
  - Real-time game state updates
  - Powerup usage and claiming

- **Pong Game Logic**
  - HTML5 Canvas-based game
  - Ball and paddle physics
  - Multiplayer synchronization
  - Powerup visual effects

- **Data Fetching**
  - Real leaderboard data from blockchain
  - Live games from active game sessions
  - Player stats and game history
  - Powerup inventory from smart contract

- **Daily Rewards**
  - Daily crate claiming mechanism
  - Powerup distribution
  - Cooldown timer (24 hours)

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | Next.js | 16.0.7 |
| **React** | React & React DOM | 19.2.0 |
| **Language** | TypeScript | 5.9.3 |
| **Styling** | Tailwind CSS | 4.1.17 |
| **Web3** | Wagmi | 3.1.0 |
| **Wallet UI** | Reown AppKit | 1.8.15 |
| **State** | TanStack Query | 5.90.12 |
| **Animation** | Framer Motion | 12.23.26 |
| **Icons** | Lucide React | 0.555.0 |
| **Blockchain** | ethers.js | 6.16.0 |
| **Network** | viem | 2.41.2 |

### Wallet SDKs

- **@metamask/sdk** 0.34.0
- **@coinbase/wallet-sdk** 4.3.7
- **@walletconnect/ethereum-provider** 2.23.0
- **@gemini-wallet/core** 0.3.2

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **pnpm** package manager
- **MetaMask** or compatible Web3 wallet
- **Base Sepolia testnet ETH** (for testing)

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
pnpm install
```

### Environment Variables

Create a `frontend/.env.local` file with the following variables:

```env
# Required: Reown (WalletConnect) Project ID
# Get yours at https://cloud.reown.com
NEXT_PUBLIC_PROJECT_ID=your_reown_project_id_here

# Optional: Contract addresses (fill after deployment)
NEXT_PUBLIC_PINGPONG_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_GAMEHUB_CONTRACT_ADDRESS=0x...

# Optional: RPC URLs (defaults to public RPCs)
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
```

**Getting a Reown Project ID:**
1. Visit [https://cloud.reown.com](https://cloud.reown.com)
2. Sign up / Log in
3. Create a new project
4. Copy your Project ID
5. Add it to `.env.local`

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── app/                      # Next.js 16 App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home/landing page
│   └── pong/
│       └── page.tsx         # Pong game page
│
├── pages/                    # Page components
│   └── pongPage.tsx         # Pong game logic container
│
├── components/
│   ├── commons/             # Shared components
│   │   └── navbar.tsx       # Navigation with wallet connect
│   │
│   ├── pong/                # Pong-specific components
│   │   ├── boostPack.tsx    # Powerup inventory display
│   │   └── Bottomcard.tsx   # Leaderboard + live games
│   │
│   ├── ui/                  # shadcn/ui primitives
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── hover-card.tsx
│   │   ├── scroll-area.tsx
│   │   └── spinner.tsx
│   │
│   └── providers/
│       └── themeProvider.tsx # Dark mode provider
│
├── lib/
│   ├── walletProvider.tsx   # Wagmi + Reown AppKit config
│   └── utils.ts             # Utility functions (cn, etc.)
│
├── types/
│   └── index.ts             # TypeScript type definitions
│
├── public/                  # Static assets
└── package.json             # Dependencies
```

## Key Components

### Wallet Provider (`lib/walletProvider.tsx`)

Configures Wagmi and Reown AppKit for multi-chain wallet connection:

- **Networks**: Base mainnet (8453), Base Sepolia (84532)
- **Wallets**: MetaMask, Coinbase, WalletConnect, Gemini
- **Features**: Cookie state, dark mode, custom branding

### Navbar (`components/commons/navbar.tsx`)

Navigation component with:
- Logo/branding
- Wallet connection button (AppKit Connect)
- Responsive design

### Pong Page (`pages/pongPage.tsx`)

Main game interface featuring:
- **Game mode selector**: 4 modes (Quick Match, Create/Join, Friendly Stake, Compete)
- **Current status**: UI buttons functional, actions pending contract integration
- **Animations**: Framer Motion hover and scale effects

### Boost Pack (`components/pong/boostPack.tsx`)

Powerup inventory displaying:
- **Multiball Mayhem** 🎆 - Splits ball for chaotic offense
- **Pad Stretch** 💪 - Increases paddle length for saves
- **Guardian Shield** 🛡️ - Energy barrier blocking one goal
- **Daily Crate** button (pending implementation)

### Bottom Card (`components/pong/Bottomcard.tsx`)

Contains three sub-components:
1. **LeadersBoard** - Player rankings (currently mock data)
2. **HowToPlay** - Game instructions
3. **LiveGames** - Active game sessions (pending real data)

## Configuration

### Tailwind CSS (`tailwind.config.ts`)

- **Theme**: Custom color scheme with CSS variables
- **Plugins**: Custom animations (`tw-animate-css`)
- **Dark mode**: Class-based with `next-themes`

### Next.js (`next.config.ts`)

- **Turbopack**: Enabled for faster dev builds
- **Webpack**: Custom config to ignore thread-stream test files

### TypeScript (`tsconfig.json`)

- **Paths**: Configured aliases (`@/components`, `@/lib`, etc.)
- **Strict mode**: Enabled for type safety

## Wallet Integration Guide

### Using Wagmi Hooks

```typescript
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function Component() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  // Use address and connection state
}
```

### Contract Interaction (Planned)

```typescript
import { useReadContract, useWriteContract } from 'wagmi'
import PingPongABI from './abi/PingPong.json'

function GameComponent() {
  // Read contract state
  const { data: gameData } = useReadContract({
    address: '0x...',
    abi: PingPongABI,
    functionName: 'games',
    args: [gameId]
  })

  // Write to contract
  const { writeContract } = useWriteContract()

  const createGame = () => {
    writeContract({
      address: '0x...',
      abi: PingPongABI,
      functionName: 'createGame',
      value: parseEther('0.01') // Stake amount
    })
  }
}
```

## Current Implementation Status

### What Works ✅

- Wallet connection and disconnection
- Network switching (Base mainnet ↔ Base Sepolia)
- UI rendering and animations
- Dark mode toggle
- Responsive layout
- Toast notifications

### What's Pending 🚧

- **Contract Integration**
  - No ABI files imported yet
  - No wagmi hooks calling PingPong.sol
  - Game actions are placeholder functions
  - Powerup inventory shows hardcoded `owned: 0`

- **Game Logic**
  - No Canvas element for Pong game
  - No ball/paddle physics
  - No multiplayer synchronization

- **Real Data**
  - Leaderboard shows mock data
  - Live games shows empty array
  - No blockchain data fetching

## Contributing to Frontend

### Priority Tasks

1. **Smart Contract Integration** (High Priority)
   - Export PingPong contract ABI
   - Create wagmi hooks for contract functions
   - Implement game creation/joining flow
   - Connect powerup inventory to contract state

2. **Pong Game Implementation** (High Priority)
   - Build Canvas-based game with physics
   - Implement powerup visual effects
   - Add multiplayer synchronization (WebSocket/polling)

3. **Data Fetching** (Medium Priority)
   - Fetch real leaderboard from blockchain
   - Display active games from contract
   - Show player game history

4. **UI Enhancements** (Low Priority)
   - Loading states for transactions
   - Error handling and user feedback
   - Additional animations
   - Mobile optimization

### Code Style

- Follow existing ESLint + Prettier configuration
- Use TypeScript for all new files
- Prefer functional components with hooks
- Use Tailwind CSS utilities (avoid inline styles)
- Extract reusable logic into custom hooks

### Testing (To Be Added)

```bash
# Unit tests (Jest + React Testing Library)
npm run test

# E2E tests (Playwright)
npm run test:e2e
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in Vercel dashboard
3. Add environment variables in Vercel settings
4. Deploy

### Manual Deployment

```bash
# Build production bundle
npm run build

# Serve with any static hosting
npm start
# or use nginx, Apache, etc. to serve `.next` build
```

### Environment Variables for Production

Ensure these are set in your hosting platform:

```
NEXT_PUBLIC_PROJECT_ID=<your_reown_project_id>
NEXT_PUBLIC_PINGPONG_CONTRACT_ADDRESS=<deployed_contract_address>
```

## Troubleshooting

### Wallet Not Connecting

1. Ensure `NEXT_PUBLIC_PROJECT_ID` is set correctly
2. Check browser console for errors
3. Try clearing browser cache/cookies
4. Ensure you're on a supported network (Base mainnet or Sepolia)

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Hydration Errors

- Check for client-only code in server components
- Ensure `use client` directive where needed
- Verify ThemeProvider is properly configured

## Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Wagmi Documentation**: https://wagmi.sh/
- **Reown AppKit Docs**: https://docs.reown.com/appkit/overview
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com/
- **Base Network**: https://docs.base.org/

## License

MIT - Part of the ChainSkills Arena project

---

**Need Help?** Open an issue in the main repository or check the contributing guidelines.
