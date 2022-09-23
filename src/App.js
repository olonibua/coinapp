import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import Home from './routes/Home';
import axios from 'axios';
import CoinPage from './routes/CoinPage';
import Trending from './components/Trending';
import Footer from './components/Footer';

function App() {
  const [coins, setCoins] = useState([]);

  const url ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      // console.log(response.data)
    });
  }, [url]);

  return (
    <ThemeProvider>
        <Navbar />
        <Routes>
          {/* <Home /> */}
          <Route path='/' element={<Home coins={coins} />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/coin/:coinId' element={<CoinPage />}>
            <Route path=':coinId' />
          </Route>
        </Routes>
        <Footer />
    </ThemeProvider>
  );
}

export default App;