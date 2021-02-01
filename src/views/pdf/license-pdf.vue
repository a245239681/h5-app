<template>
  <div>
    <!-- <van-nav-bar left-arrow title="职业技能证书查询" @click-left="back" /> -->
    <div class="pdf" v-show="showTips === false">
      <div class="pdf-tab"></div>
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
      <Nodata :psMsg="tip"></Nodata>
    </div>
  </div>
</template>
<script>
import pdf from 'vue-pdf'
import Nodata from '@/components/nodata'
export default {
  name: 'Pdf',
  components: {
    pdf,
    Nodata,
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
      tip: '您目前没有职业技能证书可查询',
    }
  },
  created() {
    this.getPDF()
  },
  mounted: function() {},
  methods: {
    back() {
      this.$router.go(-1) //返回上一层
    },
    getPDF() {
      let _this = this
      _this.$http.postJson(
        '/api/appweb/License/LicenseSkillBase64',
        {},
        res => {
          if (res.data.code === 0) {
            this.pdfUrl = 'data:application/pdf;base64,' + res.data.data.pdf
          } else if (res.data.code === 1004) {
            this.showTips = true
          } else if (res.data.code === 3000) {
            this.showTips = true
            // _this.$dialog
            //   .alert({
            //     message: res.data.msg,
            //   })
            //   .then(() => {
            //     _this.$router.push('/')
            //   })
          } else {
            localStorage.removeItem('token')
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
