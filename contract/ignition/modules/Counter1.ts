import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Counter1Module", (m) => {
  const counter = m.contract("Counter1");
  return { counter };
});
2