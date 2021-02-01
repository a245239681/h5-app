<template>
  <div class="info">
    <!-- <van-nav-bar left-arrow title="城镇职工养老信息" @click-left="back" /> -->
    <div v-show="showTips === false">
      <div class="info-title">
        <van-row>
          <van-col span="6"> 养老信息</van-col>
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
          <van-col span="9" class="lable-title">个人编号</van-col>
          <van-col span="15" class="input-list">{{ info.aac001 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="9" class="lable-title">证件号码</van-col>
          <van-col span="15" class="input-list">{{ info.aac002 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="9" class="lable-title">证照持有人姓名</van-col>
          <van-col span="15" class="input-list">{{ info.aac003 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="9" class="lable-title">养老账户类别</van-col>
          <van-col span="15" class="input-list">{{ info.aae473 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="9" class="lable-title">单位编号</van-col>
          <van-col span="15" class="input-list">{{ info.aab001 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="9" class="lable-title">证照持有单位名称</van-col>
          <van-col span="15" class="input-list">{{ info.aab004 }}</van-col>
        </van-row>
        <!-- <van-row class="info-text">
        <van-col span="9" class="lable-title">做账期号</van-col>
        <van-col span="15" class="input-list">{{ info.stage }}</van-col>
      </van-row> -->
        <van-row class="info-text">
          <van-col span="9" class="lable-title">基数</van-col>
          <van-col span="15" class="input-list">{{ info.aae180 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="9" class="lable-title">养老账户余额</van-col>
          <van-col span="15" class="input-list">{{ info.aae001 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="9" class="lable-title">首次参保时间</van-col>
          <van-col span="15" class="input-list">{{ info.aae206 }}</van-col>
        </van-row>
      </div>
    </div>
    <div v-show="showTips === true">
      <Nodata :psMsg="tip"></Nodata>
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
import Nodata from '@/components/nodata'
export default {
  data() {
    return {
      yab139: {
        text: '',
        code: '',
      },
      show: false,
      showTips: false,
      tip: '您目前没有城镇职工养老信息可查询',
      addressArr: [], // 参保地址
      info: {
        /**
         * 养老账户类别
         */
        aae473: '',
        /**
         * 个人编号
         */
        aac001: '',
        /**
         * 身份证
         */
        aac002: '',
        /**
         * 单位编号
         */
        aab001: '',
        /**
         * 本月入账金额
         */
        aae002: '',
        /**
         * 养老账户余额
         */
        aae001: '',
        /**
         * 单位名称
         */
        aab004: '',
        /**
         * 首次参保时间
         */
        aae206: '',
        /**
         * 姓名
         */
        aac003: '',
        /**
         * 基数
         */
        aae180: '',
      },
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
    },
    /**
     * 获取信息
     */
    getList() {
      let that = this
      let data = {
        yab139: this.yab139.code,
      }
      that.$http.postJson('/api/appweb/Personal/annuityBalance', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          that.info = res.data.data
          that.contentLoad = false
        } else if (res.data.code === 1001) {
          localStorage.removeItem('token')
          localStorage.removeItem('address')
          that.$token.getToken().then(res => {
            if (res) {
              that.getAddress()
            }
          })
        } else if (res.data.code === 3000) {
          that.showTips = true
          // setTimeout(() => {
          //   that.$toast(res.data.msg)
          // }, 2000)
        } else if (res.data.code === 1003) {
          that.$toast(res.data.msg)
        } else if (res.data.code === 1004) {
          that.showTips = true
          that.$toast(res.data.msg)
        } else if (res.data.code === 2000) {
          that.$toast(res.data.msg)
        } else if (res.data.code === 1002) {
          localStorage.removeItem('token')
          that.$token.getToken().then(res => {
            if (res) {
              that.getAddress()
            }
          })
        } else {
          that.$toast({ message: '数据异常', duration: 3 })
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
</style>
