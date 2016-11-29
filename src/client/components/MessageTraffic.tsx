import * as React from 'react';
// no typings available so importing using require as type: any
const {
  LineChart,
  Line,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} = require('recharts');

export default({data, type, text}) => (
  <div className='lineGraph'>
    <h2>Right now:<span> </span><span className='rate'>
        {data[data.length - 1][type]}
      </span><span> </span>
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