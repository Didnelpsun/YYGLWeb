<template>
  <div class="content">
      <el-form :model="query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :sm="12" :md="8">
            <el-form-item label="站点名称：">
              <el-input class="searchSelect" v-model="query.name" placeholder="请输入站点名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button @click="getMore1(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
            <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!--<layuiTitle :title="'站点列表'"></layuiTitle>-->
      <el-table :data="tableData" v-loading="Loading">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <el-table-column prop="M" label="距离" :formatter="formatDistance"></el-table-column>
        <el-table-column prop="" label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleChoose(scope.$index, scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {GetResourceList} from 'api/SurveyManagement'

export default {
  name: 'ResourceList',
  props: {
    lng: {
      type: String,
      default: ''
    },
    lat: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 查询相关属性
      query: {
        name: '' // 站点名称
      },
      tableData: [],
      // 分页相关属性
      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      DetailDialogVisible: false,
      Loading: false,
      selectId: []
    }
  },
  created () {
    this.getTable1()
  },
  methods: {
    ResetQuery () {
      Object.assign(Object.assign(this.$data.Query, this.$options.data().Query))
      this.getTable1()
    },
    getTable1 () {
      this.Loading = true
      this.$axios.get(GetResourceList, {
        params: {
          lng: this.lng,
          lat: this.lat
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableData = res.data
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    getMore1 (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetResourceList, {
        params: Object.assign({}, this.query, {
          lng: this.lng,
          lat: this.lat
        })
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableData = res.data
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    handleChoose (index, row) {
      this.$emit('selectResource', row.resourcename, row.id, row.M.toFixed(2))
    },
    formatDistance (row) {
      return row.M.toFixed(2)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
