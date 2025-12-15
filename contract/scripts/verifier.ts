    import hre from "hardhat";
    import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

    await verifyContract(
    {
        address: "",
        constructorArgs: [],
        provider: "etherscan",
    },
    hre,
    );