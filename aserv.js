var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 9000}); 
var peers = [];
var admin = [];
var clients = [];
console.log("Web Socket Server is started");

wss.on('connection', function (ws) { 

	peers.push (ws);
	if (peers.length > 0){
		console.log("Number or Connections: ", peers.length.toString());
	}
	
	broadcast("client_check", peers);
	
	
	ws.on('message', function (message) {
		client_msg = JSON.parse(message);
		console.log(client_msg.message)
		
		switch (client_msg.message) {
			case 'client':
				clients.cpush(ws);	
				break;
			case 'admin':
				admin.cpush(ws);
				break;
			case 'showAlert':
				broadcast('showAlert', clients);
				break;	
			default: 
				console.log ('unknown event:', client_msg);
			break;
	}
		console.log("after check: Admins", admin.length, " Clients: ", clients.length);
		}); 
	  ws.on('close', function () { 
		peers.delete(ws);
		clients.delete(ws);
		admin.delete(ws);
        console.log("Client disconnected");
		});
	
});


function broadcast (message, list) {
	
	var time = new Date().getTime();

	list.forEach (function (ws) {
			ws.send (JSON.stringify ({
				type: 'message',
				message: message,
				time: time
			}));
		});
}
Array.prototype.cpush = function (value) {
	if (this.indexOf(value) == -1)
	{
		this.push(value);
	};
}
Array.prototype.delete = function (value) {
	this.splice(this.indexOf(value), 1);
}