"use client";

import { initializeBoard } from "@/lib/utils";
import { useState } from "react";

export default function Chess() {
    const [board] = useState(initializeBoard());
    const [selectedSquare, setSelectedSquare] = useState(null);
    return (
        <>
        </>
    )
}
