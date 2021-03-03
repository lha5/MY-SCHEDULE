import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';
import moment from 'moment';
import { CheckCircleOutline } from '@material-ui/icons';

import { getMyChallenge, updateMyChallenge } from '../../../apis/challengeApi';

import AppleImage from '../../../assets/images/apple.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 calc(23%);
  height: calc(100vh - 49px - 47px);
  justify-content: center;
  align-items: center;


  div.apple-container {
    border-top: 1px solid ${props => props.theme.colors.black};
    border-left: 1px solid ${props => props.theme.colors.black};
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin: 0 auto;

    .each-apple {
      cursor: pointer;
      border-right: 1px solid ${props => props.theme.colors.black};
      border-bottom: 1px solid ${props => props.theme.colors.black};
      padding: 15px;
    }

    .done-apple {
      cursor: default;
      background-color: ${props => props.theme.colors.gray};
    }
  }

  @media only screen and (max-width: 1400px) {
    padding: 0 calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 0 calc(15%);
  }

  @media ${props => props.theme.device.labtop} {
    flex-direction: column;
  }
`;

function DetailChallenge(props) {
  const challengeId = props.match.params.id;

  const [Challenge, setChallenge] = useState({});
  const [HowManyDone, setHowManyDone] = useState(0);

  const getChallenge = () => {
    getMyChallenge(challengeId)
      .then(response => {
        console.log('???', response.data.data[0]);
        setChallenge(response.data.data[0]);

        setHowManyDone(response.data.data[0].done.filter(element => element === true).length);
      })
      .catch(error => {
        console.error('error occured in DetailChallenge - getChallenge() ', error);

        swal({
          title: '챌린지를 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  useEffect(() => {
    getChallenge();
  }, []);

  const handleCheckDone = (event) => {
    const targetId = event.target.id;
    let arr = [...Challenge.done];
    
    if (arr[targetId]) {
      return false;
    } else {
      arr[targetId] = true;
      const dataToSubmit = {
        done: arr
      };
  
      updateMyChallenge(challengeId, dataToSubmit)
        .then(response => {
          getChallenge();
        })
        .catch(error => {
          console.error('error occured in DetailChallenge - handleCheckDone() ', error);
  
          swal({
            title: '챌린지를 업데이트할 수 없습니다.',
            text: '잠시 후 다시 시도해주세요'
          });
        });
    }
  }

  const renderChallenge = () => {
    return (
      <>
        <div className="detail-info">
          <div className="info-title">{Challenge.title}</div>
          <div className="info-ing">{HowManyDone} / {Challenge.goal.length}</div>
          <div className="info-duedate">{moment(Challenge.dueDate).format('YYYY[년] MM[월] DD[일] hh:mm')} 까지 입니다!</div>
        </div>
        <div className="apple-container">
          {Challenge.goal.map((apple, index) => (
            <div onClick={handleCheckDone} className={Challenge.done[apple] ? 'each-apple done-apple' : 'each-apple not-yet'}>
              <img src={AppleImage} alt="마감 사과" width="50px" id={apple} />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <Container>
      {renderChallenge()}
    </Container>
  );
}

export default DetailChallenge;
