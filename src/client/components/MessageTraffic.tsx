import * as React from 'react';
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} = require('recharts');

export default ({data, type, text}) => (
  <div className='lineGraph'>
    <h2>Right now:&nbsp;
      <span className='rate'>{data[data.length - 1][type]}</span>&nbsp;
      {text}
    </h2>
    <LineChart width={300} height={300} data={data}>
      <XAxis dataKey='date'/>
      <YAxis/>
      <Line type='monotone' dataKey={type} stroke='#228B22' strokeWidth={2}/>
    </LineChart>
    <Tooltip/>
  </div>
);
