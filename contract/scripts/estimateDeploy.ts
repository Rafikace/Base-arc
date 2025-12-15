const ethers = require("hardhat");

async function main() {
  const factory = await ethers.getContractFactory("PingPong");

  const deployTx = await factory.getDeployTransaction();

  const gasUsed = await ethers.provider.estimateGas(deployTx);

  const feeData = await ethers.provider.getFeeData();

  const gasPrice =
    feeData.maxFeePerGas ?? feeData.gasPrice!;

  const costWei = gasUsed * gasPrice;

  console.log("Gas estimate:", gasUsed.toString());
  console.log("Gas price (wei):", gasPrice.toString());
  console.log("Estimated deploy cost (wei):", costWei.toString());
  console.log(
    "Estimated deploy cost (ETH):",
    ethers.formatEther(costWei)
  );
}

main();