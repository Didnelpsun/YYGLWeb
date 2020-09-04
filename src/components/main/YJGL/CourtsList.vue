<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
              <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增台区</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList"  v-loading="Loading" style="margin-top: 15px" :row-key="getRowKeys" :expand-row-keys="expandKey" @expand-change="changeKey">
        <el-table-column type="expand">
          <el-table :data="boardData" v-loading="Loading">
            <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
            <!-- <el-table-column prop="provincename" label="省份" width="75"></el-table-column> -->
            <el-table-column prop="name" label="站点名称" width=""></el-table-column>
            <el-table-column prop="code" label="站点编码" width=""></el-table-column>
            <el-table-column prop="realityname" label="提交人" width=""></el-table-column>
            <el-table-column prop="founderdatetime" label="提交时间" width=""></el-table-column>
          </el-table>
        </el-table-column>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width=""></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width=""></el-table-column>
        <el-table-column prop="areaname" label="区域" width=""></el-table-column>
        <el-table-column prop="name" label="台区名称" width=""></el-table-column>
        <el-table-column prop="powersubstation" label="供电所" width=""></el-table-column>
        <el-table-column prop="powersupplycontact" label="供电联系人" width=""></el-table-column>
        <el-table-column prop="createusername" label="提交人" width=""></el-table-column>
        <el-table-column prop="createdatetime" label="提交时间" width=""></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button> -->
            <el-button type="text" size="mini" @click="handleWrite(3,scope.row)">添加</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="text" size="mini" @click="add(scope.row)">新增站点</el-button>
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
      <Details :WriteState="WriteState" :id="id" @fatherClose="closeWrite" ref="Details" @fatheretMore="getMore(pagination.currentPage)" />
    </div>
    <el-dialog top="1%" :visible.sync="isShow" title="选择站点ID" width="80%" :before-close="DetailhandleClose">
      <SitePicker @selectSite="selectSite" ref="site"/>
    </el-dialog>
  </div>
</template>

<script>
import { GetCourtsList, GetIdCourtsInfo, GetCourtsIdScope, DeleteCourts } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/CourtsList'
import SitePicker from 'base/YJGL/SitePicker'

export default {
  name: 'CourtsList',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      isShow: false, //
      // 加载
      Loading: false,
      tableList: [
      ],
      expandKey: [],
      getRowKeys: (row) => {
        return row.id
      },
      tableData: {},
      boardData: [],
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      id: '',
      showWrite: false,
      showWrite1: false,
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
      this.$axios.get(GetCourtsList,
        {
          params: {
            pageIndex: e,
            pageSize: this.pagination.pageSize
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
    selectSite () {
      this.isShow = false
    },
    changeKey (row, rowList) {
      this.Loading = true
      if (rowList.length) {
        this.expandKey = []
        if (row) {
          this.$axios.get(GetCourtsIdScope, {
            params: {
              id: row.id,
              pageSize: 1000,
              pageIndex: 1
            }
          }).then(res => {
            if (res.error !== true) {
              try {
                Object.assign(this.$data.boardData, this.$options.data().boardData)
                this.boardData = res.data.list
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
      this.Loading = false
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
    add (row) {
      this.isShow = true
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    },
    // 处理编辑函数
    handleWrite (state, row) {
      this.$refs.Details.WriteLoading = true
      if (this.tableData) {
        // this.$data.tableData = {}
        Object.assign(this.$data.tableData, this.$options.data().tableData)
      }
      // console.log(this.tableData)
      this.WriteState = state
      if (state === 0) { this.showWrite = true } else {
        this.id = row.id
        this.$axios.get(GetIdCourtsInfo, {
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
      this.$confirm(`您确定要删除 ${row.name} 台区吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DeleteCourts, {
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
    Details,
    SitePicker
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
