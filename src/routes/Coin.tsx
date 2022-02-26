import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router';
import styled from 'styled-components';
import { Switch, Route, Router } from 'react-router-dom';
import Chart from './Chart';
import Price from './Price';
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
const Title = styled.h1`
  font-size: 2.5rem;
  color: ${(prop) => prop.theme.accentColor};
`;

interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}

const Overview = styled.div`
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
  border-radius: 10px;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const OverviewItem = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 1px 3px;
  p {
    text-align: center;
    font-size: 0.8rem;
    color: ${(props) => props.theme.accentColor};
    margin-bottom: 3px;
  }
  span {
    font-size: 0.7rem;
    text-align: center;
  }
`;
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
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
const Coin = () => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      console.log(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>
          {state?.name
            ? state.name
            : loading
            ? 'cannot found page'
            : info?.name}
        </Title>
      </Header>

      {loading ? (
        'Loading....'
      ) : (
        <div>
          <Overview>
            <OverviewItem>
              <p>Rank</p>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <p>Last updated</p>
              <span>{info?.last_data_at}</span>
            </OverviewItem>
            <OverviewItem>
              <p>Release data</p>
              <span>{info?.first_data_at}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <p>Coin type</p>
              <span>{info?.type.toUpperCase()}</span>
            </OverviewItem>
            <OverviewItem>
              <p>Coin symbol</p>
              <span>{info?.symbol.toUpperCase()}</span>
            </OverviewItem>
            <OverviewItem>
              <p>Hardware wallet</p>
              <span> {info?.hardware_wallet ? 'Support' : 'Not yet'}</span>
            </OverviewItem>
          </Overview>
          <p style={{ marginTop: '50px' }}>{info?.description}</p>
          <Switch>
            <Route>
              <Price />
            </Route>
            <Route>
              <Chart />
            </Route>
          </Switch>
        </div>
      )}
    </Container>
  );
};

export default Coin;
{
  /* <p>최고가: ${price?.quotes.USD.ath_price}</p>
          <p>호가 : ${price?.quotes.USD.price}</p> */
}
