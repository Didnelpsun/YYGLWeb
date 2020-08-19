<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
              <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px" >
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width=""></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width=""></el-table-column>
        <el-table-column prop="fueltypename" label="油机类型" width=""></el-table-column>
        <el-table-column prop="stationcode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="stationname" label="站点名称" width=""></el-table-column>
        <el-table-column prop="storageplacetype" label="存放点位置类型" width=""></el-table-column>
        <el-table-column prop="placeinfo" label="存放点位置" width=""></el-table-column>
        <el-table-column prop="realityname" label="提交人" width=""></el-table-column>
        <el-table-column prop="dateinfo" label="提交时间" width=""></el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleUnbind(scope.row)">解绑</el-button>
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
      <Details :WriteState="WriteState" :dictionaryList="dictionaryList" @fatherClose="closeWrite" ref="Details" @fatheretMore="getMore(pagination.currentPage)"/>
    </div>
  </div>
</template>

<script>
import { EnginestoragepositionInfo, EnginestoragepositionList, DeteleEnginestorageposition, MachineUnbundling } from 'api/YJGL'
import { DictionaryInfoList } from 'api/api'
import { GlobalRes } from 'common/js/mixins'
import Details from 'base/YJGL/EngineStoragePosition'

export default {
  name: 'EngineStoragePosition',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 加载
      Loading: false,
      tableList: [
      ],
      tableData: {},
      dictionaryList: {
        storageplacetypeList: []
      },
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
    getList () {
      let s = [
        '油机存放位置类型'
      ]
      this.Loading = true
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.dictionaryList.storageplacetypeList = data.filter(i => {
            return i.type === '油机存放位置类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
      this.Loading = false
    },
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(EnginestoragepositionList,
        {
          params: Object.assign({}, this.query,
            {
              pageIndex: e,
              pageSize: this.pagination.pageSize
            }
          )
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
        this.$axios.get(EnginestoragepositionInfo, {
          params: {
            id: this.id
          }
        }).then(res => {
          if (res.error !== true) {
            this.showWrite = true
            try {
              this.tableData = res.data
              this.$nextTick(this.$refs.Details.setWriteData(this.tableData))
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
      if (this.$data.tableData) {
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
      this.$confirm(`您确定要删除 ${row.machinenumber} 固定部署吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DeteleEnginestorageposition, {
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
    },
    handleUnbind (row) {
      this.$confirm(`您确定要解绑 ${row.machinenumber} 固定部署吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(MachineUnbundling, {
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
