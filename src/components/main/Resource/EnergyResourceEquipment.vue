<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form ref="NodeQueryForm" :data="query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="query.resourcename" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备类型：">
                <el-select v-model="query.equipmenttype" filterable remote reserve-keyword :filter-method="querySearch" :loading="Loading" >
                  <el-option v-for="item in queryList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
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

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="equipmenttype_id" label="设备类型" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加能源站点设备配置' : WriteState === 1 ? '编辑能源站点设备配置' : '能源站点设备配置详情'"></layuiTitle>
      <Details :WriteState="WriteState" @fatherClose="closeWrite" ref="Details" @fatheretMore="getMore(pagination.currentPage)"/>
    </div>
  </div>
</template>

<script>
import layuiTitle from 'base/layui-title'
import { GetEnergyResourceEquipmentList, GetResourceEquipmentInfo, DelResourceEquipment, GetEquipmentTypeList } from 'api/api'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/Resource/ResourceEquipmentDe'

export default {
  name: 'ResourceEquipment',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询区域相关属性
      query: {
        resourcename: '',
        equipmenttype: ''
      },
      queryList: [],
      // 加载
      Loading: false,
      tableList: [
      ],
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
    // 第一个参数为访问地址，第二个参数为存入值容器，第三个参数为搜索字符串
    this.getMore(1)
    this.querySearch()
  },
  created () {
  },
  methods: {
    querySearch (query) {
      this.Loading = true
      // console.log(this.query.equipmenttype)
      this.$axios.get(GetEquipmentTypeList, {
        params: {
          name: query,
          classify: 2,
          PageIndex: 1,
          PageSize: 200
        }
      }).then(res => {
        this.queryList = res.data.list
      }).catch(error => {
        console.log(error)
      })
      this.Loading = false
    },
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(GetEnergyResourceEquipmentList,
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
      this.queryOption = []
      Object.assign(this.$data.query, this.$options.data().query)
      this.getMore(1)
    },
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    // 处理编辑函数
    handleWrite (state, row) {
      // console.log(this.tableData)
      this.WriteState = state
      if (state === 0) this.showWrite = true
      // this.tableData = {}
      // console.log(this.tableData)
      if (state) {
        this.$refs.Details.WriteLoading = true
        this.$axios.get(GetResourceEquipmentInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          this.$refs.Details.WriteLoading = false
          if (res.error !== true) {
            this.showWrite = true
            try {
              this.tableData = res.data
              this.$refs.Details.setWriteData(this.tableData)
            } catch (e) {
              console.log(e)
            }
          } else { this.$message.error('查询详情失败') }
        })
      }
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.getMore(1)
      this.showWrite = !this.showWrite
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelResourceEquipment, {
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
    layuiTitle,
    Details
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
