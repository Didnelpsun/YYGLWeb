<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :data="query" ref="NodeQueryForm">
        <el-row>
          <!--区域级联选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="审核状态：">
                <el-select v-model="query.ifarchived" placeholder="请选择是否归档">
                  <el-option label="已归档" :value="true"></el-option>
                  <el-option label="未归档" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="油机缸号：">
                <el-input v-model="query.machinebatchno" placeholder="请输入油机缸号" @keyup.enter.native="getMore(1)"></el-input>
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
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
              <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">>
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="75"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="75"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="75"></el-table-column>
        <el-table-column prop="machinenumber" label="油机编号" width="150"></el-table-column>
        <el-table-column prop="machinebatchno" label="油机缸号" width="150"></el-table-column>
        <el-table-column prop="manufactorname" label="厂家" width=""></el-table-column>
        <el-table-column prop="modelname" label="型号" width=""></el-table-column>
        <el-table-column prop="power" label="功率" width="75"></el-table-column>
        <el-table-column prop="fueltypename" label="燃油类型" width=""></el-table-column>
        <el-table-column prop="enginestatename" label="油机状态" width=""></el-table-column>
        <!-- <el-table-column prop="applicanttype" label="申请类型" width="75" :formatter="applicanttypeFormat"></el-table-column> -->
        <el-table-column prop="auditorstate" label="审核状态" width="" :formatter="auditorstateFormat"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)" v-if="!ifarchivedState">编辑</el-button>
            <el-button type="text" size="mini" @click="handleUnbundling(scope.row)">解绑</el-button>
            <el-button type="text" size="mini" @click="handleWrite(3,scope.row)">绑定</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)" v-if="!ifarchivedState">删除</el-button>
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
      <Details :WriteState="WriteState" :dictionaryList="dictionaryList" @fatherClose="closeWrite" ref="Details" :id="id"
                     @fatherOpenImgBox="OpenImgBox" @fatheretMore="getMore(pagination.currentPage)" @fathersetData="setData"/>
    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import { DictionaryInfoList } from 'api/api'
import { GetEngineListInfo, AppGetEngineIdListInfo, DeletEngine, EngineUnbundling } from 'api/YJGL'
import { GlobalRes } from 'common/js/mixins'
import ImgBox from '../../../base/ImgBox'
import Details from 'base/YJGL/EngineList'

export default {
  name: 'Battery',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        ifarchived: true,
        AreaList: [
        ],
        machinebatchno: '',
        manufactor: '',
        model: '',
        Fueltype: ''
      },
      // 判断归档查询状态
      ifarchivedState: true,
      queryOption: [],
      // 加载
      Loading: false,
      // 保存属性取值的列表
      dictionaryList: {
        areaList: [],
        // unit
        unitList: [],
        // manufactor
        manufactorList: [],
        // models
        modelList: [],
        // state
        enginestateList: [],
        // fueltype
        fueltypeList: []
      },
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
      //  动态改变css样式
      isValid: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      id: ''
    }
  },
  activated () {
    // 第一个参数为访问地址，第二个参数为存入值容器，第三个参数为搜索字符串
    this.getList()
    // this.check(AreaList)
    this.getMore(1)
  },
  created () {
  },
  methods: {
    getList () {
      let s = [
        '油机归属单位',
        '油机调度厂家',
        '油机调度型号',
        '油机状态',
        '油机燃油类型'
      ]
      this.Loading = true
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.dictionaryList.unitList = data.filter(i => {
            return i.type === '油机归属单位'
          })
          this.dictionaryList.manufactorList = data.filter(i => {
            return i.type === '油机调度厂家'
          })
          this.dictionaryList.modelList = data.filter(i => {
            return i.type === '油机调度型号'
          })
          this.dictionaryList.enginestateList = data.filter(i => {
            return i.type === '油机状态'
          })
          this.dictionaryList.fueltypeList = data.filter(i => {
            return i.type === '油机燃油类型'
          })
        } else {
          this.$message.error(res.msg)
        }
      })
      this.Loading = false
    },
    // writeDic: GlobalRes.methods.writeDic,
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      let area = {
        'provinceid': this.query.AreaList[0],
        'cityid': this.query.AreaList[1],
        'areaid': this.query.AreaList[2]
      }
      this.$axios.get(GetEngineListInfo,
        {
          params: Object.assign({}, area, {
            pageIndex: e,
            pageSize: this.pagination.pageSize,
            machinebatchno: this.query.machinebatchno,
            manufactor: this.query.manufactor,
            model: this.query.model,
            Fueltype: this.query.Fueltype,
            ifarchived: this.query.ifarchived
          })
        })
        .then(res => {
          this.Loading = false
          this.tableList = res.data.list
          this.pagination.total = res.data.total
          this.ifarchivedState = this.query.ifarchived
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
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
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
    setData (state, id) {
      if (state) {
        this.id = id
        this.$axios.get(AppGetEngineIdListInfo, {
          params: {
            id: this.id
          }
        }).then(res => {
          if (res.error !== true) {
            this.showWrite = true
            try {
              this.tableData = res.data
              if (state === 3) {
                this.tableData.swver = null
                this.tableData.modulecode = null
                this.tableData.collectorid = null
                this.tableData.collectorid = null
                this.tableData.tagid = null
                this.tableData.imglist = null
              }
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
      if (state === 0) { this.showWrite = true } else {
        this.setData(state, row.id)
      }
      this.$refs.Details.WriteLoading = false
    },
    handleUnbundling (row) {
      this.$confirm(`您确定要解绑 ${row.machinenumber} 油机吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(EngineUnbundling, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.getMore(this.pagination.currentPage)
            this.$message.success('解绑成功！')
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.machinenumber} 油机吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DeletEngine, {
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
    ImgBox,
    Details
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
