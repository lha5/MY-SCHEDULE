import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';
import axios from 'axios';
import swal from 'sweetalert';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { NotificationsOutlined } from '@material-ui/icons';

const Container = styled.div`
  display: flex;

  div {
    div.user-menu {
      display: flex;
      align-items: center;
      column-gap: 10px;
      color: ${props => props.theme.colors.gray};

      div:hover {
        background-color: ${props => props.theme.colors.black};
        cursor: pointer;
      }
    }
  }

  div.login-btn {
    display: flex;
    align-items: center;
    width: 50px;
  }
`;

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #dedede',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

function UserMenuBar() {
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('user_auth')}` }
    };
    const dataToSubmit = {
      kakao_token: localStorage.getItem('k_')
    };

    axios
      .post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/logout`, dataToSubmit, config)
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem('k_');
          localStorage.removeItem('user_id');
          localStorage.removeItem('user_auth');

          window.location.replace('/');
        } else {
          swal({
            title: '로그아웃 할 수 없습니다.',
            text: '잠시 후 다시 시도해주세요.',
            icon: 'error'
          });
        }
      })
      .catch(error => console.error('로그아웃 실패:: ', error));
  }

  const [AnchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      {user.userData && user.userData.isAuth ? (
        <div>
          <div className="user-menu" onClick={handleClick}>
            {/* <NotificationsOutlined fontSize="large" /> */}
            <Avatar src="/broken-image.jpg" />
          </div>
          <StyledMenu
            id="customized-menu"
            anchorEl={AnchorEl}
            keepMounted
            open={Boolean(AnchorEl)}
            onClose={handleClose}
            disableAutoFocusItem
          >
            <MenuItem dense>
              마이 페이지
            </MenuItem>
            <MenuItem dense onClick={handleLogout}>
              로그아웃
            </MenuItem>
          </StyledMenu>
        </div>
      ) : (
        <div className="login-btn">
          <Link to="/signin">로그인</Link>
        </div>
      )}
    </Container>
  );
}

export default UserMenuBar;
