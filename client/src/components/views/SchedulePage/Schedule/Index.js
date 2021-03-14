import React from 'react';

import styled from 'styled-components';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 calc(23%);
  margin: 0 auto;
  user-select: none;

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(18%);
  }
`;

function Index() {
  return (
    <Container>
      <CalendarHeader />
      <CalendarBody />
    </Container>
  );
}

export default Index;
