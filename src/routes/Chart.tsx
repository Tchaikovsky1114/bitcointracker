import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { format } from 'date-fns';
interface IHistoricalData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['history', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((price) => {
                return [
                  Date.parse(price.time_close),
                  (price.open * 1210).toFixed(0),
                  (price.high * 1210).toFixed(0),
                  (price.low * 1210).toFixed(0),
                  (price.close * 1210).toFixed(0),
                ];
              }),
            },
          ]}
          options={{
            theme: {
              mode: 'dark',
              palette: 'palette7',
              monochrome: {
                shadeTo: 'dark',
                shadeIntensity: 1,
                color: 'green',
              },
            },
            title: {
              text: `${coinId} 14days trend`,
              style: {
                color: 'red',
              },
            },
            chart: {
              type: 'candlestick',
              height: 400,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'rgb(0,0,0,0.3)',
            },
            stroke: {
              curve: 'smooth',
              width: 4,
            },
            tooltip: {
              style: {},
            },
            yaxis: {
              show: true,
              labels: {
                style: {
                  colors: 'yellow',
                  fontWeight: 'bold',
                },
              },
            },
            xaxis: {
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: 'yellow',
                  fontWeight: 'bold',
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#f11621',
                  downward: '#7132e6',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
