import * as React from 'react';
// no typings available so importing using require as type: any
const recharts = require('recharts');

const {BarChart, Bar, Legend, CartesianGrid, XAxis, YAxis, Tooltip} = recharts;

export default ({users}) => (
  <div>
  <BarChart width={600} height={300} data={users}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
    <XAxis dataKey="name"/>
    <YAxis/>
    <CartesianGrid strokeDasharray="3 3"/>
    <Tooltip/>
    <Legend />
    <Bar dataKey="messages" fill="#8884d8" />
  </BarChart>
  </div>
);