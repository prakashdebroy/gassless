// deploy.js - Deploys the smart contract
const hre = require("hardhat");
async function main() {
    const GaslessContract = await hre.ethers.getContractFactory("GaslessTransaction");
    const contract = await GaslessContract.deploy();
    await contract.deployed();
    console.log("Contract deployed at:", contract.address);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
