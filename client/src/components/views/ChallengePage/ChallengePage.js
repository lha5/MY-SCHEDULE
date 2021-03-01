import React from 'react';

import styled from 'styled-components';

import Challenging from './Challenging';
import Challenged from './Challenged';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  padding: 0 calc(23%);
  height: calc(100vh - 71px - 48px);

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(15%);
  }
`;

function ChallengePage() {
  return (
    <Container>
      <Challenging />
      <Challenged />
    </Container>
  );
}

export default ChallengePage;
