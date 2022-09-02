const { developmentChains } = require("../helper-hardhat-config")

//VRFCoordinator constructor takes in _baseFee _gasPricelink
//each request for Random number on Rinkeby will cost 0.26 lINK

const BASE_FEE = ethers.utils.parseEther("0.25") //
const GAS_PRICE_LINK = 1e9 // CALCULATED VALUE ON THE GAS PRICE OF THE CHAINS

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        //deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed")
        log("..................................")
    }

    module.exports.tags = ["all", "mocks"]
}
