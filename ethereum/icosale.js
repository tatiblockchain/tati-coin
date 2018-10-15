import web3 from "./web3";
import tatiCoinSale from "./buildico/TatiCoinSale.json";

const icoSellInstance = new web3.eth.Contract(
  JSON.parse(tatiCoinSale.interface),
  "0x4D7547EBE994BF0c3625c210267390E16D9e0827"
);

export default icoSellInstance;
