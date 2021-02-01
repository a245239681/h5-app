<template>
  <div>
    <div class="pdf" v-show="showTips === false">
      <div class="pdf-tab">
        <!-- <van-row gutter="20">
        <van-col span="12" class="just-list">
          <van-button
            type="primary"
            size="normal"
            class="btn-def btn-pre"
            @click.stop="prePage"
          >
            上一页
          </van-button></van-col
        >
        <van-col span="12" class="just-list">
          <van-button class="btn-def btn-next" @click.stop="nextPage"
            >下一页</van-button
          ></van-col
        >
      </van-row> -->
        <!-- <van-row gutter="20" class="p30">
        <van-col span="8" class="just-list">
          <van-button
            type="primary"
            size="normal"
            :class="{ select: idx == 0 }"
            @touchstart="idx = 0"
            @touchend="idx = -1"
            @click="scaleD"
          >
            放大
          </van-button>
        </van-col>
        <van-col span="8" class="just-list">
          <van-button
            type="primary"
            size="normal"
            :class="{ select: idx == 1 }"
            @touchstart="idx = 1"
            @touchend="idx = -1"
            @click="scaleX"
          >
            缩小
          </van-button>
        </van-col>
        <van-col span="8" class="just-list">
          <van-button
            type="primary"
            size="normal"
            @click="fileDownload(pdfUrl, 'pdf文件')"
          >
            下载
          </van-button>
        </van-col>
      </van-row> -->
        <!-- <van-row gutter="20">
        <van-col span="24" class="just-list">
          <div class="f30">{{ pageNum }}/{{ pageTotalNum }}</div>
        </van-col>
      </van-row> -->
      </div>
      <pdf
        ref="pdf"
        :src="pdfUrl"
        :page="pageNum"
        :rotate="pageRotate"
        @page-loaded="pageLoaded($event)"
        @num-pages="pageTotalNum = $event"
        @error="pdfError($event)"
        @link-clicked="page = $event"
        @loaded="loaded($event)"
      >
      </pdf>
    </div>
    <div v-show="showTips === true">
      <Tips></Tips>
    </div>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import Tips from '@/components/tips'
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
export default {
  components: {
    pdf,
    Tips,
  },
  data() {
    return {
      pdfUrl: '',
      // pdfUrl:'./static/pdf/password.pdf',
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      scale: 100, //放大系数
      idx: -1,
      load: null,
      showTips: false,
      code: '',
      id: '',
    }
  },
  created() {
    this.id = this.$route.query.id
    this.code = this.$route.query.code
    this.getPDF()
  },
  mounted: function() {},
  methods: {
    getPDF() {
      let _this = this
      _this.$http.postJson(
        '/api/appweb/Progress/materialPrintBase64',
        { acpt_no: _this.id, yab139: _this.code },
        res => {
          if (res.data.code === 0) {
            this.pdfUrl = pdf.createLoadingTask({
              url: 'data:application/pdf;base64,' + res.data.data.pdf,
              CMapReaderFactory,
            })
          } else if (res.data.code === 1004) {
            this.showTips = true
          } else if (res.data.code === 3000) {
            _this.$dialog
              .alert({
                message: res.data.msg,
              })
              .then(() => {
                history.go(-1)
                // _this.$router.push('/dianzi')
              })
          } else {
            _this.$toast(res.data.msg)
          }
        }
      )
    },
    loaded() {
      this.load = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      })
    },
    //下载PDF
    fileDownload(data, fileName) {
      let blob = new Blob([data], {
        //type类型后端返回来的数据中会有，根据自己实际进行修改
        type: 'application/pdf;charset-UTF-8',
      })
      let filename = fileName || '报表.xls'
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename)
      } else {
        var blobURL = window.URL.createObjectURL(blob)
        // 创建隐藏<a>标签进行下载
        var tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        tempLink.setAttribute('download', filename)
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        window.URL.revokeObjectURL(blobURL)
      }
    },
    //放大
    scaleD() {
      this.scale += 5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
    },

    //缩小
    scaleX() {
      if (this.scale == 100) {
        return
      }
      this.scale += -5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
    },
    prePage() {
      var p = this.pageNum
      p = p > 1 ? p - 1 : this.pageTotalNum
      this.pageNum = p
    },
    nextPage() {
      var p = this.pageNum
      p = p < this.pageTotalNum ? p + 1 : 1
      this.pageNum = p
    },
    clock() {
      this.pageRotate += 90
    },
    counterClock() {
      this.pageRotate -= 90
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded(e) {
      // console.log(e)
      this.load.clear()
      this.curPageNum = e
    },
    pdfError(error) {
      console.error(error)
    },
    pdfPrintAll() {
      this.$refs.pdf.print()
    },
    pdfPrint() {
      this.$refs.pdf.print(100, [1, 2])
    },
  },
}
</script>
<style>
.pdf-tab {
  padding: 30px 0;
}
.p30 {
  padding: 30px 0;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.f30 {
  font-size: 30px;
  padding: 30px 0;
}
</style>
