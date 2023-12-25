import { func } from "prop-types";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coinPrice, setCoinPrice] = useState(0); // Select 에서 선택된 코인의 가격
  const [budget, setBudget] = useState(0); // input 태그로 입력 받은 사용자의 예산

  const onChange_price = (event) => {
    setBudget(event.target.value);
  };
  const onChange_select = (event) => {
    setCoinPrice(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {/* = <h1>The Coins!2 {loading ? "" : `(` + coins.length + `)`}</h1> */}
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange_select}>
          <option>코인을 선택해주세요</option>
          {coins.map((coin) => (
            <option key={coin.id} value={coin.quotes.USD.price}>
              {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <hr />
      <div>
        <input
          id="coinPrice"
          type="text"
          placeholder="사용 가능 금액"
          onChange={onChange_price}
        ></input>
        <label htmlFor="coinPrice">
          구매가능: {Math.floor(budget / coinPrice)}
        </label>
      </div>
    </div>
  );
}

export default App;
