const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timeStamp, data, prevHash){
        this.index = index;
        this.time = timeStamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calcHash();
        this.nonce = 0;
    }

    calcHash(){
        return SHA256(this.index + this.prevHash + this.timeStamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty){
        //Creating a string of 0 to show computing power
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calcHash();
        }

        console.log("Block mined: " + this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.creatingGenesisBlock()];
        this.difficulty = 2;
        this.chainSize = 0;
    }

    creatingGenesisBlock(){
        return new Block(this.chainSize, this.getCurrentDateTime(), "Genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    //Returns the 
    getCurrentDateTime(){
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getMinutes();
        var time = now.toTimeString();

        var dayOfWeek = now.getDay();
        var day = now.getDate();
        var month = now.getMonth();
        var year = now.getFullYear();

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

        var date = dayOfWeek + ' ' + month + '/' + day + '/' + year;
        var time = hours + ':' + minutes + ':' + seconds;

        return date + " " + time;
    }
    
    /**
     * Takes in a new block 
     * set the previous block
     * calc the hash 
     * Add to chain
     **/
    addBlock(newBlock){
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    } 

    //Loops through the chain comparing the hashes of the currentBlock and the previous 
    //to make sure they match 
    isChainValid(){
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
            
        }
        return true;
    }
}

let twonCoin = new Blockchain();

console.log('Mining block 1...');
twonCoin.addBlock(new Block(++twonCoin.chainSize, twonCoin.getCurrentDateTime(), {amount: 4}));

console.log('Mining block 2...');
twonCoin.addBlock(new Block(++twonCoin.chainSize, twonCoin.getCurrentDateTime(), {amount: 10}));

//console.log('Is blockChain Valid: ' + twonCoin.isChainValid())

//Calculation changes the hash so isChainValad false
//twonCoin.chain[1].data = {amount: 100};

//Breaks the blockChain and isChainValid return false
//twonCoin.chain[1].hash = twonCoin.chain[1].calcHash();

//console.log('Is blockChain Valid: ' + twonCoin.isChainValid())

console.log(JSON.stringify(twonCoin, null, 4)); 