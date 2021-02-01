<template>
  <div class="info">
    <div class="info-title">
      <van-row>
        <van-col span="24"> 缴费详情</van-col>
      </van-row>
    </div>
    <van-skeleton title avatar :row="6" :loading="contentLoad">
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">费款所属年月</van-col>
          <van-col span="16" class="input-list">{{
            info.aae003 | dateFormat
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">参保险种</van-col>
          <van-col span="16" class="input-list">{{ info.aae140 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位缴</van-col>
          <van-col span="16" class="input-list">{{
            info.aae020 | money
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位缴费标志</van-col>
          <van-col span="16" class="input-list">{{ info.bae152 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">个人缴</van-col>
          <van-col span="16" class="input-list">{{
            info.aae022 | money
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">个人缴费标志</van-col>
          <van-col span="16" class="input-list">{{ info.bae153 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">划入个账金额</van-col>
          <van-col span="16" class="input-list">{{
            info.aae083 | money
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位划入个账</van-col>
          <van-col span="16" class="input-list">{{
            info.bke105 | money
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">费款年月</van-col>
          <van-col span="16" class="input-list">{{
            info.aae002 | dateFormat
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位名称</van-col>
          <van-col span="16" class="input-list">{{ info.aab004 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位编号</van-col>
          <van-col span="16" class="input-list">{{ info.aab001 }}</van-col>
        </van-row>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
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
      contentLoad: true, // 数据是否加载中
      info: {
        /**
         * 个人缴
         */
        aae022: '',
        /**
         * 单位缴
         */
        aae020: '',
        /**
         * 险种
         */
        aae140: '',
        /**
         * 单位编号
         */
        aab001: '',
        /**
         * 费款所属年月
         */
        aae003: '',
        /**
         * 费款年月
         */
        aae002: '',
        /**
         * 单位缴费标志代码
         */
        bae152: '',
        /**
         * 个人缴费标志代码
         */
        bae153: '',
        /**
         * 划入个人账户金额
         */
        aae083: '',
        /**
         * 基数
         */
        aae180: '',
        /**
         * 单位部分划个帐
         */
        bke105: '',
        /**
         * 单位名称
         */
        aab004: '',
      },
    }
  },
  async created() {
    let details = JSON.parse(this.$route.query.details)

    if (details !== 'undefined' && details !== 'null' && details !== '') {
      this.info = details.info
      // console.log(details)
      this.contentLoad = false
    }
  },
  methods: {},
}
</script>

<style>
.info-title {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
}
.info-content {
  padding: 0 30px;
  background-color: #fff;
}
.lable-title {
  color: #666666;
  font-weight: 500;
}
.info-text {
  text-align: left;
  font-size: 30px;
  padding: 30px 0;
  border-bottom: 2px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
}
.info-text .input-list {
  color: #333333;
  font-weight: bold;
  text-align: right;
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
.fc {
  color: #111111;
}
</style>
