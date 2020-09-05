<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="地市：">
                <el-cascader v-model="Query.AreaList" placeholder="请选择地市" :props="cityareaProps" @change="changecityArea(Query)" ref="csArea" clearable></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任务月份：">
                <el-date-picker class="tableSelect" v-model="Query.yearmonth" type="month" format="yyyy-MM" value-format="yyyy-MM" placeholder="请选择任务月份">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore()" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;" :row-key="getRowKeys" :expand-row-keys="expandKey" @expand-change="changeKey">
        <el-table-column type="expand">
          <el-table :data="boardData">
            <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(1 - 1) * 10 + 1}}</template></el-table-column>
            <el-table-column prop="区域" label="区域" width=""></el-table-column>
            <el-table-column prop="待执行" label="待执行"></el-table-column>
            <el-table-column prop="待审核" label="待审核" width=""></el-table-column>
            <el-table-column prop="已审核" label="审核通过" width=""></el-table-column>
          </el-table>
        </el-table-column>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(1 - 1) * 10 + 1}}</template></el-table-column>
        <el-table-column prop="区域" label="地市"></el-table-column>
        <el-table-column prop="待执行" label="待执行"></el-table-column>
        <el-table-column prop="待审核" label="待审核" width=""></el-table-column>
        <el-table-column prop="已审核" label="审核通过" width=""></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {AreaList} from 'api/api'
import {GetEnergytaskstatisticsList} from 'api/SurveyManagement'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'

export default {
  name: 'NYTaskStatistics',
  mixins: [GlobalRes],
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
      getRowKeys: (row) => {
        return row.id
      },
      expandKey: [],
      boardData: [],
      Loading: false,
      tableData: [],
      tableLoading: false,
      Query: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        yearmonth: ''
      },
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false
    }
  },
  activated () {
    this.getData1()
  },
  methods: {
    changecityArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
    },
    _normalizeCityAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 2) list[i].leaf = true
      }
      return list
    },
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetEnergytaskstatisticsList).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data
      })
    },
    getMore () {
      this.Loading = true
      let obj = {
        state: 0
      }
      this.$axios.get(GetEnergytaskstatisticsList, {params: Object.assign({}, this.Query, obj)}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data
      })
    },
    changeKey (row, rowList) {
      if (rowList.length) {
        this.expandKey = []
        if (row) {
          this.$axios.get(GetEnergytaskstatisticsList, {
            params: {
              cityid: 0,
              parentid: row.id,
              state: 1,
              yearmonth: this.Query.yearmonth
            }
          }).then(res => {
            if (res.error !== true) {
              try {
                Object.assign(this.$data.boardData, this.$options.data().boardData)
                this.boardData = res.data
                // console.log(this.boardData)
                this.expandKey.push(row.id)
              } catch (e) {
                console.log(e)
              }
            } else { this.$message.error('查询详情失败') }
          }).catch(error => {
            console.log(error)
          })
        }
      } else {
        this.expandKey = []
        this.boardData = []
      }
    }
  },
  components: { layuiTitle }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
