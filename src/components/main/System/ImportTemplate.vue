<template>
  <div class="content">
    <div class="main" v-show="showView">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="10">
              <el-form-item label="模板名称：">
                <el-input v-model="Query.templatename" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore(1)" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="table1Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="templatename" label="模板名称"></el-table-column>
        <el-table-column prop="url" label="路径" width="400"></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="" :formatter="formatDate"></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="add" v-show="!showView" v-loading="WriteLoading">
      <layuiTitle :title="'修改' + templatename"></layuiTitle>
      <el-form :model="AddForm" ref="AddForm">
        <el-row>
          <el-col :sm="12" :md="12">
            <el-form-item label="模板路径：">
              <div style="display: flex;flex-direction: row;align-items: center;justify-content: center">
                <el-input v-model="AddForm.url" placeholder="请选择导入模板" disabled>
                  <!--<el-button @click="submit" slot="append">选择</el-button>-->
                </el-input>
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :on-change="handleChange"
                  :before-upload="beforeUpload"
                  action="UploadFile"
                  :show-file-list="false"
                  :http-request="handleUploadFile"
                  :on-remove="handleRemove"
                  :auto-upload="true"
                >
                  <el-button type="primary" slot="trigger" style="margin-left: 10px;">选取文件</el-button>
                </el-upload>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="center">
        <el-button @click="TemplateUpdate" :disabled="EditLoading" :icon="EditLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="handleBack" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {GetExcleTemplateList, GetExcleTemplateInfo, EditExcleTemplate, UploadFile} from 'api/api'
import {formatDate} from 'common/js/cache'
import layuiTitle from 'base/layui-title'
export default {
  name: 'ImportTemplate',
  data () {
    return {
      showView: true,
      Query: {
        templatename: ''
      },
      templatename: '',
      total: 0,
      currentPage: 1,
      pageSize: 10,
      tableList: [],
      table1Loading: false,
      WriteLoading: false,
      EditLoading: false,
      fileList: [],
      AddForm: {
      },
      link: ''
    }
  },
  created () {
    this.getData1()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getMore (e) {
      this.table1Loading = true
      this.currentPage = e
      this.$axios.get(GetExcleTemplateList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.table1Loading = true
      this.$axios.get(GetExcleTemplateList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.table1Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    formatDate (row) {
      return formatDate(row.createtime)
    },
    handleBack () {
      this.showView = !this.showView
      this.fileList = []
      this.AddForm = {}
      this.$refs.upload.clearFiles()
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
    handleUploadFile (param) {
      let _this = this
      let fileObj = param.file // 相当于input里取得的files
      let fd = new FormData()// FormData 对象
      fd.append('file', fileObj)// 文件对象
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post(UploadFile, fd, config).then((res) => {
        if (res.errorCode === '200') {
          this.AddForm.url = res.msg
        } else {
          _this.$message.error('导入失败！')
        }
      })
    },
    TemplateUpdate () {
      this.$axios.put(EditExcleTemplate, this.AddForm).then((res) => {
        if (res.errorCode !== '200') {
          this.$message.error(res.msg)
        } else {
          this.$message.success('修改成功！')
          this.$refs.upload.clearFiles()
          this.Query = {}
          this.showView = true
          this.AddForm = {}
          this.getMore(1)
        }
      })
    },
    handleEdit (index, row) {
      this.WriteLoading = true
      this.templatename = row.templatename
      this.showView = !this.showView
      this.$axios.get(GetExcleTemplateInfo, { // 获取字典详情
        params: {
          id: row.id
        }
      }).then((res) => {
        this.WriteLoading = false
        if (res.errorCode !== '200') {
          this.$message.error(res.msg)
        } else {
          this.AddForm = res.data
        }
      })
    }

  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
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
