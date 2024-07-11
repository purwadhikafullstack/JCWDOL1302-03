import React from 'react';
import SalesChart from './SalesChart';

const Dashboard: React.FC = () => {
  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
      <SalesChart />
    </div>
  );
}

export default Dashboard;
