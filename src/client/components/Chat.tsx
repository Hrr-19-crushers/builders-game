import * as React from 'react';
import { postMessage } from '../socket_io';

const Chat = () => {
    return (
        <div>
            <ul id="messages"></ul>
            <input className='message' />
            <button onClick={() => postMessage('static test message')}>Send</button>
        </div>
    );
};
export default Chat;