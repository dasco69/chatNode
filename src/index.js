const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = 8080;

//create a server object:
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //res.sendFile(__dirname, "/index.html");
});
app.use(express.static(__dirname + "/public"));

//start IO
io.on("connection", socket => {
  console.log("un utilisateur est connecté");
  socket.on("chat message", msg => {
    console.log("message: " + msg);

    io.emit("chat message", msg);
  });
  //if user disconnect
  socket.on("disconnect", () => {
    console.log("L'utilisateur c'est déconnecté!!!");
  });
});

http.listen(PORT, () => {
  console.log(`Vous écoutez sur le port: ${PORT}`);
});
