(function(){
    var getNode = function(s){
        return document.querySelector(s);
    },
    textarea = getNode('.chat-content'),
    chatName = getNode('.chat-name'),
    messages = getNode('.chat-container'),
    status = getNode('.chat-status span'),
    statusDefault = status.textContent,
    setStatus = function(s){
        status.textContent = s;
    };

    
    try {
        var socket  = io.connect('http://127.0.0.1:3000');
    } catch (e) {
        // Set Status to warn user
    }

    if(socket !== undefined){
        //Listen for output 
        socket.on('output', function(data) {
            if(data.length) {
                //loop messages
                for(var i=0; i< data.length; i = i + 1) {
                    var message = document.createElement('div');
                    message.setAttribute('class', 'chat-message');
                    message.textContent = data[i].name + ': '+ data[i].message;

                    //append meessage
                    messages.appendChild(message);
                    messages.insertBefore(message, messages.firstChild);
                }
            }
        });
        // Listen for keydown 
        textarea.addEventListener('keydown', function(event){
            var self = this,
                name = chatName.value;
            if(event.which === 13 && event.shiftKey === false){
                event.preventDefault();
                socket.emit('input',{
                    name : name,
                    message: self.value
                })
            }
        });
    }
})();