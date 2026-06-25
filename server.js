require('dotenv').config();
const app = require('./src/app');
const {createServer} = require('http');
const {Server} = require('socket.io');
const httpServer = createServer(app);
const io = new Server(httpServer,{});
const generateResponse = require("./src/service/ai.service");
// when a connection is build between client and server the callback is fire

io.on("connection",(socket)=>{ // inbuilt event
  console.log("A user connected");

  socket.on("disconnect",()=>{// inbuilt event
    console.log("A user disconnected");
  }) 

socket.on("ai-message", async (data) => {
  try {
    const response = await generateResponse(data.prompt);

    console.log("AI Response:", response);

    socket.emit("ai-message-response", {response});
  } catch (error) {
    console.error("Gemini Error:", error.message);

    socket.emit("ai-message-response", {
      error: error.message
    });
  }
});
});

httpServer.listen(3000,()=>{
  console.log("Server is running on port 3000");
})
