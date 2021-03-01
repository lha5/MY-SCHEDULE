import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { AddOutlined } from '@material-ui/icons';
import swal from 'sweetalert';

import { getChallenging, createChallenge } from './../../../apis/challengeApi';

const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  margin-top: 50px;

  div.section-title {
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    margin: 15px auto;
    padding: 0 20px 15px 20px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      background-color: ${props => props.theme.colors.darkGray};

      svg, path {
        color: ${props => props.theme.colors.white};
      }
    }
  }

  div.is-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 25px auto;

    .notice-empty {
      font-size: 18px;
      color: ${props => props.theme.colors.darkGray};
      margin: 25px auto;
    }
  }
`;

function Challenging() {
  const [Challenge, setChallenge] = useState([]);

  useEffect(() => {
    getChallenge();
  }, []);

  const getChallenge = () => {
    getChallenging()
      .then(response => {
        setChallenge(response.data.data);
      })
      .catch(error => {
        console.error('error occured in Challenging - getChallenge() ', error);

        swal({
          title: '챌린지를 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  const renderEmpty = () => {
    return (
      <div className="is-empty">
        <div className="notice-empty">현재 진행중인 챌린지가 없습니다.</div>
      </div>
    );
  }

  return (
    <Container>
      <div className="section-title">
        <div className="challenging">진행 중인 챌린지</div>
        {Challenge.length <= 0 && <button type="button"><AddOutlined /></button>}
      </div>
      {Challenge.length <= 0 ? renderEmpty() : <div>있음</div>}
    </Container>
  );
}

export default Challenging;
