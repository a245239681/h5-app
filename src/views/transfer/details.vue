<template>
  <div class="info">
    <div class="info-title">
      <van-row>
        <van-col span="24"> 详情</van-col>
      </van-row>
    </div>
    <van-skeleton title avatar :row="6" :loading="contentLoad">
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">个人编号</van-col>
          <van-col span="16" class="input-list">{{ info.aac001 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">证件号码</van-col>
          <van-col span="16" class="input-list">{{ info.aac002 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">姓名</van-col>
          <van-col span="16" class="input-list">{{ info.aac003 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">
            单位 名称
          </van-col>
          <van-col span="16" class="input-list">{{ info.aab004 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">险种类型</van-col>
          <van-col span="16" class="input-list">{{ info.aae140 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">起始年月</van-col>
          <van-col span="16" class="input-list">{{ info.aae041 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">经办时间</van-col>
          <van-col span="16" class="input-list">{{ info.aae036 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">社保转移方向</van-col>
          <van-col span="16" class="input-list">{{ info.aac070 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">转入单位名称</van-col>
          <van-col span="16" class="input-list">{{ info.aab301 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">转出单位名称</van-col>
          <van-col span="16" class="input-list">{{ info.aab299 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">转移基金总额</van-col>
          <van-col span="16" class="input-list">{{ info.aic102 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">统筹基金转移额</van-col>
          <van-col span="16" class="input-list">{{ info.aic084 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">个人账户基金转移额</van-col>
          <van-col span="16" class="input-list">{{ info.aic083 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">转移地域范围</van-col>
          <van-col span="16" class="input-list">{{ info.aac105 }}</van-col>
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
         * 经办时间
         */
        aae036: '',
        /**
         * 转移基金总额
         */
        aic102: '',
        /**
         * 缴费起止时间
         */
        aae041: '',
        /**
         * 个人编号
         */
        aac001: '',
        /**
         * 身份证
         */
        aac002: '',
        /**
         * 统筹基金转移额
         */
        aic084: '',
        /**
         * 人员参保关系转移ID
         */
        yac132: '',
        /**
         * 个人账户基金转移额
         */
        aic083: '',
        /**
         * 转移方向
         */
        aac070: '',
        /**
         * 单位名称
         */
        aab004: '',
        /**
         * 转入单位名称
         */
        aab301: '',
        /**
         * 转出单位名称
         */
        aab299: '',
        /**
         * 转移地域范围
         */
        aac105: '',
        /**
         * 经办人姓名
         */
        aae414: '',
        /**
         * 姓名
         */
        aac003: '',
        /**
         * 险种
         */
        aae140: '',
      },
    }
  },
  async created() {
    let details = JSON.parse(this.$route.query.details)

    if (details !== 'undefined' && details !== 'null' && details !== '') {
      this.info = details
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
