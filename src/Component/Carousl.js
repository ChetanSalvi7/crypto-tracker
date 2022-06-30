import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from './Api'
import { CryptoState } from './CryptoContext'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import "swiper/core";
import "swiper/bundle";
import { numberWithCommas } from './CoinPage';







const Carousl = () => {
    const [trending, setTrending] = useState([]);

    const { currency,symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data)
    }



    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);
   

    return (
        <>
        <div className=" container-fluid">
            <Swiper
                spaceBetween={10}
                slidesPerView={4 }
                autoplay={true}
                speed={2000}
                grabCursor={true}

            >
                {React.Children.toArray(trending.map((coin) => {
                    let profit = coin?.price_change_percentage_24h >= 0;
                    return (
                        <>
                            <SwiperSlide key={coin.name} >
                                <div className='carousebox1' >
                                    <picture >
                                        <img
                                            src={coin.image}
                                            alt={coin.name}
                                            style={{ marginBottom: '5px', height: '80px', }}
                                        />
                                    </picture>
                                    <span className='priceheader m-0'>
                                        {coin?.symbol}
                                        &nbsp;
                                        <span
                                            style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",marginBottom: '5px',
                                                fontWeight: 500,
                                            }}
                                        >
                                            {profit && "+"}
                                            {coin?.price_change_percentage_24h?.toFixed(2)}%
                                        </span>
                                    </span>
                                    <span className='m-0 p-0' style={{ fontSize: 22, fontWeight: 500 }}>
                                         {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                                    </span>
                                </div>
                            </SwiperSlide>
                        </>
                    )
                }))}

            </Swiper>
            </div>
        </>

    )
}

export default Carousl




