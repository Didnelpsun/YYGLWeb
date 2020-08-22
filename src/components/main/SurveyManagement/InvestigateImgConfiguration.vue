<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :data="query" ref="NodeQueryForm">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="归属项：">
                <el-input class="searchSelect" v-model="query.attribution" placeholder="请输入归属项"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="图片标题：">
                <el-input class="searchSelect" v-model="query.title" placeholder="请输入图片标题"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8">
              <el-form-item label="建站方式：">
                <el-select class="searchSelect" v-model="query.constructionmode">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="i in constructionmodeList" :key="i.value" :label="i.text" :value="i.value"></el-option>
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
      </el-form>
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="attribution" label="归属项" width=""></el-table-column>
        <el-table-column prop="title" label="图片标题" width=""></el-table-column>
        <el-table-column prop="constructionmodesname" label="建站方式" width="100"></el-table-column>
        <el-table-column prop="sort" label="排序号" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建用户" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="100"></el-table-column>
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

    <div v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加勘察图片配置' : WriteState === 1 ? '编辑勘察图片配置' : '勘察图片配置详情'"></layuiTitle>
      <Details :WriteState="WriteState" @fatherClose="closeWrite" ref="Details" :constructionmodeList="constructionmodeList"/>
    </div>
  </div>
</template>

<script>
import layuiTitle from 'base/layui-title'
import { GetInvestigateImgConfigurationList, GetInvestigateImgConfigurationInfo, DelInvestigateImgConfiguration } from 'api/SurveyManagement'
import { DictionaryInfoList } from 'api/api'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/SurveyManagement/InvestigateImgConfiguration'

export default {
  name: 'Battery',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        attribution: '',
        title: '',
        constructionmode: null
      },
      constructionmodeList: [],
      // 加载
      Loading: false,
      isShow: false,
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
    this.getList()
    this.getMore(1)
  },
  created () {
  },
  methods: {
    // writeDic: GlobalRes.methods.writeDic,
    getList () {
      let s = ['勘察建站方式']
      this.Loading = true
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.constructionmodeList = data.filter(i => {
            return i.type === '勘察建站方式'
          })
        }
      })
      this.Loading = false
    },
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(GetInvestigateImgConfigurationList,
        {
          params: {
            pageIndex: e,
            pageSize: this.pagination.pageSize,
            attribution: this.query.attribution,
            title: this.query.title,
            constructionmode: this.query.constructionmode
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
      if (state) {
        this.$axios.get(GetInvestigateImgConfigurationInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
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
      this.$refs.Details.WriteLoading = false
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.name} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelInvestigateImgConfiguration, {
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
