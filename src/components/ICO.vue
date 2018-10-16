<template>
  <div class="ico">
    <div class="container">
      <div class="jumbotron jumbotron-fluid">
          <h1 class="display-4">ICO DEMO - TatiCoin</h1>
          <p class="lead">Would you like to participate in the TatiCoin(TTC) ICO?</p>
          <hr class="my-4">
          <p class="lead">Please note this is a DEMO ICO project. The TatiCoin (TTC) token is
            issued on the <span class="font-weight-bold">Rinkeby Test network and has no value.</span> You can participate and buy TatiCoin(TTC) using Rinkeby Test Ether.
             Please see our guide on how to <a href="https://documentation.tatiblockchain.co.za">get Rinkeby Ether and
           set-up meta-mask</a> in order to buy our TTC.</p>

           <p class="lead">Before you proceed - make sure you have logged in to meta-mask and you have topped up your Rinkeby Ether
             (using faucet described in our documentation attached to link above)</p>
             <hr>
             <div class="table-responsive">
               <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Token name</th>
                    <th scope="col">Total circulation</th>
                    <th scope="col">Token price(eth)</th>
                    <th scope="col">How many tokens would you like to buy?</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">{{name}}({{symbol}})</th>
                    <td>{{circulation}}</td>
                    <td>{{price}} ether</td>
                    <td>
                      <input
                      type="number"
                      v-validate="'required'"
                      name="ether"
                      class="form-control"
                      placeholder="Enter number of tokens"
                      v-model="tokens"
                      v-on:input="validateEther"
                      >
                    </td>
                    <td><button class="btn btn-primary" @click="buyNow">
                      <i v-if="loading" class="fa fa-circle-o-notch fa-spin"></i>
                      Buy</button></td>
                  </tr>
                </tbody>
              </table>
             </div>
            <br>
            <div v-if="message !==''" class="alert alert-success" role="alert">
              {{message}}
            </div>
            <br>
            <div class="row">
              <div class="col-md">
                <div class="linebox text-white">
                  <p class="lead">Token value in Ether: {{tokenValue}}</p>
                </div>
              </div>
            </div>
            <br>
            <br>
            <h5>Tokens Sold so far: {{sold}}</h5>
            <div class="raisedbox">
              <div class="progress">
                <div class="progress-bar"
                role="progressbar"
                v-bind:style="{width: calculatePercentage + '%'}"
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100">{{calculatePercentage}}%</div>
              </div>
            </div>
            <br>
            <h5>Now let us confirm how many TTC tokens you have . . . </h5>
            <input
            type="text"
            v-validate="'required'"
            name="address"
            class="form-control"
            placeholder="Enter the address you used to buy tokens"
            v-model="address"
            v-on:input="validateAddress"
            >
            <br>
            <button class="btn btn-primary btn-lg" @click="checkBalance">
              <i v-if="loading1" class="fa fa-circle-o-notch fa-spin"></i>
              Check TTC balance</button>
              <br>
              <br>
              <p v-if="returnedBalance !==''" class="lead">
                The balance for {{address}} is: {{returnedBalance}} (TTC) Tokens</p>
      </div>
    </div>

  </div>
</template>

<script>
//Importing the Ethereum stuff . . .
import web3 from "../../ethereum/web3";
import ico from "../../ethereum/ico";
import icoSale from "../../ethereum/icosale";

export default {
  data() {
    return {
      etherValidation: false,
      addressValidation: false,
      address: "",
      returnedBalance: "",
      message: "",
      tokens: "",
      circulation: "",
      price: "",
      sold: "",
      name: "",
      symbol: "",
      loading: false,
      loading1: false
    };
  },
  methods: {
    validateEther() {
      const self = this;
      this.$validator.validate("ether").then(function(response) {
        self.etherValidation = response;
      });
    },
    validateAddress() {
      const self = this;
      this.$validator.validate("address").then(function(response) {
        self.addressValidation = response;
      });
    },
    async checkBalance() {
      if (this.addressValidation) {
        try {
          this.loading1 = true;

          const balance = await ico.methods.balanceOf(this.address).call();
          this.returnedBalance = balance;

          this.loading1 = false;
        } catch (err) {
          alert(err);
          this.loading1 = false;
        }
      } else {
        alert("please enter address to verify");
      }
    },
    async populateVariables() {
      try {
        //calling ICO smart contract
        const name = await ico.methods.name().call();
        const symbol = await ico.methods.symbol().call();
        const supply = await ico.methods.totalSupply().call();

        //Calling ICO sell smart contract
        const price = await icoSale.methods.tokenPrice().call();
        const sold = await icoSale.methods.tokensSold().call();

        //Assign the variables
        this.name = name;
        this.symbol = symbol;
        this.circulation = supply;
        this.price = web3.utils.fromWei(price, "ether");
        this.sold = sold;
      } catch (err) {
        alert(
          "Ensure you have meta-mask active on Rinkeby Test Network to view and interact with this demo"
        );
      }
    },
    async buyNow() {
      let self = this;

      if (this.etherValidation) {
        try {
          self.loading = true;
          self.message =
            "We have sent your transaction to the Ethereum Network, this may take a while. Please do not navigate from this page";

          //Get accounts from injected web3
          const accounts = await web3.eth.getAccounts();

          //Calculate the Ether to send
          const etherSend = (self.tokens * self.price).toString();

          await icoSale.methods.buyTokens(self.tokens).send({
            from: accounts[0],
            value: web3.utils.toWei(etherSend, "ether")
          });

          self.message = "";
          self.loading = false;
          self.tokens = "";
          self.populateVariables();
          alert("your transaction has been processed succesfully");
        } catch (err) {
          alert(err);
          self.loading = false;
          self.message = "";
        }
      } else {
        alert("Enter number tokens to buy");
      }
    },
    alertDisplay() {
      this.$swal(
        "About Smart Contracts",
        "We are utilising smart contracts on this page, connected to the Rinkeby TEST network. In order to view contract values or interact with ICO, you need to use a smart-browser with meta-mask enabled. You also need to make sure Rinkeby Test Network is selected, the features on this page will not work without meta-mask or ethereum enabled browser like mist.",
        "OK - Got it"
      );
    }
  },
  computed: {
    calculatePercentage() {
      return Math.round((this.sold / this.circulation) * 100);
    },
    tokenValue() {
      return this.tokens * 0.01;
    }
  },
  created() {
    this.populateVariables();
  },
  mounted() {
    this.alertDisplay();
  }
};
</script>
