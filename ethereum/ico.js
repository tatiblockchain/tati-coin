import web3 from "./web3";
import tatiCoin from "./buildico/TatiCoin.json";

const icoInstance = new web3.eth.Contract(
  JSON.parse(tatiCoin.interface),
  "replace-with-own-oco-contract"
);

export default icoInstance;
