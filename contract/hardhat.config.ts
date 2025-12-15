import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable, defineConfig } from "hardhat/config";

export default defineConfig({
	plugins: [hardhatToolboxMochaEthersPlugin],
	solidity: {
		profiles: {
			default: {
				version: "0.8.28"
			},
			production: {
				version: "0.8.28",
				settings: {
					optimizer: {
						enabled: true,
						runs: 200
					}
				}
			}
		}
	},
	networks: {
		base: {
			type: "http",
			chainId: 8453,
			url: configVariable("BASE_RPC_URL"),
			accounts: [configVariable("BASE_PRIVATE_KEY")]
		}
	},
	verify: {
		etherscan: {
			apiKey: configVariable("ETHERSCAN_API_KEY")
		},
		blockscout: {
			enabled: true
		}
	},
	chainDescriptors: {
		8453: {
			name: "Base mainnet Blockscout",
			blockExplorers: {
				blockscout: {
					name: "base mainnet Blockscout",
					url: "https://base.blockscout.com",
					apiUrl: "https://base.blockscout.com/api"
				},
				etherscan: {
					name: "Lisk Sepolia Blockscout",
					url: "https://basescan.org",
					apiUrl: "https://api.basescan.org/api"
				}
			}
		}
	}
});
