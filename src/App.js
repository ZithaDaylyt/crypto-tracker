import React,{useState,useEffect} from 'react';
import axios from 'axios'
import './App.css';
import Coin from './Coin';


// 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=100&page=1&sparkline=false'

function App() {
  //creating states
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  //getting data from the api
  useEffect(()=>{
    //api call
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res=>{
      setCoins(res.data)
      console.log(res.data)
    }).catch(error=>console.log(error))

  },[])
  //handle change function
  const handleChange = (e)=>{
    setSearch(e.target.value)
  }
  //filter Coins
  const filteredCoins = coins.filter(coins =>coins.name.toLowerCase().includes(search.toLowerCase())
  )
  console.log(filteredCoins)
  return (
    <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input 
            className="coin-input"
            onChange={handleChange} type="text" 
            placeholder="Search"/>
          </form>
        </div>
        {filteredCoins.map(coin =>{
           return(
            <Coin key={coin.id}
              name={coin.name} 
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap} 
              price={coin.current_price}
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          )
           })}
    </div>
  );
}
export default App;
