pragma solidity ^0.4.17;

contract TicTacToe{
address public manager;
address[] public players;

// function TicTacToe(){
// manager=msg.sender;
// }

function enter() public payable{
    require(msg.value>0.1 ether);
    players.push(msg.sender);
}


function pickWinner(address winner) public returns(uint){
    winner.transfer(this.balance);  // address has some method tied to it and transfer method shows balance of contract
    players=new address[](0);// zero means no elements in array(we are emptying address so no need to redeploy code again) .This is indication of reseting array 
       return winner.balance;
       
}



function getPlayers() public view returns (address[]){
    return players;

}
}