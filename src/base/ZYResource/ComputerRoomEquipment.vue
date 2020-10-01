<template>
  <div class="content">
      <el-form :model="query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label-width="125px" label="设备类型：">
                <el-select class="searchSelect" v-model="query.equipmenttypename">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="(i, index) in DeviceType" :key="index" :label="i" :value="i"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="标识码：">
                <el-input v-model="query.identificationcode" placeholder="请输入标识码"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button type="primary" :disabled="Table1Loading" icon="el-icon-search" @click="handleSearch">查询</el-button>
              <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
      <el-table :data="tableList" v-loading="Table1Loading">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!--<el-table-column prop="provincename" label="省份" width=""></el-table-column>-->
        <el-table-column prop="equipmenttypename" label="设备类型" width=""></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <el-table-column prop="identificationcode" label="标识码" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建日期" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column label="操作" width="90" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Edit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="Delete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getTableData1More" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {GetEqipmentList, GetResourecEquipmentList} from 'api/SurveyManagement'

export default {
  mixins: [GlobalRes],
  name: 'ComputerRoomEquipment',
  props: {
    resource_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 查询相关属性
      query: {
        equipmenttypename: '',
        identificationcode: ''
      },
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      DetailDialogVisible: false,
      Table1Loading: false,
      DeviceType: []
    }
  },
  created () {
    // this._getTableData1()
    this.getDicList()
  },
  methods: {
    getDicList () {
      this.$axios.get(GetResourecEquipmentList, {
        params: {
          resource_id: this.resource_id,
          PageIndex: 1,
          PageSize: 200,
          level: 2
        }
      }).then(res => {
        this.DeviceType = res.data.list.map((item) => {
          return item.equipmenttypename
        })
      }).catch(error => {
        console.log(error)
      })
    },
    async _getTableData1 () {
      this.pagination.currentPage = 1
      this.Table1Loading = true
      this.query.resourcetype = this.resourcetype
      const res = await this.$axios.post(GetEqipmentList, this.equipment_id, {params: Object.assign({}, this.query, {pageIndex: 1, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getTableData1More(this.pagination.currentPage)
    },
    async getTableData1More (page) {
      this.pagination.currentPage = page
      this.Table1Loading = true
      this.query.resourcetype = this.resourcetype
      const res = await this.$axios.post(GetEqipmentList, this.equipment_id, {params: Object.assign({}, this.query, {pageIndex: page, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      this.tableList = res.data.list
      this.pagination.total = res.data.total
    },
    // 搜索按钮
    async handleSearch () {
      this.Table1Loading = true
      let query = {}
      for (let item in this.query) {
        if (this.query[item]) query[item] = this.query[item]
      }
      this.query.resourcetype = this.resourcetype
      const res = await this.$axios.post(GetEqipmentList, this.equipment_id, {params: Object.assign({}, this.query, {pageIndex: 1, pageSize: this.pagination.pageSize})})
      this.Table1Loading = false
      if (res.errorCode !== '200') return this.$message.error(res.msg)
      if (res.data) {
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      }
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    Edit (index, row) {

    },
    Delete (index, row) {

    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
