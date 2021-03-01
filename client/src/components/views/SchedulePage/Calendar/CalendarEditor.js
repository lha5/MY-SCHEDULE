import React, { useState } from 'react';

import styled from 'styled-components';
import { CirclePicker } from 'react-color';
import swal from 'sweetalert';

import { getLastId, createCalendarTheme } from '../../../../apis/calendarApi';

const Container = styled.div`
  width: 900px;
  height: 500px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CalendarEditor({ setOpen }) {
  const [Name, setName] = useState('');

  const [Background, setBackground] = useState('');

  const handleName = (event) => {
    const value = event.target.value;

    setName(value);
  }

  const handleChangeColor = (color, event) => {
    setBackground(color.hex);
  }

  const createTheme = async (event) => {
    event.preventDefault();

    if (Name === '' || Background === '') {
      swal({
        title: '모든 항목을 입력하세요.',
        icon: 'warning'
      });

      return false;
    }

    let lastId = 0;

    getLastId()
      .then(response => {
        lastId += response.data.data;

        const dataToSubmit = {
          writer: window.localStorage.getItem('user_id') || '',
          id: lastId,
          name: Name,
          color: '#ffffff',
          bgColor: Background,
          dragBgColor: Background,
          borderColor: Background,
        };
    
        createCalendarTheme(dataToSubmit)
          .then(response => {
            setOpen(false);
          })
          .catch(error => {
            console.error('error occured in CalendarEditor.js - createCalendarTheme() ', error);

            swal({
              title: '달력 테마를 가져올 수 없습니다.',
              text: '잠시 후 다시 시도해주세요'
            });
          });
      })
      .catch(error => {
        console.error('error occured in CalendarEditor.js - getLastId() ', error);

        swal({
          title: '달력 테마 정보를 가져올 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }

  return (
    <Container>
      <form onSubmit={createTheme}>
        <input type="hidden" value={1} />
        <input
          type="text"
          name="name"
          placeholder="일정 구분. 예: 기념일"
          onChange={handleName}
        />
        <CirclePicker color={Background} onChange={handleChangeColor} />
        <button type="submit">테마 추가하기</button>
      </form>
    </Container>
  );
}

export default CalendarEditor;
