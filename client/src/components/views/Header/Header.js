import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import axios from 'axios';
import swal from 'sweetalert';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid cyan;
  margin: 0 auto;

  .nav-bar {
    display: flex;
    flex-direction: row;
  }

  .user-menu {
    display: flex;
    flex-direction: row;

    div:nth-child(1) {
      margin-right: 10px;
    }
  }

  @media ${props => props.theme.device.desktop} {
    width: 85%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 80%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 85%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 85%;
  }
`;

function Header() {
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

  return (
    <Container>
      <div className="logo-container">
        <Link to="/">홈</Link>
      </div>
      <div className="nav-bar">
        <div><Link to="/schedule">스케쥴 관리</Link></div>
      </div>
      {user.userData && user.userData.isAuth ? (
        <div className="user-menu">
          <div><Link to="/mypage">마이페이지</Link></div>
          <div onClick={handleLogout}>로그아웃</div>
        </div>
      ) : (
        <div>
          <Link to="/signin">로그인</Link>
        </div>
      )}
    </Container>
  );
}

export default Header;
