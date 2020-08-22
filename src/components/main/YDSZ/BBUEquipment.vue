<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query" size="mini">
        <el-row>
          <!--选择器-->
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="区域：">
                <el-cascader v-model="Query.AreaList" :props="QareaProps" clearable @change="changeArea(Query)"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="基站名称：">
                <el-input v-model="Query.logicstandname" placeholder="请填写基站名称" @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="确认站址：">
                <el-input v-model="Query.sitename" placeholder="请填写站址名称"  @keyup.enter.native="getMore(1)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="设备标识码：">
                <el-input v-model="Query.sharingnumber" placeholder="请填写设备标识码"  @keyup.enter.native="getMore(1)"></el-input>
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
            <!--<el-button @click="handleAdd" type="success" icon="el-icon-plus">添加</el-button>-->
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template></el-table-column>
        <!-- <el-table-column prop="provincename" label="省份" width="70"></el-table-column> -->
        <el-table-column prop="cityname" label="地市" width="80"></el-table-column>
        <el-table-column prop="areaname" label="区域" width="80"></el-table-column>
        <el-table-column prop="logicstandname" label="基站名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="logicstandcode" label="基站编码" width="140"></el-table-column>
        <el-table-column prop="sharingnumber" label="设备标识码" width="" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="models" label="设备型号" width=""></el-table-column>
        <el-table-column prop="manufacturer" label="设备厂家" width=""></el-table-column>
        <el-table-column prop="rrunumber" label="RRU数量" width=""></el-table-column>
        <el-table-column prop="sitename" label="确认站址" width="120"></el-table-column>
        <el-table-column prop="confirmtime" label="确认时间" width="" :formatter="formatDate"></el-table-column>
        <el-table-column prop="confirmusername" label="确认人" width=""></el-table-column>

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
      <layuiTitle :title="WriteState === 0 ? '添加BBU设备' : WriteState === 1 ? '编辑BBU设备' : 'BBU设备详情'"></layuiTitle>
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small" v-loading="WriteLoading">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="120"/>
              <col width="230"/>
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
                <col width="230"/>
                <col width="50"/>
                <!-- <col width="400"/> -->
                <col width="100"/>
              </colgroup>
              <tbody>
              <!--<tr class="el-table__row" v-if="WriteState === 0">
                <td><div class="cell">区域</div></td>
                <td><div class="cell">
                  <el-form-item class="form-item" prop="AreaList">
                    <el-cascader v-model="WriteData.AreaList" :props="areaProps" @change="changeArea(WriteData)"
                                 ref="csArea"></el-cascader>
                  </el-form-item>
                </div></td>
                <td><div class="cell"></div></td>
                &lt;!&ndash; <td><div class="cell"></div></td> &ndash;&gt;
                <td><div class="cell"></div></td>
              </tr>-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">地市</div></td>
                <td><div class="cell">{{WriteData.cityname}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">区域</div></td>
                <td><div class="cell">{{WriteData.areaname}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>确认站址</div></td>
                <td v-show="WriteState !== 2"><div class="cell" @click="showDialog(1)">
                  <el-form-item class="form-item" prop="sitename">
                    <el-input v-model="WriteData.sitename" readonly placeholder="请点击选择站址"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.sitename}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">基站名称</div></td>
                <td v-show="WriteState !== 2"><div class="cell" @click="showDialog(2)">
                  <el-form-item class="form-item" prop="logicstandname">
                    <el-input v-model="WriteData.logicstandname" readonly placeholder="请点击选择基站"></el-input>
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
                    <el-input v-model="WriteData.logicstandcode" readonly placeholder="请先选择基站"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.logicstandcode}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备标识码</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="sharingnumber">
                    <el-input v-model="WriteData.sharingnumber" readonly></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.sharingnumber}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备型号</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="models">
                    <el-input v-model="WriteData.models"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.models}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备厂家</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="manufacturer">
                    <el-input v-model="WriteData.manufacturer"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.manufacturer}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>RRU数量</div></td>
                <td v-show="WriteState !== 2"><div class="cell">
                  <el-form-item class="form-item" prop="rrunumber">
                    <el-input v-model.number="WriteData.rrunumber"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2"><div class="cell">{{WriteData.rrunumber}}</div></td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">设备照片</div></td>
                <td><div class="cell"></div></td>
                <td @click="OpenImgBox(1)"><div class="cell" style="cursor: pointer;color: #409EFF;">有&nbsp;{{ImgList1.length}}&nbsp;张图片</div></td>
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
    <el-dialog top="1%" :visible.sync="isShow" width="80%" :before-close="DetailhandleClose">
      <SiteList v-if="showSite" @selectSite="selectSite"/>
      <LogicStationList v-if="showLogicStation" @selectSite="selectLogicStation"/>
    </el-dialog>
    <ImgBox ref="ImgBox"></ImgBox>
    <Import ref="ImportBox" @fatherGetData="getData1"></Import>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
import Import from 'base/Import'
import layuiTitle from 'base/layui-title'
import {formatDate} from 'common/js/cache'
import SiteList from 'base/YDSZ/SiteList'
import LogicStationList from 'base/YDSZ/LogicStationList'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GetBBUList, GetBBUInfo, BBUDownExcel, exportMethod, ImportBBUExcel, CreateBBU, UpdateBBU} from 'api/YDSZ'
export default {
  name: 'BBUEquipment',
  mixins: [GlobalRes],
  data () {
    return {
      Query: {
        AreaList: [],
        logicstandname: '',
        sitename: '',
        sharingnumber: '',
        provinceid: null, // 省份
        cityid: null, // 城市
        areaid: null // 区域
      },
      WriteData: {
        /* AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0, */
        sitename: '',
        logicstandname: '',
        logicstandcode: '',
        sharingnumber: '',
        models: '',
        manufacturer: '',
        longitude: '',
        latitude: '',
        logicstandid: '',
        rrunumber: null,
        createuserid: '',
        createusername: '',
        id: '',
        siteid: '',
        createtime: '',
        imglist: []
      },
      Rules: {
        sitename: [
          { required: true, message: '请选择确认站址', trigger: 'change' }
        ],
        longitude: [
          {required: false, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: false, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        rrunumber: [
          { required: true, message: '请填写RRU数量', trigger: 'blur' }
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
      ImgList1: [],
      Loading: false,
      isShow: false,
      showSite: false,
      showLogicStation: false
    }
  },
  activated () {
    this.getData1()
    this.$refs.ImportBox.searchName = '移动上站BBU模板'
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
      this.$axios.get(GetBBUList, {params: Object.assign({}, this.Query, {
        PageIndex: e,
        PageSize: this.pageSize
      })}).then(res => {
        this.Loading = false
        if (res.errorCode === '200') {
          this.tableList = res.data.list
          this.total = res.data.total
          if (!this.tableList.length && this.Query.sharingnumber) {
            this.$confirm('未查询到该设备标识码对应的BBU,是否新增', '提示', {
              type: 'warning'
            }).then(() => {
              this.handleAdd()
              this.WriteData.sharingnumber = this.Query.sharingnumber
            })
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getData1 () {
      this.currentPage = 1
      this.Loading = true
      this.$axios.get(GetBBUList, {
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
    DetailhandleClose () {
      this.isShow = !this.isShow
      this.showSite = false
      this.showLogicStation = false
    },
    showDialog (val) {
      this.isShow = true
      if (val === 1) {
        this.showSite = true
      } else if (val === 2) {
        this.showLogicStation = true
      }
    },
    handleAdd () {
      this.showWrite = true
      this.WriteState = 0
    },
    selectSite (name, id) {
      this.WriteData.sitename = name
      this.WriteData.siteid = id
      this.isShow = false
      this.showSite = false
    },
    selectLogicStation (code, id, name) {
      this.WriteData.logicstandcode = code
      this.WriteData.logicstandid = id
      this.WriteData.logicstandname = name
      this.isShow = false
      this.showLogicStation = false
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
          this.$axios.post(CreateBBU, this.WriteData).then(res => {
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
          return this.$message.error('请输入站址名称！')
        } else {
          this.Loading = true
          this.WriteData.longitude = this.WriteData.longitude ? this.WriteData.longitude : 0
          this.WriteData.latitude = this.WriteData.latitude ? this.WriteData.latitude : 0
          this.WriteData.imglist = this.WriteData.imglist ? this.WriteData.imglist : []
          this.$axios.put(UpdateBBU, this.WriteData).then(res => {
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
      this.$axios.get(GetBBUInfo, {
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
        if (res.data.imglist) {
          this.setImgList(res.data.imglist)
        }
      })
    },
    OpenImgBox (val) {
      switch (val) {
        case 1:
          this.$refs.ImgBox.SetData('BBU设备照片', 'equipment_img', this.ImgList1)
          break
      }
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    setImgList (list) {
      list.forEach((item) => {
        if (item.field_name === 'equipment_img') this.ImgList1.push(item)
      })
    },
    WriteClose () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.$refs.WriteForm.clearValidate()
      // this.setArea([])
      this.ImgList1 = []
      this.showWrite = false
      this.getData1()
    },
    formatDate (row) {
      return formatDate(row.confirmtime)
    },
    SiteExport () {
      this.$confirm(`您确定要导出吗？`, '提示', {
        type: 'info'
      }).then(() => {
        let myObj = {
          method: 'get',
          url: BBUDownExcel,
          fileName: 'BBU设备',
          data: this.Query
        }
        exportMethod(myObj)
      })
    },
    showImport () {
      this.$refs.ImportBox.Open()
      this.$refs.ImportBox.uploadURL = ImportBBUExcel
      this.$refs.ImportBox.fileName = '错误BBU数据'
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: {
    layuiTitle,
    ImgBox,
    Import,
    SiteList,
    LogicStationList
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
