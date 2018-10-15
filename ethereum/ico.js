import web3 from "./web3";
import tatiCoin from "./buildico/TatiCoin.json";

const icoInstance = new web3.eth.Contract(
  JSON.parse(tatiCoin.interface),
  "0x345887a8168e819FF1E45795D9b7e982Cd2B77Dc"
);

export default icoInstance;
