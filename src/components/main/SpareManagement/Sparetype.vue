<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：" label-width="80px">
                <el-cascader v-model="Query.AreaList" placeholder="请选择区域" :props="cityareaProps" @change="changecityArea(Query)" ref="csArea" clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类型名称：">
                <el-input v-model="Query.typename" placeholder="请填写类型名称"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="类型编码：">
                <el-input v-model="Query.typeencoding" placeholder="请填写类型编码"  @keyup.enter.native="getMore(1)"></el-input>
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
        <el-table-column label="序号" width="50px">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="typename" label="类型名称"></el-table-column>
        <el-table-column prop="typeencoding" label="类型编码"></el-table-column>
        <el-table-column prop="remark" label="说明"></el-table-column>
        <el-table-column prop="realityname" label="提交人"></el-table-column>
        <el-table-column prop="createtime" label="提交时间" width="120px"></el-table-column>
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
      <layuiTitle :title="WriteState === 0 ? '添加备件类型' : WriteState === 1 ? '编辑备件类型' : '备件类型详情'"></layuiTitle>

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
import {AreaList} from 'api/api'
import {GetSpareTypList, GetIdSpareTypList, DeleteSpareTyp, SpareTypeImport, SpareTypeExport} from 'api/BJGL'
import Details from 'base/SpareManagement/Sparetype'
export default {
  name: 'Sparetype',
  mixins: [GlobalRes],
  data () {
    var _this = this
    return {
      cityareaProps: {
        lazy: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            _this.$axios.post(AreaList, {parentid: null}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeCityAreaLevel(res.data))
              }
            })
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeCityAreaLevel(res.data))
              }
            })
          }
        }
      },
      Query: {
        AreaList: [],
        provinceid: null,
        cityid: null
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      DicList: {Belongtype: []}
    }
  },
  activated () {
    this.getData1()
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
          url: SpareTypeExport,
          fileName: '备件类型',
          data: null
        }
        exportMethod(myObj)
      })
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = SpareTypeImport
      this.$refs.ImportBox.fileName = '错误备件类型列表导入数据'
    },
    changecityArea (obj) {
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
    },
    _normalizeCityAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 2) list[i].leaf = true
      }
      return list
    },
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetSpareTypList, {
        params: {
          PageIndex: 1,
          PageSize: 10
        }}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetSpareTypList, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
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
        this.$axios.get(GetIdSpareTypList, {
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
        this.$axios.delete(DeleteSpareTyp, {
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
