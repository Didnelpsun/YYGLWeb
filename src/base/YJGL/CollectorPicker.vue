<template>
  <div class="content">
    <el-form :data="query">
      <el-row>
        <!--区域级联选择器-->
        <el-col :span="18">
          <el-col :span="8">
            <el-form-item label="区域：">
              <el-cascader v-model="query.AreaList" :props="areaProps" @change="changeArea(query)" ref="csArea" clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂家：">
              <el-input v-model="query.faccode" placeholder="请输入厂家" @keyup.enter.native="getMore(1)"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备名称：">
              <el-input v-model="query.swver" placeholder="请输入设备名称" @keyup.enter.native="getMore(1)"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="6">
          <div class="fr">
            <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            <!-- <el-button v-if="isSite=='1'" type="primary" icon="el-icon-refresh" @click="isSiteChoose">选择</el-button> -->
          </div>
        </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableList" v-loading="Loading">
        <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="cityname" label="区域" width=""></el-table-column>
        <!-- <el-table-column prop="areaname" label="区域" width=""></el-table-column> -->
        <el-table-column prop="swver" label="采集器ID" width=""></el-table-column>
        <el-table-column prop="faccode" label="手机卡号" width=""></el-table-column>
        <el-table-column prop="swver" label="IMSI" width=""></el-table-column>
        <el-table-column prop="faccode" label="IMEI" width=""></el-table-column>
        <el-table-column prop="datetime" label="注册时间" width=""></el-table-column>
        <el-table-column prop="type" label="通信状态" width=""></el-table-column>
        <el-table-column prop="swver" label="标签编码" width=""></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width=""></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width=""></el-table-column>
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
import {GetcollectorList} from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'CollectorPicker',
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        swver: null, // 采集器id
        faccode: null,
        Isbinding: false,
        AreaList: [],
        provinceid: null,
        cityid: null,
        areaid: null
      },
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
      this.$axios.get(GetcollectorList,
        {
          params: Object.assign({}, this.query,
            {
              PageIndex: page,
              PageSize: this.pagination.pageSize
            }
          )
        }).then(res => {
        this.tableList = res.data.list
        this.pagination.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
      this.Loading = false
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
      Object.assign(this.$data.query, this.$options.data().query)
      // Object.assign(this.$data.AreaList, this.$options.data().AreaList)
      this.getMore(1)
    },
    handleChoose (row) {
      this.$emit('selectCollector', row.id, row.swver)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
