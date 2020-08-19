<template>
  <div>
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="100"/>
            <col width="300"/>
            <!-- <col width="250"/> -->
            <col width="100"/>
          </colgroup>
          <thead>
          <tr>
            <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
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
              <col width="100"/>
              <col width="300"/>
              <!-- <col width="250"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
              <!--区域-->
              <tr class="el-table__row" v-show="WriteState === 0">
                <td><div class="cell"><i class="must">*</i>区域</div></td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" class="form-item" v-model="tableData.areaid">
                    <el-cascader v-model="tableArea.AreaList" :props="areaProps" @change="changeArea(tableArea)" :options="areaOption" ref="csArea"></el-cascader>
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
            <!--台区名称-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>台区名称</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.name}}</div>
                  <el-form-item label-width="0" prop="name" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.name" placeholder="请填入名称"></el-input>
                  </el-form-item>
                </div>
              </td>
              <!-- <td><div class="cell">{{this.writeDic(constructionmodeList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--供电所-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>供电所</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.powersubstation}}</div>
                  <el-form-item label-width="0" prop="powersubstation" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.powersubstation" placeholder="请填入供电所"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--供电联系人-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>供电联系人</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.powersupplycontact}}</div>
                  <el-form-item label-width="0" prop="powersupplycontact" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.powersupplycontact" placeholder="请填入供电联系人"></el-input>
                  </el-form-item>
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
                  <div v-if="tableData.station&&WriteState === 2">{{tableData.station[0]['stationname']}}</div>
                  <div label-width="0" prop="stationname" class="form-item" v-if="WriteState !==2&&tableData.station" @click="siteOpen">
                    <el-input v-model="tableData.station[0]['stationname']" placeholder="请填入站点名称" readonly></el-input>
                  </div>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--提交人-->
            <tr v-show="WriteState == 2" class="el-table__row">
              <td><div class="cell">提交人</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.creausername}}</div>
                </div>
              </td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.name}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--提交时间-->
            <tr v-show="WriteState == 2" class="el-table__row">
              <td>
                <div class="cell">提交时间</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData.createdatetime}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center" style="padding-bottom: 100px">
      <el-button @click="subData" type="primary" v-show="WriteState !==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="isShow" title="选择站点ID" width="80%" :before-close="DetailhandleClose">
      <SitePicker @selectSite="selectSite" ref="site"/>
    </el-dialog>
  </div>
</template>

<script>
import { AddCourts, EditCourts } from 'api/YJGL'
import {GlobalRes} from 'common/js/mixins'
import SitePicker from 'base/YJGL/SitePicker'

export default{
  name: 'SiteList',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      WriteLoading: false,
      isShow: false,
      // 新增表格相关属性
      tableData: {
        provinceid: '',
        cityid: '',
        areaid: '',
        title: '',
        name: '',
        powersubstation: '',
        powersupplycontact: '',
        station: [
          {stationid: '', stationname: ''}
        ],
        stationid: '',
        creatorid: '',
        createdatetime: ''
      },
      tableArea: {
        AreaList: []
      },
      areaOption: [],
      // 表单验证
      Rules: {
        areaid: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入台区名称', trigger: 'blur' }
        ],
        powersubstation: [
          { required: true, message: '请输入供电所', trigger: 'blur' }
        ],
        powersupplycontact: [
          { required: true, message: '请输入供电联系人', trigger: 'blur' }
        ],
        stationid: [
          { required: true, message: '请选择站点ID', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
      this.tableData.stationid = this.tableData.station[0]['stationid']
    },
    // 提交函数
    subData () {
      if (this.tableArea.areaid && this.tableArea.cityid && this.tableArea.provinceid) {
        this.tableData.provinceid = this.tableArea.provinceid
        this.tableData.cityid = this.tableArea.cityid
        this.tableData.areaid = this.tableArea.areaid
      }
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.post(AddCourts, this.tableData)
          this.WriteLoading = false
          if (res.error === true) {
            this.$message.warning('请补全信息')
            console.log(res.errorMessage)
          }
          if (res.success === true) {
            this.$message.success('添加成功！')
            this.$emit('fatheretMore')
            this.closeWrite()
          } else { this.$message.warning(res.msg) }
        } catch (e) {
          console.log(e)
        }
      })
    },
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.put(EditCourts, this.tableData)
          this.WriteLoading = false
          if (res.error === true) {
            this.$message.warning('请补全信息')
          }
          if (res.success === true) {
            this.$message.success('修改成功！')
            this.$emit('fatheretMore')
            this.closeWrite()
          } else { this.$message.warning(res.msg) }
        } catch (e) {
          console.log(e)
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    siteOpen () {
      this.isShow = true
      if (this.$refs.site) {
        this.$refs.site.getMore(1)
      }
    },
    selectSite (id, name) {
      this.isShow = false
      this.tableData.station[0]['stationid'] = this.tableData.stationid = id
      this.tableData.station[0]['stationname'] = name
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    }
  },
  components: {
    SitePicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
