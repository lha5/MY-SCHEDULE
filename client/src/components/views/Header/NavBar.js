import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  column-gap: 20px;
`;

function NavBar() {
  return (
    <Container>
      <div className="menu schedule">
        <NavLink to="/schedule" activeStyle={{ fontWeight: 500 }}>스케쥴 관리</NavLink>
      </div>
      <div className="menu challenge">마감 챌린지</div>
    </Container>
  );
}

export default NavBar;
