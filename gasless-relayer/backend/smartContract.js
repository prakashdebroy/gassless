const ethers = require("ethers");
require("dotenv").config();
const contractABI = require("./smartContractABI.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, provider);

module.exports = contract;

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
