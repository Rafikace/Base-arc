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

    return (
        <>
        </>
    )
}
