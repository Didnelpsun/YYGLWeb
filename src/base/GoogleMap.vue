<template>
  <el-dialog width="80%" :visible.sync="show" title="选择经纬度" :close-on-click-modal="false" :before-close="Open">
    <iframe id="show-iframe" :src="src" ref="iframe" width="100%"></iframe>
  </el-dialog>
</template>

<script>

export default {
  data () {
    return {
      src: './static/GoogleMap/GoogleMap.html',
      iframeWin: {},
      longitude: '',
      latitude: '',
      show: false,
      showType: 1 // 0: 查看 1: 编辑/新增
    }
  },
  mounted () {
    setTimeout(() => {
      this.LoadMap()
    }, 100)
  },
  destroyed () {
    // 注意移除监听！注意移除监听！注意移除监听！
    window.removeEventListener('message', this.handleMessage)
  },
  methods: {
    LoadMap () {
      this.iframeWin = this.$refs.iframe.contentWindow
      this.$nextTick(() => {
        // 在外部 Vue 的 window 上添加 postMessage 的监听，并且绑定处理函数 handleMessage
        window.addEventListener('message', this.handleMessage)
      })
      const oIframe = document.getElementById('show-iframe')
      const deviceHeight = document.documentElement.clientHeight
      oIframe.style.height = deviceHeight * 0.7 + 'px'
      let parmas = {
        longitude: this.longitude,
        latitude: this.latitude,
        type: this.showType
      }
      setTimeout(() => {
        this.iframeWin.postMessage(parmas, '*')
      }, 100)
    },
    handleMessage (event) {
      // 根据上面制定的结构来解析 iframe 内部发回来的数据
      const data = event.data
      if (data.longitude) {
        let selectLon = data.longitude.toString()
        this.longitude = selectLon.substring(0, selectLon.indexOf('.') + 7)
      }
      if (data.latitude) {
        let selectLat = data.latitude.toString()
        this.latitude = selectLat.toString().substring(0, selectLat.indexOf('.') + 7)
      }
      if (data.info === 'close') {
        this.$emit('fatherGetData', this.longitude, this.latitude)
      }
    },
    Open () {
      this.show = !this.show
      if (!this.show) {
        this.$emit('fatherGetData', this.longitude, this.latitude)
      }
    }
  }
}
</script>

<style scoped>
  >>> .el-dialog__body {
    padding-top: 0;
  }
</style>
