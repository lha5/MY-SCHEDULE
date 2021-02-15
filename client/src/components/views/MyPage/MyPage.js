import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid red;
  margin: 0 auto;

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

function MyPage() {
  return (
    <Container>
      <h2>마이 페이지</h2>
    </Container>
  );
}

export default MyPage;
