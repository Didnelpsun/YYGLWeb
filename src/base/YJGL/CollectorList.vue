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
              <!--区域-->
              <tr class="el-table__row" v-if="WriteState === 0">
                <td><div class="cell"><i class="must">*</i>区域</div></td>
                <td>
                  <div class="cell">
                    <el-form-item label-width="0" class="form-item" prop="AreaList">
                      <el-cascader v-model="tableData.AreaList" :props="areaProps" @change="changeArea(tableData)" :options="areaOption" ref="csArea"></el-cascader>
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
              <!-- <tr class="el-table__row" v-show="WriteState == 2">
              <td><div class="cell"><i class="must">*</i>区域</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.areaname}}</div>
                </div>
              </td>
              <td><div class="cell"></div></td> -->
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> -->
              <!-- <td><div class="cell"></div></td>
              </tr> -->
              <!--设备id-->
             <!-- <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>设备id</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.equipmentid}}</div>
                  <div label-width="0" prop="equipmentid" class="form-item" v-show="WriteState !== 2" @click="openEquipment">
                    <el-input v-model="tableData.equipmentid" placeholder="请填入设备id" readonly></el-input>
                  </div>
                </div>
              </td>
              <td><div class="cell"></div></td>
              &lt;!&ndash; <td><div class="cell"></div></td> &ndash;&gt;
              <td><div class="cell"></div></td>
              </tr>-->
              <!--设备软件版本号-->
              <tr class="el-table__row">
                <td><div class="cell"><i class="must">*</i>采集器ID</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.swver}}</div>
                    <el-form-item label-width="0" prop="swver" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.swver" placeholder="请填入采集器ID"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--通信状态-->
              <tr class="el-table__row" v-show="WriteState !== 0">
                <td><div class="cell">通信状态</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.type}}</div>
                    <el-form-item label-width="0" class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.type" placeholder="请输入通信状态"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--手机卡号-->
              <tr class="el-table__row">
                <td><div class="cell">手机卡号</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.cardnumber}}</div>
                    <el-form-item label-width="0"  class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.cardnumber" placeholder="请输入手机卡号"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--IMSI-->
              <tr class="el-table__row">
                <td><div class="cell">IMSI</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.imsi}}</div>
                    <el-form-item label-width="0"  class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.imsi" placeholder="请输入IMSI"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--IMEI-->
              <tr class="el-table__row">
                <td><div class="cell">IMEI</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.imei}}</div>
                    <el-form-item label-width="0"  class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.imei" placeholder="请输入IMEI"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--手机卡号-->
              <tr class="el-table__row">
                <td><div class="cell">生产厂家</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.faccode}}</div>
                    <el-form-item label-width="0"  class="form-item" v-show="WriteState !== 2">
                      <el-input v-model="tableData.faccode" placeholder="请输入生产厂家"></el-input>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">保修时间</div></td>
                <td>
                  <div class="cell">
                    <div v-show="WriteState == 2">{{tableData.warranty}}</div>
                    <el-form-item label-width="0"  prop="warranty" class="form-item" v-show="WriteState !== 2">
                      <el-date-picker v-model="tableData.warranty" class="tableSelect" type="date" format="yyyy-MM-dd"   value-format="yyyy-MM-dd" placeholder="选择保修时间"></el-date-picker>
                    </el-form-item>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--生产厂家-->
              <!-- <tr class="el-table__row">
               <td><div class="cell"><i class="must">*</i>生产厂家</div></td>
                 <td>
                   <div class="cell">
                     <div v-show="WriteState == 2">{{tableData.faccode}}</div>
                     <el-form-item label-width="0" prop="faccode" class="form-item" v-show="WriteState !== 2">
                       <el-input v-model="tableData.faccode" placeholder="请填入生产厂家"></el-input>
                     </el-form-item>
                   </div>
                 </td>
                 <td><div class="cell"></div></td>
                 <td><div class="cell"></div></td>
               </tr>-->
              <!--注册时间-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">注册时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.creatortime}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--注册人-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">注册人</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.creatorname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--标签id-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">标签id</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.modulecode}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--油机编号-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">油机编号</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.machinenumber}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--油机缸号-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">油机缸号</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.machinebatchno}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--油机区域-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">油机区域</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.areaname}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--油机状态-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">油机代维单位</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.unit}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--绑定时间-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">绑定时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.applytime}}</div>
                  </div>
                </td>
                <td><div class="cell"></div></td>
                <!-- <td><div class="cell"></div></td> -->
                <td><div class="cell"></div></td>
              </tr>
              <!--油机状态-->
              <tr class="el-table__row" v-if="WriteState === 2">
                <td><div class="cell">绑定人</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.applicantname}}</div>
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
      <el-button @click="handleData" type="primary" v-if="WriteState!==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
   <!-- <el-dialog top="1%" :visible.sync="isShow" title="选择设备ID" width="80%" :before-close="DetailhandleClose">
      <RectifierModulePicker @selectEquipment="selectEquipment" ref="rectifier"/>
    </el-dialog>-->
    <!--<el-dialog top="1%" :visible.sync="isShow" title="选择采集器ID" width="80%" :before-close="DetailhandleClose">
    <CollectorPicker @selectCollector="selectCollector" ref="rectifier"/>
    </el-dialog>-->
  </div>
</template>

<script>
import { Addcollector, Editcollector } from 'api/YJGL'
import CollectorPicker from 'base/YJGL/CollectorPicker'
import RectifierModulePicker from 'base/YJGL/RectifierModulePicker'
import {GlobalRes} from 'common/js/mixins'
export default{
  name: 'CollectorList',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    showIsbinding: ''
  },
  data () {
    return {
      isShow: false,

      areaOption: [],
      WriteLoading: false,
      // 新增表格相关属性
      tableData: {
        AreaList: [],
        provinceid: '', // 省份id
        cityid: '', // 城市id
        areaid: '',
        type: '', // 通信状态
        cardnumber: '', // 手机卡号
        imsi: '',
        imei: '',
        warranty: null,
        equipmentid: '', // 设备id
        equipmentname: '',
        swver: '', // 采集器
        collectorid: '',
        faccode: '', // 厂家
        machinenumber: '', // 油机编号
        machinebatchno: '', // 油机缸号
        fueltype: '', // 燃油类型
        enginestate: '' // 油机状态
      },
      // 分页数据
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      // 表单验证
      Rules: {
        /* AreaList: [
          { required: true, message: '请选择区域', trigger: 'blur' }
        ], */
        swver: [{ required: true, message: '请选择采集器', trigger: 'change' }]
      }
    }
  },
  methods: {
    warranty (val) { this.tableData.warranty = val },
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
    },
    openEquipment () {
      this.isShow = true
      if (this.$refs.rectifier) {
        this.$refs.rectifier.getMore(1)
      }
    },
    // 提交函数
    handleData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate((valid, msg) => {
        if (!valid) {
          if (this.tableData.AreaList.length === 0) { return this.$message.warning('请选择区域') }
          this.$message.warning('请补全信息')
        } else {
          this.WriteLoading = true
          this.$axios.post(Addcollector, this.tableData).then(res => {
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
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData)
        if (!valid) {
          this.$message.warning('请补全信息')
        } else {
          this.WriteLoading = true
          const res = await this.$axios.put(Editcollector, this.tableData)
          this.WriteLoading = false
          if (res.errorCode !== '200') return this.$message.error(res.msg)
          this.$message.success('修改成功！')
          this.$emit('fatheretMore')
          this.closeWrite()
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    }/*,
    selectEquipment (id) {
      this.isShow = false
      this.tableData.equipmentid = id
    },
    selectCollector (id, swver) {
      this.isShow = false
      this.tableData.collectorid = id
      this.tableData.swver = swver
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    } */
  },
  components: {
    RectifierModulePicker,
    CollectorPicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
