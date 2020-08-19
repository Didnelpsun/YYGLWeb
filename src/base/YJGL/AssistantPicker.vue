<template>
  <div class="content">
      <el-form :model="query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :sm="12" :md="8">
            <el-form-item label="是否提交审核：" label-width="150px">
              <el-select v-model="query.isaudit" placeholder="请选择是否提交审核">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableList" v-loading="Loading">
        <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="cardnum" label="身份证号" width="150"></el-table-column>
        <el-table-column prop="mobilnum" label="手机号" width="100"></el-table-column>
        <el-table-column prop="sparemobile" label="备用手机号" width="100"></el-table-column>
        <el-table-column prop="address" label="住址" width=""></el-table-column>
        <el-table-column prop="realityname" label="提交人" width="75"></el-table-column>
        <el-table-column prop="dateIdinfo" label="提交时间" width=""></el-table-column>
        <el-table-column label="操作" width="50" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleChoose(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
  </div>
</template>

<script>
import {GetAssistantList} from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'AssistantPicker',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        isaudit: true
      },
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      Loading: false
    }
  },
  created () {
    this.getMore(1)
    // this.initDictionariesArray()
  },
  methods: {
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    async getMore (page) {
      this.pagination.currentPage = page
      this.Loading = true
      this.$axios.get(GetAssistantList, {
        params: Object.assign({}, this.query, {
          PageIndex: page,
          PageSize: this.pagination.pageSize
        })
      }).then(res => {
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
      this.Loading = false
    },
    // 重置按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      this.getMore(1)
    },
    handleChoose (row) {
      this.$emit('selectAssistant', row.id, row.name)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
