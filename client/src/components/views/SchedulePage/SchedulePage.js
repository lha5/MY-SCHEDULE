import React from 'react';

import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';

// div.calendar {
//   /* border: 1px solid #d5d5d5; */
//   margin: 100px;
  
//   .tui-full-calendar-weekday-grid-line {
//     text-align: left;
//   }
// }

function SchedulePage() {
  return (
    <div>
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
    </div>
  );
}

export default SchedulePage;
