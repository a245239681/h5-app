<template>
  <div class="prove-list payment-details">
    <van-skeleton :row="6" :loading="loading">
      <div class="info-titles">
        <van-row class="just-start">
          <van-col span="12" class="just-start"
            ><span
              class="just-list"
              @click="
                if (addressArr.length > 1) {
                  show = true
                }
              "
              >参保地: <span class="fc">{{ yab139.text }}</span>
              <van-icon name="arrow-down" v-show="addressArr.length > 1" />
            </span>
          </van-col>
          <van-col span="12" class="just-end"
            ><span class="just-list" @click="showTime = true"
              >年份: <span class="fc">{{ year }}</span>
              <van-icon name="arrow-down" />
            </span>
          </van-col>
        </van-row>
      </div>
      <div v-for="(item, inx) in list" :key="inx" v-show="showTips === false">
        <div class="list-date fw">{{ item.dateTime }}</div>
        <van-cell-group v-for="(items, i) in item.item" :key="i">
          <van-cell :title="items.bae419" :value="items.aae010" />
          <van-cell title="本月发放工伤待遇" :value="items.aic263 + '元'" />
          <van-cell title="实付年月" :value="items.aae002_desc" />
        </van-cell-group>
      </div>
      <div v-show="showTips === true">
        <Nodata :psMsg="tip"></Nodata>
      </div>
    </van-skeleton>
    <!-- 年份 -->
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
    <!-- 参保地 -->
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :columns="addressArr"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import Nodata from '@/components/nodata'
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

      return '￥' + (sign ? '' : '-') + val + '.' + cents
    },
    dateFormat(t) {
      if (t === null || t === '') {
        return ''
      }
      let y = t.slice(0, 4)
      let m = t.slice(4)
      return y + '年' + m + '月'
    },
  },
  data() {
    return {
      /**
       * 是否加载数据中
       */
      loading: true,
      list: [],
      yab139: {
        text: '',
        value: '',
      },
      addressArr: [], // 参保地址
      year: '2020',
      timeCode: '2020',
      showTime: false,
      show: false,
      minDate: new Date(2000, 0, 1), // 最小时间
      maxDate: new Date(2025, 10, 1), // 最大时间
      currentDate: new Date(), // 默认选中时间
      showTips: false,
      tip: '暂无数据',
    }
  },
  created() {
    this.getAddress()
  },
  components: {
    Nodata,
  },
  methods: {
    /**
     * 切换地区
     */
    onConfirm(value) {
      this.yab139 = value
      this.show = false
      this.getList()
    },
    // 年度
    timeConfirm(date) {
      this.year = this.filterTime(date)
      this.timeCode = date.getFullYear()
      this.showTime = false
      this.getList()
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
    async getAddress() {
      let _this = this
      let address = Object.keys(_this.$store.state.addr).length
      address ? (_this.addressArr = _this.$store.state.addr) : ''
      _this.addressArr.length !== 0 ? (_this.yab139 = _this.addressArr[0]) : ''
      _this.loading = false
      _this.addressArr.length === 0 ? (_this.showTips = true) : _this.getList()
      // console.log(_this.showTips)
    },
    /**
     * 失业保险待遇支付查询
     */
    getList() {
      let that = this
      let data = {
        yab139: this.yab139.code,
        year: that.timeCode,
      }
      that.$http.postJson('/api/appweb/Personal/injuryTrea', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          that.list = res.data.data.list
          that.contentLoad = false
          that.showTips = false
        } else if (res.data.code === 1004) {
          that.showTips = true
        } else if (res.data.code === 3000) {
          that.showTips = true
          // that.$dialog.alert({
          //   message: res.data.msg,
          // })
        } else {
          that.$toast('数据异常')
        }
      })
    },
  },
}
</script>

<style>
.prove-list .list-date {
  padding: 0 30px;
  line-height: 78px;
  color: #666666;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-title {
  font-size: 30px;
  font-weight: bold;
  color: #111111;
}
.prove-list .list-type {
  padding: 5px;
  border-radius: 10px;
  border: solid 2px #4186fb;
  color: #4186fb;
  font-size: 24px;
}
.payment.h40 {
  min-height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #eeeeee;
}
.f-grey {
  color: #666666;
  font-size: 30px;
  font-weight: 500;
}
.f-black {
  color: #111111;
  font-size: 30px;
  font-weight: 500;
}
.prove-list .info-titles {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
}
.just-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fw {
  font-weight: bold;
}
.month-details {
  color: #666666;
  font-size: 26px;
  line-height: 27px;
  padding: 0 30px 30px 30px;
}
.payment-details .van-cell-group:not(:last-child) {
  margin-bottom: 20px;
}
.payment-details .van-cell__value {
  color: #333333;
  font-size: 30px;
  font-weight: bold;
}
.payment-details .van-cell__title {
  font-size: 30px;
  color: #666666;
  font-weight: 500;
}
</style>
