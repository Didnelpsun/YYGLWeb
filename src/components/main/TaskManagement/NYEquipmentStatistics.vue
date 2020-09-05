<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
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
            <el-table-column prop="充电桩" label="充电桩"></el-table-column>
            <el-table-column prop="换电柜" label="换电柜" width=""></el-table-column>
            <el-table-column prop="备电" label="备电" width=""></el-table-column>
            <el-table-column prop="换电电池" label="换电电池" width=""></el-table-column>
            <el-table-column prop="电池发电装置" label="电池发电装置" width=""></el-table-column>
            <el-table-column prop="燃油发电机" label="燃油发电机" width=""></el-table-column>
            <el-table-column prop="电表" label="电表" width=""></el-table-column>
            <el-table-column prop="外电引入" label="外电引入" width=""></el-table-column>
          </el-table>
        </el-table-column>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(1 - 1) * 10 + 1}}</template></el-table-column>
        <el-table-column prop="区域" label="地市"></el-table-column>
        <el-table-column prop="充电桩" label="充电桩"></el-table-column>
        <el-table-column prop="换电柜" label="换电柜" width=""></el-table-column>
        <el-table-column prop="备电" label="备电" width=""></el-table-column>
        <el-table-column prop="换电电池" label="换电电池" width=""></el-table-column>
        <el-table-column prop="电池发电装置" label="电池发电装置" width=""></el-table-column>
        <el-table-column prop="燃油发电机" label="燃油发电机" width=""></el-table-column>
        <el-table-column prop="电表" label="电表" width=""></el-table-column>
        <el-table-column prop="外电引入" label="外电引入" width=""></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {GetEnergyStatisticalList} from 'api/SurveyManagement'
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'

export default {
  name: 'NYTaskStatistics',
  mixins: [GlobalRes],
  data () {
    return {
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
        provinceid: 0,
        cityid: 0,
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
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetEnergyStatisticalList).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data
      })
    },
    getMore () {
      this.Loading = true
      this.$axios.get(GetEnergyStatisticalList).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data
      })
    },
    changeKey (row, rowList) {
      if (rowList.length) {
        this.expandKey = []
        if (row) {
          this.$axios.get(GetEnergyStatisticalList, {
            params: {
              cityid: row.id
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
