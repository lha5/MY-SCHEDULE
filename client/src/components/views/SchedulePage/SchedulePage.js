import React, { useCallback, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import swal from 'sweetalert';

import { createScehdule } from './../../../apis/scheduleApi';

const Container = styled.div`
  padding: 20px calc(23%);
  margin: 0 auto;

  div.calendar {
    border: 1px solid #e5e5e5;
    border-top: none;

    .tui-full-calendar-month-dayname-item {
      text-align: center;
    }

    .tui-full-calendar-weekday-grid-header {
      text-align: left;
    }

    .tui-full-calendar-weekday-schedule,
    .tui-full-calendar-weekday-schedule-time {
      text-align: left;
    }
  }

  @media only screen and (max-width: 1400px) {
    padding: 20px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 20px calc(18%);
  }
`;

const calendars = [
  {
    id: '1',
    name: '작업',
    color: '#ffffff',
    bgColor: '#ff75a0',
    dragBgColor: '#ff75a0',
    borderColor: '#ff75a0',
  },
  {
    id: '2',
    name: '미팅',
    color: '#ffffff',
    bgColor: '#fce38a',
    dragBgColor: '#fce38a',
    borderColor: '#fce38a',
  },
  {
    id: '3',
    name: '업무',
    color: '#ffffff',
    bgColor: '#eaffd0',
    dragBgColor: '#eaffd0',
    borderColor: '#eaffd0',
  },
  {
    id: '4',
    name: '약속',
    color: '#ffffff',
    bgColor: '#95e1d3',
    dragBgColor: '#95e1d3',
    borderColor: '#95e1d3',
  },
  {
    id: '5',
    name: '행사',
    color: '#ffffff',
    bgColor: '#a4ebf3',
    dragBgColor: '#a4ebf3',
    borderColor: '#a4ebf3',
  },
];

function SchedulePage({ user }) {
  const [Schedule, setSchedule] = useState([]);
  const cal = useRef();

  useEffect(() => {
    // cal.current.calendarInst.setCalendars(Schedule);
  }, []);

  const onClickSchedule = useCallback((e) => {
    const { calendarId, id } = e.schedule;
    const el = cal.current.calendarInst.getElement(id, calendarId);

    console.log(e, el.getBoundingClientRect());
  }, []);
 

  const onBeforeCreateSchedule = useCallback((scheduleData) => {
    const writer = user && user.userData && user.userData._id;

    const schedule = {
      id: Math.floor(Math.random() * 101) + scheduleData.title,
      calendarId: scheduleData.calendarId,
      title: scheduleData.title,
      isAllDay: scheduleData.isAllDay,
      start: scheduleData.start._date,
      end: scheduleData.end._date,
      category: scheduleData.isAllDay ? 'allday' : 'time',
      dueDateClass: '',
      location: scheduleData.location,
      raw: {
        class: scheduleData.raw['class'],
      },
      state: scheduleData.state,
    };
    
    createScehdule({ writer: writer, ...schedule})
    .then(response => {
        cal.current.calendarInst.createSchedules([schedule]);   
      })
      .catch(error => {
        console.error('error occured in SchedulePage.js - onBeforeCreateSchedule ', error);

        swal({
          title: '일정을 등록할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요'
        });
      });
  }, []);

  const onBeforeDeleteSchedule = useCallback((res) => {
    const { id, calendarId } = res.schedule;

    cal.current.calendarInst.deleteSchedule(id, calendarId);
  }, []);

  const onBeforeUpdateSchedule = useCallback((e) => {
    const { schedule, changes } = e;

    cal.current.calendarInst.updateSchedule(
      schedule.id,
      schedule.calendarId,
      changes
    );
  }, []);

  const _getFormattedTime = (time) => {
    const date = new Date(time);
    const h = date.getHours();
    const m = date.getMinutes();

    return `${h}:${m}`;
  }

  const _getTimeTemplate = (schedule, isAllDay) => {
    var html = [];

    if (!isAllDay) {
      html.push('<strong>' + _getFormattedTime(schedule.start) + '</strong> ');
    }
    if (schedule.isPrivate) {
      html.push('<span class="calendar-font-icon ic-lock-b"></span>');
      html.push(' Private');
    } else {
      if (schedule.isReadOnly) {
        html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
      } else if (schedule.recurrenceRule) {
        html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
      } else if (schedule.attendees.length) {
        html.push('<span class="calendar-font-icon ic-user-b"></span>');
      } else if (schedule.location) {
        html.push('<span class="calendar-font-icon ic-location-b"></span>');
      }
      html.push(' ' + schedule.title);
    }

    return html.join('');
  }

  const templates = {
    time: function (schedule) {
      console.log(schedule);
      return _getTimeTemplate(schedule, false);
    },
  };

  return (
    <Container>
      <div className="calendar">
        <Calendar
          ref={cal}
          view="month"
          defaultView="month"
          useCreationPopup={true}
          useDetailPopup={true}
          template={templates}
          calendars={calendars}
          isReadOnly={false}
          disableDblClick={false}
          disableClick={false}
          onClickSchedule={onClickSchedule}
          onBeforeCreateSchedule={onBeforeCreateSchedule}
          onBeforeDeleteSchedule={onBeforeDeleteSchedule}
          onBeforeUpdateSchedule={onBeforeUpdateSchedule}
          usageStatistics={false}
        />
      </div>
    </Container>
  );
}

export default SchedulePage;
