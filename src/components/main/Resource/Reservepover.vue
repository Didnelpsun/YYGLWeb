<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <!--<el-collapse v-model="activeName" accordion>-->
      <!--<el-collapse-item title="查询条件">-->
      <el-form ref="NodeQueryForm" :data="query">
        <el-row>
          <!--区域级联选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="query.AreaList" :props="QareaProps" @change="changeArea(query)" ref="queryInput" :options="queryOption"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="站点名称：">
                <el-input v-model="query.resourcename" placeholder=请输入站点名称 @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备状态：">
                <el-select class="searchSelect" v-model="query.dayfacetypes">
                  <el-option label="请选择" :value="null"></el-option>
                  <el-option v-for="i in dictionaryList.stateList" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间：">
                <el-date-picker class="tableSelect" v-model="query.starttime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择开始时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="至：">
                <el-date-picker class="tableSelect" v-model="query.endtime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择结束时间">
                </el-date-picker>
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
        <!-- <div class="center">
        </div> -->
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <!--<el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button>-->
            <el-button @click="handleExport" type="success" icon="el-icon-download">导出</el-button>
          </div>
        </el-col>
      </el-row>

      <!--</el-collapse-item>-->
      <!--</el-collapse>-->
      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="code" label="设备编码" width="110"></el-table-column>
        <el-table-column prop="resourcename" label="站点名称" width=""></el-table-column>
        <el-table-column prop="resourcecode" label="站点编码" width=""></el-table-column>
        <el-table-column prop="cityname" label="地市" width="75"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="75"></el-table-column>
        <el-table-column prop="accessdate" label="入网日期" width=""></el-table-column>
        <el-table-column prop="propertyrightunitname" label="产权单位" width=""></el-table-column>
        <el-table-column prop="statename" label="设备状态" width=""></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <!--<el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>-->
            <!--<el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>-->
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
      <layuiTitle :title="WriteState === 0 ? '添加备电' : WriteState === 1 ? '编辑备电' : '备电详情'"></layuiTitle>
      <Details :WriteState="WriteState" :dictionaryList="dictionaryList" @fatherClose="closeWrite" ref="Details"
               @fatherOpenImgBox="OpenImgBox" @fatheretMore="getMore(pagination.currentPage)"/>
    </div>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import layuiTitle from 'base/layui-title'
import { GetReservepoverList, GetReservepoverInfo, DictionaryInfoList, DelEquipment, GetReservepoverExcel } from 'api/api'
import { GlobalRes } from 'common/js/mixins'
import {exportMethod} from 'api/YDSZ'
import ImgBox from '../../../base/ImgBox'
import Details from 'base/Resource/ReservepoverDe'

export default {
  name: 'Reservepover',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询区域相关属性
      query: {
        AreaList: [
        ],
        resourcename: '',
        dayfacetypes: null,
        starttime: '',
        endtime: ''
      },
      queryOption: [],
      // 加载
      Loading: false,
      isShow: false,
      // 保存属性取值的列表
      dictionaryList: {
        // type
        tyList: [],
        // // provinceid
        // provinceList: [],
        // // cityid
        // cityList: [],
        // propertyrightunit
        propertyrightunitList: [],
        // unit
        unitList: [],
        // manufacturer
        manufacturerList: [],
        // maintenanceunit
        maintenanceList: [],
        // models
        modelsList: [],
        // state
        stateList: []
        // typeList是type属性的图片列表
      },
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
    this.getList()
    // this.check(AreaList)
    this.getMore(1)
  },
  created () {
  },
  methods: {
    getList () {
      let s = ['备电设备细分类型',
        // '省份',
        // '地市',
        // '区域',
        '设备存放点类型',
        '设备单位',
        '设备产权单位',
        '备电设备厂家',
        '设备维护单位',
        '备电设备型号',
        '设备状态'
      ]
      this.Loading = true
      this.$axios.post(DictionaryInfoList, s).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.dictionaryList.tyList = data.filter(i => {
            return i.type === '备电设备细分类型'
          })
          this.dictionaryList.unitList = data.filter(i => {
            return i.type === '设备单位'
          })
          this.dictionaryList.propertyrightunitList = data.filter(i => {
            return i.type === '设备产权单位'
          })
          this.dictionaryList.manufacturerList = data.filter(i => {
            return i.type === '备电设备厂家'
          })
          this.dictionaryList.maintenanceList = data.filter(i => {
            return i.type === '设备维护单位'
          })
          this.dictionaryList.modelsList = data.filter(i => {
            return i.type === '备电设备型号'
          })
          this.dictionaryList.stateList = data.filter(i => {
            return i.type === '设备状态'
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
      this.$axios.get(GetReservepoverList,
        {
          params: Object.assign({}, area, {
            pageIndex: e,
            pageSize: this.pagination.pageSize,
            resourcename: this.query.resourcename,
            dayfacetypes: this.query.dayfacetypes,
            starttime: this.query.starttime,
            endtime: this.query.endtime
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
    OpenImgBox (title, name, list) {
      this.$refs.ImgBox.SetData(title, name, list)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    // 重置表单按钮
    resetQueryForm () {
      this.query.AreaList.splice(0, this.query.AreaList.length)
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
        this.showWrite = true
        this.$refs.Details.WriteLoading = true
        this.$axios.get(GetReservepoverInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          this.$refs.Details.WriteLoading = false
          if (res.error !== true) {
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
        this.$axios.delete(DelEquipment, {
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
    },
    handleExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: GetReservepoverExcel,
          fileName: '备电',
          data: this.Query
        }
        exportMethod(myObj)
      })
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    Details
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
