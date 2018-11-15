# Node js Chatting Demo

This demo is a demonstration for a real time chatting application presented to Grand company using node js with socket.io library to simulate a scenario of a customer agent and a client either using browser chat or mobile api and using mongoDB as database.

# How to set it up!

  - You need to install [Node.js](https://nodejs.org/)  on your system 
  - also you need to install [MangoDB.js](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/)
  


To run the demo:
  - copy the data folder into your c:/
  - then you need to start mongoDB 
 
    ```sh
    mongod
    ```
    and in a new cmd window
    ```sh
    mongo
    ```
    if mongo is running successfully then open new cmd window and cd to nodejs chat
    ```sh
    cd nodejs chat
    node server.js
    ```
now your node js is running and listening to port 7000
so open index.html inside your browser, you can open it in two windows as if two users chatting with each other.
or using postman you can use this route http://localhost:7000/
and send your data using this json 
```json
{  
      "name":"Amr",
      "message":"Hello There"
}
```
and you will see the client's message on the browser chat.


**By Mohamd Fawaz**

