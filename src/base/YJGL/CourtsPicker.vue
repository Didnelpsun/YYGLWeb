<template>
  <div class="content">
      <el-table :data="tableList" v-loading="Loading">
        <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="cityname" label="地市" width=""></el-table-column>
        <el-table-column prop="areanaem" label="区域" width=""></el-table-column>
        <el-table-column prop="name" label="台区名称" width=""></el-table-column>
        <el-table-column prop="powersubstation" label="供电所" width=""></el-table-column>
        <el-table-column prop="powersupplycontact" label="供电联系人" width=""></el-table-column>
        <el-table-column prop="creausername" label="提交人" width=""></el-table-column>
        <el-table-column prop="createdatetime" label="提交时间" width=""></el-table-column>
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
</template>

<script>
import {GetCourtsList} from 'api/YJGL'

export default {
  name: 'CourtsPicker',
  data () {
    return {
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
    async getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(GetCourtsList,
        {
          params: {
            pageIndex: e,
            pageSize: this.pagination.pageSize
          }
        })
        .then(res => {
          this.Loading = false
          this.tableList = res.data.list
          this.pagination.total = res.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // initDictionariesArray () {
    //   let arr = ['站点分类', '站点类型']
    //   this.$axios.post(DictionaryInfoList, arr).then(res => {
    //     if (res.errorCode === '200') {
    //       this.DicList.classify = res.data.filter(i => {
    //         return i.type === '站点分类'
    //       })
    //       this.DicList.resourcetype = res.data.filter(i => {
    //         return i.type === '站点类型'
    //       })
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   })
    // },
    // 重置按钮
    resetQueryForm () {
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this.getMore(1)
    },
    handleChoose (row) {
      this.$emit('selectCourts', row.id, row.name)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
