import * as React from 'react';
import * as moment from 'moment';

export default ({messages}) => {
  const items = messages.map(m =>
    (
      <li key={m.date}>
        <span className='chatName'>{m.user}: </span>
        <span className='chatText'>{m.text}  </span>
        <span className='chatDate'>{moment(JSON.parse(m.date)).fromNow()}</span>
      </li>
    ));

  return (<ul>{items}</ul>);
};