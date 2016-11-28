import * as React from 'react';
// no typings available so importing using require as type: any
const {LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip} = require('recharts');

export default ({messages}) => (
  <div>
 	  <LineChart width={300} height={100} data={messages}>
      <XAxis dataKey='date' />
      <YAxis />
      <Line type='monotone' dataKey='messages' stroke='#8884d8' strokeWidth={2} />
    </LineChart>
  </div>
);