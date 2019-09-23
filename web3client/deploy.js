const assert =require('assert');
const ganache=require('ganache-cli');
// const HDWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');
const {interface , bytecode }=require('./compile');
const jsonFile = "/home/khetesh/Downloads/inbox/contracts/inbox.json";
const abi=jsonFile.abi;
console.log(interface,bytecode);


// const provider=new HDWalletProvider('orbit ring rose exile park verify dumb crowd movie inner crater sketch','https://rinkeby.infura.io/v3/dcec72a6ec544bd59c29f55eec2e711a');
// const web3=new Web3(provider);
const web3=new Web3('http://localhost:8545');

let accounts;
const deploy=async ()=>{
   
    accounts= await web3.eth.getAccounts();
    console.log("accounts===>",accounts);

    //Use One of the account to deploy contract
   const result=await new web3.eth.Contract(JSON.parse(interface))
   .deploy({
       data:bytecode,
       arguments:['']})
   .send({
       from:accounts[0],
       gas:'1000000'});

       console.log("result of deployment to local network",result.options.address);
}

deploy();