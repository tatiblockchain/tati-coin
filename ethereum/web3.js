import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //We are in the browser metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //USer is not runnig metamask OR we are on the server
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/d22795eff7b84261a5e61caa70f9d830"
  );

  web3 = new Web3(provider);
}

export default web3;
