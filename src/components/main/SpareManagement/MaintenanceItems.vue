<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="备件类型：">
                <el-select v-model="Query.belongtype">
                  <el-option v-for="i in DicList.Belongtype" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择所属类型"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="备件型号：">
                <el-input v-model="Query.sparemodelname" placeholder="请填写备件型号"  @keyup.enter.native="getMore(1)"></el-input>
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
              <el-button @click="handleWrite(0)"  type="success" :disabled="Loading" icon="el-icon-plus">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="belongtype" label="备件类型"></el-table-column>
        <el-table-column prop="sparemodelname" label="备件型号"></el-table-column>
        <el-table-column prop="Sparemanufacturername" label="备件厂家"></el-table-column>
        <el-table-column prop="maintenancettime" label="维修时间"></el-table-column>
        <el-table-column prop="price" label="维修单价"></el-table-column>
        <el-table-column prop="warrantyperiod" label="保修期"></el-table-column>
        <el-table-column prop="realityname" label="提交人"></el-table-column>
        <el-table-column prop="createtime" label="提交时间"></el-table-column>
        <el-table-column label="操作" width="140">
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
      <layuiTitle :title="WriteState === 0 ? '添加维修项目' : WriteState === 1 ? '编辑维修项目' : '维修项目详情'"></layuiTitle>

      <Details :WriteState="WriteState" :DicList="DicList"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>

    </div>

  </div>
</template>

<script>
import { GlobalRes } from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import {DictionaryInfoList} from 'api/api'
import {GetSpareTypList, GetIdSpareTypList, DeleteSpareTyp} from 'api/BJGL'
import Details from 'base/SpareManagement/MaintenanceItems'
export default {
  name: 'MaintenanceItems',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        sparemodelname: null,
        belongtype: null
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false,
      DicList: {Belongtype: []}
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data, this.$options.data.call(this))
      this.getData1()
    },
    getDic () {
      let arr = ['备件类型']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.Belongtype = data.filter(i => { return i.type === '备件类型' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formatState (row) { return this.DicList.state[row.state] },
    getData1 () {
      /* this.Loading = true
      this.$axios.get(GetSpareTypList, {
        params: {
          PageIndex: 1,
          PageSize: 10
        }}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      }) */
      this.tableData = [{cityname: 'wuhan'}]
      this.total = 1
    },
    getMore (page) {
    /*  this.currentPage = page
      this.Loading = true
      this.$axios.get(GetSpareTypList, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        this.getDic()
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      }) */
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    WriteClose () { this.showWrite = false },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      /*   this.WriteState = state
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
      } */
    },
    handle2 (row) {
      /* this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
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
      }) */
    }

  },
  components: {
    layuiTitle,
    Details
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
