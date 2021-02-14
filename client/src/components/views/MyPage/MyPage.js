import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid red;
  margin: 0 auto;

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

function MyPage() {
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
          // swal({
          //   title: '로그아웃 할 수 없습니다.',
          //   text: '잠시 후 다시 시도해주세요.',
          //   icon: 'error'
          // });
        }
      })
      .catch(error => console.error('로그아웃 실패:: ', error));
  }
  return (
    <Container>
      <h2>마이 페이지</h2>
      <div onClick={handleLogout}>로그아웃</div>
    </Container>
  );
}

export default MyPage;
