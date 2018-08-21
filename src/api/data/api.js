window.api = api;

const APP_KEY =
  "45e3a78261d88eaacd1b9e5c8e91b5262135d9e21965dcc181ba1a15a955af4c";
const BASE_API = "http://mock.biaoyansu.com/api/1/";

function sign(app_key, timestamp) {
  return btoa(app_key + timestamp);
}

function api(url, params) {
  let timestamp = new Date().getTime();
  let signature = sign(APP_KEY, timestamp);

  let opt = {
    headers: {
      "biao-mock-app-key": APP_KEY,
      "biao-mock-timestamp": timestamp,
      "biao-mock-signature": signature
    }
  };

  url = BASE_API + url;
  return axios.post(url, params, opt).then(r => {
    return r.data;
  });
}
