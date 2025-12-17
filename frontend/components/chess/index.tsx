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
        </>
    )
}
