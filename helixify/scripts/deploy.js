async function main() {
    const DNAStorage = await ethers.getContractFactory("DNAStorage");
    const dnaStorage = await DNAStorage.deploy();
    await dnaStorage.deployed();
    console.log("DNAStorage deployed to:", dnaStorage.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  