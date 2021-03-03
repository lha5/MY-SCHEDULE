import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';
import moment from 'moment';
import { SentimentDissatisfiedOutlined as NotSmile } from '@material-ui/icons';

import { getAllMyChallenge } from './../../../apis/challengeApi';

const Container = styled.div`
  border: 1px solid ${props => props.theme.colors.gray};
  border-radius: 5px;
  margin-top: 25px;

  div.section-title {
    border-bottom: 1px solid ${props => props.theme.colors.gray};
    margin: 15px auto;
    padding: 8px 20px 23px 20px;
    text-align: left;
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

function Challenged() {
  const [All, setAll] = useState([]);

  useEffect(() => {
    getAllChallenge();
  }, []);

  const getAllChallenge = () => {
    getAllMyChallenge()
      .then(response => {
        setAll(response.data.data);
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
        <div className="icon-empty"><NotSmile fontSize="large" /></div>
        <div className="notice-empty">지난 챌린지가 없습니다.</div>
      </div>
    );
  }

  const renderList = All && All.map((each, index) => (
    <div className="each-done" key={index + each.title}>
      <div className="title">{each.title}  {each.goal.length}</div>
      <div className="created">{moment(each.createdAt).format('YYYY[년] MM[월] DD[일] hh:mm')}</div>
      <div className="duedate">{moment(each.dueDate).format('YYYY[년] MM[월] DD[일] hh:mm')}</div>
      <div className="last">{moment(each.updatedAt).format('YYYY[년] MM[월] DD[일] hh:mm')}</div>
      <div className="memo">{each.memo}</div>
    </div>
  ));

  return (
    <Container>
      <div className="section-title">
        <div className="challenging">지난 챌린지</div>
      </div>
      {All.length > 0 ? renderList : renderEmpty()}
    </Container>
  );
}

export default Challenged;
