ws = new WebSocket ('ws://alife.local:9000');
ws.onopen = function() {
  console.log("Соединение установлено.");
};
function $(a){return document.getElementById(a)}

ws.onmessage = function (message) {
	// приводим ответ от сервера в пригодный вид 
	var event = JSON.parse(message.data);
	
	// проверяем тип события и выбираем, что делать
	switch (event.type) {
		case 'message':
			// рендерим само сообщение
			//var root = document.createElement('div');
			//root.innerText = event.message;
			
			console.log(event.message);
			
			//$('messages').appendChild (root);
			
			if (event.message == "client_check")
			{
				msgServ("admin");		
			}
			
			break;
		case 'authorize':
			// ответ на запрос об авторизации
			if (event.success) {
				//$('loginform').classList.remove('unauthorized');
				console.log(event);
			}
			break;
		default: 
			// если сервер спятил, то даем об себе этом знать
			console.log ('unknown event:', event)
			break;
	}
}


msgServ = function (message) {
	ws.send (JSON.stringify ({
			type: 'message',
			message: message
		}));
}