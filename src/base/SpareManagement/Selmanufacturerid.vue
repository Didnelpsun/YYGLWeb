<template>
  <div class="content">
    <el-form :model="query">
      <el-row>
        <!--选择器-->
        <el-col :span="18">
          <el-col :span="8">
            <el-form-item label="区域：" label-width="80px">
              <el-cascader v-model="query.AreaList" placeholder="请选择区域" :props="cityareaProps" @change="changecityArea(query)" ref="csArea" clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂家编码：">
              <el-input class="searchSelect" v-model="query.code" placeholder="请输入厂家编码" @keyup.enter.native="getTableData1More(1)"></el-input>
            </el-form-item>
          </el-col>
        <!--站点分类-->
          <el-col :span="8">
            <el-form-item label="厂家名称：">
              <el-input class="searchSelect" v-model="query.name" placeholder="请输入厂家名称" @keyup.enter.native="getTableData1More(1)"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="fr">
            <el-button type="primary"  :disabled="Table1Loading" :icon="Table1Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getTableData1More(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
    <el-table :data="tableList" v-loading="Table1Loading">
      <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
      <el-table-column prop="cityname" label="城市" width="170" show-overflow-tooltip></el-table-column>
      <el-table-column prop="code" label="厂家编码" width="" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="厂家名称" width="" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="说明" width="" show-overflow-tooltip></el-table-column>
      <el-table-column prop="realityname" label="提交人" width="150" show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="provincename" label="省份" width=""></el-table-column>-->
      <el-table-column prop="createtime" label="提交时间" width="120"></el-table-column>

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
  </div>
</template>

<script>
import {GetsparepartsmanufacturerList} from 'api/BJGL'
import { GlobalRes } from 'common/js/mixins'
import {AreaList} from 'api/api'
export default {
  name: 'SpareconModel',
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
    }
  },
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
      // 查询相关属性
      query: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        name: '', // 厂家名称
        code: '' // 厂家编码
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
      selectId: []
    }
  },
  created () {
    this._getTableData1()
  },
  methods: {
    _getTableData1 () {
      this.Table1Loading = true
      this.$axios.get(GetsparepartsmanufacturerList, {
        params: {
          PageIndex: 1,
          PageSize: 10
        }}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
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
    // 分页处理函数
    handelSizeChange (page) {
      this.pagination.pageSize = page
      this.getTableData1More(this.pagination.currentPage)
    },
    getTableData1More  (page) {
      this.currentPage = page
      this.Table1Loading = true
      this.$axios.get(GetsparepartsmanufacturerList, {params: Object.assign({}, this.query, {
        PageIndex: this.pagination.currentPage,
        PageSize: this.pagination.pageSize
      })}).then(res => {
        this.Table1Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      })
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this._getTableData1()
    },
    handleChoose (index, row) {
      this.$emit('Selmanufacturerid', row.name, row.id)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
