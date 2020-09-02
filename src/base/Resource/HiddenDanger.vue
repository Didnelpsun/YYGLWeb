<template>
  <div class="content">
    <div class="main">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <el-date-picker class="tableSelect" v-model="Query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="至：">
                <el-date-picker class="tableSelect" v-model="Query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="Query.resourcename" placeholder=请输入站点名称 @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <!--<el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>-->
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="地市"></el-table-column>
        <el-table-column prop="areaname" label="区域"></el-table-column>
        <el-table-column prop="resourcename" label="站点名称"></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码"></el-table-column>
        <el-table-column prop="hiddendangertype" label="隐患类型"></el-table-column>
        <el-table-column prop="hiddendangerlevel" label="隐患级别"></el-table-column>
        <el-table-column prop="hiddendangerdescribe" label="隐患描述" width=""></el-table-column>
        <el-table-column prop="handlingsuggestions" label="处理建议" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleChoose(scope.$index, scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {GetHiddenDangerList} from 'api/SurveyManagement'
import layuiTitle from 'base/layui-title'

export default {
  name: 'HiddenDanger',
  props: {
    resource_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      Query: {
        resourcename: '',
        dayfacetypes: null,
        starttime: '',
        endtime: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: []
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
    getData1 () {
      this.Loading = true
      this.$axios.get(GetHiddenDangerList, {
        params: {
          resource_id: this.resource_id,
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetHiddenDangerList, {params: Object.assign({}, this.Query, {
        resource_id: this.resource_id,
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
    handleChoose (index, row) {
      this.$emit('handleChoose', row.id, row.hiddendangertype)
    }
  },
  components: { layuiTitle }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
