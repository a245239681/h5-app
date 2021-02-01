<template>
  <div>
    <div class="ins">
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
            class="just-list mb20"
            is-link
            v-for="(item, i) in list"
            :key="i"
            :to="{
              name: 'TransfeDetailsr',
              query: { details: JSON.stringify(item) },
            }"
          >
            <van-row>
              <van-col span="24" class="list-title">
                <van-row class="list-title-center h40">
                  <van-col span="12"> {{ item.aae140 }}</van-col>
                  <van-col span="12" class="end"
                    ><span class="list-types ">{{ item.aac070 }}</span></van-col
                  >
                </van-row>
              </van-col>

              <van-col span="24">
                <van-row class="h40">
                  <van-col span="8" class="f-grey">险种类型</van-col>
                  <van-col span="16" class="f-black">{{ item.aae140 }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">经办时间</van-col>
                  <van-col span="16" class="f-black">{{ item.aae036 }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">转移基金总额</van-col>
                  <van-col span="16" class="f-black">{{
                    item.aic102 | money
                  }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">转入单位名称</van-col>
                  <van-col span="16" class="f-black">{{ item.aab301 }}</van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">转出单位名称</van-col>
                  <van-col span="16" class="f-black"
                    >{{ item.aab301 }}
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
    this.getAddress()
  },
  methods: {
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
    /**
     * 获取转移列表数据
     */
    getList() {
      let that = this
      let data = {
        yab139: this.yab139.code,
      }
      that.$http.postJson('/api/appweb/Personal/comprTranInfo', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          that.list = res.data.data.list
          // console.log(that.list)
          that.contentLoad = false
          that.showTips = false
        } else if (res.data.code === 1001 || res.data.code === 1002) {
          localStorage.removeItem('XX-Token')
          localStorage.removeItem('address')
          that.$token.getToken().then(res => {
            if (res) {
              that.getAddress()
            }
          })
        } else if (res.data.code === 1004) {
          that.showTips = true
        } else if (res.data.code === 3000) {
          that.showTips = true
          // that.$dialog.alert({
          //   message: res.data.msg,
          // })
        } else {
          localStorage.removeItem('XX-Token')
          localStorage.removeItem('address')
          that.$toast('数据异常')
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
.ins .list-types {
  padding: 10px 20px;
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
.end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.mb20 {
  margin-bottom: 20px;
}
</style>
