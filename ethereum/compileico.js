const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

//Start by creating a path for the compiled results called buildPath (build directory will be stored here)
const buildPath = path.resolve(__dirname, "buildico");

//make sure we delete any folder that exists in this path, if we run this function.
fs.removeSync(buildPath);

//the usual process of compiling a solidity file
const campaignPath = path.resolve(__dirname, "contracts", "Ico.sol");
const source = fs.readFileSync(campaignPath, "utf8");
const output = solc.compile(source, 1).contracts;

//rebuild the 'build' folder again, making sure its a new directory
fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
