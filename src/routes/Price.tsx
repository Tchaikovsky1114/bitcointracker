import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinTickers, fetchExchangeDoller } from '../api';
import { Overview, OverviewItem } from './Coin';
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
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;

  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: any;
      percent_change_1y: any;
      percent_change_6h: any;
      percent_change_7d: any;
      percent_change_12h: any;
      percent_change_15m: any;
      percent_change_24h: any;
      percent_change_30d: any;
      percent_change_30m: any;
      percent_from_price_ath: any;
      price: any;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = ({ coinId }: ChartProps) => {
  const tickersQuery = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 100000,
    }
  );
  const exchangeQuery = useQuery(['exchange', coinId], fetchExchangeDoller);

  if (tickersQuery.isLoading || exchangeQuery.isLoading) {
    return <div>"Loading..."</div>;
  }

  return (
    <div>
      <h1 style={{ display: 'block', marginBottom: '0.5rem' }}>
        Current price vs All time high{' '}
      </h1>
      <Overview>
        <OverviewItem style={{ fontSize: '0.8rem', color: 'white' }}>
          <span style={{ color: 'gold' }}>호가</span> ${' '}
          {tickersQuery.data?.quotes.USD.price?.toFixed(2)}
          <span style={{ fontSize: '0.8rem', color: 'white' }}>
            (₩
            {(
              tickersQuery.data?.quotes.USD.price! *
              exchangeQuery.data[0]?.basePrice
            )
              .toFixed(0)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            )
          </span>
        </OverviewItem>

        <OverviewItem style={{ fontSize: '0.8rem', color: 'white' }}>
          <span style={{ color: 'gold' }}> VS </span>
          {tickersQuery.data?.quotes.USD.percent_from_price_ath}%
          <span style={{ fontSize: '0.8rem', color: 'white' }}>
            (₩
            {(
              tickersQuery.data?.quotes.USD.price! *
                exchangeQuery.data[0]?.basePrice -
              tickersQuery.data?.quotes.USD.ath_price! *
                exchangeQuery.data[0]?.basePrice
            )
              .toFixed(0)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            )
          </span>
        </OverviewItem>
        <OverviewItem style={{ fontSize: '0.8rem', color: 'white' }}>
          <span style={{ color: 'gold' }}>역대최고가</span>${' '}
          {tickersQuery.data?.quotes.USD.ath_price?.toFixed(2)}
          <span style={{ fontSize: '0.8rem', color: 'white' }}>
            (₩
            {(
              tickersQuery.data?.quotes.USD.ath_price! *
              exchangeQuery.data[0]?.basePrice
            )
              .toFixed(0)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            )
          </span>
        </OverviewItem>
      </Overview>
      <h1 style={{ display: 'block', marginBottom: '0.5rem' }}>
        Price difference by period
      </h1>
      <Overview>
        {' '}
        <OverviewItem style={{ fontSize: '0.8rem', color: 'white' }}>
          <span style={{ color: 'gold' }}>15분 전(%)</span>
          <span style={{ fontSize: '0.8rem', color: 'white' }}>
            {tickersQuery.data?.quotes.USD.percent_change_15m! > 0
              ? `🔴${tickersQuery.data?.quotes.USD.percent_change_15m!}`
              : `🔵${tickersQuery.data?.quotes.USD.percent_change_15m!}`}
            %
          </span>
        </OverviewItem>
        <OverviewItem style={{ fontSize: '0.8rem', color: 'white' }}>
          <span style={{ color: 'gold' }}>전일(%)</span>
          <span style={{ fontSize: '0.8rem', color: 'white' }}>
            {tickersQuery.data?.quotes.USD.percent_change_24h! > 0
              ? `🔴${tickersQuery.data?.quotes.USD.percent_change_24h!}`
              : `🔵${tickersQuery.data?.quotes.USD.percent_change_24h!}`}
            %
          </span>
        </OverviewItem>
        <OverviewItem style={{ fontSize: '0.8rem', color: 'white' }}>
          <span style={{ color: 'gold' }}>전주 (%)</span>
          <span style={{ fontSize: '0.8rem', color: 'white' }}>
            {tickersQuery.data?.quotes.USD.percent_change_7d! > 0
              ? `🔴${tickersQuery.data?.quotes.USD.percent_change_7d!}`
              : `🔵${tickersQuery.data?.quotes.USD.percent_change_7d!}`}
            %
          </span>
        </OverviewItem>
      </Overview>
    </div>
  );
};

export default Price;
