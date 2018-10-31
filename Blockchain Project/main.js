var Chain = require("./Blockchain.js");
var Block = require("./Block.js");
//var Person = require("./Person.js");
var twonCoin = new Chain();
console.log('Mining block 1...');

//let leaves = ['a', 'b', 'c'].map(x => sha256(x));
let data = "trial";
//var tree = new MerkleTree(leaves, sha256);
//const root = tree.getRoot(); 
const root = twonCoin.createTree(data);
console.log(root);
twonCoin.addBlock(new Block(root, twonCoin.getCurrentDateTime(), data, twonCoin.prevHash));
//console.log(twonCoin.verifyTree(tree));

data = "test";
let root2 = twonCoin.createTree(data);
console.log('Mining block 2...');
twonCoin.addBlock(new Block(root2, twonCoin.getCurrentDateTime(), data, twonCoin.prevHash));

//console.log('Is blockChain Valid: ' + twonCoin.isChainValid())

/* ///////////////////////////////////////////////////////////////////////////////////////
//                                Test Cases

//Calculation changes the hash so isChainValad should return false
twonCoin.chain[1].data =  100;

//Breaks the blockChain by recalculating hash and isChainValid should return false
twonCoin.chain[1].hash = twonCoin.chain[1].calcHash();
//                                Test Cases
 ////////////////////////////////////////////////////////////////////////////////////// 
console.log('Is blockChain Valid: ' + twonCoin.isChainValid());                        */

//console.log(root);
//console.log(JSON.stringify(root2));
console.log(JSON.stringify(twonCoin, null, 4)); 