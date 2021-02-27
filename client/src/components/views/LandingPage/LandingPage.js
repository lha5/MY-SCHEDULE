import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 calc(23%);
`;

function LandingPage() {
  return (
    <Container>
      <h1>랜딩 페이지</h1>
    </Container>
  );
}

export default LandingPage;
