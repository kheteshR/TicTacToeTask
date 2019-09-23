const fs = require('fs');

const web3config = "./config/web3config.json";
const web3configJson = JSON.parse(fs.readFileSync(web3config));
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(web3configJson.rpc_url));
const address = web3configJson.accounts[0];
const jsonFile = "./contract/tictactoe.json";
const parsed = JSON.parse(fs.readFileSync(jsonFile));
const abi = parsed.abi;
const contractaddress = web3configJson.contract_address[0];
const contract = new web3.eth.Contract(abi, contractaddress);


async function enter(address) {

    return new Promise((resolve, reject)=>{
        contract.methods.enter().call({
            from: address
        }, (err, result) => {
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    })
    
}

async function pikWinner(winner) {

    return new Promise((resolve, reject)=>{
        console.log("Attach ALias.....")
    contract.methods.pickWinner(winner)
        .send({
            from: address,
            gas: 2500000
        })
        .on('transactionHash', function(hash) {
            console.log(hash)
        })
        .on('confirmation', function(confirmationNumber, receipt) {
            console.log("Confirmed", confirmationNumber, receipt);
        })
        .on('receipt', function(receipt) {
            resolve(receipt)
        })
        .on("error", function(error) {
            reject(error);
        });

    })
    
}




//------------------method calls ----------------------------------


//findMember(104);
//attachALias(104, 101);
// addtoAccum(101,10,10,10,10);
//addNewMember(101,201,301)

//-----------------Exports---------------------------------//

module.exports = {
    pikWinner,
    enter
}