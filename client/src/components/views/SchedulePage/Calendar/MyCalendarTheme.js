import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';

import { getCalendarTheme } from '../../../../apis/calendarApi';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const CustomCheckbox = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  input[type='checkbox'] {
    margin-right: 3px;
    visibility: hidden;
  }

  input[type='checkbox']:checked + label {
    background-color: ${(props) => props.theme.colors.white};
    border-color: ${(props) => props.whichColor};
  }

  input[type='checkbox']:checked + label:after {
    opacity: 1;
  }

  label {
    cursor: not-allowed;
    position: absolute;
    display: flex;
    background-color: ${(props) => props.whichColor};
    border: 2px solid ${(props) => props.whichColor};
    border-radius: 50%;
    cursor: pointer;
    width: 10px;
    height: 10px;
    left: 0;
    top: 25%;
  }

  label:after {
    display: flex;
    content: '';
    height: 4px;
    width: 4px;
    opacity: 0;
    position: absolute;
    top: 2px;
    left: 2px;
  }

  .theme-tag {
    display: flex;
    font-size: 13px;
  }
`;

function MyCalendarTheme({ user }) {
  const [CalendarData, setCalendarData] = useState([]);

  useEffect(() => {
    getCalendarData();
  }, []);

  const getCalendarData = () => {
    getCalendarTheme()
      .then(response => {
        setCalendarData(response.data.data);
      })
      .catch(error => {
        console.error('error occured in MyCalendarTheme.js - getCalendarTheme() ', error);

        swal({
          title: '캘린더 테마를 불러올 수 없습니다.',
          icon: 'error'
        });
      });
  }

  const renderTheme = CalendarData && CalendarData.map((theme, index) => (
    <CustomCheckbox key={theme.id + theme.name} whichColor={theme.bgColor}>
      <input type="checkbox" value={theme.id} id={theme.id + theme.name} />
      <label htmlFor={theme.id + theme.name} />
      <div className="theme-tag">{theme.name}</div>
    </CustomCheckbox>
  ));

  return (
    <Container>
      {renderTheme}
    </Container>
  );
}

export default MyCalendarTheme;
