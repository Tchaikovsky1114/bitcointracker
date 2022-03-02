import React, { useEffect } from 'react';
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
interface IJsonData {
  jsonData: object;
}
interface Iformat {
  closeDate: object;
}
const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistoricalData[]>(
    ['history', coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  // (async () => {
  //   const jsonData: object = await (
  //     await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //   ).json();
  //   console.log(coinId);
  // })();

  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     console.log(infoData);
  //     setPrice(priceData);
  //     setLoading(false);
  //   })();

  // const fetchData = async () => {
  //   const infoData = await (
  //     await fetch(
  //       'https://api.coinpaprika.com/v1/coins/usdt-tether/ohlcv/historical'
  //     )
  //   ).json();
  //   return infoData;
  // };

  // const calledJson = (async () => {const infoData = await (await fetch(`http://www.naver.com`)).json()});

  // (async () => {const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();})

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type="line"
          // interface IHistoricalData {
          //   time_open: string;
          //   time_close: string;
          //   open: number;
          //   high: number;
          //   low: number;
          //   close: number;
          //   volume: number;
          //   market_cap: number;
          // }

          series={[
            {
              name: 'Price',
              data: data?.map((closeprice) => Math.floor(closeprice.close)),
            },
          ]}
          options={{
            title: {
              text: `${coinId} 2-week trend`,
              align: 'left',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            xaxis: {
              categories: data?.map((close) => close.time_close),
              type: 'datetime',
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
            },
            fill: {
              type: 'gradient',
              gradient: {
                gradientToColors: ['blue'],
                stops: [0, 100],
              },
              colors: ['red'],
            },
            tooltip: {
              y: {
                formatter: (value) => ` ${value * 1206}원`,
              },
            },
            yaxis: {
              show: false,
            },
            theme: {
              mode: 'dark',
              palette: 'palette7',
              monochrome: {
                enabled: false,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65,
              },
            },

            grid: {
              show: false,
            },
            stroke: {
              curve: 'smooth',
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
