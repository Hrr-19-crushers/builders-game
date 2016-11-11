import React, {Component}from 'react';
import {onClick} from '../socket_io';
const Chat = () =>{
  return (
    <div>
      <input id='message'/>
      <button onClick={() => onClick(document.getElementById('message').val()}/>
    </div>
  )
};

export default Chat;