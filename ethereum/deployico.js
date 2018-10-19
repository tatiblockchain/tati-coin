const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const tatiCoin = require("./buildico/TatiCoin.json");

const provider = new HDWalletProvider(
  "enter 12 word seed here",
  "https://rinkeby.infura.io/v3/replace-with-own-key"
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
