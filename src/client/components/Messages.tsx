import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';

class Messages extends React.Component < any,
any > {

  componentWillUpdate() {
    var node = ReactDOM.findDOMNode(this);
  }
  componentDidUpdate() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollTop = node.scrollHeight
  }

  render() {
    const items = this
      .props
      .messages
      .map(m => (
        <li
          key={m.date + m.name}
          className={this.props.user === m.user
          ? 'selfChat'
          : 'chat'}>
          <span className='chatName'>{m.user}:
          </span>
          <span className='chatText'> {m.text}
          </span>
          <span className='chatDate'>{m.date
              ? moment(JSON.parse(m.date)).fromNow()
              : moment(new Date()).fromNow()}</span>
        </li>
      ));
    return (
      <div className='messages'>
        <ul>{items}</ul>
      </div>
    );
  }
};

export default Messages;