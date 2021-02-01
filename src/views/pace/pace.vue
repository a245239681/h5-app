<template>
  <div class="pace">
    <!-- <van-nav-bar left-arrow title="社会保障卡进度查询" @click-left="back" /> -->
    <div class="info-title">
      <van-row>
        <van-col span="24">社会保障卡进度查询</van-col>
      </van-row>
    </div>
    <van-form @submit="onSubmit" v-show="showTips === false">
      <van-field
        readonly
        input-align="right"
        label="查询主体"
        placeholder="请选择"
        is-link
        @click="showtype = true"
        name="type"
        v-model="type"
      />
      <van-popup v-model="showtype" position="bottom">
        <van-picker
          show-toolbar
          :columns="typeArr"
          @cancel="showtype = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div v-show="type === '帮他人查询'">
        <van-field
          input-align="right"
          label="姓名"
          placeholder="请填写姓名"
          name="username"
          v-model="username"
        />
        <van-field
          input-align="right"
          label="身份证号"
          placeholder="请填写身份证号码"
          name="IDcard"
          v-model="IDcard"
        />
      </div>

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
    <div v-show="showTips === true">
      <Nodata :psMsg="tip"></Nodata>
    </div>
  </div>
</template>

<script>
import Nodata from '@/components/nodata'
export default {
  data() {
    return {
      showtype: false,
      username: '', // 姓名
      type: '查询本人', // 查询主体
      IDcard: '',
      // 机构数据
      typeArr: [
        { text: '查询本人', code: '1' },
        { text: '帮他人查询', code: '2' },
      ],
      showTips: false,
      tip: '暂无参保数据',
    }
  },
  components: {
    Nodata,
  },
  created() {
    this.$token.getToken()
  },
  methods: {
    back() {
      this.$router.go(-1) //返回上一层
    },
    // 查询选择
    onConfirm(value) {
      this.type = value.text
      this.showtype = false
    },
    onSubmit(values) {
      const matchIDCard = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      if (values.type === '查询本人') {
        let url = '/api/appweb/Card/cardPlan'
        this.getData(url, {})
      } else if (values.type === '帮他人查询') {
        if (values.username === '') {
          this.$toast.fail('请输入姓名')
          return
        }
        if (this.IDcard === '') {
          this.$toast.fail('请输入身份证号码')
          return
        }
        if (!matchIDCard.test(this.IDcard)) {
          this.$toast.fail('身份证号码格式不正确')
          return
        }
        const model = {
          aac002: this.IDcard,
          aac003: this.username,
        }
        let url = '/api/appweb/Cardbase/cardPlanOthers'
        this.getData(url, model)
      }
    },
    /**
     * 获取查询结果
     */
    getData(url, model) {
      this.$http.postJson(url, model, res => {
        if (res.data.code === 0) {
          // console.log(res)
          let details = JSON.stringify(res.data.data)
          this.$router.push({
            name: 'PaceDetails',
            query: {
              details: details,
            },
          })
        } else if (res.data.code === 1001 || res.data.code === 1002) {
          localStorage.removeItem('token')
          this.$token.getToken()
        } else if (res.data.code === 1004 || res.data.code === 3000) {
          this.$dialog.alert({
            message: res.data.msg,
          })
        }
      })
    },
  },
}
</script>

<style>
.pace .sub-btn {
  padding: 103px 30px 30px 30px;
}
.pace .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.pace .van-cell {
  padding: 26px 32px;
  font-size: 30px;
  color: #666666;
}
.info-title {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
}
</style>
