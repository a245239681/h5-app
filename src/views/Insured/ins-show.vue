<template>
  <div class="info">
    <!-- <van-nav-bar left-arrow title="参保信息详情" @click-left="back" /> -->
    <div class="info-title">
      <van-row>
        <van-col span="24"> 参保详情</van-col>
      </van-row>
    </div>
    <van-skeleton title avatar :row="6" :loading="contentLoad">
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位编号</van-col>
          <van-col span="16" class="input-list">{{ info.aab001 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位名称</van-col>
          <van-col span="16" class="input-list">{{ info.aab004 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">人员编码</van-col>
          <van-col span="16" class="input-list">{{ info.aac001 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">险种类型</van-col>
          <van-col span="16" class="input-list">{{ info.aae140 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">险种名称</van-col>
          <van-col span="16" class="input-list">{{ info.aae141 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">参保状态</van-col>
          <van-col span="16" class="input-list">{{ info.aac031 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">起始年月</van-col>
          <van-col span="16" class="input-list">{{
            info.aae041 | dateFormat
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">截止年月</van-col>
          <van-col span="16" class="input-list">{{
            info.aae042 | dateFormat
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">参保地行政区划</van-col>
          <van-col span="16" class="input-list">{{ info.akc803 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">参保地行政区划名称</van-col>
          <van-col span="16" class="input-list">{{ info.akc804 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">参保地社保经办机构</van-col>
          <van-col span="16" class="input-list">{{ info.aab034 }}</van-col>
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
      if (t === null || t === '' || t.length === 1) {
        return '-'
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
        aac031: '参保状态',
        aae141: '险种名称',
        aae140: '险种',
        aae041: '起始时间',
        akc804: '参保地行政区划名称',
        aac001: '个人编号',
        akc803: '参保地 行政区划代码',
        aab034: '参保地社保经办机构代码',
        aab001: '单位编号',
        aab004: '单位名称',
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
  methods: {
    back() {
      this.$router.go(-1) //返回上一层
    },
  },
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
