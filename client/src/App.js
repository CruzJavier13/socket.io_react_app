import io from "socket.io-client";
import {useState,useEffect} from "react";
import './App.css';

const socket = io('http://localhost:4000');

function App() {

  const [message,setMessage] =useState('');
  const [messages,setMessages] = useState([{
    body:'How are you?',
    from:'Me'
}]);

  const handleSubmit = e =>{
    e.preventDefault();
    socket.emit('Message',message);
    const newMessage = {
      body:message,
      from:"Me"
    }
    setMessages([...messages,newMessage]);
    setMessage('');
  }

  useEffect(()=>{
    const receiveMessage = (message) =>{
      setMessages([...messages,message]);
    }

    socket.on('Message',receiveMessage);
    return () =>{
      socket.off('Message',receiveMessage);
    }
  },[messages]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 rounded-md">
      <h1 className="text-2xl font-bold my-2">Chat React with Express Socket.io</h1>
        <input type="text" onChange={e=>setMessage(e.target.value)} 
        value={message}
        className="border-2 border-zinc-500 p-2 text-black w-full"
        />

        <ul className="h-80 overflow-y-auto">
        {messages.map((message,id)=>(
        <li key={id} className={`my-2 p-2 table text-sm rounded-md ${message.from =="Me"?"bg-sky-700 ml-auto":"bg-green-500"}`}>
          <p>{message.from} : {message.body}</p>
        </li>
          ))
        }
        </ul>
      </form>
    </div>
  );
}

export default App;
