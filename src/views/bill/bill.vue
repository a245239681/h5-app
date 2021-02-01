<template>
  <div class="prove">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        input-align="right"
        label="查询年度"
        placeholder="请选择查询年度"
        is-link
        @click="showTime = true"
        name="time"
        v-model="time.text"
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
      <van-field
        readonly
        input-align="right"
        label="参保地"
        placeholder="请选择参保地"
        is-link
        @click="onmechan()"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMechanism: false,
      showTime: false,
      username: '', // 姓名
      mechanism: { text: '', code: '' }, // 参保地
      time: { text: '', value: '' }, // // 查询年度
      // 参保地数据
      mechanismArr: [],
      minDate: new Date(2019, 0, 1), // 最小时间
      maxDate: new Date(2025, 10, 1), // 最大时间
      currentDate: new Date(), // 默认选中时间
    }
  },
  created() {
    this.getAddress()
  },
  methods: {
    // 参保机构选择
    onConfirm(value) {
      this.mechanism = value
      this.showMechanism = false
    },
    // 年度
    timeConfirm(date) {
      this.time.text = this.filterTime(date)
      this.time.value = date.getFullYear()
      this.showTime = false
    },
    // 时间处理成x年x月
    filterTime(date) {
      let y = date.getFullYear() // 年

      return y + '年'
    },
    onmechan() {
      this.mechanismArr.length === 0
        ? this.$toast('暂无参保信息')
        : (this.showMechanism = true)
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
    onSubmit() {
      let _this = this
      let model = {
        /**
         * 参保地
         */
        yab139: this.mechanism.code,
        /**
         * 查询年份
         */
        aae041: this.time.value,
      }
      if (model.yab139 === '') {
        this.$toast('请选择参保地')
        return
      }
      if (model.aae041 === '') {
        this.$toast('请选择查询年份')
        return
      }
      _this.$http.postJson('/api/appweb/Invoice/invoiceList', model, res => {
        if (res.data.code === 0) {
          let list = JSON.stringify(res.data.data)
          _this.$token.setToken('bill-list', list)
          _this.$router.push({
            name: 'Billlist',
          })
        } else {
          _this.$dialog({
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
