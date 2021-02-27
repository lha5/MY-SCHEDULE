import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from '../hoc/auth';
import Header from './views/Header/Header';
import LandingPage from './views/LandingPage/LandingPage';
import MyPage from './views/MyPage/MyPage';
import SchedulePage from './views/SchedulePage/SchedulePage';
import Footer from './views/Footer/Footer';


function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, true)} />
        <Route exact path="/mypage" component={Auth(MyPage, true)} />
        <Route exact path="/schedule" component={Auth(SchedulePage, true)} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
