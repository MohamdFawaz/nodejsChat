var mongo = require('mongodb').MongoClient,
    io = require('socket.io').listen(3000).sockets,
    EventEmitter = require('events'),
    http = require('http');
// fs = require('fs');

mongo.connect('mongodb://127.0.0.1', {
    useNewUrlParser: true
}, function(err, client) {
    if (err) throw err;

    var db = client.db('chat');
    var col = db.collection('messages')
    sendStatus = function(s) {
        socket.emit('status', s);
    };

    //web service connection
    var server = http.createServer((function(request, response) {
        request.on('data', function(data) {
            let messageContent = JSON.parse(data);
            var clientName = messageContent.name,
                clientMessage = messageContent.message;
            col.insertOne({
                name: clientName,
                message: clientMessage
            }, function(insertErr) {
                if (insertErr) throw insertErr;
                //Emits Last Message
                io.emit('output', [messageContent]);
            });
        });
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        var sucessMessage = {
            success: "1",
            messge: "message inserted"
        };
        response.end(JSON.stringify(sucessMessage));

    }));
    server.listen(7000);

    io.on('connection', function(socket) {
        //emiting all messages 
        col.find().limit(100).sort({
            _id: 1
        }).toArray(function(err, res) {
            if (err) throw err;
            socket.emit('output', res);
        });


        //record inputs 
        socket.on('input', function(data) {
            var name = data.name,
                message = data.message,
                whitespacePattern = /^\s*$/;
            if (whitespacePattern.test(name) || whitespacePattern.test(message)) {
                console.log('Invalid Data');
            } else {
                col.insert({
                    name: name,
                    message: message
                }, function(insertErr) {
                    if (insertErr) throw insertErr;
                    //Emits Last Message
                    io.emit('output', [data]);
                });
            }
        });
    });
});