import './App.css';
import io from 'socket.io-client';
import {useState} from 'react';
import Chat from './Chat';

const socket = io.connect("http://localhost:8680");

function App() {

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [onChat, openChat] = useState();

  const joinRoom = () => {
    if (username === "" || room === "")
      return;
    socket.emit("makeroom", room);
    openChat(true);
  }

  return (
    <div className="App">


      <br /><h2>Chat Man</h2><br />

      {!onChat ? (
      <div className="container input-group mb-3">
        <input type="text" className="form-control" placeholder="Username" onChange={(event) => { setUsername(event.target.value) }} />
        <input type="text" className="form-control" placeholder="Room ID" onChange={(event)=>{ setRoom(event.target.value) }}/>
        <button className="btn btn-outline-danger" type="button" onClick={joinRoom}>Join</button>
      </div>)
      : (
      <Chat socket={socket} username={username} room={room} />
      )}

    </div>
  );
}

export default App;
