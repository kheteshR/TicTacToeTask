const express = require('express');
const cors = require('cors');
var app = express();
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var prompt = require('prompt');

const web3Module = require('./myweb3client.js');
const to = require('await-to-js').default;


//--------------------------------Tic Tac Toe Commanline code -----------------------------------------------------//
/*  A simple Tic-Tac-Toe game implemented in Javascript V8 3.14.5.9

Execute using NodeJS

Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9

1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9

*/




var board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

function markBoard(position, mark) {
    board[position] = mark.toUpperCase();
}

function printBoard() {
    console.log('\n' +
        ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' ---------\n' +
        ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' ---------\n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
}

function isInt(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

function validateMove(position) {
    console.log("isInt(position):", isInt(position));
    console.log("board[position]: ",board[position]);
    return (isInt(position) && board[position] === ' ')
}

var winCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7],
                       [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

// Determins if the passed in player has three in a row
function checkWin(player) {
    var i, j, markCount
    for (i = 0; i < winCombinations.length; i++) {
        markCount = 0;
        for (j = 0; j < winCombinations[i].length; j++) {
            if (board[winCombinations[i][j]] === player) {
                markCount++;
            }
            if (markCount === 3) {
                return true;
            }
        }
    }
    return false;
}

function checkTie() {
    for (var i = 1; i <= Object.keys(board).length; i++) {
        if (board[i] === ' ') {
            return false;
        }
    }
    return true;
}

async function playTurn(player) {
    console.log("playerObject",playerObject); 
    let player1AddressAssigned;
    let player2AddressAssigned;
    if(player==='X'){
         player1AddressAssigned=playerObject[0];
    }else if(player==='O'){
         player2AddressAssigned=playerObject[1];
        }
    console.log('Your turn player: ' + player);
    prompt.start();
    prompt.get(['position'], async function (err, result) {

        if (validateMove(result.position) === true) {
            markBoard(result.position, player);
            printBoard();
            if (checkWin(player) === true) {
                if(player==='X'){
                console.log('Winner Winner!',player,player1AddressAssigned);
                // let result=await web3Module.pikWinner(player1AddressAssigned);
                // console.log("player1AddressAssigned",result);
                let result=await web3Module.pikWinner(player1AddressAssigned);
                // console.log(result);
                return result;
                }else if(player==='O'){
                    console.log('Winner Winner!',player,player2AddressAssigned);
                    let result=await web3Module.pikWinner(player2AddressAssigned);
                    // console.log(result);
                    return result;
                //   let result=await web3Module.pikWinner(player2AddressAssigned);
                //    console.log("player2AddressAssigned",result);
                }else{
                    return;
                }
            }
            if (checkTie() === true) {
                console.log('Tie Game');
                return;
            }
            if (player === 'X') {
                playTurn('O');
            } else {
                playTurn('X');
            }
        } else {
            console.log('incorrect input please try again...');
            playTurn(player);
        }
    });
}
var playerObject=[];

async function enterInGame(){
    prompt.get(['player1Address', 'player2Address'], await function (err, result) {
        // Participate in tic tac toe game.
        console.log('Command-line input received:',result);
        console.log('player1: ' + result.player1Address);
        playerObject.push( result.player1Address);
        addInContract(playerObject[0]);
        console.log('player2: ' + result.player2Address);
        playerObject.push( result.player2Address);
        addInContract(playerObject[1]);
        console.log("Successfully Entered in Game. Start Play...");
        playTurn('X');
      });
      

    
}
async function addInContract(address){
    let response=await web3Module.enter();
    console.log(response);
}
console.log('Game started: \n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

enterInGame();   


