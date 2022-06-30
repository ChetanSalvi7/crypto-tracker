import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { CoinList } from './Api';
import { CryptoState } from './CryptoContext';
import { useHistory } from "react-router-dom";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinPage = () => {

  const { symbol, currency } = CryptoState()
  const [coins, setCoins] = useState();
 
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);



  const fetchCoins = async () => {
   
    const { data } = await axios.get(CoinList(currency));
    console.log(data);

    setCoins(data);
   
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <div className="container-1">
        <div className="main-table col-7">
          <div className="table-title">
            Cryptocurrency Prices by Market Cap
          </div>
          <div>
            <input type="text" className='input-text' onChange={(e) => setSearch(e.target.value)} placeholder="Search For a Crypto Currency.." />
          </div>
          <table className='coins-table'>
            <thead className='table-header'>
              <tr className='table-header-row'>
                <th className='table-header-title text-dark title-head-left w-25'>Coin</th>
                <th className='table-header-title text-dark title-head-right w-20'>Price</th>
                <th className='table-header-title text-dark title-head-right w-20'>24h Change</th>
                <th className='table-header-title text-dark title-head-right w-20'>Market Cap</th>
              </tr>
            </thead>

            {coins  && <tbody>

              {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <>
                    <tr className='table-info-row' key={row.id}>
                      <th className='table-header-title title-head-left image-name-box'>
                        <img src={row.image} style={{ height: '50px', marginBottom: '10px' }} alt="logo" />
                        <div className="coin-details d-flex flex-column">
                          <span className="coin-name-1">{row.symbol}</span>
                          <span className="coin-fullname">{row.id}</span>
                        </div>
                      </th>
                      <th className='table-header-title title-head-right '>{symbol} {numberWithCommas(row.current_price.toFixed(2))}</th>
                      <th className='table-header-title title-head-right'><span
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red", marginBottom: '5px',
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h?.toFixed(2)}%
                      </span></th>
                      <th className='table-header-title title-head-right'>{symbol} {numberWithCommas(row.market_cap.toString().slice(0, -6))}</th>
                    </tr>
                  </>
                )
              })}

            </tbody>}

          </table>
         
        </div>

      </div>

    </>
  )
}

export default CoinPage