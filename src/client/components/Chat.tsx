import * as React from 'react';
import { postMessage } from '../socket_io';



class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about '
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        Name:
        <textarea value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// const Chat = () => {
//     return (
//         <div>
//             <ul id="messages"></ul>
//             <input className='message' />
//             <button onClick={() => postMessage(document.getElementsByClassName('message')[0].innerHTML)}>Send</button>
//         </div>
//     );
// };
export default Chat;