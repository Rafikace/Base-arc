// import hre from "hardhat";


// const ethers = await hre.network.connect();

// async function main() {
//   const factory = await ethers.getContractFactory("PingPong");

//   const deployTx = await factory.getDeployTransaction();

//   const gasUsed = await ethers.provider.estimateGas(deployTx);

//   const feeData = await ethers.provider.getFeeData();

//   const gasPrice =
//     feeData.maxFeePerGas ?? feeData.gasPrice!;

//   const costWei = gasUsed * gasPrice;

//   console.log("Gas estimate:", gasUsed.toString());
//   console.log("Gas price (wei):", gasPrice.toString());
//   console.log("Estimated deploy cost (wei):", costWei.toString());
//   console.log(
//     "Estimated deploy cost (ETH):",
//     ethers.formatEther(costWei)
//   );
// }

// main();

import hre from "hardhat";

async function main() {
  const { ethers } = await hre.network.connect();

  const factory = await ethers.getContractFactory("PingPong");

  const deployTx = await factory.getDeployTransaction();

  const gas = await ethers.provider.estimateGas(deployTx);

  const feeData = await ethers.provider.getFeeData();
  const gasPrice = feeData.maxFeePerGas ?? feeData.gasPrice!;

  console.log("Gas:", gas.toString());
  console.log("Cost (wei): ", gasPrice);
}

main();
