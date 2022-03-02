import React from 'react';

interface ChartProps {
  coinId: string;
}
const Price = ({ coinId }: ChartProps) => {
  return (
    <div>
      <h1>{coinId}Price</h1>
    </div>
  );
};

export default Price;
