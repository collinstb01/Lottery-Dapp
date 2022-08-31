const { inputToConfig } = require("@ethereum-waffle/compiler")
const { assert } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config.js")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffel Unit Tests", async () => {
          let raffle, vrfCoordinatorV2Mock
          const chainId = network.config.chainId

          beforeEach(async () => {
              const { deployer } = await getNamedAccounts()
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
          })

          describe("Constructor", () => {
              inputToConfig("Initialize the raffle correctly", async () => {
                  const raffleState = await raffle.getRaffleState()
                  const intervalState = await raffle.getInterval()
                  assert.equal(raffleState.toString(), "0")
                  assert.equal(intervalState.toString(), networkConfig[chainId]["interval"])
              })
          })
      })
