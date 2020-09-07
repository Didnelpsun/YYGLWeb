<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="Loading" ref="table1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="monitoringcode" label="运维ID"></el-table-column>
        <el-table-column prop="monitoringname" label="运维名称"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width=""></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(1,scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
      <div class="center">
        <el-button @click="handleClose" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加运维站点' : WriteState === 1 ? '编辑运维站点' : '运维站点详情'"></layuiTitle>

      <!--<Details :WriteState="WriteState" :DicList="DicList" @fatherOpenImgBox="OpenImgBox"
               @fatheretMore="getMore(currentPage)" @fatherClose="WriteClose" ref="Details"></Details>-->
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col width="80"/>
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
        <el-form :model="WriteData" :rules="Rules" v-loading="Loading" ref="WriteForm" label-width="0" :show-message="false">
          <div class="el-table__body-wrapper is-scrolling-none">
            <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
                <col width="80"/>
                <col width="100"/>
                <col width="50"/>
                <!-- <col width="400"/> -->
                <col width="100"/>
              </colgroup>
              <tbody>
              <!--运维ID-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>运维ID</div></td>
                <td><div class="cell">
                  <div v-show="WriteState == 2">{{WriteData.monitoringcode}}</div>
                  <div v-show="WriteState !== 2">
                    <el-form-item class="form-item" prop="monitoringcode">
                      <el-input v-model="WriteData.monitoringcode"></el-input>
                    </el-form-item>
                  </div></div>
                </td>
                <td @click="OpenImgBox()"><div class="cell">{{ImgList1.length}}</div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--运维站点名称-->
              <tr class="el-table__row">
                <td><div class="cell">运维站点名称</div></td>
                <td><div class="cell">
                  <div v-show="WriteState == 2">{{WriteData.monitoringname}}</div>
                  <div v-show="WriteState !== 2">
                    <el-input v-model="WriteData.monitoringname"></el-input>
                  </div></div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--经度-->
              <tr class="el-table__row" v-if="resourcetype === 1">
                <td><div class="cell"><i class="must">*</i>经度</div></td>
                <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                  <el-form-item class="form-item" prop="longitude">
                    <el-input v-model="WriteData.longitude" readonly style="width: 80%"></el-input>
                    <i class="el-icon-location" style="font-size: 20px;color:#F64245;"></i>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2" @click="OpenMap(0)">
                  <div class="cell location"><span>{{WriteData.longitude}}</span><i class="el-icon-location icon_location"></i></div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--纬度-->
              <tr class="el-table__row" v-if="resourcetype === 1">
                <td><div class="cell"><i class="must">*</i>纬度</div></td>
                <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                  <el-form-item class="form-item" prop="latitude">
                    <el-input v-model="WriteData.latitude" readonly style="width: 80%"></el-input>
                  </el-form-item>
                </div></td>
                <td v-show="WriteState == 2" @click="OpenMap(0)">
                  <div class="cell">{{WriteData.latitude}}</div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              </tbody>
            </table>
          </div>
        </el-form>
      </div>
      <div class="center">
        <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>
    <ImgBox ref="ImgBox"></ImgBox>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
  </div>
</template>

<script>
import {AddMonitoringSite, GetMonitoringSite, MonitoringSiteIdInfo, DeleteMonitoringSite, EditMonitoringSite} from 'api/api'
import GoogleMap from 'base/GoogleMap'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
import layuiTitle from 'base/layui-title'

export default {
  name: 'OperationSite',
  mixins: [GlobalRes],
  props: {
    resourcetype: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      showMap: false,
      resource_id: '',
      ImgList1: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      Loading: false,
      tableData: [],
      tableLoading: false,
      WriteData: {
        monitoringcode: '',
        monitoringname: '',
        longitude: null,
        latitude: null,
        imglist: []
      },
      Rules: {
        monitoringcode: [
          { required: true, message: '请输入运维ID', trigger: 'blur' }
        ],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'change'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'change'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ]
      },
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      WriteLoading: false
    }
  },
  methods: {
    ResetQuery () {
      Object.assign(this.$data.Query, this.$options.data().Query)
      this.getData1()
    },
    getData1 () {
      this.Loading = true
      this.$axios.get(GetMonitoringSite, {
        params: {
          PageIndex: 1,
          PageSize: this.pageSize,
          resourceid: this.resource_id
        }
      }).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getMore (page) {
      this.currentPage = page
      this.Loading = true
      this.$axios.get(GetMonitoringSite, {params: Object.assign({}, this.Query, {
        PageIndex: this.currentPage,
        PageSize: this.pageSize,
        resourceid: this.resource_id
      })}).then(res => {
        this.Loading = false
        if (res.errorCode !== '200') return this.$message.error(res.msg)
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    changeSize1 (page) {
      this.pageSize = page
      this.getMore(this.currentPage)
    },
    setImgList (list) {
      list.forEach((item) => {
        if (item.field_name === 'monitoringcode') this.ImgList1.push(item)
      })
    },
    handleWrite (state, row) {
      this.WriteState = state
      this.showWrite = true
      if (state) {
        this.Loading = true
        this.$axios.get(MonitoringSiteIdInfo, {
          params: {
            Id: row.id
          }
        }).then(res => {
          this.Loading = false
          this.WriteData = res.data
          if (res.data.imglist) {
            this.setImgList(res.data.imglist)
          }
        }).catch(err => {
          this.Loading = false
          console.log(err)
        })
      }
    },
    handleDelete (row) {
      this.$confirm('您确认要删除当前运维站点吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DeleteMonitoringSite, {
          params: {
            Id: row.id
          }
        }).then((res) => {
          if (res.errorCode !== '200') {
            this.$message.error(res.msg)
          } else {
            this.$message.success('删除成功！')
            this.getData1()
          }
        })
      })
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.WriteData.resource_id = this.resource_id
          this.$axios.post(AddMonitoringSite, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.Loading = false
            console.log(err)
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.WriteData.resource_id = this.resource_id
          this.$axios.put(EditMonitoringSite, this.WriteData).then(res => {
            this.WriteLoading = false
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
    WriteClose () {
      this.showWrite = false
      this.ImgList1 = []
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.getData1()
    },
    OpenImgBox () {
      this.$refs.ImgBox.SetData('运维ID', 'monitoringcode', this.ImgList1)
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false
    },
    handleClose () {
      this.tableData = []
      this.$emit('fatherClose')
    },
    OpenMap (val) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        this.$refs.GoogleMap.longitude = this.WriteData.longitude
        this.$refs.GoogleMap.latitude = this.WriteData.latitude
      })
    },
    getMapData (longitude, latitude) {
      this.showMap = false
      if (longitude) {
        this.WriteData.longitude = longitude
      }
      if (latitude) {
        this.WriteData.latitude = latitude
      }
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
  components: { layuiTitle, GoogleMap, ImgBox }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
