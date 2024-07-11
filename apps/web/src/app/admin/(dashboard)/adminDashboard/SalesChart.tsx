import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 200 },
  { name: 'Apr', sales: 278 },
  { name: 'May', sales: 189 },
  { name: 'Jun', sales: 239 },
  { name: 'Jul', sales: 349 },
  { name: 'Aug', sales: 200 },
  { name: 'Sep', sales: 278 },
  { name: 'Oct', sales: 189 },
  { name: 'Nov', sales: 239 },
  { name: 'Dec', sales: 349 },
];

const SalesChart: React.FC = () => {
  return (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

export default SalesChart;
