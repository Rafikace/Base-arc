import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { cookieStorage, createStorage } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { baseSepolia, base } from "@reown/appkit/networks";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const wagmiAdapter = new WagmiAdapter({
	storage: createStorage({
		storage: cookieStorage
	}),
	ssr: true,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
	networks: [base, baseSepolia]
});

export const config = wagmiAdapter.wagmiConfig;
export const pieceSymbols = {
	white: {
		king: "♔",
		queen: "♕",
		rook: "♖",
		bishop: "♗",
		knight: "♘",
		pawn: "♙"
	},
	black: {
		king: "♚",
		queen: "♛",
		rook: "♜",
		bishop: "♝",
		knight: "♞",
		pawn: "♟"
	}
};
export const initializeBoard = () => {
  const board: {type: string, color:string}[][] = Array(8)
		.fill(null)
		.map(() => Array(8).fill(null));

	for (let i = 0; i < 8; i++) {
		board[1][i] = { type: "pawn", color: "black" };
		board[6][i] = { type: "pawn", color: "white" };
	}

	const setup = [
		"rook",
		"knight",
		"bishop",
		"queen",
		"king",
		"bishop",
		"knight",
		"rook"
	];
	for (let i = 0; i < 8; i++) {
		board[0][i] = { type: setup[i], color: "black" };
		board[7][i] = { type: setup[i], color: "white" };
	}

	return board;
};
