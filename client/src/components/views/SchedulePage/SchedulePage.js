import React from 'react';

import styled from 'styled-components';

import Schedule from './Schedule';
import Calendar from './Calendar/Calendar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 20px calc(23%);
  margin: 0 auto;

  @media only screen and (max-width: 1400px) {
    padding: 20px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 20px calc(18%);
  }
`;

function SchedulePage({ user }) {

  return (
    <Container>
      <Calendar />
      <Schedule user={user} />
    </Container>
  );
}

export default SchedulePage;
