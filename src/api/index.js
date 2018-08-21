import axios from "axios";

const APP_KEY =
  "45e3a78261d88eaacd1b9e5c8e91b5262135d9e21965dcc181ba1a15a955af4c";
const BASE_API = "http://mock.biaoyansu.com/api/1/";

const sign = (APP_KEY, timestamp) => {
  return btoa(APP_KEY + timestamp);
};

const api = (url, param) => {
  url = BASE_API + url;
  let timestamp = new Date().getTime();
  let signature = sign(APP_KEY, timestamp);
  let opt = {
    headers: {
      "biao-mock-app-key": APP_KEY,
      "biao-mock-timestamp": timestamp,
      "biao-mock-signature": signature
    }
  };
  return axios.post(url, param, opt).then(r => {
    return r.data;
  });
};
export default api;
