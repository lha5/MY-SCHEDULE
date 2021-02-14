import React from 'react';
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

import KakaoLogin from './KakaoLogin';

const Container = styled.div`
  margin: 0 auto;
  border: 1px solid gold;

  @media ${props => props.theme.device.desktop} {
    width: 85%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 80%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 85%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 85%;
  }
`;


function SignInPage() {
  return (
    <Container>
      로그인 영역
      <KakaoLogin />
    </Container>
  );
}

export default withRouter(SignInPage);
