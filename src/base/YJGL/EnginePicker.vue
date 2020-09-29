<template>
  <div class="content">
      <el-form :model="query">
        <el-row>
          <!--选择器-->
          <el-col :span="19">
          <el-col :sm="12" :md="8">
            <el-form-item label="区域：">
              <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8">
            <el-form-item label="油机缸号：">
              <el-input class="searchSelect" v-model="query.machinebatchno" placeholder="请输入油机缸号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8">
            <el-form-item label="厂家：">
              <el-select class="tableSelect" v-model="query.manufactor" placeholder="请选择厂家">
                <el-option v-for="item in dictionaryList.manufactorList" :key="item.id" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" v-if="!stickArchive">
            <el-form-item label="审核状态：">
              <el-select v-model="query.auditsuccess" placeholder="请选择审核状态">
                <el-option label="请选择" :value="null"></el-option>
                <el-option label="审核成功" :value="4"></el-option>
                <el-option label="审核打回" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8">
            <el-form-item label="型号：">
              <el-select class="tableSelect" v-model="query.model" placeholder="请选择型号">
                <el-option v-for="item in dictionaryList.modelList" :key="item.id" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8">
            <el-form-item label="燃油类型：">
              <el-select class="tableSelect" v-model="query.Fueltype" placeholder="请选择燃油类型">
                <el-option v-for="item in dictionaryList.fueltypeList" :key="item.id" :label="item.text" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="8" v-if="!stickArchive">
            <el-form-item label="是否归档：">
              <el-select v-model="query.ifarchived" placeholder="请选择是否归档">
                <el-option label="已归档" :value="true"></el-option>
                <el-option label="未归档" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          </el-col>
          <el-col :span="5">
            <div class="fr">
            <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
            <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table :data="tableList" v-loading="Loading">
        <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width=""></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width=""></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width=""></el-table-column>
        <el-table-column prop="modelname" label="型号" width=""></el-table-column>
        <el-table-column prop="power" label="功率" width=""></el-table-column>
        <el-table-column prop="fueltypename" label="燃油类型" width=""></el-table-column>
        <el-table-column prop="enginestatename" label="油机状态" width=""></el-table-column>
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
import {GetEngineListInfo} from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import { DictionaryInfoList } from 'api/api'
export default {
  name: 'EnginePicker',
  mixins: [GlobalRes],
  props: {
    stickArchive: {
      type: Boolean,
      default: false// false为不固定选择已审核，true则固定审核
    }
  },
  data () {
    return {
      // 查询相关属性
      query: {
        AreaList: [
        ],
        machinebatchno: null,
        manufactor: null,
        /*        auditsuccess: 4, */
        model: null,
        Fueltype: null,
        ifarchived: true
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
      dictionaryList: {}
    }
  },
  created () {
    this.getMore(1)
    this.getList()
    // this.initDictionariesArray()
  },
  methods: {
    getList () {
      let s = [
        '油机归属单位',
        '油机调度厂家',
        '油机调度型号',
        '油机状态',
        '油机燃油类型'
      ]
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.dictionaryList.manufactorList = data.filter(i => {
            return i.type === '油机调度厂家'
          })
          this.dictionaryList.modelList = data.filter(i => {
            return i.type === '油机调度型号'
          })
          this.dictionaryList.enginestateList = data.filter(i => {
            return i.type === '油机状态'
          })
          this.dictionaryList.fueltypeList = data.filter(i => {
            return i.type === '油机燃油类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    async getMore (page) {
      this.pagination.currentPage = page
      this.Loading = true
      /* let area = {
        'provinceid': this.query.AreaList[0],
        'cityid': this.query.AreaList[1],
        'areaid': this.query.AreaList[2]
      } */
      this.$axios.get(GetEngineListInfo, {
        params: Object.assign({}, this.query, {
          PageIndex: page,
          PageSize: this.pagination.pageSize
        })
      }).then(res => {
        this.tableList = res.data.list
        this.pagination.total = res.data.total
        this.Loading = false
      }).catch(error => {
        this.Loading = false
        console.log(error)
      })
    },
    // 重置按钮
    resetQueryForm () {
      this.query.AreaList.splice(0, this.query.AreaList.length)
      Object.assign(this.$data.query, this.$options.data().query)
      this.auditsuccess = null
      this.queryOption = []
      this.getMore(1)
    },
    handleChoose (row) {
      this.$emit('selectEngine', row.id, row.machinebatchno)
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
