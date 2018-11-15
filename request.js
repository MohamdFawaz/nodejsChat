var http = require('http'),
fs = require('fs');
var server = http.createServer((function(request,response)
{
	// response.writeHead(200,
	// {"Content-Type" : "text/html"});
    var body = '';
    request.on('data', function (data) {
        body += data;
        let messageContent = JSON.parse(data);

        console.log("Partial body: " + messageContent.name + " " + messageContent.message);
    });
    // request.on('end', function () {
    //     console.log("Body: " + body.name);
    // });
    response.writeHead(200, {'Content-Type': 'application/json'});
    var sucessMessage = { success: "1", messge: "message inserted"};
    response.write(JSON.stringify(sucessMessage));
    response.end(body);
    // response.end(body);
    
}));
server.listen(7000);