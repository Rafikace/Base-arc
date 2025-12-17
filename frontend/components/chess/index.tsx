"use client";

import { initializeBoard } from "@/lib/utils";
import { useState } from "react";

export default function Chess() {

    const [board] = useState(initializeBoard());
    const [selectedSquare, setSelectedSquare] = useState(null);

    const handleSquareClick = (row, col) => {
        const piece = board[row][col];

        if (selectedSquare) {
            const [fromRow, fromCol] = selectedSquare;
            handleMakeMove(fromRow, fromCol, row, col);

            setSelectedSquare(null);
        } else {
            if (piece) {
                setSelectedSquare([row, col]);
            }
        }
    };

    const handleMakeMove = (fromRow, fromCol, toRow, toCol) => {
        console.log(`Move from [${fromRow}, ${fromCol}] to [${toRow}, ${toCol}]`);
    };

    const handleReset = () => {
        console.log('Reset board');
    };


    return (
        <>
            <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                    Chess Board
                </h1>
            </div>

            <div className="aspect-square bg-blue-50 p-3 sm:p-4 md:p-6 rounded-lg shadow-2xl">
                {/* Board Grid */}
                <div className="w-full h-full grid grid-cols-8 gap-0 bg-white rounded-sm overflow-hidden shadow-inner">
                    {board.map((row, rowIndex) =>
                        row.map((piece, colIndex) => {
                            // Alternating blue pattern
                            const isLight = (rowIndex + colIndex) % 2 === 0;
                            const fileLabel = String.fromCharCode(97 + colIndex);
                            const rankLabel = 8 - rowIndex;
                            const showFileLabel = rowIndex === 7;
                            const showRankLabel = colIndex === 0;
                            const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex;

                            return (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                                    className={`relative aspect-square flex flex-col items-center justify-center transition-all duration-150 cursor-pointer hover:opacity-90 ${isLight
                                        ? 'bg-blue-200'
                                        : 'bg-blue-500'
                                        } ${isSelected ? 'ring-4 ring-yellow-300 ring-inset' : ''}`}
                                >
                                    {/* Piece */}
                                    {piece && (
                                        <div className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none drop-shadow-lg ${piece.color === 'white'
                                            ? 'text-white'
                                            : 'text-black'
                                            }`}>
                                            {pieceSymbols[piece.color][piece.type]}
                                        </div>
                                    )}

                                    {/* File label (bottom) */}
                                    {showFileLabel && (
                                        <div className="absolute bottom-1 sm:bottom-1.5 right-1 sm:right-1.5 text-[10px] sm:text-xs font-bold text-blue-900 opacity-70">
                                            {fileLabel}
                                        </div>
                                    )}

                                    {/* Rank label (left) */}
                                    {showRankLabel && (
                                        <div className="absolute top-1 sm:top-1.5 left-1 sm:left-1.5 text-[10px] sm:text-xs font-bold text-blue-900 opacity-70">
                                            {rankLabel}
                                        </div>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center gap-4">
                <button
                    onClick={handleReset}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                    Reset
                </button>
            </div>
        </>
    )
}
