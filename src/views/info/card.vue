<template>
  <div>
    <!-- <van-nav-bar left-arrow title="社会保障卡应用状态" @click-left="back" /> -->
    <div class="card" v-show="showTips === false">
      <div class="info-title">社会保障卡应用状态</div>
      <div class="card-box">
        <van-row class="pl15">
          <van-col span="3" class="h160 just-list">
            <van-image
              round
              width="40"
              height="40"
              class="img-responsive"
              :src="info.touxiang"
            />
          </van-col>
          <van-col span="9" class="h160 just-start">
            <span class="pl15 card-name">{{ info.name }}</span>
          </van-col>
          <van-col span="12" class="just-end">
            <span class="card-type">卡状态：{{ info.type }}</span>
          </van-col>
          <van-col span="24" class="h60">
            <span class="idcard-title">
              身份证号：
            </span>
            <span class="f30">{{ info.idcard }}</span>
          </van-col>
          <van-col span="24" class="h60">
            <span class="idcard-title">
              社会保障卡号：
            </span>
            <span class="f30">
              {{ info.card }}
            </span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-show="showTips === true">
      <Nodata :psMsg="tip"></Nodata>
    </div>
  </div>
</template>

<script>
import Nodata from '@/components/nodata'
export default {
  components: {
    Nodata,
  },
  data() {
    return {
      info: {
        name: '', // 姓名
        card: '', // 社保卡号
        type: '', // 卡状态
        idcard: '', // 身份证号
        touxiang: require('@/assets/images/renshe-icon.png'),
      },
      showTips: false,
      tip: '未查询到相关数据',
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    back() {
      this.$router.go(-1) //返回上一层
    },
    getUserinfo() {
      this.$http.postJson('/api/appweb/Card/cardStatus', {}, res => {
        if (res.data.code === 0) {
          // console.log(res)
          this.info.name = res.data.data.name
          this.info.card = res.data.data.cardno
          this.info.type = res.data.data.status
          this.info.idcard = res.data.data.idcard
          this.showTips = false
        } else if (res.data.code === 1004 || res.data.code === 3000) {
          this.showTips = true
          // this.$dialog.alert({
          //   message: res.data.msg,
          // })
        } else {
          this.$toast.fail(res.data.msg)
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
.card .card-box {
  height: 315px;
  margin: 0 30px;
  background-image: url(../../assets/images/card-bg.png);
  background-size: cover;
  box-shadow: 1px 5px 20px 0px rgba(40, 152, 231, 0.35);
  border-radius: 20px;
  color: #fff;
}
.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}
.card-type {
  display: block;
  min-width: 240px;
  height: 70px;
  background: linear-gradient(
    90deg,
    rgba(146, 179, 219, 1) 0%,
    rgba(206, 219, 235, 1) 100%
  );
  border-radius: 0px 20px 0px 0px;
  font-size: 26px;
  text-align: center;
  line-height: 70px;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.just-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl15 {
  padding-left: 30px;
}
.card .h160 {
  height: 160px;
}
.card .card-name {
  font-size: 36px;
}
.f30 {
  font-size: 30px;
}
.card .idcard-title {
  font-size: 30px;
  color: #becfed;
}
.card .h60 {
  height: 60px;
  line-height: 60px;
}
.icon-size {
  width: 40px;
  min-height: 40px;
  font-size: 40px;
}
</style>
