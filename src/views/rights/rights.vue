<template>
  <div class="prove">
    <!-- <van-nav-bar left-arrow title="个人权益单" @click-left="back" /> -->
    <van-form @submit="onSubmit" v-show="showTips === false">
      <!-- <van-field
        input-align="right"
        label="姓名"
        placeholder="请输入姓名"
        name="username"
        v-model="username"
      /> -->
      <van-field
        readonly
        input-align="right"
        label="参保机构"
        placeholder="请选择参保机构"
        is-link
        @click="showMechanism = true"
        name="mechanism"
        v-model="mechanism.text"
      />
      <van-popup v-model="showMechanism" position="bottom">
        <van-picker
          show-toolbar
          :columns="mechanismArr"
          @cancel="showMechanism = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-field
        readonly
        input-align="right"
        label="查询年度"
        placeholder="请选择查询年度"
        is-link
        @click="showTime = true"
        name="time"
        v-model="time"
      />
      <van-popup v-model="showTime" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="timeConfirm"
          @cancel="showTime = false"
        />
      </van-popup>
      <div class="p44">
        <span class="tips-color">温馨提示:</span>
        <span class="ml5">
          险种欠费情况下无法查看权益单。
        </span>
      </div>
      <div class="sub-btn">
        <van-button
          native-type="submit"
          class="button-large"
          color="#287DE2"
          size="large"
          >提交</van-button
        >
      </div>
    </van-form>
    <div v-show="showTips === true">
      <Nodata :psMsg="tip"></Nodata>
    </div>
  </div>
</template>

<script>
import Nodata from '@/components/nodata'
export default {
  data() {
    return {
      showMechanism: false,
      showTime: false,
      username: '', // 姓名
      mechanism: { text: '', code: '' }, // 参保地
      time: '', // 查询年度
      // 机构数据
      mechanismArr: [],
      minDate: new Date(2000, 0, 1), // 最小时间
      maxDate: new Date(2025, 10, 1), // 最大时间
      currentDate: new Date(), // 默认选中时间
      timeCode: '',
      showTips: false,
      tip: '暂无参保数据',
    }
  },
  components: {
    Nodata,
  },
  created() {
    this.getAddress()
  },
  methods: {
    back() {
      this.$router.go(-1) //返回上一层
    },
    // 参保机构选择
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
    },
    // 年度
    timeConfirm(date) {
      this.time = this.filterTime(date)
      this.timeCode = date.getFullYear()
      this.showTime = false
    },
    // 时间处理成x年x月
    filterTime(date) {
      let y = date.getFullYear() // 年

      return y + '年'
    },
    // 格式化时间选择格式
    formatter(type, val) {
      if (type === 'year') {
        return `${val}年`
      } else if (type === 'month') {
        return `${val}月`
      }
      return val
    },
    /**
     * 获取参保地
     */
    async getAddress() {
      let _this = this
      let address = Object.keys(_this.$store.state.addr).length
      address ? (_this.mechanismArr = _this.$store.state.addr) : ''
      _this.mechanismArr.length !== 0
        ? (_this.mechanism = _this.mechanismArr[0])
        : ''
      _this.loading = false
      _this.mechanismArr.length === 0 ? (_this.showTips = true) : ''
    },
    onSubmit() {
      let _this = this
      let model = {
        /**
         * 参保地
         */
        yab139: _this.mechanism.code,
        /**
         * 年度
         */
        aae001: _this.timeCode,
      }
      if (model.yab139 === '') {
        this.$toast('请选择参保机构')
        return
      }
      if (model.aae001 === '') {
        this.$toast('请选择查询年度')
        return
      }
      _this.$http.postJson(
        '/api/appweb/Personal/socialInterestsBase64',
        model,
        res => {
          if (res.data.code === 0) {
            let pdf = JSON.stringify(res.data.data.pdf)
            _this.$token.setToken('rights', pdf)
            localStorage.removeItem('timer')
            // window.location.href = 'https://h5app-gxrswx.healthan.net/rightsPdf'
            _this.$router.push({
              name: 'Rightspdf',
            })
          }
          if (res.data.code === 3000) {
            setTimeout(() => {
              _this.$toast(res.data.msg)
            }, 1000)
          }
          if (res.data.code === 1004) {
            this.$dialog.alert({
              message: res.data.msg,
            })
          }
        }
      )
    },
  },
}
</script>

<style>
.p44 {
  padding: 44px 31px;
  font-size: 24px;
  color: #666666;
}
.tips-color {
  color: #f45936;
}
.ml5 {
  margin-left: 10px;
}
.prove .sub-btn {
  padding: 103px 30px 30px 30px;
}
.prove .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.prove .van-cell {
  padding: 26px 32px;
  font-size: 30px;
  color: #666666;
}
</style>
