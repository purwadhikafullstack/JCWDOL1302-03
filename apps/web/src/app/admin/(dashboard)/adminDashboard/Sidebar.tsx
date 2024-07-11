import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full">
      <ul>
        <li className="p-4">Dashboard</li>
        <li className="p-4">Sales</li>
        <li className="p-4">Reports</li>
        <li className="p-4">Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
