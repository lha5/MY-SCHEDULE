import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid blue;
  margin: 0 auto;
  text-align: center;

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

function LandingPage() {
  return (
    <Container>
      <h1>랜딩 페이지</h1>
      <div>
        <Link to="/signin">로그인</Link>
      </div>
    </Container>
  );
}

export default LandingPage;
