import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/ko';
import { SentimentDissatisfiedOutlined as NotSmile } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

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

  div.table-box {
    margin: 25px;

    thead > tr {
      border-bottom: 2px solid ${props => props.theme.colors.darkGray};
      
      th {
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
`;

const useStyles = makeStyles({
  title: {
    width: '40%'
  }
});

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

  const classes = useStyles();

  const renderList = () => {
    return (
      <div className="table-box">
        <TableContainer>
          <Table arial-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.title}>챌린지 제목</TableCell>
                <TableCell align="center">마감 사과 갯수</TableCell>
                <TableCell align="center">챌린지 마감 기한</TableCell>
                <TableCell align="center">챌린지를 끝낸 날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {All && All.map((row, index) => (
                <TableRow key={index + row.title} hover>
                  <TableCell className={classes.title}>{row.title}</TableCell>
                  <TableCell align="center">{row.goal.length}</TableCell>
                  <TableCell align="center">{moment(row.dueDate).format('YYYY[년] MM[월] DD[일] LT')}</TableCell>
                  <TableCell align="center">{moment(row.updatedAt).format('YYYY[년] MM[월] DD[일] LT')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }

  return (
    <Container>
      <div className="section-title">
        <div className="challenging">지난 챌린지</div>
      </div>
      {All.length > 0 ? renderList() : renderEmpty()}
    </Container>
  );
}

export default Challenged;
