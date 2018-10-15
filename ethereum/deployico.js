const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const tatiCoin = require("./buildico/TatiCoin.json");

const provider = new HDWalletProvider(
  "spirit pear impose chicken fold mail festival slogan affair degree cake master",
  "https://rinkeby.infura.io/v3/d22795eff7b84261a5e61caa70f9d830"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account: ", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(tatiCoin.interface))
    .deploy({
      data: "0x" + tatiCoin.bytecode,
      arguments: [100, "TatiCoin", "TTC"]
    })
    .send({ gas: "5000000", from: accounts[0] });

  console.log("Our contract was deployed to : ", result.options.address);
};

deploy();

// Contract - 0x345887a8168e819FF1E45795D9b7e982Cd2B77Dc
//Owner - 0xCb7f1BCC0389c34f4826b5Ffaa1d1572b32808C1
