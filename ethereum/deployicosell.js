const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const tatiCoinSale = require("./buildico/TatiCoinSale.json");

const provider = new HDWalletProvider(
  "spirit pear impose chicken fold mail festival slogan affair degree cake master",
  "https://rinkeby.infura.io/v3/d22795eff7b84261a5e61caa70f9d830"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(tatiCoinSale.interface))
    .deploy({
      data: "0x" + tatiCoinSale.bytecode,
      arguments: [
        "0x345887a8168e819ff1e45795d9b7e982cd2b77dc",
        10000000000000000
      ]
    })
    .send({ gas: "5000000", from: accounts[0] });

  console.log("Our contract was deployed to : ", result.options.address);
};

deploy();

//Deployed TatiCoin Contract - 0x345887a8168e819FF1E45795D9b7e982Cd2B77Dc

//Deployed Sell-Contract - 0x4D7547EBE994BF0c3625c210267390E16D9e0827
