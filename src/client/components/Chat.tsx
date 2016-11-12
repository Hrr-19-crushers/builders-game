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

// class Chat extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: 'Please write an essay about '
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({value: event.target.value});
//   }

//   handleSubmit(event) {
//     alert('An essay was submitted: ' + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         Name:
//         <textarea value={this.state.value} onChange={this.handleChange} />
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }

export default Chat;