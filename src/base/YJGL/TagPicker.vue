<template>
  <div class="content">
    <div class="main">
      <el-form :model="query">
        <el-row>
          <!--选择器-->
          <el-col :span="16">
            <el-col :span="8">
            <el-form-item label="区域：" style="width: 300px">
              <el-cascader v-model="query.AreaList"  :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
            </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="8">
            <div class="fr">
            <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    <el-row style="margin: 5px 0px">
      <el-col :span="4" class="SearchResult">查询结果</el-col>
      <el-col :offset="2" :span="18" class="fr">
        <div class="fr">

        </div>
      </el-col>
    </el-row>
      <el-table :data="tableList" v-loading="Loading">
        <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="provincename" label="省份" width=""></el-table-column>
        <el-table-column prop="cityname" label="地市" width=""></el-table-column>
        <el-table-column prop="modulecode" label="标签编码" width=""></el-table-column>
        <el-table-column prop="username" label="提交人" width=""></el-table-column>
        <el-table-column prop="registrationtime" label="提交时间" width=""></el-table-column>
        <el-table-column prop="" label="操作" width="50">
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
      </div>
</template>

<script>
import {GetTagListInfo} from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'TagPicker',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        AreaList: [
        ]
      },
      queryOption: [],
      tableList: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1,
        PageIndex: 1
      },
      Loading: false,
      selectId: []
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
      let area = {
        'provinceid': this.query.AreaList[0],
        'cityid': this.query.AreaList[1],
        'areaid': this.query.AreaList[2]
      }
      this.$axios.get(GetTagListInfo, {
        params: Object.assign({}, area, {
          PageIndex: page,
          PageSize: this.pagination.pageSize
        })
      }).then(res => {
        this.Loading = false
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
    },
    // 重置按钮
    resetQueryForm () {
      this.query.AreaList.splice(0, this.query.AreaList.length)
      Object.assign(this.$data.query, this.$options.data().query)
      this.queryOption = []
      this.getMore(1)
    },
    handleChoose (row) {
      this.$emit('selectTag', row.id, row.modulecode)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
