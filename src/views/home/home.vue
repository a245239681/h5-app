<template>
  <div class="home">
    <div class="my-top">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image class="img-responsive" :src="banner" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="my-box">
      <!-- banner -->
      <van-swipe class="banner-home" v-if="code === 3" indicator-color="white">
        <!-- 机关养老 -->
        <van-swipe-item v-if="Object.keys(userInfo).length !== 0">
          <div style="padding: 0.3rem;">
            <div class="head-o bg2" v-if="code === 3" v-cloak>
              <van-row>
                <van-col class="h80" span="12" @click="toGo('/info')">
                  <van-row>
                    <!-- 类型 -->
                    <van-col span="24" class="pb10"
                      ><span class="home-user" v-cloak>{{
                        userInfo.type_name
                      }}</span></van-col
                    >
                    <van-col span="24">
                      <!-- 姓名 -->
                      <p class="home-name" v-cloak>{{ userInfo.name }}</p>
                      <!-- 余额 -->
                      <p class="home-price" v-show="priceShow === true">
                        <span v-cloak>余额：{{ userInfo.balance }}元</span>
                        <van-icon @click="eyeBtn" class="ml5 f21" :name="eye" />
                      </p>
                      <p class="home-price" v-show="priceShow === false">
                        <span v-cloak>余额：{{ userInfo.price }}元</span>
                        <van-icon
                          @click="eyeBtn"
                          class="ml5 f21"
                          :name="baomi"
                        />
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
                <van-col class="h80" span="12" @click="toGo('/Insured')">
                  <van-row>
                    <!-- 参保地 -->
                    <van-col span="24" class="text-align-right pb10"
                      ><span v-cloak class="home-address"
                        >参保地：{{ userInfo.addr }}</span
                      >
                    </van-col>

                    <van-col span="24" class="text-align-right">
                      <p class="home-date">首次参保:</p>
                      <p class="home-time" v-cloak>
                        {{ userInfo.time }}
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <!-- 城镇职工养老 -->
        <van-swipe-item v-if="userItem.length !== 0">
          <div class="banner-sel">
            <div class="head-o bg2" v-if="code === 3" v-cloak>
              <van-row>
                <van-col class="h80" span="12" @click="toGo('/info')">
                  <van-row>
                    <van-col span="24" class="pb10"
                      ><span class="home-user" v-cloak>{{
                        cz_ly.type_name
                      }}</span></van-col
                    >

                    <van-col span="24">
                      <p class="home-name" v-cloak>{{ cz_ly.name }}</p>
                      <p class="home-price" v-show="priceShow === true">
                        <span v-cloak>余额：{{ cz_ly.balance }}元</span>
                        <van-icon @click="eyeBtn" class="ml5 f21" :name="eye" />
                      </p>
                      <p class="home-price" v-show="priceShow === false">
                        <span v-cloak>余额：{{ cz_ly.price }}元</span>
                        <van-icon
                          @click="eyeBtn"
                          class="ml5 f21"
                          :name="baomi"
                        />
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
                <van-col class="h80" span="12" @click="toGo('/Insured')">
                  <van-row>
                    <!-- 参保地 -->
                    <van-col span="24" class="text-align-right pb10">
                      <div
                        v-cloak
                        class="home-address"
                        @click="onAddr('/Insured')"
                      >
                        参保地：{{ cz_ly.addr }}
                        <van-icon
                          v-show="addrArr.length > 1"
                          name="arrow-down"
                        />
                        <!-- <i class="down"></i> -->
                      </div>
                    </van-col>

                    <van-col
                      span="24"
                      class="text-align-right"
                      v-show="!!cz_ly.time"
                    >
                      <p class="home-date">首次参保:</p>
                      <p class="home-time" v-cloak>
                        {{ cz_ly.time }}
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="home-list" v-if="code === 1 || code === 2">
        <div class="head-o bg" v-if="code === 1" v-cloak>
          <van-row>
            <van-col span="24">
              <h3 class="home-title">尚未绑定社保卡</h3>
            </van-col>
            <van-col span="24">
              <p class="home-details">绑定人社部电子社保卡，查询社保信息</p>
            </van-col>
            <van-col span="24">
              <van-button
                class="home-btn"
                round
                size="small"
                @click="go(binding)"
                type="info"
                >前往绑定</van-button
              >
            </van-col>
          </van-row>
        </div>

        <div class="head-o bg3 just-list" v-if="code === 2" v-cloak>
          <van-row>
            <van-col span="24">
              <h3 class="home-nodata">未查询到您的养老参保信息</h3>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 参保地区选择 -->
      <van-popup v-model="showAddr" position="bottom" class="addr">
        <van-picker
          show-toolbar
          :columns="addrArr"
          @cancel="showAddr = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-tabs
        v-model="active"
        class="home-tab"
        swipeable
        animated
        color="#287DE2"
        @change="ontab"
      >
        <van-tab title="社保查询">
          <van-row gutter="15" v-if="active == 0">
            <van-col
              span="24"
              v-cloak
              class="mb15 bg-w"
              :key="inx"
              v-for="(item, inx) in ddsArr"
              @click="showNext(inx)"
            >
              <van-row class="just-list h60 plr50 box-shadow">
                <van-col span="3" class="just-start">
                  <i class="van-icon van-grid-item__icon just-list f50"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="17">
                  <span class="van-grid-item__text pl10">{{ item.title }}</span>
                </van-col>
                <van-col span="4" class="just-end">
                  <van-icon
                    class="f22"
                    :name="showChild === inx ? 'arrow-up' : 'arrow-down'"
                  />
                </van-col>
              </van-row>
              <div class="bg-w">
                <van-row
                  gutter="15"
                  :class="showChild === inx ? '' : 'showchild'"
                >
                  <!-- 二级菜单 -->
                  <van-col
                    span="24"
                    :key="i"
                    class="plr50"
                    v-for="(items, i) in item.children"
                    @click="toGo(items.url)"
                  >
                    <van-row class="just-list h60 border-bottom ">
                      <van-col span="20" class="f30">{{ items.title }}</van-col>
                      <van-col span="4" class="just-end">
                        <van-icon name="arrow" />
                      </van-col>
                    </van-row>
                  </van-col>
                </van-row>
              </div>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="社保卡查询">
          <van-row gutter="15" v-if="active == 1">
            <van-col
              span="24"
              v-cloak
              class="mb15"
              :key="inx"
              v-for="(item, inx) in listArr.slice(7, 9)"
              @click="toGo(item.url)"
            >
              <van-row class="just-list h60 box-shadow">
                <van-col span="6" class="just-list">
                  <i class="van-icon van-grid-item__icon just-list  f50"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="14">
                  <span class="van-grid-item__text">{{ item.title }}</span>
                </van-col>
                <van-col span="4" class="just-list">
                  <van-icon class="f22" name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="电子证书">
          <van-row gutter="15" v-if="active == 2">
            <van-col
              span="24"
              v-cloak
              class="mb15"
              :key="inx"
              v-for="(item, inx) in listArr.slice(9, 11)"
              @click="toGo(item.url)"
            >
              <van-row class="just-list h60 box-shadow">
                <van-col span="6" class="just-list">
                  <i class="van-icon van-grid-item__icon just-list  f50"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="14">
                  <span class="van-grid-item__text">{{ item.title }}</span>
                </van-col>
                <van-col span="4" class="just-list">
                  <van-icon class="f22" name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="办事进度">
          <van-row gutter="15" v-if="active == 3">
            <van-col
              span="24"
              v-cloak
              class="mb15"
              :key="i"
              v-for="(item, i) in ProgressArr"
              @click="toProgress(item)"
            >
              <van-row class="just-list h60 box-shadow">
                <van-col span="6" class="just-list">
                  <i class="van-icon van-grid-item__icon just-list  f50"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="14">
                  <span class="van-grid-item__text">{{ item.title }}</span>
                </van-col>
                <van-col span="4" class="just-list">
                  <van-icon class="f22" name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  filters: {
    money(val) {
      val = val.toString().replace(/\$|,/g, '')
      if (isNaN(val)) {
        val = '0'
      }
      let sign = val == (val = Math.abs(val))
      val = Math.floor(val * 100 + 0.50000000001)
      let cents = val % 100
      val = Math.floor(val / 100).toString()
      if (cents < 10) {
        cents = '0' + cents
      }
      for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val =
          val.substring(0, val.length - (4 * i + 3)) +
          ',' +
          val.substring(val.length - (4 * i + 3))
      }

      return (sign ? '' : '-') + val + '.' + cents
    },
    dateFormat(t) {
      if (t === null || t === '') {
        return ''
      }
      let arr = t.split('-')
      return arr[0] + '年' + arr[1] + '月'
    },
  },
  data() {
    return {
      showChild: -1,
      active: 0,
      code: 2,
      priceShow: false,
      banner: require('@/assets/images/banner-home.png'),
      eye: require('@/assets/images/eye.png'),
      baomi: require('@/assets/images/baomi.png'),
      showAddr: false, // 切换参保地
      userItem: [], // 城镇养老多条
      // 参保地
      addrArr: [],
      cz_ly: {
        // 默认显示第一条城镇养老信息
        addr: '',
        balance: '',
        type: '',
        time: '',
        type_name: '',
        url: '',
        name: '',
      },
      userInfo: {},
      ProgressArr: [
        {
          title: '正在办理',
          ionic: require('@/assets/images/2229.png'),
          url: '/progress',
          active: '0',
        },
        {
          title: '完成办理',
          ionic: require('@/assets/images/2230.png'),
          url: '/progress',
          active: '1',
        },
      ],
      // 社保业务查询
      ddsArr: [
        {
          title: '综合查询',
          ionic: require('@/assets/images/2217.png'),
          children: [
            {
              title: '基本信息查询',
              url: '/info',
            },
            {
              title: '社保证明查询',
              url: '/prove',
            },
            {
              title: '个人权益单查询',
              url: '/rights',
            },
            {
              title: '参保信息查询',
              url: '/Insured',
            },
            {
              title: '转移综合查询',
              url: '/transfer',
            },
            {
              title: '电子票据查询',
              url: '/bill',
            },
            {
              title: '缴费信息查询',
              url: '/pay-query',
            },
          ],
        },
        {
          title: '城镇职工养老信息查询',
          ionic: require('@/assets/images/2218.png'),
          children: [
            {
              title: '城镇职工养老信息查询',
              url: '/pension',
            },
            {
              title: '城镇职工养老待遇支付信息查询',
              url: '/paymentDetails',
            },
          ],
        },
        {
          title: '机关养老保险',
          ionic: require('@/assets/images/2219.png'),
          children: [
            {
              title: '机关养老账户信息查询',
              url: '/pensionInfo',
            },
            {
              title: '机关养老缴费信息查询',
              url: '/pensionPay',
            },
          ],
        },
        {
          title: '失业保险',
          ionic: require('@/assets/images/2220.png'),
          children: [
            {
              title: '失业保险待遇支付查询',
              url: '/treatmentPay',
            },
          ],
        },
        {
          title: '工伤保险',
          ionic: require('@/assets/images/2222.png'),
          children: [
            {
              title: '工伤待遇支付信息查询',
              url: '/unemploymentPay',
            },
            {
              title: '工伤认定信息查询',
              url: '/cognizance',
            },
          ],
        },
      ],
      listArr: [
        // 社保业务查询
        {
          title: '基本信息查询',
          ionic: require('@/assets/images/1.png'),
          url: '/info',
        },
        {
          title: '社保证明查询',
          ionic: require('@/assets/images/2.png'),
          url: '/prove',
        },
        {
          title: '个人权益单查询',
          ionic: require('@/assets/images/3.png'),
          url: '/rights',
        },
        {
          title: '城镇职工养老信息查询',
          ionic: require('@/assets/images/4.png'),
          url: '/pension',
        },
        {
          title: '参保信息查询',
          ionic: require('@/assets/images/41.png'),
          url: '/Insured',
        },
        {
          title: '转移综合查询',
          ionic: require('@/assets/images/42.png'),
          url: '/transfer',
        },
        {
          title: '电子票据查询',
          ionic: require('@/assets/images/43.png'),
          url: '/bill',
        },
        // 社保卡查询
        {
          title: '社会保障卡应用状态查询',
          ionic: require('@/assets/images/5.png'),
          url: '/card',
        },
        {
          title: '社会保障卡进度查询',
          ionic: require('@/assets/images/6.png'),
          url: '/pace',
        },
        // 电子证书
        {
          title: '职称电子证书查询',
          ionic: require('@/assets/images/7.png'),
          url: '/titlePdf',
        },
        {
          title: '职业技能证书查询',
          ionic: require('@/assets/images/8.png'),
          url: '/licensePdf',
        },
      ],
      yl_info: {
        error: '0',
        code: '3',
        msg: '',
        data: {
          error: '0',
          code: '3',
          msg: '',
          data: {
            socialInfo: {
              jg: {
                addr_code: '',
                addr: '',
                list: {
                  addr: null,
                  balance: '',
                  type: '',
                  time: '',
                  type_name: '',
                  url: '',
                  name: '',
                },
              },
              zg: [
                {
                  addr_code: '',
                  addr: '',
                  list: {
                    addr: '',
                    balance: '',
                    type: '',
                    time: '',
                    type_name: '',
                    url: '',
                    name: '',
                  },
                },
                {
                  addr_code: '',
                  addr: '',
                  list: {
                    addr: '',
                    balance: '',
                    type: '',
                    time: '',
                    type_name: '',
                    url: '',
                    name: '',
                  },
                },
              ],
            },
          },
        },
      },
    }
  },
  created() {
    let active = localStorage.getItem('active')
    if (active) {
      this.active = JSON.parse(active)
    }
    let showChild = localStorage.getItem('showChild')
    showChild ? (this.showChild = JSON.parse(showChild)) : (this.showChild = -1)
    this.priceShow = JSON.parse(localStorage.getItem('priceShow'))
    if (this.priceShow === null) {
      this.priceShow = true
    }
  },
  async mounted() {
    //将要给原生调用的方法挂载到 window 上面
    window.getDataFromNative = this.getDataFromNative
    // this.getDataFromNative(
    //   JSON.stringify({
    //     appid: 'hztest',
    //     datetime: new Date().getTime(),
    //     idcard: '450981199211065827',
    //     sign: '2ec1e862b0635ad5408ffb79d0cc62d6',
    //     username: '卢俊桦',
    //   })
    // )

    // console.log(this.$store.state.action)
    let code = this.getUrlCode().code
    let state = this.getUrlCode().state
    let client = this.getUrlCode().client
    if (code && state && client && this.$store.state.action === 0) {
      let params = new FormData()
      params.append('code', code)
      params.append('state', state)
      params.append('client', client)

      let { data } = await this.$http.fromLoader(
        '/gxrswx/Authopen/getToken',
        params
      )
      // this.$dialog({ message: JSON.stringify(data) })
      if (data.code === 0) {
        this.$store.commit('edit', 1)
        this.$token.setISess('token', data.data.token)
        this.getUserinfo()
        this.getAddress()
      } else {
        this.$dialog({ message: data.msg })
      }
    }

    // let user = JSON.parse(localStorage.getItem('info'))
    // user ? this.infoItem(user) : ''
    let user = Object.keys(this.$store.state.obj).length
    user ? this.infoItem(this.$store.state.obj) : ''
    console.log(this.$store.state.addr)
    // let address = JSON.parse(localStorage.getItem('address'))
    let address = Object.keys(this.$store.state.addr).length
    address ? (this.addrArr = this.$store.state.addr) : ''
  },
  methods: {
    getDataFromNative(params) {
      // params:原生调用Vue时传值（params）给Vue
      // console.log('得到原生传值结果:' + params)
      // this.$dialog({ message: params })
      this.$token.getToken(params).then(() => {
        if (sessionStorage.getItem('token')) {
          this.getUserinfo()
          this.getAddress()
        }

        // return code //回调给原生，可写可不
      })

      // alert(params)
    },
    // 截取地址栏参数
    getUrlCode() {
      let url = location.search
      let theRequest = {}
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      }
      return theRequest
    },
    /**
     * 获取参保地
     */
    async getAddress() {
      let _this = this

      _this.$http.postJson('/api/appweb/Personal/addrList', {}, async res => {
        // _this.$dialog({ message: JSON.stringify(res.data) })
        if (res.data.code === 0) {
          // 地区
          _this.addrArr = res.data.data.list.map(v => {
            return {
              text: v.name,
              code: v.code,
            }
          })
          _this.$store.commit('onAddr', _this.addrArr)
          _this.$token.setISess('address', JSON.stringify(_this.addrArr))
        } else if (res.data.code === 1004 || res.data.code === 3000) {
          // this.$dialog.alert({
          //   message: res.data.msg,
          // })
          console.log(res.data.msg)
        } else {
          _this.$toast({ message: '数据异常', duration: 3 })
        }
      })
    },

    ontab(name) {
      this.setItem('active', JSON.stringify(name))
    },
    // 参保地区选择
    onAddr(url) {
      this.addrArr.length > 1 ? (this.showAddr = true) : this.toGo(url)
      event.stopPropagation()
    },
    //
    onConfirm(value) {
      this.showAddr = false
      this.userItem.forEach(val => {
        if (value.code === val.addr_code) {
          this.cz_ly = val.list
          // 城镇
          this.cz_ly.price = this.cz_ly.balance.replace('.', '')
          this.cz_ly.price = this.plusXing(this.cz_ly.price)
        }
      })
    },
    // 获取社保卡信息
    getUserinfo() {
      let that = this
      that.$http.postJson('/api/appweb/Personal/indexAnnuityInfo', {}, res => {
        if (res.data.code === 0) {
          // let item = JSON.parse(this.yl_info)
          console.log(res.data.data)
          let item = res.data.data
          that.$store.commit('onStr', item)
          let userItem = JSON.stringify(item)
          that.$token.setISess('info', userItem)
          that.infoItem(item)
          // console.log(item)
        } else {
          that.$dialog({ message: res.data.msg })
        }
      })
    },
    infoItem(item) {
      let that = this
      if (item.code === 3) {
        that.code = item.code
        // 机关养老
        if (Object.keys(item.socialInfo.jg).length === 0) {
          that.userInfo = {}
        } else {
          that.userInfo = item.socialInfo.jg.list
          // console.log(that.userInfo)
          // 机关
          this.userInfo.price = this.userInfo.balance.replace('.', '')
          this.userInfo.price = this.plusXing(this.userInfo.price)
        }

        // 城镇养老
        that.userItem = item.socialInfo.zg
        if (that.userItem.length !== 0) {
          that.cz_ly = item.socialInfo.zg[0].list
          // 城镇
          this.cz_ly.price = this.cz_ly.balance.replace('.', '')
          this.cz_ly.price = this.plusXing(this.cz_ly.price)
          // that.cz_ly.price = that.plusXing(that.cz_ly.balance)
          // 地区
          // that.addrArr = item.socialInfo.zg.map(v => {
          //   return {
          //     text: v.addr,
          //     code: v.addr_code,
          //   }
          // })
          // that.$token.setToken('address', JSON.stringify(that.addrArr))
        }
      }
      // if (
      //   Object.keys(item.socialInfo.jg).length === 0 &&
      //   item.socialInfo.zg.length === 0
      // ) {
      //   that.code = 2
      // }
      if (item.code === 1) {
        that.code = item.code
        that.binding = item.socialInfo.url
      }
      if (item.code === 2) {
        that.code = item.code
        that.$token.setToken('address', JSON.stringify(that.addrArr))
      }
    },
    // 格式化金额星号
    plusXing(str) {
      var xing = ''
      for (var i = 0; i < str.length; i++) {
        xing += '*'
      }
      return xing
    },
    // 显示隐藏金额
    eyeBtn() {
      event.stopPropagation()
      this.priceShow = !this.priceShow
      this.setItem('priceShow', this.priceShow)
    },
    setItem(key, value) {
      localStorage.setItem(key, value)
    },
    toGo(url) {
      this.$router.push(url)
    },
    toProgress(item) {
      this.$router.push({
        name: 'Progress',
        query: {
          id: item.active,
        },
      })
    },
    go(url) {
      window.location.href = url
    },
    showNext(index) {
      if (index != this.showChild) {
        this.showChild = index
      } else {
        this.showChild = -1
      }
      this.setItem('showChild', this.showChild)
    },
  },
}
</script>

<style>
.my-box {
  position: relative;
  margin-top: -235px;
  padding-top: 30px;
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.my-box .home-list {
  padding: 30px;
  background-color: unset;
}

.my-box .head-o {
  height: 240px;
  box-shadow: 0 0 13px rgba(40, 125, 226, 0.35);
  border-radius: 16px;
  padding: 40px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.my-box .head-o.bg {
  background-image: url('../../assets/images/home-bg1.png');
  background-size: cover;
}

.my-box .head-o.bg2 {
  background-image: url('../../assets/images/home-bg2.png');
  background-size: cover;
}

.my-box .head-o.bg3 {
  background-image: url('../../assets/images/home-bg3.png');
  background-size: cover;
}

.my-box .head-o .home-title {
  font-size: 48px;
  color: #feffff;
  padding-bottom: 24px;
}

.my-box .head-o .home-details {
  font-size: 24px;
  color: #feffff;
  padding-bottom: 24px;
}

.my-box .head-o .home-btn {
  background-color: #fff;
  color: #287de2;
  font-size: 26px;
  border-radius: 16px;
  font-weight: 800;
}

.my-box .head-o .home-user {
  line-height: 42px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
}

.my-box .head-o .home-address {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
}

.my-box .head-o .home-name {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
  padding-bottom: 20px;
}

.my-box .head-o .home-price {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.my-box .head-o .home-price i {
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-box .head-o .home-date {
  line-height: 42px;
  font-size: 30px;
  color: #fff;
  padding-bottom: 20px;
  text-align: right;
}

.my-box .head-o .home-time {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
}

.my-box .head-o .home-nodata {
  line-height: 42px;
  font-size: 30px;
  color: #fff;
  padding-bottom: 20px;
}

.home .van-swipe__indicator {
  background-color: #7db1ee;
}

.home .van-swipe__indicator--active {
  background-color: #1989fa;
  padding: 0px 5px;
  opacity: 1;
  border-radius: 8px;
}

.home .van-swipe__indicators {
  bottom: 70px;
}

.my-box .head-o .van-grid-item__content {
  padding: 0.085rem 0.08rem;
}

.text-align-right {
  text-align: right;
}

.mt10 {
  margin-top: 20px;
}

.ml5 {
  margin-left: 10px;
}

.pt10 {
  padding-top: 20px;
}

.pb10 {
  padding-bottom: 20px;
}

.pb18 {
  padding-bottom: 36px;
}

.mb10 {
  margin-bottom: 20px;
}

.mb15 {
  margin-bottom: 40px;
}
.f22 {
  font-size: 44px;
}

.mb20 {
  margin-bottom: 40px;
}

.fw {
  font-weight: bold;
}

.f18 {
  font-size: 36px;
}

.f14 {
  font-size: 28px;
}

.c-blue {
  color: #2d63a9;
}

.f15 {
  font-size: 30px;
}

.box-shadow {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 25px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  position: relative;
  z-index: 6;
}
.bg-w {
  background-color: #fff;
}

.h75 {
  height: 150px;
}

.p10 {
  padding: 20px;
}

.p15 {
  padding: 30px;
}

.pl10 {
  padding-left: 20px;
}

.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

.sep-icon {
  max-width: 100%;
  width: 60px;
  height: 60px;
  display: -webkit-box;
  -webkit-box-pack: center;
}

.item-title_text {
  display: block;
  position: relative;
  padding: 0 30px;
  text-indent: 24px;
  color: #111111;
  font-size: 30px;
  font-weight: bold;
}

.item-title_text:before {
  content: '';
  position: absolute;
  top: 0;
  background-color: #287de2;
  width: 11px;
  height: 30px;
  border-radius: 0.055rem;
  left: 60px;
}

.home .van-grid-item__text {
  color: #333333;
  font-size: 30px;
  word-wrap: break-word;
  text-align: left;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-pack: start;
}

.home .public-nav .van-grid-item__text {
  font-size: 14px;
}

.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.list-box {
  padding-top: 40px;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 20px;
}

.list-details {
  font-size: 24px;
  color: #2d63a9;
}

.list-img {
  max-width: 100%;
  height: auto;
  display: block;
}

.home .h3 {
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  padding-bottom: 20px;
}

.home .p {
  font-size: 24px;
  font-weight: 500;
  color: #666666;
}

.text-middle {
  display: -webkit-box;
  -webkit-box-pack: center;
}

.erweima {
  width: 60px;
  margin-top: -25px;
  position: relative;
  z-index: 9;
}

.home .van-tabbar {
  height: 70px;
}

.home .van-tabbar-item {
  color: #666666;
  font-size: 24px;
}

.home .van-tabbar-item--active {
  color: #2d63a9;
}

.home .van-tabbar {
  background-color: #f8f8f8;
}

.home .van-hairline--top-bottom::after,
.home .van-hairline-unset--top-bottom::after {
  border-width: 0;
}

.sepMan {
  position: relative;
  height: 0.765rem;
  z-index: 0;
}

.sep-img {
  height: 0.825rem;
  display: -webkit-box;
  -webkit-box-pack: center;
  position: absolute;
  bottom: 0px;
  z-index: 0;
  right: 10px;
}

.text-nav .van-tabbar-item__icon img {
  display: block;
  height: 22px;
}

.erweima-nav .van-tabbar-item__icon img {
  display: block;
  height: auto;
}
.home .van-grid-item__content {
  background-color: #fdfeff;
}

/*home-tab*/
.home-tab .van-tab__pane {
  padding: 50px 40px;
}
.f50 {
  font-size: 50px;
}
.f30 {
  font-size: 30px;
}
.home-tab .van-tabs__line {
  height: 12px;
  width: 60px !important;
}
.home-tab .van-tab {
  color: #666666;
  font-size: 28px;
  font-weight: 500;
}
.home-tab .van-tab--active {
  font-size: 30px;
  color: #111111;
  font-weight: bold;
}
/* .home-tab .van-tab__text--ellipsis {
  overflow: inherit;
} */
.my-box .van-tabs__nav {
  background-color: #f3f8fd;
}
.banner-sel {
  padding: 0.3rem;
}
.f21 {
  font-size: 42px;
}
.showchild {
  display: none;
}
.h60 {
  height: 120px;
}

.border-bottom {
  border-bottom: #c3c3c3 2px dashed;
}
.plr50 {
  padding: 0 50px;
}
.plr50:last-child > div {
  border-bottom: 0;
}
.pl10 {
  padding-left: 20px;
}
</style>
