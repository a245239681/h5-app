<template>
  <div>
    <div class="bill-list">
      <div v-show="showTips === false">
        <van-list>
          <van-cell class="just-list" v-for="(item, i) in list" :key="i">
            <van-row>
              <van-col span="24">
                <van-row class="h40">
                  <van-col span="7" class="f-grey">开票时间：</van-col>
                  <van-col span="11" class="f-black fw">{{
                    item.invoiceDay | dateFormat
                  }}</van-col>
                  <van-col span="6" class="just-end">
                    <span class="look-bill" @click="goDetails(item.payOrderId)"
                      >查看发票</span
                    >
                  </van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="7" class="f-grey">缴费单据号：</van-col>
                  <van-col span="17" class="f-black">{{
                    item.payOrderId
                  }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="7" class="f-grey">到账时间：</van-col>
                  <van-col span="17" class="f-black">{{
                    item.incomeDay | dateFormat
                  }}</van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
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
        return '-'
      }
      let date = new Date(t * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let y = date.getFullYear()
      let m =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      let d = date.getDate() + ' '
      return y + '-' + m + '-' + d
    },
  },
  data() {
    return {
      yab139: {
        text: '',
        value: '',
      },
      loading: true,
      show: false,
      list: [], // 列表
      addressArr: [], // 参保地址
      showTips: false, // 是否有数据
    }
  },
  components: { Tips },
  created() {
    let data = localStorage.getItem('bill-list')

    if (data !== 'undefined' && data !== 'null' && data !== '') {
      data = JSON.parse(data)
      this.list = data
      this.loading = false
    }
  },
  methods: {
    /**
     * 查看发票
     */
    goDetails(id) {
      let that = this
      let data = { payOrderId: id }
      that.$http.postJson(
        '/api/appweb/Invoice/invoiceDownloadBase64',
        data,
        res => {
          if (res.data.code === 0) {
            // console.log(res.data.data)
            let pdf = JSON.stringify(res.data.data.pdf)
            that.$token.setToken('bill-pdf', pdf)
            localStorage.removeItem('timer')
            // window.location.href = 'https://h5-gxrswx.healthan.net/bill-pdf'
            that.$router.push({
              name: 'Billpdf',
            })
          } else if (res.data.code === 1004) {
            this.$dialog.alert({
              message: res.data.msg,
            })
          } else if (res.data.code === 3000) {
            this.$dialog.alert({
              message: res.data.msg,
            })
          } else if (res.data.code === 1003) {
            this.$toast(res.data.msg)
          } else if (res.data.code === 1005) {
            localStorage.removeItem('XX-Token')
            this.$token.getToken()
          }
        }
      )
    },
    getList() {
      let that = this
      let data = {
        yab139: this.yab139.value,
        aae140: '',
      }
      that.$http.postJson('/api/appweb/Personal/socialInfo', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          this.list = res.data.data.list
          this.contentLoad = false
        } else if (res.data.code === 1004) {
          this.showTips = true
        } else if (res.data.code === 3000) {
          this.$dialog.alert({
            message: res.data.msg,
          })
        } else {
          localStorage.removeItem('XX-Token')
          localStorage.removeItem('address')
          this.$toast('数据异常')
        }
      })
    },
  },
}
</script>

<style>
.bill-list {
  background-color: #eeeeed;
}
.bill-list .info-title {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
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
.list-title {
  font-size: 30px;
  font-weight: bold;
  color: #111111;
}
.bill-list .list-type {
  padding: 5px;
  line-height: 30px;
  border-radius: 10px;
  border: solid 2px #4186fb;
  color: #4186fb;
  font-size: 24px;
  margin-left: 10px;
}
.bill-list .list-title-center {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.h40 {
  min-height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
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
.bill-list .look-bill {
  background-color: #3b86e0;
  color: #fff;
  font-size: 24px;
  width: 120px;
  height: 50px;
  line-height: 50px;
  border-radius: 10px;
  text-align: center;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.fw {
  font-weight: bold;
}
</style>
