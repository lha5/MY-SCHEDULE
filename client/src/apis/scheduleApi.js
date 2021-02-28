import axios from 'axios';

const config = () => {
  const token = localStorage.getItem('user_auth');

  return {
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
}

export function createScehdule(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_SCHEDULE_SERVER}`, dataToSubmit, config());
}
