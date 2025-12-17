    import hre from "hardhat";
    import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";

    await verifyContract(
    {
        address: "0x9E2CE38C97020eda9F108ddeD27a43c9323C5434",
        // constructorArgs: [],
        provider: "etherscan",
    },
    hre,
    );