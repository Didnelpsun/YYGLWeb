<template>
  <el-dialog width="50%" :visible.sync="show" v-loading="ImportLoading" element-loading-text="正在导入中,请等待！" element-loading-background="rgba(0, 0, 0, 0.8)" :close-on-click-modal="false" title="数据导入" :before-close="Open">
    <el-card class="box-card">
      <el-form>
        <el-row >
          <el-col>
            <el-form-item label="导入模板：">
              <a style="color:#337ab7;margin-right: 20px;cursor: pointer;" :href="TemplateLink" :download="searchName">下载导入模板</a>
              <span>请下载此模板，按照模板格式整理数据导入！</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col>
            <el-form-item label="选择文件：">
              <el-upload
                class="upload-demo"
                ref="upload"
                :file-list="fileList"
                :on-change="handleChange"
                :before-upload="beforeUpload"
                action="uploadUrl"
                :show-file-list="true"
                :http-request="uploadFile"
                :on-remove="handleRemove"
                :auto-upload="false"
              >
                <el-button type="primary" slot="trigger" style="margin-right: 10px;">选取文件</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="center">
        <el-button type="success" @click="submit"  :disabled="ImportLoading" :icon="ImportLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="Open" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px;" v-show="ImportResult">
      <el-form>
        <el-row >
          <el-col>
            <el-form-item label="导入结果：">
              <span v-if="isSccess">导入成功！</span>
              <a v-else class="el-icon-download" style="cursor: pointer;font-weight: bolder" :href="ErrorLink" :download="fileName">导出错误数据</a>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </el-dialog>
</template>

<script>
import {reqURL, GetExcleTemplateList} from 'api/api'
export default {
  name: 'Import',
  data () {
    return {
      show: false,
      ImportLoading: false,
      searchName: '',
      fileList: [],
      uploadURL: '',
      isSccess: true,
      ImportResult: false,
      ErrorLink: '',
      TemplateLink: '',
      fileName: ''
    }
  },
  methods: {
    GetTemplateInfo () {
      this.$axios.get(GetExcleTemplateList, {
        params: {
          PageIndex: 1,
          PageSize: 10,
          templatename: this.searchName
        }
      }).then(res => {
        if (res.errorCode === '200') {
          if (res.data.list.length) {
            this.TemplateLink = reqURL + '/' + res.data.list[0].url
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    Open () {
      this.show = !this.show
      this.fileList = []
      this.ImportResult = false
      if (!this.show) {
        this.$emit('fatherGetData')
      }
    },
    beforeUpload (file) {
      // 判断文件格式
      let hz = file.name.split('.')[1]
      if (hz !== 'xlsx' && hz !== 'xls') {
        this.$message({message: '请选择xlsx或xls格式的文件', type: 'warning'})
        return false
      }
    },
    handleChange (file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]]
      }
    },
    handleRemove (file, fileList) {
      this.fileList = []
    },
    submit () {
      if (!this.fileList.length) {
        this.$message({message: '请选择导入文件', type: 'warning'})
        return false
      }
      this.$nextTick(() => {
        this.$refs.upload.submit()
      })
    },
    uploadFile (param) {
      let _this = this
      let fileObj = param.file // 相当于input里取得的files
      let fd = new FormData()// FormData 对象
      fd.append('file', fileObj)// 文件对象
      let timeout = parseInt(1800000)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: timeout
      }
      this.ImportLoading = true
      this.$axios.post(this.uploadURL, fd, config).then((res) => {
        this.ImportLoading = false
        /* let data = res
          let fileReader = new FileReader()
          fileReader.onload = function () {
            try {
              let jsonData = JSON.parse(this.result) // 说明是普通对象数据，后台转换失败
              console.log(jsonData)
              if (jsonData.errorCode === '200') {
                _this.$message.success('导入成功！')
                this.ImportResult = true
                this.isSccess = true
                this.fileList = []
              } else if (jsonData.errorCode === '202') {
                this.$message.error(jsonData.msg)
              }
            } catch (err) { // 解析成对象失败，说明是正常的文件流
              _this.$message.error('导入失败！')
              this.ImportResult = true
              this.isSccess = false
              let blob = new Blob([res], { type: 'application/vnd.ms-excel' })
              this.ErrorLink = URL.createObjectURL(blob)
            }
          }
          fileReader.readAsText(data) */
        if (res.errorCode === '200') {
          _this.$message.success('导入成功！')
          this.ImportResult = true
          this.isSccess = true
          this.fileList = []
        } else {
          console.log(res)
          _this.$message.error('导入失败！')
          this.ErrorLink = reqURL + '/' + res.msg
          this.ImportResult = true
          this.isSccess = false
        }
      })
    }
  }
}
</script>

<style scoped>
  @import url('../common/css/mixin.css');
  .upload-demo {
    display: flex;
  }
  >>> .el-list-enter-active,
  >>> .el-list-leave-active {
    transition: none;
  }
  >>> .el-list-enter,
  >>> .el-list-leave-active {
    opacity: 0;
  }
  >>> .el-upload-list {
    height: 40px;
  }
  >>> .el-upload-list__item:first-child {
    margin-top: 5px;
  }
  >>> .is-always-shadow {
    box-shadow: none;
  }
  >>> .el-card {
    border: none;
  }
</style>
