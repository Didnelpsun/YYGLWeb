<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row :gutter="20">
          <!--选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基站名称：">
                <el-input v-model="Query.logicstandname" placeholder="请输入基站名称"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基站编号：">
                <el-input v-model="Query.logicstandcode" placeholder="请输入基站编号"  @keyup.enter.native="getMore(1)"></el-input>
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
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="showImport" type="success" icon="el-icon-upload2">导入</el-button>
            <el-button @click="SiteExport" type="success" icon="el-icon-download">导出</el-button>
            <el-button @click="handleAdd" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="80"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="100"></el-table-column>
        <el-table-column prop="logicstandname" label="基站名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="logicstandcode" label="基站编码" width=""></el-table-column>
        <el-table-column prop="" label="BBU归属站点" width=""></el-table-column>
        <el-table-column prop="" label="RRU归属站点" width=""></el-table-column>
        <el-table-column prop="rrunumber" label="RRU数量" width=""></el-table-column>

        <el-table-column prop="" label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <!--<el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加逻辑站' : WriteState === 1 ? '编辑逻辑站' : '逻辑站详情'"></layuiTitle>
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small" v-loading="WriteLoading">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="120"/>
              <col width="100"/>
              <col width="50"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
              <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
            </tr>
            </thead>
          </table>
        </div>
        <!--表体-->
        <!--表体-->
        <el-form :model="WriteData" :rules="Rules" ref="WriteForm" label-width="0" :show-message="false">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col width="120"/>
                <col width="100"/>
                <col width="50"/>
                <!-- <col width="400"/> -->
                <col width="100"/>
              </colgroup>
              <tbody>
              <tr class="el-table__row" v-if="WriteState === 0">
                <td><div class="cell"><i class="must">*</i>区域</div></td>
                <td><div class="cell">
                  <el-form-item class="form-item" prop="AreaList">
                    <el-cascader v-model="WriteData.AreaList" :props="areaProps" @change="changeArea(WriteData)"
                                 ref="csArea"></el-cascader>
                  </el-form-item>
                </div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState !== 0">
                <td><div class="cell">地市</div></td>
                <td><div class="cell">{{WriteData.cityname}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState !== 0">
                <td><div class="cell">区域</div></td>
                <td><div class="cell">{{WriteData.areaname}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>基站名称</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="logicstandname">
                    <el-input v-model="WriteData.logicstandname"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.logicstandname}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">基站编码</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="logicstandcode">
                    <el-input v-model="WriteData.logicstandcode"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.logicstandcode}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">经度</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="longitude">
                    <el-input v-model="WriteData.longitude"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.longitude}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">纬度</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="latitude">
                    <el-input v-model="WriteData.latitude"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.latitude}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      <div class="center" style="padding-bottom: 10px">
        <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <Import ref="ImportBox" @fatherGetData="getData1"></Import>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import layuiTitle from 'base/layui-title'
import Import from 'base/Import'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GetLogicStandList, GetLogicStandInfo, exportMethod, DownLogicStandExcel, ImportLogicStandExcel, CreateLogicStand, UpdateLogicStand} from 'api/YDSZ'
export default {
  name: 'LogicStationManagement',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        logicstandname: '',
        logicstandcode: '',
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null // 区域
      },
      WriteData: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        logicstandname: '',
        logicstandcode: '',
        longitude: null,
        latitude: null
      },
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        logicstandname: [
          { required: true, message: '请输入基站名称', trigger: 'blur' }
        ],
        longitude: [
          {required: false, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: false, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ]
      },
      DicList: {},
      showWrite: false,
      WriteLoading: false,
      WriteState: null,
      tableList: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      PageIndex: 1,
      Loading: false
    }
  },
  activated () {
    this.getData1()
    this.$refs.ImportBox.searchName = '移动上站逻辑站模板'
    this.$refs.ImportBox.GetTemplateInfo()
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getMore (e) {
      this.Loading = true
      this.currentPage = e
      this.$axios.get(GetLogicStandList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.currentPage = 1
      this.Loading = true
      this.$axios.get(GetLogicStandList, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    handleAdd () {
      this.showWrite = true
      this.WriteState = 0
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.WriteData.longitude = this.WriteData.longitude ? this.WriteData.longitude : 0
          this.WriteData.latitude = this.WriteData.latitude ? this.WriteData.latitude : 0
          this.$axios.post(CreateLogicStand, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.WriteData.longitude = this.WriteData.longitude ? this.WriteData.longitude : 0
          this.WriteData.latitude = this.WriteData.latitude ? this.WriteData.latitude : 0
          this.$axios.put(UpdateLogicStand, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      this.WriteLoading = true
      this.$axios.get(GetLogicStandInfo, {
        params: {
          id: row.id
        }
      }).then(res => {
        this.WriteLoading = false
        this.WriteData = res.data
        if (state === 1) {
          this.WriteData.longitude = this.WriteData.longitude ? this.WriteData.longitude : null
          this.WriteData.latitude = this.WriteData.latitude ? this.WriteData.latitude : null
        }
      })
    },
    WriteClose () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.$refs.WriteForm.clearValidate()
      // this.setArea([])
      this.showWrite = false
      this.getData1()
    },
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: DownLogicStandExcel,
          fileName: '逻辑站管理',
          data: this.Query
        }
        exportMethod(myObj)
      })
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = ImportLogicStandExcel
      this.$refs.ImportBox.fileName = '错误逻辑站数据'
    }
  },
  components: {
    layuiTitle,
    Import
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
