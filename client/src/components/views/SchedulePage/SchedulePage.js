import React from 'react';

import styled from 'styled-components';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

const Container = styled.div`
  border: 1px solid red;
  margin: 0 auto;
  
  div.calendar {
    /* border: 1px solid #d5d5d5; */
    margin: 100px;
    
    .tui-full-calendar-weekday-grid-line {
      text-align: left;
    }
  }

  @media ${props => props.theme.device.desktop} {
    width: 85%;
  }

  @media ${props => props.theme.device.labtop} {
    width: 80%;
  }

  @media ${props => props.theme.device.tablet} {
    width: 85%;
  }

  @media ${props => props.theme.device.mobile} {
    width: 85%;
  }
`;

function SchedulePage() {
  return (
    <Container>
      <div className="calendar">
        <Calendar
          isReadOnly={false}
          disableClick={false}
          useDetailPopup
          useCreationPopup
          defaultView="month"
          view="month"
          scheduleView
        />
      </div>
    </Container>
  );
}

export default SchedulePage;
