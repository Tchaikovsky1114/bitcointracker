import React, { Component, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { fetchCoins } from '../api';
import { lightTheme } from '../theme';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in-out;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(prop) => prop.theme.accentColor};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface StartLoadingInterface {
  startLoading?: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/tickers');
  //     const json = await response.json();
  //     setCoins(json.slice(0, 200));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Nomargin Coin</title>
      </Helmet>
      <Header>
        <Title>Nomargin Coin</Title>
      </Header>

      {data?.slice(0, 100).map((coin) => (
        <ul key={coin.id}>
          <Coin>
            <Link
              to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}
            >
              <Img
                src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                alt={coin.symbol}
              />
              {coin.name} &rarr;
            </Link>
          </Coin>
        </ul>
      ))}
    </Container>
  );
};

export default Coins;
