import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';

import NavBar from './NavBar';
import UserMenuBar from './UserMenuBar';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px calc(23%);
  margin: 0 auto;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};

  div.logo-container {
    display: flex;
    margin-right: 20px;
    white-space: nowrap;
    font-size: 20px;

    a {
      font-weight: 900;
    }
  }

  div.menu-hamburger {
    display: none;
  }

  @media only screen and (max-width: 1400px) {
    padding: 7px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 7px calc(15%);
  }

  @media ${props => props.theme.device.tablet} {
    justify-content: center;
    position: relative;

    div:not(.logo-container, .menu-hamburger) {
      display: none;
    }

    div.menu-hamburger {
      display: flex;
      position: absolute;
      right: calc(10%);
      cursor: pointer;
    }
  }
`;

function Header({ user }) {
  const [Open, setOpen] = useState(false);

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  }

  return (
    <Container>
      <div className="logo-container">
        <Link to="/">My Schedule</Link>
      </div>
      <NavBar />
      <UserMenuBar />
      <div className="menu-hamburger">
        <MenuOutlinedIcon onClick={toggleDrawer(true)} />
      </div>
      <Drawer anchor="top" open={Open} onClose={toggleDrawer(false)}>
        <div
          className="drawer-menu"
          role="presentation"
        >
          <List>
            <ListItem>
              <ListItemText>
                <NavLink to="/schedule" activeClassName="active-menu">
                  스케쥴 관리
                </NavLink>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <NavLink to="/challenge" activeClassName="active-menu">
                  마감 챌린지
                </NavLink>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <UserMenuBar />
              </ListItemText>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </Container>
  );
}

export default Header;
