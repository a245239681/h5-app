<template>
  <div class="info">
    <!-- <van-nav-bar left-arrow title="基本信息查询" @click-left="back" /> -->
    <div v-show="showTips === false">
      <div class="info-title">
        <van-row>
          <van-col span="6"> 基本信息</van-col>
          <van-col span="18" class="just-end"
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
        </van-row>
      </div>
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">证件号码</van-col>
          <van-col span="16" class="input-list">{{ info.aac002 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">姓名</van-col>
          <van-col span="16" class="input-list">{{ info.aac003 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">社保卡号</van-col>
          <van-col span="16" class="input-list">{{ info.aaz500 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">性别</van-col>
          <van-col span="16" class="input-list">{{ info.aac004 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">民族</van-col>
          <van-col span="16" class="input-list">{{ info.aac005 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">出生日期</van-col>
          <van-col span="16" class="input-list">{{ info.aac006 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">个人编号</van-col>
          <van-col span="16" class="input-list">{{ info.aac001 }}</van-col>
        </van-row>
        <!-- <van-row class="info-text">
          <van-col span="8" class="lable-title">医疗人员类别</van-col>
          <van-col span="16" class="input-list">{{ info.akc021 }}</van-col>
        </van-row> -->
        <van-row class="info-text">
          <van-col span="8" class="lable-title">离退休状态</van-col>
          <van-col span="16" class="input-list">{{ info.aac084 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">常驻详细地址</van-col>
          <van-col span="16" class="input-list">{{ info.bab304 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">参加工作</van-col>
          <van-col span="16" class="input-list">{{ info.aac007 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位编号</van-col>
          <van-col span="16" class="input-list">{{ info.aab001 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位名称</van-col>
          <van-col span="16" class="input-list">{{ info.aab004 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">参保状态</van-col>
          <van-col span="16" class="input-list">{{ info.aac031 }}</van-col>
        </van-row>
      </div>
    </div>
    <div v-show="showTips === true">
      <Tips></Tips>
    </div>

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
import Tips from '@/components/tips'
export default {
  filters: {
    formatDate(value) {
      // 时间戳转换日期格式方法
      if (value === null || value === '' || value.length <= 4) {
        return value
      } else {
        let date = new Date(value)
        let y = date.getFullYear() // 年
        let MM = date.getMonth() + 1 // 月
        MM = MM < 10 ? '0' + MM : MM
        let d = date.getDate() // 日
        d = d < 10 ? '0' + d : d
        return y + '-' + MM + '-' + d
      }
    },
  },
  data() {
    return {
      yab139: {
        text: '',
        code: '',
      },
      show: false,
      loading: true, // 数据是否加载中
      contentLoad: true,
      addressArr: [], // 参保地址
      showTips: false, // 是否无数据
      info: {
        /**
         * 养老账户类别
         */
        aae473: '',
        /**
         * 参保状态
         */
        aac031: '',
        /**
         * 医疗人员类别
         */
        akc021: '',
        /**
         * 离退休状态
         */
        aac084: '',
        /**
         * 个人编号
         */
        aac001: '',
        /**
         * 个人身份
         */
        aac012: '',
        /**
         * 身份证号
         */
        aac002: '',
        /**
         * 单位编号
         */
        aab001: '',
        /**
         * 卡状态
         */
        aaz502: '',
        /**
         * 退离休日期
         */
        aic162: '',
        /**
         * 常驻详细地址
         */
        bab304: '',
        /**
         * 社保卡号
         */
        aaz500: '',
        /**
         * 公务员标志
         */
        bac059: '',
        /**
         * 手机号码
         */
        bae017: '',
        /**
         * 民族
         */
        aac005: '',
        /**
         * 单位名称
         */
        aab004: '',
        /**
         * 出生年月
         */
        aac006: '',
        /**
         * 邮政编码
         */
        aae007: '',
        /**
         * 姓名
         */
        aac003: '',
        /**
         * 性别
         */
        aac004: '',
        /**
         * 办公电话
         */
        aae005: '',
        /**
         * 参加工作日期
         */
        aac007: '',
      },
    }
  },
  components: { Tips },
  created() {
    this.getAddress()
  },
  methods: {
    back() {
      this.$router.go(-1) //返回上一层
    },
    /**
     * 切换地区
     */
    onConfirm(value) {
      this.yab139 = value
      this.show = false
      this.getList()
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
     * 获取基本信息
     */
    getList() {
      let that = this
      let data = {
        yab139: this.yab139.code,
      }
      that.$http.postJson('/api/appweb/Personal/personalInfo', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          that.info = res.data.data
          that.contentLoad = false
        } else if (res.data.code === 3000) {
          that.showTips = true
        } else if (res.data.code === 1003) {
          that.$toast(res.data.msg)
        } else if (res.data.code === 1004) {
          that.showTips = true
          that.$toast(res.data.msg)
        } else if (res.data.code === 2000) {
          that.$toast(res.data.msg)
        } else {
          that.$dialog.alert({
            message: res.data.msg,
          })
        }
      })
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
