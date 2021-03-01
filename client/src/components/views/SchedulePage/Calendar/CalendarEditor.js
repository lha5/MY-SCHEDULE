import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { CirclePicker } from 'react-color';
import swal from 'sweetalert';
import { DeleteOutlined } from '@material-ui/icons';

import { getLastId, createCalendarTheme, getCalendarTheme, deleteCalendarTheme } from '../../../../apis/calendarApi';

const Container = styled.div`
  width: 900px;
  height: 500px;
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  justify-content: space-between;

  div.delete-list,
  div.form-section  {
    margin: 10px 12px;
  }

  div.delete-list {
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${props => props.theme.colors.gray};
    height: auto;
    justify-content: start;
  }
`;

const MyTheme = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 10px 5px 10px;

  div.theme-container {
    display: flex;
    flex-direction: row;
    width: 100%;

    div.color-palette {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin: 0;
      background-color: ${(props) => props.coloring};
    }
  
    div.theme-name {
      margin: 0 0 0 7px;
      font-size: 14px;
      width: fit-content;
    }
  }

  div:last-child {
    display: flex;
    align-items: center;

    svg,
    path {
      font-size: 20px;
      color: ${props => props.theme.colors.gray};

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

function CalendarEditor({ setCalendarData }) {
  const [Name, setName] = useState('');
  const [Background, setBackground] = useState('');
  const [CalTheme, setCalTheme] = useState([]);

  useEffect(() => {
    getTheme();
    setCalendarData(CalTheme);
  }, [CalTheme]);

  const getTheme = () => {
    getCalendarTheme()
      .then(response => {
        setCalTheme(response.data.data);
      })
      .catch(error => {
        console.error('error occured in MyCalendarTheme.js - getCalendarTheme() ', error);

        swal({
          title: '캘린더 테마를 불러올 수 없습니다.',
          icon: 'error'
        });
      });
  }

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
            getTheme();
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

  const handleDelete = (event) => {
    const target = event.target.id;

    swal({
      title: '일정 구분을 삭제하시겠습니까?',
      icon: 'warning',
      buttons: ['취소', '삭제']
    }).then(value => {
      if (value) {
        deleteCalendarTheme(target)
          .then(response => {
            getTheme();
          })
          .catch(error => {
            console.error('error occured in CalendarEditor.js - handleDelete(event) ', error);

            swal({
              title: '일정 구분을 삭제할 수 없습니다.',
              icon: 'error'
            });
          });
      } else {
        return false;
      }
    });
  }

  const renderList = CalTheme.map((theme, index) => (
    <MyTheme coloring={theme.bgColor} key={theme.id + theme.name}>
      <div className="theme-container">
        <div className="color-palette" />
        <div id={theme.id} className="theme-name">{theme.name}</div>
      </div>
      <div onClick={handleDelete}><DeleteOutlined id={theme.id} /></div>
    </MyTheme>
  ));

  return (
    <Container>
      <div className="delete-list">{renderList}</div>
      <div className="form-section">
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
      </div>
    </Container>
  );
}

export default CalendarEditor;
