<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
        <el-form :data="query" ref="NodeQueryForm">
          <el-row :gutter="20">
            <!--区域级联选择器-->
            <el-col :span="18">
              <el-col :span="8">
                <el-form-item label="区域：">
                  <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="站点名称：">
                  <el-input v-model="query.name" placeholder="请输入站点名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="站点编码：">
                  <el-input v-model="query.code" placeholder="请输入站点编码"></el-input>
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
        <el-col :offset="2" :span="18" class="fr">
          <!-- <div class="fr">
              <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button>
          </div> -->
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="75"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="75"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="75"></el-table-column>
        <el-table-column prop="name" label="站点名称" width=""></el-table-column>
        <el-table-column prop="code" label="站点编码" width=""></el-table-column>
        <el-table-column prop="" label="机房类型" width=""></el-table-column>
        <el-table-column prop="" label="起租" width=""></el-table-column>
        <!-- <el-table-column prop="address" label="详细地址" width=""></el-table-column> -->
        <el-table-column prop="ispower" label="是否注册发电点" width="125" :formatter="isPowerFormat"></el-table-column>
        <el-table-column prop="assistantname" label="协管员" width=""></el-table-column>
        <el-table-column prop="" label="保障级别" width=""></el-table-column>
        <el-table-column prop="" label="发电功率" width=""></el-table-column>
        <el-table-column prop="accessdate" label="录入时间" width=""></el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <!-- <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button> -->
            <!-- <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
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
      <Details :WriteState="WriteState" :dictionaryList="dictionaryList" @fatherClose="closeWrite" ref="Details" @fatheretMore="getMore(pagination.currentPage)"
      @fathersetData1="setData1" @fathersetData2="setData2"  @fathersetData3="setData3" @fathersetData4="setData4" @fathersetData5="setData5"/>
    </div>
  </div>
</template>

<script>
import { DictionaryInfoList } from 'api/api'
import { GetpowerpositionList, GetpowerpositionInfo, GetOperatorSiteList, GetSiteidAssistantInfo, GetSitepowerposition, Deletepowerposition, Getmonitoringsites } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/SiteList'

export default {
  name: 'SiteList',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      id: '',
      query: {
        AreaList: [
        ],
        name: '',
        code: '',
        provinceid: '',
        cityid: '',
        areaid: ''
      },
      queryOption: [],
      // 加载
      Loading: false,
      // 保存属性取值的列表
      dictionaryList: {
        // 站点类型
        resourcetypeList: []
      },
      tableList: [
      ],
      tableData1: {},
      tableData2: [],
      tableData3: [],
      tableData4: {},
      tableData5: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      showWrite: false,
      WriteState: 1 // 1为编辑 2为查看
    }
  },
  activated () {
    this.getList()
    // this.check(AreaList)
    this.getMore(1)
  },
  created () {
  },
  methods: {
    getList () {
      let s = [
        '站点类型'
      ]
      this.Loading = true
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.dictionaryList.resourcetypeList = data.filter(i => {
            return i.type === '站点类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
      this.Loading = false
    },
    isPowerFormat (row, col) {
      if (row.ispower) {
        return '是'
      } else {
        return '否'
      }
    },
    // writeDic: GlobalRes.methods.writeDic,
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.query.provinceid = this.query.AreaList[0]
      this.query.cityid = this.query.AreaList[1]
      this.query.areaid = this.query.AreaList[2]
      this.$axios.get(GetpowerpositionList,
        {
          params: Object.assign({}, this.query, {
            pageIndex: e,
            pageSize: this.pagination.pageSize
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
    // 重置表单按钮
    resetQueryForm () {
      this.query.AreaList.splice(0, this.query.AreaList.length)
      this.queryOption = []
      Object.assign(this.$data.query, this.$options.data().query)
      console.log(this.query)
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
      this.showWrite = false
    },
    // 处理编辑函数
    setData1 () {
      let params = { id: this.id }
      if (this.tableData1) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData1, this.$options.data().tableData1)
      }
      this.$axios.get(GetpowerpositionInfo, {
        params
      }).then(res => {
        if (res.success) {
          try {
            // console.log('setData1->res.data:')
            // console.log(res.data)
            this.tableData1 = res.data
            if (this.tableData1) {
              // console.log('setData1->set->this.tableData1:')
              // console.log(this.tableData1)
              this.$nextTick(this.$refs.Details.setWriteData1(this.tableData1))
              return true
            } else {
              // this.$message.warning('查询详情为空')
              return false
            }
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData2 () {
      let params = { id: this.id }
      if (this.tableData2) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData2, this.$options.data().tableData2)
      }
      this.$axios.get(Getmonitoringsites, {
        params
      }).then(res => {
        if (res.success) {
          try {
            this.tableData2 = res.data
            this.$nextTick(this.$refs.Details.setWriteData2(this.tableData2))
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData3 () {
      let params = { id: this.id }
      if (this.tableData3) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData3, this.$options.data().tableData3)
      }
      this.$axios.get(GetOperatorSiteList, {
        params
      }).then(res => {
        if (res.success) {
          try {
            this.tableData3 = res.data
            this.$nextTick(this.$refs.Details.setWriteData3(this.tableData3))
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData4 (id) {
      let params = { id: this.id }
      if (this.tableData4) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData4, this.$options.data().tableData4)
      }
      this.$axios.get(GetSiteidAssistantInfo, {
        params
      }).then(res => {
        if (res.success) {
          try {
            this.tableData4 = res.data
            this.$nextTick(this.$refs.Details.setWriteData4(this.tableData4))
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData5 (id) {
      let params = { id: this.id }
      if (this.tableData5) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData5, this.$options.data().tableData5)
      }
      this.$axios.get(GetSitepowerposition, {
        params
      }).then(res => {
        if (res.success) {
          try {
            this.tableData5 = res.data
            this.$nextTick(this.$refs.Details.setWriteData5(this.tableData5))
          } catch (e) {
            console.log(e)
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setData () {
      if (this.$nextTick(this.setData1())) {
        this.$refs.Details.setWriteData1(this.tableData1)
        // console.log('setData->this.tableData1:')
        // console.log(this.tableData1)
        this.showWrite = true
      } else {
        this.$message.error('查询详情失败')
        this.showWrite = false
      }
    },
    handleWrite (state, row) {
      this.$refs.Details.WriteLoading = true
      this.id = row.id
      // console.log(this.tableData)
      this.WriteState = state
      if (state) {
        this.setData()
      }
      this.$refs.Details.WriteLoading = false
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(Deletepowerposition, {
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
