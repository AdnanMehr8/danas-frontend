import React from 'react';
import { useSelector } from 'react-redux';
import Dispensing from '../dispensing/dispensing';
import Mixing from '../mixing/mixing';
import Compression from '../compression/compression';

const Uncoated = () => {
  // Get the process order from localStorage
  const processOrder = JSON.parse(localStorage.getItem('processes') || '[]');

  // Component mapping object
  const componentMap = {
    'dispensing': Dispensing,
    'mixing': Mixing,
    'compression': Compression,
  };

  // Function to render components in order
  const renderOrderedComponents = () => {
    return processOrder
      .filter(process => componentMap[process]) // Only include processes that have matching components
      .map((process, index) => {
        const Component = componentMap[process];
        return <Component key={`${process}-${index}`} />;
      });
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto', boxSizing: 'border-box' }}>
      {renderOrderedComponents()}
    </div>
  );
};

export default Uncoated;