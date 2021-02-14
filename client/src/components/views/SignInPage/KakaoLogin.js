import React from 'react';

import styled from 'styled-components';

import kakaoLoginButton from '../../../assets/images/kakao_login.png';

const Container = styled.div`
  margin: 0 auto;
`;

function KakaoLogin() {
  const host = 'https://kauth.kakao.com/oauth/authorize?response_type=code';

  return (
    <Container>
      <a href={`${host}&client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`}>
        <img alt="카카오 로그인" src={kakaoLoginButton} />
      </a>
    </Container>
  );
}

export default KakaoLogin;
