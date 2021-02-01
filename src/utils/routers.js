import Vue from 'vue'
import axios from 'axios'
// import router from '../router'
import qs from 'qs'
import { Toast, Dialog } from 'vant'
Vue.use(Toast, Dialog)

const userToken = 'token'
async function getToken(v) {
  // Dialog({ message: v + token })
  let token = sessionStorage.getItem(userToken)
  if (token === 'undefined' || token === null || token === '') {
    return getTokens(v)
  }
  return token
}

function setItem(key, value) {
  localStorage.setItem(key, value)
}
function setISess(key, value) {
  sessionStorage.setItem(key, value)
}
async function getTokens(v) {
  console.log(v)
  // Dialog({ message: JSON.stringify(v) })
  try {
    // Dialog({ message: v })
    let item = JSON.parse(v)
    // console.log(v)
    let ev = ''
    let u = navigator.userAgent
    let ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    ios ? (ev = 'ios') : (ev = 'android')
    let modal = {
      idcard: item.idcard,
      username: item.username,
      sign: item.sign,
      datetime: item.datetime,
    }
    let data = qs.stringify(modal)
    let isSuccess = ''
    await axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'XX-Device-Type': ev,
        // Clientid: item.appid,
        'XX-Wxapp-AppId': item.appid,
        // 'XX-Clientid': item.appid,
      },
      method: 'POST',
      url: 'https://api-gxrswx.healthan.net/api/appweb/Login/register',
      data: data,
      // withCredentials: false,
    })
      .then(res => {
        // Dialog({
        //   message: JSON.stringify(res),
        // })
        if (res.data.code === 0) {
          setISess('token', res.data.data.token)
          // console.log(res)
          isSuccess = 0
        } else {
          Dialog({ message: res.data.msg })
        }
      })
      .catch(res => {
        console.log(res)
      })
    return isSuccess
  } catch (error) {
    console.error(error)
    Dialog({ message: '数据类型必须为json字符串，请检查' })
  }
}
export default {
  getToken: getToken,
  setToken: setItem,
  setISess: setISess,
}
