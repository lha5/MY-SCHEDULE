import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 calc(23%);
  height: calc(100vh - 71px - 48px);
`;

function MyPage() {
  return (
    <Container>
      <h2>마이 페이지</h2>
    </Container>
  );
}

export default MyPage;
