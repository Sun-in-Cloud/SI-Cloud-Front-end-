import React from 'react';
import './App.css';
import Header from './components/Header';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbtn from './components/common/Navbtn';
import ListingPage from './components/ListingPage';
import LandscapeMain from './components/LandscapeMain';
import SellerMain from './components/Seller/SellerMain';

// 세로 모드
const TabletPortrait = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 700, maxWidth: 900 });
  return isTablet ? children : null;
};

// 가로 모드  - 우선 순위
const TabletLandscape = ({ children }: any) => {
  const isTablet = useMediaQuery({ minWidth: 1000, maxWidth: 1500 });
  return isTablet ? children : null;
};

function App() {
  return (
    <div className="App">
      <TabletPortrait>
        <Header type="portrait" />
        {/* <ListingPage /> */}
      </TabletPortrait>

      <TabletLandscape>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandscapeMain type={'landscape'} />}></Route>
            <Route path="/seller/*" element={<SellerMain type={'landscape'} />}></Route>
          </Routes>
        </BrowserRouter>
      </TabletLandscape>
    </div>
  );
}

export default App;
