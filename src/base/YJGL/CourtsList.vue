<template>
  <div>
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="150"/>
            <col width="200"/>
            <!-- <col width="250"/> -->
            <col width="150"/>
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
              <col width="150"/>
              <col width="200"/>
              <!-- <col width="250"/> -->
              <col width="150"/>
            </colgroup>
            <tbody>
              <!--区域-->
              <tr class="el-table__row" v-if="WriteState === 0">
                <td><div class="cell"><i class="must">*</i>区域</div></td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" prop="AreaList" class="form-item">
                    <el-cascader v-model="tableData.AreaList" :props="areaProps" @change="changeArea(tableData)" :options="areaOption" ref="csArea"></el-cascader>
                  </el-form-item>
                </div>
              </td>
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
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--台区名称-->
            <tr class="el-table__row" v-show="WriteState !== 3">
              <td><div class="cell"><i class="must">*</i>台区名称</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.name}}</div>
                  <el-form-item label-width="0" prop="name" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.name" placeholder="请填入名称"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{this.writeDic(constructionmodeList)}}</div></td> -->
            </tr>
            <!--供电所-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>供电所</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2||WriteState == 3">{{tableData.powersubstation}}</div>
                  <el-form-item label-width="0" prop="powersubstation" class="form-item" v-show="WriteState !== 2&&WriteState !== 3">
                    <el-input v-model="tableData.powersubstation" placeholder="请填入供电所"></el-input>
                  </el-form-item>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--供电联系人-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>供电联系人</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2||WriteState == 3">{{tableData.powersupplycontact}}</div>
                  <el-form-item label-width="0" prop="powersupplycontact" class="form-item" v-show="WriteState !== 2&&WriteState !== 3">
                    <el-input v-model="tableData.powersupplycontact" placeholder="请填入供电联系人"></el-input>
                  </el-form-item>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--站点ID-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>站点名称</div></td>
              <td>
                <div class="cell">
                  <div v-if="WriteState === 2">{{tableData.stationname}}</div>
                  <div label-width="0" class="form-item" v-if="WriteState !==2" @click="siteOpen">
                    <el-form-item label-width="0" prop="stationname" class="form-item">
                    <el-input v-model="tableData.stationname" placeholder="请填入站点名称" readonly></el-input>
                    </el-form-item>
                  </div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--提交人-->
            <tr v-show="WriteState == 2" class="el-table__row">
              <td><div class="cell">提交人</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.realityname}}</div>
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
                  <div>{{tableData.createtime}}</div>
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
    },
    id: ''
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
        stationid: [],
        stationname: '',
        creatorid: '',
        createdatetime: '',
        AreaList: []
      },
      stationid: [],
      stationidname: [],
      params: {},
      areaOption: [],
      oncetime: false,
      // 表单验证
      Rules: {
        name: [
          { required: true, message: '请输入台区名称', trigger: 'change' }
        ],
        powersubstation: [
          { required: true, message: '请输入供电所', trigger: 'change' }
        ],
        powersupplycontact: [
          { required: true, message: '请输入供电联系人', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
      if (this.WriteState === 1) {
        this.tableData.stationname = data.station.map(val => val.stationname).join(',')
        this.tableData.stationid = data.station.map(val => val.stationid)
      }
    },
    // 提交函数
    subData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
      if (this.WriteState === 3) this.sendadd()
    },
    sendadd () {
      if (this.tableData.stationname === undefined || this.tableData.stationname === '' || this.tableData.stationname === null) {
        return this.$message.error('请选择站点！')
      } else {
        this.WriteLoading = true
        this.params = {stationid: this.tableData.stationid, id: this.id}
        this.$axios.post(AddCourts, this.params).then(res => {
          this.WriteLoading = false
          if (res.errorCode !== '200') return this.$message.error(res.msg)
          this.$message.success('添加成功!')
          this.$emit('fatheretMore')
          this.closeWrite()
        }
        )
      }
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate((valid, msg) => {
        if (!valid) {
          if (this.tableData.AreaList.length === 0) { return this.$message.error('请选择区域！') }
          if (this.tableData.stationname === undefined || this.tableData.stationname === '' || this.tableData.stationname === null) { return this.$message.error('请选择站点名称！') }
          return this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.$axios.post(AddCourts, this.tableData).then(res => {
            this.WriteLoading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.closeWrite()
          })
        }
      })
    },
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate((valid, msg) => {
        if (!valid) {
          return this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.$axios.put(EditCourts, this.tableData).then(res => {
            this.WriteLoading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('修改成功!')
            this.$emit('fatheretMore')
            this.closeWrite()
          })
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$refs.tableForm.resetFields()
      this.showWrite = !this.showWrite
      this.stationidname = null
      this.$emit('fatherClose')
    },
    siteOpen () {
      this.isShow = true
      if (this.$refs.site) {
        this.$refs.site.getMore(1)
      }
    },
    selectSite (row) {
      this.isShow = false
      this.tableData.stationid = []
      this.stationidname = []
      this.tableData.stationname = null
      if (row.length > 0) {
        this.tableData.stationid = row.map(item => item.id)
        this.stationidname = row.map(item => item.name)
      } else {
        this.tableData.stationid[0] = row.id
        this.stationidname[0] = row.name
      }
      if (this.tableData.station !== undefined && this.WriteState === 3) {
        this.tableData.station.forEach(item => {
          let index = this.tableData.stationid.findIndex(value => value === item.stationid)
          if (index !== -1) {
            this.oncetime = true
            this.tableData.stationid.splice(index, 1)
            this.stationidname.splice(index, 1)
          }
        })
      }
      this.tableData.stationname = this.stationidname.join(',')
      if (this.oncetime) {
        this.oncetime = false
        return this.$message.warning('请不要选择已有站点,已有站点无法添加！')
      }
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
