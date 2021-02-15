import React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';

import Auth from '../hoc/auth';
import Header from './views/Header/Header';
import LandingPage from './views/LandingPage/LandingPage';
import SignInPage from './views/SignInPage/SignInPage';
// import SignInProcess from './views/SignInPage/KakaoLoginProcess';
import MyPage from './views/MyPage/MyPage';
import SchedulePage from './views/SchedulePage/SchedulePage';
import Footer from './views/Footer/Footer';

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  /* color: ${props => props.theme.colors.black}; */
`;

function App() {
  return (
    <Wrapper>
      <Header />
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/signin" component={Auth(SignInPage, false)} />
        {/* <Route exact path="/signin/process" component={Auth(SignInProcess, false)} /> */}
        <Route exact path="/mypage" component={Auth(MyPage, true)} />
        <Route exact path="/schedule" component={Auth(SchedulePage, true)} />
      </Switch>
      <Footer />
    </Wrapper>
  );
}

export default App;
