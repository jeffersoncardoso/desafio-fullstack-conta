import axios from "axios";
import Vue from 'vue';

const instance = createInstance(process.env.VUE_APP_API_URL);

function createInstance(baseURL){
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export default {
  install () {
    Vue.prototype.$http = instance;
  }
};