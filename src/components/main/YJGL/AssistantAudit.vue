<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
   <!--   <el-form :data="query" ref="NodeQueryForm">
        <el-row>
         <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="是否提交审核：" label-width="150px">
                <el-select v-model="query.isaudit" placeholder="请选择是否提交审核">
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
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
      </el-form>-->
      <el-row>
        <el-col :span="6" class="SearchResult">查询结果</el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="75"></el-table-column> -->
        <el-table-column prop="name" label="姓名" width="60"></el-table-column>
        <el-table-column prop="cardnum" label="身份证号" width="150"></el-table-column>
        <el-table-column prop="mobilnum" label="手机号" width="100"></el-table-column>
        <el-table-column prop="sparemobile" label="备用手机号" width="100"></el-table-column>
        <el-table-column prop="type" label="类型" width="75" :formatter="typeFormat"></el-table-column>
        <el-table-column prop="address" label="住址" width=""></el-table-column>
        <el-table-column prop="resourcesname" label="资源名" width=""></el-table-column>
        <el-table-column prop="resourcescode" label="资源编码" width=""></el-table-column>
        <el-table-column prop="realityname" label="提交人" width="75"></el-table-column>
        <el-table-column prop="dateIdinfo" label="提交时间" width="120"></el-table-column>
        <el-table-column label="操作" width="50" fixed="right">
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
import { GetAssistantList, AuditApplyInfo } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/AssistantAudit'

export default {
  name: 'AssistantAudit',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        isaudit: true
      },
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
      this.$axios.get(GetAssistantList,
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
    typeFormat (row, col) {
      if (row.type === 1) {
        return '站点'
      } else if (row.type === 2) {
        return '油机'
      }
    },
    // 审核函数
    Audit (row) {
      this.$refs.Details.WriteLoading = true
      if (this.$data.tableData) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData, this.$options.data().tableData)
        this.$axios.get(AuditApplyInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.error !== true) {
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
