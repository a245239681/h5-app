<template>
  <div>
    <div class="ins">
      <!-- <van-nav-bar left-arrow title="参保信息列表" @click-left="back" /> -->
      <div v-show="showTips === false">
        <div class="info-title">
          <van-row>
            <van-col span="24" class="just-end"
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
        <van-list>
          <van-cell
            class="just-list"
            is-link
            v-for="(item, i) in list"
            :key="i"
            :to="{ name: 'InsShow', query: { details: JSON.stringify(item) } }"
          >
            <van-row>
              <van-col span="24" class="list-title list-title-center"
                >{{ item.aae141 }}
                <span class="list-type">{{ item.aac031 }}</span></van-col
              >
              <van-col span="24">
                <van-row class="h40">
                  <van-col span="6" class="f-grey">险种类型：</van-col>
                  <van-col span="18" class="f-black">{{ item.aae140 }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="6" class="f-grey">单位名称：</van-col>
                  <van-col span="18" class="f-black">{{ item.aab004 }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="6" class="f-grey">起始年月：</van-col>
                  <van-col span="18" class="f-black">{{
                    item.aae041 | dateFormat
                  }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="6" class="f-grey">截止年月：</van-col>
                  <van-col span="18" class="f-black"
                    >{{ item.aae042 | dateFormat }}
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
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
      yab139: {
        text: '',
        code: '',
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
      _this.addressArr.length !== 0
        ? (_this.yab139 = _this.addressArr[0])
        : (this.showTips = true)
      _this.loading = false
      _this.addressArr.length === 0 ? (_this.showTips = true) : _this.getList()
    },
    getList() {
      let that = this
      let data = {
        yab139: this.yab139.code,
        aae140: '',
      }
      // let load = this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      // })
      that.$http.postJson('/api/appweb/Personal/socialInfo', data, res => {
        if (res.data.code === 0) {
          this.list = res.data.data.list
          this.contentLoad = false
        } else if (res.data.code === 1004) {
          this.showTips = true
        } else if (res.data.code === 3000) {
          this.showTips = true
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('address')
          this.$toast('数据异常')
        }
      })
    },
  },
}
</script>

<style>
.ins {
  background-color: #eeeeed;
}
.ins .info-title {
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
.ins .list-type {
  padding: 5px;
  line-height: 30px;
  border-radius: 10px;
  border: solid 2px #4186fb;
  color: #4186fb;
  font-size: 24px;
  margin-left: 10px;
}
.ins .list-title-center {
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
</style>
