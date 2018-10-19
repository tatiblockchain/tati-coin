import web3 from "./web3";
import tatiCoinSale from "./buildico/TatiCoinSale.json";

const icoSellInstance = new web3.eth.Contract(
  JSON.parse(tatiCoinSale.interface),
  "replace-with-own-deployed-contract"
);

export default icoSellInstance;
