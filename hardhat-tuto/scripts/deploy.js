const { ethers } = require('hardhat')
const { CRYPTO_DEVS_NFT_CONTRACT_ADDRESS } = require('../constants')

async function main() {
  // address of the Crypto Devs NFT contract that you deployed in the previous modle
  const fakeNFTMarketplace = await ethers.getContractFactory("FakeNFTMarketplace")
  const deployedFakeNFTMarketplace = await fakeNFTMarketplace.deploy()
  await deployedFakeNFTMarketplace.deployed()
  
  console.log("FakeNFTMarkeplace deployed to:", deployedFakeNFTMarketplace.address)
  
  const cryptoDevsDAO = await ethers.getContractFactory('CryptoDevsDAO')
  const deployedCryptoDevsDAO = await cryptoDevsDAO.deploy(deployedFakeNFTMarketplace.address, 
    CRYPTO_DEVS_NFT_CONTRACT_ADDRESS, {
      // This assumes that your account has at least 0.1 ETH in its account
      value: ethers.utils.parseEther("0.1")
    }
  )
  await deployedCryptoDevsDAO.deployed()

  console.log("Crypto Devs DAO Contract Address:", deployedCryptoDevsDAO.address)
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })