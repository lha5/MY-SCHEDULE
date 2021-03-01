import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import TitleLogo from '../../../assets/images/title-logo.png';
import NavBar from './NavBar';
import UserMenuBar from './UserMenuBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 calc(23%);
  margin: 0 auto;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};

  div.logo-container {
    margin-right: 15px;

    a img {
      width: 230px;
    }
  }

  div.menu-hamburger {
    display: none;
  }

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(15%);
  }

  @media ${props => props.theme.device.tablet} {
    justify-content: center;

    div:not(.logo-container, .menu-hamburger) {
      display: none;
    }

    div.menu-hamburger {
      display: block;
      cursor: pointer;
    }
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
      <div className="menu-hamburger">
        <MenuOutlinedIcon />
      </div>
    </Container>
  );
}

export default Header;
