<template>
  <div class="pace-show">
    <!-- <van-nav-bar left-arrow title="社会保障卡进度详情" @click-left="back" /> -->
    <div v-show="showTips === false">
      <div class="info-title">
        <van-row>
          <van-col span="6"> 基本信息</van-col>
        </van-row>
      </div>
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">姓名</van-col>
          <van-col span="16" class="input-list">{{ info.name }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">社保卡号</van-col>
          <van-col span="16" class="input-list">{{ info.cardno }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">开户银行</van-col>
          <van-col span="16" class="input-list">{{ info.baz838 }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">卡管城市</van-col>
          <van-col span="16" class="input-list">{{ info.yab139 }}</van-col>
        </van-row>
        <van-row class="info-text" v-if="info.province_bitch !== undefined">
          <van-col span="8" class="lable-title">省级批次号</van-col>
          <van-col span="16" class="input-list">{{
            info.province_bitch
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">制卡状态</van-col>
          <van-col span="16" class="input-list">{{ info.status }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">当前经办时间</van-col>
          <van-col span="16" class="input-list">{{
            info.plan_time | dateFormat
          }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">领卡地址</van-col>
          <van-col span="16" class="input-list">{{
            info.get_card_addr
          }}</van-col>
        </van-row>
      </div>
    </div>
    <div class="info-title">
      <van-row>
        <van-col span="6"> 进度</van-col>
      </van-row>
    </div>
    <div>
      <div class="van-steps van-steps--vertical steps-list">
        <div class="van-steps__items">
          <!-- 步骤一 -->
          <div
            class="van-hairline van-step van-step--vertical"
            :class="[
              active > 1 ? 'van-step--finish' : '',
              active === 1 ? 'van-step--process' : '',
            ]"
          >
            <div class="van-step__title">
              <span :class="active >= 1 ? 'fc3' : 'fc9'">数据采集</span>
            </div>
            <div class="van-step__circle-container">
              <van-icon
                class="just-list"
                size="20px"
                :name="active >= 1 ? step.oneAct : step.one"
              />
            </div>
            <div class="van-step__line"></div>
          </div>
          <!-- 步骤二 -->
          <div
            class="van-hairline van-step van-step--vertical "
            :class="[
              active > 2 ? 'van-step--finish' : '',
              active === 2 ? 'van-step--process' : '',
            ]"
          >
            <div class="van-step__title">
              <span :class="active >= 2 ? 'fc3' : 'fc9'">银行开户</span>
            </div>
            <div class="van-step__circle-container">
              <van-icon
                class="just-list"
                size="20px"
                :name="active >= 2 ? step.twoAct : step.two"
              />
            </div>
            <div class="van-step__line"></div>
          </div>
          <!-- 步骤三 -->
          <div
            class="van-hairline van-step van-step--vertical "
            :class="[
              active > 3 ? 'van-step--finish' : '',
              active === 3 ? 'van-step--process' : '',
            ]"
          >
            <div class="van-step__title">
              <span :class="active >= 3 ? 'fc3' : 'fc9'">卡厂制卡</span>
            </div>
            <div class="van-step__circle-container">
              <van-icon
                class="just-list"
                size="20px"
                :name="active >= 3 ? step.threeAct : step.three"
              />
            </div>
            <div class="van-step__line"></div>
          </div>
          <!-- 步骤四 -->
          <div
            class="van-hairline van-step van-step--vertical "
            :class="[
              active > 4 ? 'van-step--finish' : '',
              active === 4 ? 'van-step--process' : '',
            ]"
          >
            <div class="van-step__title">
              <span :class="active >= 4 ? 'fc3' : 'fc9'">制卡成功</span>
            </div>
            <div class="van-step__circle-container">
              <van-icon
                class="just-list"
                size="20px"
                :name="active >= 4 ? step.fourAct : step.four"
              />
            </div>
            <div class="van-step__line"></div>
          </div>
          <!-- 步骤五 -->
          <div
            class="van-hairline van-step van-step--vertical "
            :class="[
              active > 5 ? 'van-step--finish' : '',
              active === 5 ? 'van-step--process' : '',
            ]"
          >
            <div class="van-step__title">
              <span :class="active >= 5 ? 'fc3' : 'fc9'">已领卡</span>
            </div>
            <div class="van-step__circle-container">
              <van-icon
                class="just-list"
                size="20px"
                :name="active >= 5 ? step.fiveAct : step.five"
              />
            </div>
            <div class="van-step__line"></div>
          </div>
        </div>
      </div>
      <div class="prompt">
        <p class="red pb10">温馨提示:</p>
        <p class="black text-indent">
          由于参保人员人数多，制发卡工作量较大,将新制好
          的社会保障卡发放到每一位参保人员手中需要一定的时
          间，敬请广大参保人员耐心等候，并留意关注参保地社保
          局有关制作和申领社会保障卡的通知、公告。在此期间，
          原有的基本医疗保险卡仍可正常使用，确需异地住院的按
          原有规定办理，我们会尽快为所有持有医保卡的参保人员 换发新社会保障卡。
        </p>
      </div>
    </div>

    <div v-show="showTips === true">
      <Tips></Tips>
    </div>
  </div>
</template>

<script>
import Tips from '@/components/tips'
export default {
  filters: {
    dateFormat(t) {
      if (t === null || t === '') {
        return '-'
      }
      let date = new Date(t * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let y = date.getFullYear()
      let m =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return y + '-' + m + '-' + d
    },
  },
  data() {
    return {
      active: 1, // 当前步骤
      showTips: false, // 是否无数据
      step: {
        one: require('@/assets/images/one.png'),
        oneAct: require('@/assets/images/one-act.png'),
        two: require('@/assets/images/two.png'),
        twoAct: require('@/assets/images/two-act.png'),
        three: require('@/assets/images/three.png'),
        threeAct: require('@/assets/images/three-act.png'),
        four: require('@/assets/images/four.png'),
        fourAct: require('@/assets/images/four-act.png'),
        five: require('@/assets/images/five.png'),
        fiveAct: require('@/assets/images/five-act.png'),
      },

      info: {
        /**
         * 姓名
         */
        name: '',
        /**
         * 卡号
         */
        cardno: '',
        /**
         * 开户银行
         */
        baz838: '',
        /**
         * 卡管城市
         */
        yab139: '',
        /**
         * 省级批次号
         */
        province_bitch: '',
        /**
         * 卡状态
         */
        status: '',
        /**
         * 最后经办时间
         */
        plan_time: '',
        /**
         * 领卡地址
         */
        get_card_addr: '',
        /**
         * 卡进度
         */
        plan: '',
      },
    }
  },
  components: { Tips },
  created() {
    // this.active = 3
    let details = JSON.parse(this.$route.query.details)
    // console.log(item)
    if (details !== 'undefined' && details !== 'null' && details !== '') {
      this.info = details
      this.active = this.info.plan
      console.log(this.active)
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
.pace-show .van-step__title > span {
  font-size: 30px;
  font-weight: bold;
}
.steps-list .van-step--vertical {
  padding: 20px;
}
.steps-list.van-steps--vertical {
  padding: 0 0 0 85px;
}
.pb10 {
  padding-bottom: 20px;
}
.black {
  color: #111;
}
.pace-show .red {
  color: #f45936;
}
.prompt {
  padding: 30px;
  font-size: 26px;
  line-height: 40px;
  background-color: #fff;
}
.text-indent {
  text-indent: 2em;
}
.fc9 {
  color: #999;
}
.fc3 {
  color: #333333;
}
.steps-list .van-step--finish .van-step__circle,
.steps-list .van-step--finish .van-step__line {
  background-color: #287de2;
}
</style>
