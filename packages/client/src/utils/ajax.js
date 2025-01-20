/**
 * Created by lz on 2017/6/21.
 */

import Axios from 'axios';
// import fetch from 'node-fetch';
import queryString from 'query-string';
import { message } from 'antd';
// import Cookies from 'js-cookie';

import constants from '../services/constants';
import { getUrlPrefix } from '../services/apiConfig';

const { ajaxRetCode } = constants;

// let url_prefix = 'http://localhost:3000';
// const url_prefix = 'http://mock-api.lzuntalented.cn';
const urlPrefix = getUrlPrefix();

export default {
  get(url, params = {}) {
    const urlPath = urlPrefix + url;
    return new Promise((resolve, reject) => {
      Axios.get(urlPath, {
        params,
        onDownloadProgress: null,
        onUploadProgress: null,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'clientid': '8ae3bc85-ea75-4b78-9ac3-a2cafad8e7d1',
          // 'lzcookie': queryString.stringify(cookie)
        },
      }).then((response) => {
        if (response) {
          const res = response.data;
          // console.log(res);
          if (res && res.code === 200) {
            resolve(res.data);
          } else if (res && res.code === 401) {
            message.error('请先登录');
            reject(res);
          } else {
            reject(res);
          }
        }
      }).catch(() => {});
    });
  },

  post(url, params) {
    const urlPath = urlPrefix + url;
    return new Promise((resolve, reject) => {
      Axios({
        method: 'post',
        url: urlPath,
        data: params,
        onDownloadProgress: null,
        onUploadProgress: null,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'clientid': '8ae3bc85-ea75-4b78-9ac3-a2cafad8e7d1',
          // 'lzcookie': queryString.stringify(cookie)
        },
      }).then((response) => {
        if (response) {
          const res = response.data;
          if (res && res.code === 200) {
            resolve(res.data);
          } else if (res && res.code === 401) {
            message.error('请先登录');
            reject(res);
          } else {
            reject(res);
          }
        }
      }).catch(reject);
    });
  },
};
