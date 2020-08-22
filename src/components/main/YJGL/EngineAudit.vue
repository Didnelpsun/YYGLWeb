<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :data="query" ref="NodeQueryForm">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="油机缸号：">
                <el-input v-model="query.machinebatchno" placeholder="请输入油机缸号"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="厂家：">
                <el-input v-model="query.manufactor" placeholder="请输入厂家"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="型号：">
                <el-input v-model="query.model" placeholder="请输入型号"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="燃油类型：">
                <el-input v-model="query.Fueltype" placeholder="请输入燃油类型"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top:0">
              <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
              <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="75"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="75"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="75"></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width="120"></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width="120"></el-table-column>
        <el-table-column prop="manufactorname" label="厂家" width=""></el-table-column>
        <el-table-column prop="unitname" label="归属单位" width="120"></el-table-column>
        <el-table-column prop="modelname" label="型号" width=""></el-table-column>
        <el-table-column prop="power" label="功率" width="75"></el-table-column>
        <el-table-column prop="fueltypename" label="燃油类型" width=""></el-table-column>
        <el-table-column prop="enginestatename" label="油机状态" width=""></el-table-column>
        <el-table-column prop="applicanttype" label="申请类型" width="75" :formatter="applicanttypeFormat"></el-table-column>
        <el-table-column prop="modulecode" label="标签" width=""></el-table-column>
        <el-table-column prop="swver" label="采集器" width=""></el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="Audit(scope.row)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div v-show="showWrite">
      <Details @fatherClose="closeWrite" ref="Details" @fatheretMore="getMore(pagination.currentPage)"/>
    </div>

  </div>
</template>

<script>
import { MachineauditList, MachineauditInfo } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/EngineAudit'

export default {
  name: 'Battery',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        AreaList: [
        ],
        machinebatchno: '',
        manufactor: '',
        model: '',
        Fueltype: ''
      },
      queryOption: [],
      // 加载
      Loading: false,
      showWrite: false,
      tableList: [
      ],
      tableData: {},
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  activated () {
    // this.check(AreaList)
    this.getMore(1)
  },
  methods: {
    // writeDic: GlobalRes.methods.writeDic,
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      let area = {
        'provinceid': this.query.AreaList[0],
        'cityid': this.query.AreaList[1],
        'areaid': this.query.AreaList[2]
      }
      this.$axios.get(MachineauditList,
        {
          params: Object.assign({}, area, {
            pageIndex: e,
            pageSize: this.pagination.pageSize,
            machinebatchno: this.query.machinebatchno,
            manufactor: this.query.manufactor,
            model: this.query.model,
            Fueltype: this.query.Fueltype
          })
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
    applicanttypeFormat (row, col) {
      if (row.applicanttype === 1) {
        return '油机解绑'
      } else if (row.applicanttype === 2) {
        return '油机绑定'
      }
    },
    auditorstateFormat (row, col) {
      if (row.auditorstate === 3) {
        return '审核不通过'
      } else if (row.auditorstate === 4) {
        return '审核通过'
      }
    },
    // 重置表单按钮
    resetQueryForm () {
      this.query.AreaList.splice(0, this.query.AreaList.length)
      Object.assign(this.$data.query, this.$options.data().query)
      this.queryOption = []
      this.getMore(1)
    },
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.getMore(1)
      this.showWrite = !this.showWrite
    },
    // 审核函数
    Audit (row) {
      this.$refs.Details.WriteLoading = true
      if (this.$data.tableData) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData, this.$options.data().tableData)
        this.$axios.get(MachineauditInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.error !== true) {
            this.showWrite = true
            try {
              if (res.data) {
                this.showWrite = true
                this.tableData = res.data
                this.tableData = Object.assign({}, this.tableData, {id: row.id})
                this.$refs.Details.setWriteData(this.tableData)
              } else { this.$message.error('查询详情失败') }
            } catch (e) {
              console.log(e)
            }
          } else { this.$message.error('查询详情失败') }
        })
      }
      this.$refs.Details.WriteLoading = false
    }
  },
  components: {
    Details
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
