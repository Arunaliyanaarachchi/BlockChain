const SHA256 = require('crypto-js/sha256');
var Chain = require("./Blockchain.js");

function Block (merkleRoot, timeStamp, data, prevHash){
        this.merkelRoot = merkleRoot;
        this.timeStamp = timeStamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }

    Block.prototype.calcHash = function(){
        return SHA256(this.merkelRoot+ this.prevHash + this.timeStamp + JSON.stringify(this.data) + this.nonce).toString();
    };

    Block.prototype.mineBlock = function(difficulty){
        //Creating a string of 0 to show computing power
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calcHash();
        }

        console.log("Block mined: " + this.hash);
    };
    
module.exports = Block;