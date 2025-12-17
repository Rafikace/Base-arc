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
