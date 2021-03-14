import React from 'react';

import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .cal-row {
    display: flex;
    width: 100%;
    font-size: 14px;
    border-left: 1px solid ${(props) => props.theme.colors.lightGray};

    .cal-row-box {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: calc(100% / 7);
      height: 0;
      padding-bottom: calc(100% / 7);
      border-right: 1px solid ${(props) => props.theme.colors.lightGray};
      border-bottom: 1px solid ${(props) => props.theme.colors.lightGray};

      &.not-this-month {
        span.text {
          color: ${(props) => props.theme.colors.gray};
        }
      }

      &.selected {
        span.text {
          background-color: ${(props) => props.theme.colors.darkGray};
          color: ${(props) => props.theme.colors.white};
        }
      }

      span.text {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 19%;
        height: 19%;
        border-radius: 50%;
        top: 15%;
        left: 15%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .cal-row.cal-row-header {
    cursor: default;

    .cal-row-box {
      padding: 17px;
      border-top: 1px solid ${(props) => props.theme.colors.lightGray};

      span.text {
        font-size: 15px;
        font-weight: 600;
        top: 50%;
        left: 50%;
        ${(props) => props.theme.colors.darkGray};
      }
    }

    .cal-row-box:hover > span.text {
      background-color: white;
    }
  }
`;

function CalendarBody() {
  const renderDayHeader = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    return (
      <div className="cal-row cal-row-header">
        {days.map((day, index) => (
          <div className="cal-row-box" key={index + day}>
            <span className="text">{day}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const today = moment();
    const startWeek = today.clone().startOf('month').week();
    const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    let calendar = [];

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="cal-row cal-row-body" key={week}>
          {Array(7).fill(0).map((value, index) => {
            let current = today.clone().week(week).startOf('week').add(value + index, 'day');
            let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? 'selected' : '';
            let isNotThisMonth = current.format('MM') === today.format('MM') ? '' : 'not-this-month';

            return (
              <div className={`cal-row-box ${isSelected} ${isNotThisMonth}`} key={index + value}>
                <span className="text">
                  {current.format('D')}
                </span>
              </div>
            );
          })}
        </div>
      );
    }

    return calendar;
  }

  return (
    <Container>
      {renderDayHeader()}
      {renderDays()}
    </Container>
  );
}

export default CalendarBody;
