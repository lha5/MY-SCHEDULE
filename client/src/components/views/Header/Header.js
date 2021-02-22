import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import swal from 'sweetalert';

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
    <div>
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
    </div>
  );
}

export default Header;
