import React, { useMemo } from 'react'
import { useState } from 'react';

function Chat({ socket, username, room }) {

    const [message, setMessage] = useState(""); //has value of the message input field
    const [messageList, addMessageList] = useState([]) //array that keeps getting stacked with messages

    useMemo(() => {
        socket.on("recievemessage", (data) => {
            addMessageList((list) => [...list, data]);
        });
    }, [socket]); // keeps checking for any updates in entire socket
    

    const sendMessage = async () => {
        if (message === "")
            return;
        const data = {
            room: room, message: message, username: username,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        };
        await socket.emit("messagetransfer", data);
        addMessageList((list) => [...list, data]);
        document.getElementById('messinput').value = "";
    }

    const chatboxStyle = {
        height: '500px', // Set a fixed height for the chatbox
        overflowY: 'auto', // Enable vertical scrolling if content overflows
        border: '1px solid #ccc',
        padding: '10px',
      };
    const textInsideStyle = {
        textAlign: 'left', // Align text to the left
    };
    const myTextInsideStyle = {
        textAlign: 'right',
      };


  return (
      <div className='container'>
          

        <div className="card">
            <div className="card-header">
                <h5>TALK</h5>
            </div>
            <div className="card-body" style={chatboxStyle}>
              
                {messageList.map((ele) => {
                    return (
                        <div style={username === ele.username ? myTextInsideStyle : textInsideStyle } >
                            <h5 className="card-title">{ele.username}</h5>
                            <p className="card-text">{ele.message}</p> <br />
                        </div> 
                    );
                })}
            </div>
            <div className="card-footer input-group">
                  <input id="messinput" type="text" className="form-control" onKeyDown={(event) => { event.key === "Enter" && (sendMessage()); }} onChange={(event) => { setMessage(event.target.value); }} placeholder="Type your Message..."/>
                <button className="btn btn-success" onClick={sendMessage} type="button" > Send </button>
            </div>
          </div>
          
          

      </div>
  )
}

export default Chat