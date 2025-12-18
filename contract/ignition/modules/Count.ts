import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CountingModule", (m) => {
  const counter = m.contract("Counting");
  return { counter };
});
