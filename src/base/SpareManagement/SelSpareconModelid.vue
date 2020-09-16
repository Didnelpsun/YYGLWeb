<template>
  <div class="content">
    <el-form :model="query">
      <el-row>
        <!--选择器-->
        <el-col :span="18">
          <el-col :span="8">
            <div  @click="sparetypeidShow=true">
              <el-form-item class="form-item" label="备件类型">
                <el-input v-model="query.typename" readonly placeholder="请选择备件类型"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备件型号：">
              <el-input v-model="query.sparemodel" placeholder="请填写备件型号"  @keyup.enter.native="getTableData1More(1)"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="fr">
            <el-button type="primary"  icon="el-icon-search" @click="getTableData1More(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template>
      </el-table-column>
      <el-table-column prop="cityname" label="地市"></el-table-column>
      <el-table-column prop="sparemodel" label="备件型号"></el-table-column>
      <el-table-column prop="typename" label="备件类型"></el-table-column>
      <el-table-column prop="manufacturersname" label="厂家编码"></el-table-column>
      <el-table-column prop="remark" label="说明"></el-table-column>
      <el-table-column prop="realityname" label="提交人"></el-table-column>
      <el-table-column prop="createtime" label="提交时间"></el-table-column>

      <el-table-column prop="" label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleChoose(scope.$index, scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="center">
      <el-pagination @current-change="getTableData1More" @size-change="handelSizeChange" :current-page="pagination.currentPage"
                     :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                     background layout="total, prev, pager, next, sizes"></el-pagination>
    </div>
    <el-dialog top="1%" :visible.sync="sparetypeidShow" title="选择备件类型" width="80%" :before-close="sparetypeClose">
      <Selsparetypeid   @Selsparetypeid="Selsparetypeid"/>
    </el-dialog>
  </div>
</template>

<script>
import {GetSpareConfigList} from 'api/BJGL'
import { GlobalRes } from 'common/js/mixins'
import Selsparetypeid from 'base/SpareManagement/Selsparetypeid'

export default {
  name: 'SelSpareconModelid',
  mixins: [GlobalRes],
  props: {
    resourcetype: {
      type: Number,
      default: 1
    },
    provinceid: {// 省份
      type: Number,
      default: null
    },
    cityid: {// 城市
      type: Number,
      default: null
    },
    sparetypeid: null,
    sparemanufacturerid: null,
    istrue: false
  },
  data () {
    return {
      // 查询相关属性
      query: {
        typename: null,
        sparemodel: null,
        sparetypeid: null
      },
      sparetypeidShow: false,
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      Table1Loading: false,
      DicList: {}
    }
  },
  created () {
    this._getTableData1()
  },
  methods: {
    sparetypeClose () { this.sparetypeidShow = !this.sparetypeidShow },
    Selsparetypeid (name, id) {
      this.sparetypeidShow = false
      this.query.sparetypeid = id
      this.query.typename = name
    },
    _getTableData1 () {
      this.Table1Loading = true
      this.$axios.get(GetSpareConfigList, {
        params: {
          PageIndex: 1,
          PageSize: 10,
          /*  provinceid: this.provinceid,
          cityid: this.cityid, */
          sparetypeid: this.sparetypeid,
          sparemanufacturerid: this.sparemanufacturerid
        }}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
    },
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getTableData1More(this.pagination.currentPage)
    },
    getTableData1More  (page) {
      this.pagination.currentPage = page
      this.Table1Loading = true
      if (this.istrue) {
        this.$axios.get(GetSpareConfigList, {params: Object.assign({}, this.query, {
          PageIndex: this.pagination.currentPage,
          PageSize: this.pagination.pageSize
          /*    provinceid: this.provinceid,
          cityid: this.cityid */
        })}).then(res => {
          this.Table1Loading = false
          if (res.errorCode !== '200') return this.$message.error(res.msg)
          this.tableList = res.data.list
          this.pagination.total = res.data.total
        })
      } else {
        this.$axios.get(GetSpareConfigList, {params: Object.assign({}, this.query, {
          PageIndex: this.pagination.currentPage,
          PageSize: this.pagination.pageSize,
          provinceid: this.provinceid,
          cityid: this.cityid,
          sparetypeid: this.sparetypeid,
          sparemanufacturerid: this.sparemanufacturerid
        })}).then(res => {
          this.Table1Loading = false
          if (res.errorCode !== '200') return this.$message.error(res.msg)
          this.tableList = res.data.list
          this.pagination.total = res.data.total
        })
      }
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    handleChoose (index, row) {
      this.$emit('SelSpareconModelid', row.sparemodel, row.id)
    }
  },
  components: {
    Selsparetypeid
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
