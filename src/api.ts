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

// const priceData = await (
//     await fetch(`https://api.coinpaprika.com/v1/tickers/`)
//   ).json();
