const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const tatiCoinSale = require("./buildico/TatiCoinSale.json");

const provider = new HDWalletProvider(
  "enter 12 word seed here",
  "https://rinkeby.infura.io/v3/replace-with-own-key"
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
