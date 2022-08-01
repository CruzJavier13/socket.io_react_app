import express  from "express";
import morgan from "morgan";
import {Server as socketServer} from "socket.io";
import http from "http";
import cors from "cors";
import {PORT} from "./config.js";
import {dirname, join} from 'path';
import { fileURLToPath } from "url";

const port = PORT;
//server of express
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
//compatibility with http to socket.io
const server = http.createServer(app);
//add compatibility 
const io = new socketServer(server,{
    cors:{
   origin:'http://localhost:3000',
    }
});

app.use(cors());
app.use(morgan('dev'));

io.on('connection',(socket)=>{
  console.log(socket.id);
  socket.on('Message',(message)=>{
    console.log(message);
    socket.broadcast.emit(`Message`,{
     body:message,
     from:socket.id
    });
  })

  }
  
);
app.use(express.static(join(__dirname,'../client/build')));
server.listen(port, ()=>console.log("Server listen on port "+port));

