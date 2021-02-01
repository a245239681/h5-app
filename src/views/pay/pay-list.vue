<template>
  <div class="prove-list">
    <van-skeleton :row="6" :loading="loading">
      <div v-for="(item, inx) in list" :key="inx">
        <div class="list-date">{{ item.time | dateFormat }}</div>
        <van-list>
          <van-cell
            class="just-list"
            is-link
            v-for="(items, i) in item.list"
            :key="i"
            :to="{
              name: 'PayDetails',
              query: { details: JSON.stringify(items) },
            }"
          >
            <van-row>
              <van-col span="24" class="list-title">{{ items.name }}</van-col>
              <van-col span="24">
                <van-row class="h40">
                  <van-col span="8" class="f-grey">缴费基数：</van-col>
                  <van-col span="8" class="f-black">{{
                    items.info.aae180 | money
                  }}</van-col>
                  <van-col span="8"></van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">单位缴：</van-col>
                  <van-col span="8" class="f-black">{{
                    items.info.aae020 | money
                  }}</van-col>
                  <van-col span="8"
                    ><span class="list-type">{{
                      items.info.bae152
                    }}</span></van-col
                  >
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">个人缴：</van-col>
                  <van-col span="8" class="f-black">{{
                    items.info.aae022 | money
                  }}</van-col>
                  <van-col span="8"
                    ><span class="list-type">{{
                      items.info.bae153
                    }}</span></van-col
                  >
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">划入个账金额：</van-col>
                  <van-col span="8" class="f-black">{{
                    items.info.aae083 | money
                  }}</van-col>
                  <van-col span="8"></van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">单位划入个账：</van-col>
                  <van-col span="8" class="f-black">{{
                    items.info.bke105 | money
                  }}</van-col>
                  <van-col span="8"></van-col>
                </van-row>
                <van-row class="h40">
                  <van-col span="8" class="f-grey">费款年月：</van-col>
                  <van-col span="16" class="f-black">{{
                    items.info.aae002 | dateFormat
                  }}</van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
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
      if (t === null || t === '') {
        return ''
      }
      let y = t.slice(0, 4)
      let m = t.slice(4)
      return y + '年' + m + '月'
    },
  },
  data() {
    return {
      /**
       * 是否加载数据中
       */
      loading: true,
      list: [],
    }
  },
  created() {
    let data = localStorage.getItem('list')

    if (data !== 'undefined' && data !== 'null' && data !== '') {
      data = JSON.parse(data)
      this.list = data
      this.loading = false
    }
  },
  methods: {},
}
</script>

<style>
.prove-list {
  background-color: #eeeeed;
}
.prove-list .list-date {
  padding: 0 30px;
  line-height: 78px;
  color: #666666;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
.prove-list .list-type {
  padding: 5px;
  border-radius: 10px;
  border: solid 2px #4186fb;
  color: #4186fb;
  font-size: 24px;
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
