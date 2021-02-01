<template>
  <div class="pace-show">
    <div v-show="showTips === false">
      <div class="info-content">
        <van-row class="info-text">
          <van-col span="8" class="lable-title">受理单号</van-col>
          <van-col span="16" class="input-list">{{ info.acpt_no }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">单位/个人</van-col>
          <van-col span="16" class="input-list">{{ info.person_name }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">事项名称</van-col>
          <van-col span="16" class="input-list">{{ info.matter_name }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">受理时间</van-col>
          <van-col span="16" class="input-list">{{ info.create_time }}</van-col>
        </van-row>
        <van-row class="info-text">
          <van-col span="8" class="lable-title">办理状态</van-col>
          <van-col span="16" class="input-list">
            <span class="in-y" v-show="info.acpt_status_code === '0'">{{
              info.acpt_status
            }}</span>
            <span class="in-w" v-show="info.acpt_status_code === '1'">{{
              info.acpt_status
            }}</span>
            <span
              class="finish-green"
              style="margin-right: 10px"
              v-show="info.acpt_status_code === '2'"
              >{{ info.acpt_status }}</span
            >
            <span class="end-red" v-show="info.acpt_status_code === '3'">{{
              info.acpt_status
            }}</span>
            <van-button
              color="#24AB57"
              style="border-radius: 10px;"
              size="small"
              v-show="info.acpt_status_code === '2'"
              @click="go()"
              >查看结果</van-button
            ></van-col
          >
        </van-row>
      </div>
    </div>
    <div v-for="(item, inx) in step" :key="inx">
      <div class="info-title">
        <van-row>
          <van-col span="24">{{ item.task_name }}</van-col>
        </van-row>
      </div>
      <van-steps
        direction="vertical"
        :active="item.is_todo_point === '1' ? 0 : '-1'"
      >
        <van-step v-for="(items, i) in item.points" :key="i">
          <h3>{{ items.point_name }}</h3>
          <!-- <p v-show="items.point_user !== undefined">
            经办人：{{ items.point_user }}
          </p> -->
          <p>处理结果：{{ items.point_result }}</p>
          <p v-show="items.point_time !== undefined">
            处理时间：{{ items.point_time }}
          </p>
        </van-step>
      </van-steps>
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
      active: '', // 当前步骤
      showTips: false, // 是否无数据
      info: {},
      id: '',
      step: [],
      code: '',
    }
  },
  components: { Tips },
  created() {
    this.id = this.$route.query.id
    this.code = this.$route.query.code
    this.getlist()
  },
  methods: {
    getlist() {
      let that = this
      let data = {
        acpt_no: that.id,
        yab139: that.code,
      }
      /**
       * url 测试 /api/gxrswx/Progress/progressDetailsTest
       * url正式 /api/gxrswx/Progress/progressDetails
       */
      that.$http.postJson('/api/appweb/Progress/progressDetails', data, res => {
        if (res.data.code === 0) {
          that.info = res.data.data.acpt_info
          that.step = res.data.data.process
          that.showTips = false
        } else if (res.data.code === 1004 || res.data.code === 3000) {
          that.showTips = true
        } else {
          that.$toast.fail({ message: res.data.msg })
        }
      })
    },
    go() {
      this.$router.push({
        name: 'ProgressPdf',
        query: {
          id: this.info.acpt_no,
          code: this.code,
        },
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
.end-red {
  color: #e3552f;
}
.finish-green {
  color: #24ab57;
}
.in-w {
  color: #4186fb;
}
.in-y {
  color: #ff976a;
}
</style>
