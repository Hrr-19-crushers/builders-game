import * as React from 'react';
import { onClick } from '../socket_io';

const Chat = () => {
  return (
    <div>
      <input className='message' />
      <button onClick={() => onClick(document.getElementsByClassName('message')[0].innerHTML)}>Send</button>
    </div>
  );
};
export default Chat;