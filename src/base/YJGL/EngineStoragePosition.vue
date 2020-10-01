<template>
  <div class="write">
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
      <el-form :model="tableData" :rules="Rules" ref="tableForm" v-loading="WriteLoading">
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
              <!--油机ID-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>油机名称</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState === 2">{{tableData.machinenumber}}</div>
                    <div label-width="0"  class="form-item" v-show="WriteState !== 2" @click="engineOpen">
                      <el-form-item label-width="0"  class="form-item"  prop="machinenumber">
                      <el-input v-model="tableData.machinenumber" placeholder="请填入油机名称" readonly></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--站点ID-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>站点名称</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState === 2">{{tableData.stationname}}</div>
                    <div label-width="0" class="form-item" v-show="WriteState !== 2" @click="siteOpen">
                      <el-form-item label-width="0"  class="form-item"  prop="stationname">
                      <el-input v-model="tableData.stationname" placeholder="请填入站点名称" readonly></el-input>
                      </el-form-item>
                    </div>
                  </div>
                </td>
                <td  @click="OpenImgBox(1)"><div class="cell"> {{ImgList1.length}}</div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--区域-->
              <tr class="el-table__row" v-if="WriteState === 0">
                <td><div class="cell"><i class="must">*</i>区域</div></td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" class="form-item" prop="AreaList">
                    <el-cascader v-model="tableData.AreaList" :props="areaProps" @change="changeArea(tableData)" ref="csArea"></el-cascader>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--地市-->
            <tr class="el-table__row" v-show="WriteState !== 0">
              <td><div class="cell"><i class="must">*</i>地市</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.cityname}}</div>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--区域-->
            <tr class="el-table__row" v-show="WriteState !== 0">
              <td><div class="cell"><i class="must">*</i>区域</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.areaname}}</div>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
              <!--经度-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>经度</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.longitude}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--纬度-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>纬度</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.latitude}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--存放位置-->
              <!--<tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>存放位置</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.placeinfo}}</div>
                    <el-form-item label-width="0" prop="placeinfo" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model.number="tableData.placeinfo" placeholder="请填入存放位置"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <td><div class="cell"></div></td>
              </tr>-->
              <!--提交人-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">提交人</div></td>
                <td>
                  <div class="cell">
                  <div>{{tableData.realityname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--提交时间-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">提交时间</div></td>
                <td>
                  <div class="cell">
                  <div>{{tableData.dateinfo}}</div>
                  </div>
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
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="handleData($event, false)" type="primary" v-if="WriteState!==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="handleData($event, true)" type="primary" v-if="WriteState!==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交审核</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="siteShow" title="选择站点名称" width="80%" :before-close="SitehandleClose">
      <SitePicker @selectSite="selectSite" ref="site"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="engineShow" title="选择油机名称" width="80%" :before-close="EnginehandleClose">
      <EnginePicker @selectEngine="selectEngine" ref="engine"/>
    </el-dialog>
  </div>
</template>

<script>
import { AddEnginestorageposition, EditEnginestorageposition } from 'api/YJGL'
import SitePicker from 'base/YJGL/SitesPicker'
import EnginePicker from 'base/YJGL/EnginePicker'
import {GlobalRes} from 'common/js/mixins'
import {emptyarr} from 'common/js/validata'

export default{
  name: 'EngineStoragePosition',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      siteShow: false,
      engineShow: false,
      WriteLoading: false,
      ImgList1: [],
      // 新增表格相关属性
      tableData: {
        AreaList: [],
        provinceid: '',
        cityid: '',
        areaid: '',
        longitude: 45.5,
        latitude: 45.5,
        stationid: '',
        stationname: '',
        engineid: '',
        machinenumber: '',
        storageplacetype: '',
        placeinfo: '',
        issubmit: false,
        imglist: []
      },
      // 分页数据
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      // 表单验证
      Rules: {
        AreaList: [
          { validator: emptyarr, trigger: 'blur' }
        ],
        machinenumber: [
          { required: true, message: '请选择油机', trigger: 'change' }
        ],
        stationname: [
          { required: true, message: '请选择站点', trigger: ['change', 'blur'] }
        ]/*,
        storageplacetype: [
          { required: true, message: '请选择存放位置类型', trigger: 'blur' }
        ], */
        /* placeinfo: [
          { required: true, message: '请填入存放位置', trigger: 'blur' }
        ], */
        /* longitude: [
          { required: true, message: '获取经度失败', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '获取纬度失败', trigger: 'blur' }
        ] */
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      // this.tableData = Object.assign({}, this.tableData, data)
      this.tableData = data
      this.setImgList(data.imglist)
      // for (let i = 0; i < this.tableData.resource.length; i++) {
      //   if (this.tableData.resource[i]['resourcescode']) {
      //     if (this.tableData.resource[i]['type'] === 1) {
      //       this.tableData.stationid = this.tableData.resource[i]['resourcescode']
      //       this.tableData.stationname = this.tableData.resource[i]['resourcesname']
      //     } else if (this.tableData.resource[i]['type'] === 2) {
      //       this.tableData.engineid.push(this.tableData.resource[i]['resourcescode'])
      //       this.tableData.machinenumber.push(this.tableData.resource[i]['resourcesname'])
      //     }
      //   }
      // }
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => {
        return i.field_name === 'stationname'
      })
    },
    OpenImgBox (val) {
      if (val === 1) this.$emit('fatherOpenImgBox', '站点名称', 'stationname', this.ImgList1)
    },
    validImgList () {
      if (!this.ImgList1.length) return this.$message.warning('站点名称图片必须上传')
    },
    siteOpen () {
      this.siteShow = true
      if (this.$refs.site) {
        this.$refs.site.getMore(1)
      }
    },
    engineOpen () {
      this.engineShow = true
      if (this.$refs.engine) {
        this.$refs.engine.getMore(1)
      }
    },
    selectSite (id, name) {
      this.siteShow = false
      this.tableData.stationid = id
      this.tableData.stationname = name
    },
    selectEngine (id, name) {
      this.engineShow = false
      this.tableData.engineid = id
      this.tableData.machinenumber = name
    },
    // 提交函数
    handleData (event, check) {
      this.tableData.issubmit = check
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate((valid, msg) => {
        if (this.ImgList1.length === 0) return this.$message.warning('站点名称图片必须上传')
        // console.log(this.tableData)
        if (!valid) {
          this.$message.warning('请补全信息')
        } else {
          this.WriteLoading = true
          this.$axios.post(AddEnginestorageposition, this.tableData).then(res => {
            this.WriteLoading = false
            if (res.error === true) {
              this.$message.warning('请补全信息')
              console.log(res.errorMessage)
            }
            if (res.success === true) {
              if (this.tableData.issubmit) {
                this.$message.success('提交审核成功！')
              } else { this.$message.success('添加成功！') }
              this.$emit('fatheretMore')
              this.ResetWrite()
              this.closeWrite()
            } else { this.$message.warning(res.msg) }
          })
        }
      })
    },
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        if (this.ImgList1.length === 0) return this.$message.warning('站点名称图片必须上传')
        // console.log(this.tableData)
        if (!valid) {
          this.$message.warning('请补全信息')
        } else {
          try {
            this.WriteLoading = true
            const res = await this.$axios.put(EditEnginestorageposition, this.tableData)
            this.WriteLoading = false
            if (res.error === true) {
              this.$message.warning('请补全信息')
              // console.log(res.error)
            }
            // this.$message.error('输入参数为非法值，请重新输入')
            if (res.success === true) {
              if (this.tableData.issubmit) {
                this.$message.success('提交审核成功！')
              } else { this.$message.success('修改成功！') }
              this.$emit('fatheretMore')
              this.ResetWrite()
              this.closeWrite()
            } else { this.$message.warning(res.msg) }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      // this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      // this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      // this.showWrite = !this.showWrite
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    ResetWrite () {
      // Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.ImgList1 = []
      this.$refs.tableForm.resetFields()
    },
    SitehandleClose () {
      this.siteShow = !this.siteShow
    },
    EnginehandleClose () {
      this.engineShow = !this.engineShow
    },
    getPostion () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            this.tableData.longitude = position.coords.longitude
            this.tableData.latitude = position.coords.latitude
          },
          function (error) {
            console.log(error)
          }
        )
      } else {
        console.log('只支持在HTTPS下获取地理位置')
      }
    }
  },
  updated () {
    if (!this.WriteState) {
      this.getPostion()
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1
    }
  },
  watch: {
    ImgList (val) {
      this.tableData.imglist = val
    }
  },
  components: {
    SitePicker,
    EnginePicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
