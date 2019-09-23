const path= require('path');
const fs =require('fs');
const solc= require('solc');

const claimContractPath = path.resolve(__dirname,'contract','tictactoe.sol');
console.log("smart contract path---------",claimContractPath);
const source = fs.readFileSync(claimContractPath, 'utf8');
solc.compile(source,1);
console.log(solc.compile(source,1));
module.exports = solc.compile(source,1).contracts[':TicTacToe'];

// deployed contract address in local:0x81260294a1F040BcbdE0dDC7ab7D9CB07c5eD959
// 0xb87213121fb89cbd8b877cb1bb3ff84dd2869cfa