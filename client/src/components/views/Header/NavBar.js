import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  column-gap: 20px;

  div.menu:nth-child(1) {
    margin-left: 10px;
  }
`;

function NavBar() {
  return (
    <Container>
      <div className="menu schedule"><Link to="/schedule">스케쥴 관리</Link></div>
      <div className="menu challenge">마감 챌린지</div>
    </Container>
  );
}

export default NavBar;
