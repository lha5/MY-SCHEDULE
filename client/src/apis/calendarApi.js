import axios from 'axios';

const config = () => {
  const token = localStorage.getItem('user_auth');

  return {
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
}

export function getCalendarTheme() {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}/calendar-theme`);
}

export function createCalendarTheme(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}`, dataToSubmit, config());
}

export function deleteCalendarTheme(scheduleId) {
  return axios.delete(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}/delete?id=${scheduleId}`, config());
}
