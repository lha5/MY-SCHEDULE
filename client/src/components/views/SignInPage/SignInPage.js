import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

import KakaoLogin from './KakaoLogin';

function SignInPage() {
  const code = useRef();

  useEffect(() => {
    const thisUrlParameter = window.location.search;
    if (thisUrlParameter) {
      const codeArray = thisUrlParameter.split('=');

      if (codeArray[0].indexOf('code') !== -1) {
        code.current = codeArray[1];

        getKakaoToken();
      } else {
        window.location.replace('/');
      }
    }
  }, []);

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const hostName = 'https://kauth.kakao.com/oauth/token';
  const grantType = 'grant_type=authorization_code';

  const getKakaoToken = () => {
    axios
      .post(
        `${hostName}?${grantType}&client_id=${process.env.REACT_APP_KAKAO_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code.current}`,
        axiosConfig
      )
      .then((response) => {
        if (response.status === 200) {
          console.log('카카오 토큰 요청 성공');

          axios
            .post(
              `${process.env.REACT_APP_URI}${process.env.REACT_APP_USER_SERVER}/kakao/signin`,
              response.data
            )
            .then((response) => {
              if (response.status === 200) {
                localStorage.setItem('user_id', response.data.user_id);
                localStorage.setItem('user_auth', response.data.user_auth);
                localStorage.setItem('k_', response.data.k_);

                window.location.replace('/');
              } else {
                window.location.replace('/');
              }
            });
        }
      })
      .catch((error) => {
        console.log(
          'Error occured in KakaoLoginProcess.js - getKakaoToken() ',
          error
        );
        window.location.replace('/');
      });
  }

  return (
    <div>
      로그인 영역
      <KakaoLogin />
    </div>
  );
}

export default withRouter(SignInPage);
