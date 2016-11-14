import * as React from 'react';

const test = ({messages}) => {
  console.log('line 4 of Message',messages);
  const items = messages.map((message) => {
   return ( 
     <li> 
      {message.name} <span> </span>
      {message.text} <span> </span>
      {message.type} <span> </span>
      {message.date} <span> </span>
    </li>
   );
  });


  return (
      <ul>
        {items}
      </ul>

  );
};
 
 export default test;