ws = new WebSocket ('ws://alife.local:9000');
ws.onopen = function() {
  console.log("Соединение установлено.");
};
function $(a){return document.getElementById(a)}

let rootPromise = Promise.resolve();
let alerts = [];
var voices = [];
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
				msgServ("client");		
			}
			
			else if (event.message == "showAlert")
			{
				
				alerts.push(event.message);
				rootPromise = rootPromise.then(showAlert);
			}
			break;
		default: 
			// если сервер спятил, то даем об себе этом знать
			console.log ('unknown event:', event)
			break;
	}
}

function showAlert(){
	
	return new Promise(resolve => {
						let message = alerts.shift();
						let count = alerts.length;
					console.log("COUNT C" + count);
				var root = document.createElement('div');
				var box = document.createElement('div');
				var txt = document.createElement('div');
				var img = document.createElement("img");
				var altitle = document.createElement("p");
				var altext = document.createElement("p");
				root.id = "alert"
				root.style.animation = "fadeIn " + 1 +"s";
				root.style.WebkitAnimation = "fadeIn " + 1 +"s";
				box.id = "alert_box"
				txt.id = "alert_txt"
				img.id = "alert_img"
				altitle.id = "text"
				altext.id = "text"
				altitle.innerText = "#ВОПРОСзаРЕСПЕКТОС"
				
				voices = window.speechSynthesis.getVoices();
				
				altext.innerText = "Назовите игру, в которой одним из отрицательных героев был персонаж по фамилии Прескотт." +  voices.length;
				img.src = "img/piter.png";
				
				txt.appendChild(altitle);
				txt.appendChild(altext);
				box.appendChild(txt);
				box.appendChild(img);
				root.appendChild(box);
				$('messages').appendChild (root);		
				//setTimeout(clearBox, 5000);
				
				
				

				
				//var msg = new SpeechSynthesisUtterance(altext.innerText);
				//msg.voice = getVoiceFromName('Google русский');
				//window.speechSynthesis.speak(msg);
                setTimeout(() => {
					fadeTime = 3000;
					root.style.animation = "fadeOut " + fadeTime/1000 +"s";
					root.style.WebkitAnimation = "fadeOut " + fadeTime/1000 +"s";
					root.style.opacity = 0;
					setTimeout(() => {
						root.remove();
						resolve();
					}, fadeTime);
                }, 10000);              
				
			});	
}


function clearBox()
{
    fade($('alert'));
	
}
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
            element.style.display = 'none';
			element.remove();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
	
}

msgServ = function (message) {
	ws.send (JSON.stringify ({
			type: 'message',
			message: message
		}));
}

window.speechSynthesis.onvoiceschanged = function() {
    voices = window.speechSynthesis.getVoices();
	console.log(voices);
};

function getVoiceFromName (name) {
  var foundVoice = null;
  
  voices.forEach(function (voice, index) {
    if (voice.name === name) {
      foundVoice = voice;
    }
  });
  
  return foundVoice;
}