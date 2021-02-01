<template>
  <div class="prove">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        input-align="right"
        label="参保地"
        placeholder="请选择参保地"
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
        label="参保险种"
        placeholder="请选择参保险种"
        is-link
        @click="showCoverage = true"
        name="coverage"
        v-model="coverage.text"
      />
      <van-popup v-model="showCoverage" position="bottom">
        <van-picker
          show-toolbar
          :columns="coverageArr"
          @cancel="showCoverage = false"
          @confirm="coverageConfirm"
        />
      </van-popup>
      <van-field
        readonly
        input-align="right"
        label="开始时间"
        placeholder="请选择开始时间"
        is-link
        @click="showStartTime = true"
        name="startTime"
        v-model="startTime.text"
      />
      <van-popup v-model="showStartTime" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="startTimeConfirm"
          @cancel="showStartTime = false"
        />
      </van-popup>
      <van-field
        readonly
        input-align="right"
        label="结束时间"
        placeholder="请选择结束时间"
        is-link
        @click="showEndTime = true"
        name="endTime"
        v-model="endTime.text"
      />
      <van-popup v-model="showEndTime" position="bottom">
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="endTimeConfirm"
          @cancel="showEndTime = false"
        />
      </van-popup>
      <!-- <div class="p44">
        <span class="tips-color">温馨提示:</span>
        <span class="ml5">险种欠费情况下无法查看证明。</span>
      </div> -->
      <div class="sub-btn">
        <van-button
          native-type="submit"
          class="button-large"
          :disabled="isDisable"
          color="#287DE2"
          size="large"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMechanism: false,
      showCoverage: false,
      showStartTime: false,
      showEndTime: false,
      mechanism: { text: '', code: '' }, // 参保地
      coverage: { text: '全部', value: '0' }, // 参保险种
      startTime: { text: '', value: '' }, // 开始时间
      endTime: { text: '', value: '' }, // 结束时间
      // 参保地数据
      mechanismArr: [],
      coverageArr: [
        { text: '全部', value: '0' },
        { text: '企业职工养老', value: '110' },
        { text: '失业保险', value: '210' },
        { text: '工伤保险', value: '410' },
      ],
      minDate: new Date(1997, 0, 1), // 最小时间
      maxDate: new Date(2025, 10, 1), // 最大时间
      currentDate: this.getPreMonth(this.getNowFormatDate()), // 默认选中时间
      isDisable: false,
    }
  },
  created() {
    this.$token.getToken().then(res => {
      if (res) {
        this.getAddress()
      }
    })
  },
  methods: {
    // 参保地选择
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
    },
    // 参保险种
    coverageConfirm(value) {
      this.coverage = value
      this.showCoverage = false
    },
    startTimeConfirm(date) {
      this.startTime.text = this.filterTime(date)
      this.startTime.value = this.filterdate(date)
      this.showStartTime = false
    },
    // 结束时间选择
    endTimeConfirm(date) {
      this.endTime.text = this.filterTime(date)
      this.endTime.value = this.filterdate(date)
      this.showEndTime = false
    },
    // 时间处理成x年x月
    filterTime(date) {
      let y = date.getFullYear() // 年
      let MM = date.getMonth() + 1 // 月
      MM = MM < 10 ? '0' + MM : MM

      return y + '年' + MM + '月'
    },
    // 时间处理成202012
    filterdate(date) {
      let y = date.getFullYear() // 年
      let MM = date.getMonth() + 1 // 月
      MM = MM < 10 ? '0' + MM : MM

      return y + '' + MM
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
    /**
     * 获取当前时间的上个月
     */
    getPreMonth(date) {
      let arr = date.split('-')
      let year = arr[0] //获取当前日期的年份
      let month = arr[1] //获取当前日期的月份
      let day = arr[2] //获取当前日期的日
      let year2 = year
      let month2 = parseInt(month) - 1
      if (month2 == 0) {
        year2 = parseInt(year2) - 1
        month2 = 12
      }
      let day2 = day
      let days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      console.log(111)
      let t2 = year2 + '-' + month2 + '-' + day2
      return new Date(t2)
    },
    /**
     * 获取当前时间 并且转化成yy-mm-dd格式
     */
    getNowFormatDate() {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    onSubmit() {
      let _this = this
      let model = {
        /**
         * 参保地
         */
        yab139: this.mechanism.code,
        /**
         * 	险种
         */
        aae140: this.coverage.value,
        /**
         * 开始年月
         */
        aae041: this.startTime.value,
        /**
         * 结束年月
         */
        aae042: this.endTime.value,
      }
      if (model.yab139 === '') {
        this.$toast('请选择参保地')
        return
      }
      if (model.aae041 === '') {
        this.$toast('请选择开始时间')
        return
      }
      if (model.aae042 === '') {
        this.$toast('请选择结束时间')
        return
      }
      _this.$http.postJson('/api/appweb/Personal/socialPayInfo', model, res => {
        if (res.data.code === 0) {
          let list = JSON.stringify(res.data.data.list)
          _this.$token.setToken('list', list)
          _this.$router.push({
            name: 'PayList',
            // query: {
            //   data: list,
            // },
          })
        }
        if (res.data.code === 3000) {
          setTimeout(() => {
            _this.$toast(res.data.msg)
          }, 1000)
        }
        if (res.data.code === 1001 || res.data.code === 1002) {
          localStorage.removeItem('address')
          localStorage.removeItem('XX-Token')
          _this.$token.getToken().then(res => {
            if (res) {
              _this.getAddress()
            }
          })
        }
        if (res.data.code === 1004) {
          this.$dialog.alert({
            message: res.data.msg,
          })
        }
      })
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
