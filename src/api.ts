import { json } from 'stream/consumers';

const BASE_URL = `https://api.coinpaprika.com/v1/`;

export function fetchCoins() {
  return fetch('https://api.coinpaprika.com/v1/tickers').then((response) =>
    response.json()
  );
}
export function fetchCoinInfo(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then(
    (response) => response.json()
  );
}
export function fetchCoinTickers(coinId: string) {
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then(
    (response) => response.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}

export function fetchExchangeDoller() {
  return fetch(
    'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD%20'
  ).then((response) => response.json());
}
// const priceData = await (
//     await fetch(`https://api.coinpaprika.com/v1/tickers/`)
//   ).json();
