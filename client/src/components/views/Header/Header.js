import React from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import TitleLogo from '../../../assets/images/title-logo.png';
import NavBar from './NavBar';
import UserMenuBar from './UserMenuBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(25%);
  margin: 0 auto;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};

  div.logo-container {
    a img {
      width: 230px;
    }
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 200px;
  }
`;

function Header() {

  return (
    <Container>
      <div className="logo-container">
        <Link to="/">
          <img src={TitleLogo} alt="마감을 사수하자" />
        </Link>
      </div>
      <NavBar />
      <UserMenuBar />
    </Container>
  );
}

export default Header;
