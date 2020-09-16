<template>
  <el-dialog width="80%" append-to-body :visible.sync="show" :title="showType === 1 ? '选择经纬度' : '查看经纬度'" :close-on-click-modal="false" :before-close="Open">
    <el-form v-if="showType === 1" ref="WriteForm" :model="Query" :rules="Rlues">
      <el-row :gutter="20">
        <!--选择器-->
        <el-col>
          <el-col :span="8">
            <el-form-item label="经度：" prop="longitude">
              <el-input v-model="Query.longitude" placeholder="请输入经度" @keyup.enter.native="getMap"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纬度：" prop="latitude">
              <el-input v-model="Query.latitude" placeholder="请输入纬度" @keyup.enter.native="getMap"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="getMap" icon="el-icon-search">查询</el-button>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
    <iframe id="show-iframe" :src="src" ref="iframe" width="100%"></iframe>
  </el-dialog>
</template>

<script>

export default {
  data () {
    return {
      src: './static/GoogleMap/GoogleMap.html',
      Query: {
        longitude: '',
        latitude: ''
      },
      Rlues: {
        longitude: [
          { required: true, pattern: /^-?(180(\.0{0,6})?|(1[0-7][0-9]|[1-9]?[0-9])(\.[0-9]{0,6}))$/, message: '请输入正确的经度,保留小数6位', trigger: 'blur' }
        ],
        latitude: [
          { required: true, pattern: /^-?(90(\.0{0,6})?|[1-8]?[0-9](\.[0-9]{0,6})?)$/, message: '请输入正确的纬度.保留小数6位', trigger: 'blur' }
        ]
      },
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
    getMap () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          let parmas = {
            longitude: this.Query.longitude,
            latitude: this.Query.latitude,
            type: this.showType
          }
          this.iframeWin.postMessage(parmas, '*')
        }
      })
    },
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
      console.log(parmas)
      setTimeout(() => {
        console.log(111)
        this.iframeWin.postMessage(parmas, '*')
      }, 500)
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
