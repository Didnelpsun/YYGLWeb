<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :data="query" ref="NodeQueryForm">
        <el-row>
          <!--区域级联选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="query.AreaList" :props="areaProps" @change="changeArea(query)" ref="csArea" clearable></el-cascader>
              </el-form-item>
            </el-col>
           <!-- <el-col :span="8">
              <el-form-item label="采集器id：" label-width="125px">
                <el-input v-model="query.swver" placeholder="请输入采集器编码" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>-->
            <el-col :span="8">
              <el-form-item label="是否绑定油机：" label-width="125px">
                <el-select v-model="query.Isbinding" placeholder="请选择是否绑定油机">
                  <el-option label="已绑定油机" :value="true"></el-option>
                  <el-option label="未绑定油机" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="厂家：" label-width="125px">
                <el-input v-model="query.faccode" placeholder="请输入厂家" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="8">
              <el-form-item label="设备名称：" label-width="125px">
                <el-input v-model="query.swver" placeholder="请输入设备名称" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>-->
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
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
              <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width=""></el-table-column> -->
        <el-table-column prop="cityname" label="区域" width=""></el-table-column>
        <!-- <el-table-column prop="areaname" label="区域" width=""></el-table-column> -->
        <el-table-column prop="swver" label="采集器ID" width=""></el-table-column>
        <el-table-column prop="cardnumber" label="手机卡号" width=""></el-table-column>
        <el-table-column prop="imsi" label="IMSI" width=""></el-table-column>
        <el-table-column prop="imei" label="IMEI" width=""></el-table-column>
        <el-table-column prop="creatortime" label="注册时间" width=""></el-table-column>
        <el-table-column prop="type" label="通信状态" width=""></el-table-column>
        <el-table-column prop="modulecode" label="标签编码" width=""></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width=""></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width=""></el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)" v-if="!showIsbinding">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)" v-if="!showIsbinding">删除</el-button>
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
      <Details :WriteState="WriteState" @fatherClose="closeWrite" :showIsbinding="showIsbinding" ref="Details" @fatheretMore="getMore(pagination.currentPage)"/>
    </div>
  </div>
</template>

<script>
import { GetcollectorIdInfo, GetcollectorList, Deletecollector } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/CollectorList'

export default {
  name: 'CollectorList',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        /*   swver: null, // 采集器id */
        faccode: null,
        Isbinding: false,
        AreaList: [],
        provinceid: null,
        cityid: null,
        areaid: null
      },
      // 加载
      Loading: false,
      showIsbinding: true,
      tableList: [
      ],
      tableData: {},
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      showWrite: false,
      WriteState: 0 // 0为添加 1为编辑 2为查看
    }
  },
  activated () {
    // this.check(AreaList)
    this.getMore(1)
  },
  created () {
  },
  methods: {
    // writeDic: GlobalRes.methods.writeDic,
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(GetcollectorList,
        {
          params: Object.assign({}, this.query,
            {
              pageIndex: e,
              pageSize: this.pagination.pageSize
            }
          )
        })
        .then(res => {
          this.query.Isbinding ? this.showIsbinding = true : this.showIsbinding = false
          this.Loading = false
          this.tableList = res.data.list
          this.pagination.total = res.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 重置表单按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
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
    setData (state, id) {
      if (state) {
        this.id = id
        this.$axios.get(GetcollectorIdInfo, {
          params: {
            id: this.id
          }
        }).then(res => {
          if (res.error !== true) {
            this.showWrite = true
            try {
              this.tableData = res.data
              console.log(res.data)
              this.$refs.Details.setWriteData(this.tableData)
            } catch (e) {
              console.log(e)
            }
          } else { this.$message.error('查询详情失败') }
        })
      }
    },
    // 处理编辑函数
    handleWrite (state, row) {
      this.$refs.Details.WriteLoading = true
      if (this.$data.tableData !== null || this.$data.tableData !== undefined) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData, this.$options.data().tableData)
      }
      // console.log(this.tableData)
      this.WriteState = state
      if (state === 0) this.showWrite = true
      else {
        this.setData(state, row.id)
      }
      this.$refs.Details.WriteLoading = false
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.machinenumber} 模块吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(Deletecollector, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.getMore(this.pagination.currentPage)
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(error => {
        console.log(error)
      })
      // console.log(this.pagination)
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
