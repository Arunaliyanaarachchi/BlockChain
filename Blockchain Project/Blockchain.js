const crypto = require('crypto');
const MerkleTree = require('merkletreejs');
var Block = require("./Block.js");

function Blockchain (){
        this.chain = [this.creatingGenesisBlock()];
        this.difficulty = 2;
        this.chainSize = 0;
    }

    Blockchain.prototype.creatingGenesisBlock = function(){
        return new Block(this.chainSize, this.getCurrentDateTime(), "Genesis block", "0");
    };

    Blockchain.prototype.getLatestBlock = function(){
        return this.chain[this.chain.length-1];
    };

    /**
     * Takes in a new block 
     * set the previous block
     * calc the hash 
     * Add to chain
     **/
    Blockchain.prototype.addBlock = function(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        this.chainSize++;
    }; 

    //Returns the 
    Blockchain.prototype.getCurrentDateTime = function(){
        var now = new Date();
        var dayOfWeek = now.getDay();
        
        //Gets the string version of the day of the week
        switch(dayOfWeek){
            case 1:
                dayOfWeek = 'Mon';
                break;
            
            case 2:
                dayOfWeek = 'Tue';
                break;
            
            case 3:
                dayOfWeek = 'Wed';
                break;

            case 4:
                dayOfWeek = 'Thur';
                break;
            
            case 5:
                dayOfWeek = 'Fri';
                break;

            case 6:
                dayOfWeek = 'Sat';
                break;

            case 7:
                dayOfWeek = 'Sun';
                break;

            default:
        }

        var day = now.getDate();
        var month = now.getMonth();
        var year = now.getFullYear();

        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getMinutes();
        var milisec = now.getMilliseconds();
        var time = now.toTimeString();

        var date = dayOfWeek + ' ' + month + '/' + day + '/' + year;
        var time = hours + ':' + minutes + ':' + seconds + ':' + milisec;

        return date + " " + time;
    };

    //Loops through the chain comparing the hashes of the currentBlock and the previous 
    //to make sure they match 
    Blockchain.prototype.isChainValid = function(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            //Recalculate the hash to make sure the data is the same
            //And the data has not been changed
            if(currentBlock.hash != currentBlock.calcHash())
                return false;
            
            //Compares the hashes of the current and previous block
            //making sure they are the same
            if(currentBlock.prevHash !== previousBlock.hash)
                return false;

            let str = createTree(currentBlock.data)

            if(str !== currentBlock.merkelRoot)
                return false;
        }
        return true;
    };

    Blockchain.prototype.sha256 = function(data) {
        // returns Buffer
        return crypto.createHash('sha256').update(data).digest();
    };
    
    Blockchain.prototype.createTree = function(data){
        let leaves = [data.toString()].map(x => this.sha256(x));
        var tree = new MerkleTree(leaves, "sha256");
        const root = tree.getRoot();
    
        let str = "";

        for(let i = 0; i < 31; i++)
            str += root[i] + ","; 
        
        str += root[31];
        return str;
    };


module.exports = Blockchain;