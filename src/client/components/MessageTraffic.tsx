import * as React from 'react';
// no typings available so importing using require as type: any
const {LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, Tooltip} = require('recharts');

export default ({data, type, text}) => (
  <div>
    <h2>Right now: <span className='rate'>
        {data[data.length - 1][type]} </span>
    {type} {text}</h2>
 	  <LineChart width={300} height={100} data={data}>
      <XAxis dataKey='date' />
      <YAxis />
      <Line type='monotone' dataKey={type} stroke='#8884d8' strokeWidth={2} />
    </LineChart>
    <Tooltip />
  </div>
);