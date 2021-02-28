import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  height: 300px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CalendarEditor() {
  return (
    <Container>
      테스트!!
    </Container>
  );
}

export default CalendarEditor;
