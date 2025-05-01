import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // or your backend URL

const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const AxiosBaseUrl = () => {
  axios.defaults.baseURL = API_BASE_URL;
  return axios;
};

export { SetAuthToken, AxiosBaseUrl };
