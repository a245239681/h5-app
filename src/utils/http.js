import Vue from 'vue'
import axios from 'axios'
import indexjs from '@/config/index.js'
import qs from 'qs'
import { Toast } from 'vant'
Vue.use(Toast)
const apiurl = indexjs.apiurl
function ajaxPost(url, params, callfunc, async) {
  let userToken = getToken() || ''
  const loadings = Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  })
  axios({
    method: 'POST',
    url: apiurl + url,
    data: qs.stringify(params),
    withCredentials: async,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'XX-Device-Type': 'android',
      'XX-Wxapp-AppId': 'hztest',
      'XX-Token': userToken,
    },
  })
    .then(function(result) {
      if (callfunc) {
        callfunc(result)
        loadings.clear()
      }
    })
    .catch(function() {
      loadings.clear()
      Toast('系统异常,请重试!')
    })
}

function postRequest(url, params) {
  return new Promise((resolve, reject) => {
    let userToken = getToken() || ''
    const loadings = Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    })
    axios({
      method: 'POST',
      url: apiurl + url,
      data: qs.stringify(params),
      withCredentials: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'XX-Token': userToken,
      },
    })
      .then(res => {
        resolve(res)
        loadings.clear()
      })
      .catch(res => {
        reject(res)
        loadings.clear()
      })
  })
}
// 文件流
function fromLoader(url, params) {
  const loadings = Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  })
  let config = {
    headers: {
      //添加请求头
      'Content-Type': 'multipart/form-data',
    },
  }
  return new Promise((resolve, reject) => {
    axios
      .post(apiurl + url, params, config)
      .then(res => {
        if (res) {
          //如果为真 resolve出去
          resolve(res)
          loadings.clear()
        } else {
          //否则
          reject(res)
          loadings.clear()
        }
      })
      .catch(err => {
        reject(err)
        loadings.clear()
      })
  })
}

function getToken() {
  return sessionStorage.getItem('token')
}

export default {
  postRequest: postRequest,
  fromLoader: fromLoader,
  postJson: function(url, params) {
    let call = arguments[2] || null
    let asyncAjax = arguments[3] || false
    ajaxPost(url, params, call, asyncAjax)
  },
}
