import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Counter2Module", (m) => {
  const counter = m.contract("Counter2");
  return { counter };
});
