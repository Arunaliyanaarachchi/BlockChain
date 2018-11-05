const express = require('express');
const bodyParser = require('body-parser');
const VoteNode = require('./PeerToPeer'); 
const VoteChain = require('./Blockchain');

const port = 18071+Math.floor(Math.random()*30);
console.log('starting node on ', port)
let node1 = new VoteNode(port);
let chain = new VoteChain();

node1.init();

const http_port = 3000+Math.floor(Math.random()*10);

let VoteHTTP = function (){
	const app = new express();

	app.use(bodyParser.json());

	app.get('/addNode/:port', (req, res)=>{
		console.log('add host: '+req.params.port)
		node1.addPeer('localhost', req.params.port)

		res.send();
	})

	app.get('/spawnVote/:teammember', (req, res)=>{
		let newBlock = node1.createBlock(req.params.teammember);
		console.log('block created' + newBlock );
		res.send();
	})

	app.listen(http_port, () => {
		console.log(`http server up.. ${http_port}`);
	})


	app.get('/getCurrentChain', (req, res)=>{
		console.log('Current Chain: ' + JSON.stringify(chain.getChain()) ) ;
		

		
	})
}

let httpserver = new VoteHTTP();

