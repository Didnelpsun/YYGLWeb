<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="运维站点名称：" label-width="150px">
                <el-input v-model="Query.monitoringname" placeholder="请输入运维站点名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所属站点名称：" label-width="150px">
                <el-input v-model="Query.resourcename" placeholder="请输入所属站点名称"></el-input>
              </el-form-item>
            </el-col>
            <!--<el-col :span="10">-->
              <!--<el-form-item label-width="150px" label="所属站点站点状态：">-->
                <!--<el-select v-model="Query.state" placeholder="请选择">-->
                  <!--<el-option label="请选择" value=""></el-option>-->
                  <!--<el-option v-for="item in DicList.state" :key="item.id" :label="item.text" :value="item.value"></el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="8">
              <el-form-item label-width="150px" label="所属站点区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" @change="changeArea(Query)" clearable></el-cascader>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="getMore(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button type="success" @click="SiteExport" icon="el-icon-download" >导出</el-button>
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="cityname" label="所属地市"></el-table-column>
        <el-table-column prop="areaname" label="所属区域"></el-table-column>
        <el-table-column prop="monitoringcode" label="运维ID"></el-table-column>
        <el-table-column prop="monitoringname" label="运维站点名称"></el-table-column>
        <el-table-column prop="resourcename" label="所属站点名称"></el-table-column>
        <el-table-column prop="createtime" label="创建时间"></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2,scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div class="write" v-show="showWrite" v-loading="WriteLoading">
      <layuiTitle :title="WriteState === 0 ? '添加运维站点' : WriteState === 1 ? '编辑运维站点' : '运维站点详情'"></layuiTitle>
      <Details :WriteData="WriteData" :WriteState="WriteState" :ImgList1="ImgList1" :ImgList2="ImgList2"
               :DicList="DicList" @fatherClose="WriteClose" @fatherOpenImgBox="OpenImgBox"
               @fatheretMore="getMore(1)" ref="Details"></Details>
    </div>

    <ImgBox ref="ImgBox"></ImgBox>

  </div>
</template>

<script>
import {GetMonitoringSite, DictionaryInfoList, MonitoringSiteIdInfo, DeleteMonitoringSite} from 'api/api'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GlobalRes} from 'common/js/mixins'
import Details from 'base/Resource/MonitoringSite'
import ImgBox from 'base/ImgBox'
import layuiTitle from 'base/layui-title'

export default {
  name: 'MonitoringSite',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        monitoringname: '',
        provinceid: null,
        cityid: null,
        areaid: null,
        // state: '',
        resourcename: ''
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      DicList: {
        state: [],
        workordersitetype: [],
        propertyrightunit: []
      },
      tableData: [],
      tableLoading: false,

      showWrite: false,
      ImgList1: [],
      ImgList2: [],
      WriteData: {
        AreaList: [],
        imglist: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        resourceid: '',
        resource_id: '',
        resourcename: '',
        monitoringcode: '',
        monitoringname: '',
        accessdate: '',
        longitude: null,
        latitude: null,
        workordersitetype: '',
        propertyrights: '',
        propertyrightunit: '',
        lifecycle: '',
        state: '',
        address: '',
        siteterrain: '',
        coversthescenario: '',
        identificationcode: ''
      },
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        'resource_id': [{ required: true, message: '请填写运维站点编码', trigger: 'change' }],
        monitoringcode: [{ required: true, message: '请填写运维站点编码', trigger: 'blur' }],
        monitoringname: [{ required: true, message: '请填写运维站点名称', trigger: 'blur' }],
        accessdate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        state: [{ required: true, message: '请填写站点类型', trigger: 'blur' }],
        workordersitetype: [{ required: true, message: '请填写站点类型', trigger: 'blur' }]
      },
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false
    }
  },
  activated () {
    this.getData1()
    this.getDic()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.ImgList1 = []
      this.ImgList2 = []
    },
    getData1 () {
      this.currentPage = 1
      this.Loading = true
      this.$axios.get(GetMonitoringSite, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    getMore (e) {
      this.currentPage = e
      this.Loading = true
      this.$axios.get(GetMonitoringSite, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    getDic () {
      this.$axios.post(DictionaryInfoList, ['站点状态', '站点类型', '设备产权单位']).then(res => {
        if (res.errorCode === '200') {
          this.DicList.state = res.data.filter(i => {
            return i.type === '站点状态'
          })
          this.DicList.workordersitetype = res.data.filter(i => {
            return i.type === '站点类型'
          })
          this.DicList.propertyrightunit = res.data.filter(i => {
            return i.type === '设备产权单位'
          })
        } else {
          this.$message.error(res.errorMessage)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },

    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.WriteLoading = true
        this.$axios.get(MonitoringSiteIdInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          this.WriteLoading = false
          this.WriteData = res.data
          this.setImgList(res.data.imglist)
          // this.$refs.Details.setWriteData(res.data)
        })
      }
    },
    WriteClose () {
      this.showWrite = false
      this.ResetWrite()
    },

    OpenImgBox (val) {
      switch (val) {
        case 1:
          this.$refs.ImgBox.SetData('运维ID', 'monitoringcode', this.ImgList1)
          break
        case 2:
          this.$refs.ImgBox.SetData('经度', 'longitude', this.ImgList2)
          break
      }
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },

    setImgList (list) {
      list.forEach((item) => {
        if (item.field_name === 'monitoringcode') this.ImgList1.push(item)
        if (item.field_name === 'longitude') this.ImgList2.push(item)
      })
    },
    handle2 (row) {
      this.$confirm(`您确定要删除 ${row.monitoringname} 资源吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DeleteMonitoringSite, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 导出数据
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        // let myObj = {
        //   method: 'get',
        //   url: null,
        //   fileName: '设备管理',
        //   data: this.Query
        // }
        // // exportMethod(myObj)
      })
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1.concat(this.ImgList2)
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: {
    layuiTitle,
    Details,
    ImgBox
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
