import axios from 'axios';

const config = () => {
  const token = localStorage.getItem('user_auth');

  return {
    headers: {
      authorization: `Bearer ${token}`,
    }
  };
}

export function getChallenging() {
  return axios.get(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}`, config());
}

export function createChallenge(dataToSubmit) {
  return axios.post(`${process.env.REACT_APP_URI}${process.env.REACT_APP_CHALLENGE_SERVER}`, dataToSubmit, config());
}
