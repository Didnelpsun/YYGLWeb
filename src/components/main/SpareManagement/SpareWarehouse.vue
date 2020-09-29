<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="存放点类型：" label-width="100px">
                <el-select v-model="Query.warehousetype">
                  <el-option v-for="i in DicList.warehousetype" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择存放点类型"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="存放点名称：">
                <el-input v-model="Query.name" placeholder="请填写存放点名称"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="存放点编码：">
                <el-input v-model="Query.code" placeholder="请填写存放点编码"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button  @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <p class="SearchResult">查询结果</p>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
              <el-button @click="showImport" type="success" icon="el-icon-upload2">导入</el-button>
              <el-button @click="handleWrite(0)"  type="success"  icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="45px">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="warehousetype" :formatter="Showwarehousetype" label="存放点类型"></el-table-column>
        <el-table-column prop="name" label="存放点名称"></el-table-column>
        <el-table-column prop="code" label="存放点编码"></el-table-column>
        <el-table-column prop="administrators" :formatter="changeadministrator" label="负责人"></el-table-column>
        <el-table-column prop="remark" label="说明"></el-table-column>
        <el-table-column prop="realityname" label="提交人"></el-table-column>
        <el-table-column prop="createtime" label="提交时间"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加存放点' : WriteState === 1 ? '备件存放点' : '存放点详情'"></layuiTitle>

      <Details :WriteState="WriteState" :DicList="DicList"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>
    <Import ref="ImportBox" @fatherGetData="getMore(1)"></Import>
  </div>
</template>

<script>
import Import from 'base/Import'
import {exportMethod} from 'api/YDSZ'
import { GlobalRes } from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import {GetwarehouseList, GetwarehouseIdList, Deletewarehouse, warehouseImport, warehouseExport} from 'api/BJGL'
import Details from 'base/SpareManagement/SpareWarehouse'
export default {
  name: 'SpareWarehouse',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        areaid: null,
        code: null,
        name: null,
        warehousetype: null
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      DicList: {}
    }
  },
  activated () {
    this.getData1()
    this.getDic()
    this.$refs.ImportBox.searchName = ''
    this.$refs.ImportBox.GetTemplateInfo()
  },
  methods: {
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'post',
          url: warehouseExport,
          fileName: '备件存放点',
          data: null
        }
        exportMethod(myObj)
      })
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = warehouseImport
      this.$refs.ImportBox.fileName = '错误备件存放点详情导入数据'
    },
    Showwarehousetype (val) {
      val = parseInt(val.warehousetype)
      return val === 1 ? '市公司备件库' : val === 2 ? '市公司维修库' : val === 3 ? '市公司报废库' : '工作备件库'
    },
    changeadministrator (val) {
      return val.administrators.map(item => item.administrator).join(',')
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
      this.getDic()
    },
    getDic () {
      let arr = ['备件存放点类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.warehousetype = data.filter(i => { return i.type === '备件存放点类型' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetwarehouseList, {
        params: {
          PageIndex: 1,
          PageSize: 10
        }}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') { return this.$message.error(res.msg) }
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetwarehouseList, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        this.getDic()
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    WriteClose () { this.showWrite = false },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.$refs.Details.Loading = true
        this.$axios.get(GetwarehouseIdList, {
          params: {
            Id: row.id
          }
        }).then(res => {
          this.$refs.Details.Loading = false
          this.$refs.Details.setWriteData(res.data)
        }).catch(err => {
          this.$refs.Details.Loading = false
          console.log(err)
        })
      }
    },
    handle2 (row) {
      this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(Deletewarehouse, {
          params: {id: row.id}
        }).then(res => {
          if (res.errorCode === '200') {
            this.getMore(this.currentPage)
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    }

  },
  components: {
    layuiTitle,
    Details,
    Import
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
