import React from 'react';

import styled from 'styled-components';
import moment from 'moment';

import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  .calendar {
    font-size: 18px;
    margin: 0 50px;
  }

  .cal-btn-box {
    display: flex;
    flex-direction: row;
    
    button {
      cursor: pointer;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      border: none;
      padding: 9px;
      border-radius: 50%;

      svg {
        font-size: 18px;
      }

      &:hover path {
        color: ${props => props.theme.colors.primary};
      }

      &:active path {
        color: ${props => props.theme.colors.primary};
      }
    }
  }
`;

function CalendarHeader() {
  return (
    <Container>
      <div className="cal-title">{moment().format('YYYY[년] MM[월]')}</div>
      <div className="cal-btn-box">
        <button><ArrowBackIos /></button>
        <button><ArrowForwardIos /></button>
      </div>
    </Container>
  );
}

export default CalendarHeader;
