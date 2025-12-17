import { Hex } from "viem"

export default function useConnect() { 
    const connectFreeGame = (address: Hex) => {
        
        console.log(address)
     }
    return {
        connectFreeGame
    }
}