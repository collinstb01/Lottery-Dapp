const { networkConfig, developmentChains } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, Deployments }) => {
    const { deploy, log } = Deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("local network detected")

        await deploy("Raffle", {
            from: deployer,
            args: [],
            log: true,
        })
    }
}
