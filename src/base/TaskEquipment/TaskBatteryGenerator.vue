<template>
  <div class="write" >
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small" v-loading="WriteLoading">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col name="el-table_8_column_60" width="80"/>
            <col name="el-table_8_column_61" width="140"/>
            <col name="el-table_8_column_62" width="50"/>
            <!--<col name="el-table_8_column_63" width="400"/>-->
            <col name="el-table_8_column_64" width="100"/>
          </colgroup>
          <thead>
          <tr>
            <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
            <!--<th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th>-->
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
              <col name="el-table_8_column_60" width="80"/>
              <col name="el-table_8_column_61" width="140"/>
              <col name="el-table_8_column_62" width="50"/>
              <!--<col name="el-table_8_column_63" width="400"/>-->
              <col name="el-table_8_column_64" width="100"/>
            </colgroup>
            <tbody>
            <!--选择区域-->
            <!--<tr class="el-table__row" v-if="WriteState !==2">
              <td><div class="cell">区域</div></td>
              <td v-if="WriteState <= 1"><div class="cell">
                <el-form-item class="form-item" prop="AreaList">
                  <el-cascader v-model="WriteData.AreaList" :props="areaProps" @change="changeArea(WriteData)"
                               ref="csArea"></el-cascader>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{`${WriteData.provincename} / ${WriteData.cityname} / ${WriteData.areaname}`}}</div></td>
              <td><div class="cell"></div></td>
              &lt;!&ndash;<td><div class="cell"></div></td>&ndash;&gt;
              <td><div class="cell"></div></td>
            </tr>-->
            <!--地市-->
            <tr class="el-table__row" v-show="WriteState == 2">
              <td><div class="cell"><i class="must">*</i>地市</div></td>
              <td><div class="cell"><div>{{WriteData.cityname}}</div></div>
              </td>
              <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--区域-->
            <tr class="el-table__row" v-show="WriteState == 2">
              <td><div class="cell"><i class="must">*</i>区域</div></td>
              <td><div class="cell"><div>{{WriteData.areaname}}</div></div></td>
              <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
          <!--站点名称-->
          <tr class="el-table__row">
            <td>
              <div class="cell"><i class="must">*</i>站点名称</div>
            </td>
            <td>
              <div class="cell">
                <div v-show="WriteState == 2">{{WriteData.resourcename}}</div>
                <div v-show="WriteState !== 2" @click="isShow = true">
                  <el-input v-model="WriteData.resourcename" readonly placeholder="请选择"></el-input>
                </div>
              </div>
            </td>
            <td><div class="cell"></div></td>
            <!-- <td><div class="cell"></div></td> -->
            <td><div class="cell"></div></td>
          </tr>
            <!--经纬度-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>经度</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="longitude">
                  <el-input v-model="WriteData.longitude" @mousewheel.native.prevent type="number"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.longitude}}</div></td>
              <td @click="OpenImgBox(1)"><div class="cell">{{ImgList1.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>纬度</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="latitude">
                  <el-input v-model="WriteData.latitude" @mousewheel.native.prevent type="number"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.latitude}}</div></td>

              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--入网日期-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>入网日期</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="accessdate">
                  <el-date-picker v-model="WriteData.accessdate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.accessdate}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
             <!--产权单位-->
            <tr class="el-table__row">
              <td><div class="cell">产权单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="propertyrightunit">
                  <el-select v-model="WriteData.propertyrightunit">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.propertyrightunit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.propertyrightunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.propertyrightunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">数量</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="number">
                  <el-input v-model.number="WriteData.number"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.number}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="unit">
                  <el-select v-model="WriteData.unit">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.unit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.unitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.unit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">质保编号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="qualitycode">
                  <el-input v-model="WriteData.qualitycode"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.qualitycode}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">标识码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="identificationcode">
                  <el-input v-model="WriteData.identificationcode"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.identificationcode}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">生产日期</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="productiontime">
                  <el-date-picker v-model="WriteData.productiontime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.productiontime}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">维护单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="maintenanceunit">
                  <el-select v-model="WriteData.maintenanceunit">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.maintenanceunit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.maintenanceunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.maintenanceunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">设备厂家</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="manufacturer">
                  <el-select v-model="WriteData.manufacturer">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.manufacturer" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.manufacturername}}</div></td>
              <td @click="OpenImgBox(2)"><div class="cell">{{ImgList2.length}}</div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.manufacturer)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">设备型号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="models">
                  <el-input v-model="WriteData.models"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.models}}</div></td>
              <td @click="OpenImgBox(3)"><div class="cell">{{ImgList3.length}}</div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.models)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>设备状态</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="state">
                  <el-select v-model="WriteData.state">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.state" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.statename}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.state)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">缸号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="cylinderno">
                  <el-input v-model="WriteData.cylinderno"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.cylinderno}}</div></td>
              <td @click="OpenImgBox(4)"><div class="cell">{{ImgList4.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">装置编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="devicecode">
                  <el-input v-model="WriteData.devicecode"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.devicecode}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">容量/功率</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="capacity">
                  <el-input v-model="WriteData.capacity"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.capacity}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">发电联系人</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="powergenerationuser">
                  <el-input v-model="WriteData.powergenerationuser"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.powergenerationuser}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">发电机联系方式</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="powergenerationphone">
                  <el-input v-model="WriteData.powergenerationphone"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.powergenerationphone}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createusername}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">提交时间</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createtime}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">审核人</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.auditusername}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">审核时间</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{formatDate(WriteData.audittime)}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">审核意见</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.auditremark}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
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
    <ImgBox ref="ImgBox"></ImgBox>
    <el-dialog append-to-body top="1%" :visible.sync="isShow" title="选择站点" width="80%" :before-close="DetailhandleClose">
      <ResourceList @selectResource="selectResource"/>
    </el-dialog>
  </div>
</template>

<script>
import ResourceList from 'base/Resource/ResourceList'
import {DictionaryInfoList} from 'api/api'
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GetTaskEquipmentBatteryGeneratorInfo, AddChargingPileTaskEquipment, EditTaskEquipmentBatteryGenerator} from 'api/SurveyManagement'
import {formatDate} from 'common/js/cache'

export default {
  mixins: [GlobalRes],
  name: 'TaskBatteryGenerator',
  props: {
    DeviceID: {
      type: String,
      default: ''
    },
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      resList: [],
      Loading: false,
      WriteLoading: false,
      ResourceChoose: false,
      isShow: false,
      WriteData: {

      },
      // 表单验证
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
        resource_id: [{ required: true, message: '请选择站点', trigger: 'change' }],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        accessdate: [{ required: true, message: '请选择入网日期', trigger: 'blur' }],
        number: [
          {required: false, message: '请填数量', trigger: 'blur'},
          { type: 'number', message: '必须为数字类型' }
        ],
        state: [{ required: false, message: '请填写设备状态', trigger: 'change' }]
      },
      DicList: {},
      ImgList1: [], // 经度
      ImgList2: [], // 设备厂家
      ImgList3: [], // 设备型号
      ImgList4: [] // 缸号
    }
  },
  created () {
    this.getDic()
    this.WriteLoading = true
    this.$axios.get(GetTaskEquipmentBatteryGeneratorInfo, {
      params: {
        id: this.DeviceID
      }
    }).then(res => {
      this.WriteLoading = false
      this.WriteData = res.data
      this.setImgList(res.data.imglist)
    })
  },
  methods: {
    getDic () {
      let arr = [
        '设备产权单位',
        '设备单位',
        '设备维护单位',
        '电池设备厂家',
        '电池发电装置设备型号',
        '设备状态',
        '设备存放点类型'
      ]
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.unit = data.filter(i => { return i.type === '设备单位' })
          this.DicList.propertyrightunit = data.filter(i => { return i.type === '设备产权单位' })
          this.DicList.manufacturer = data.filter(i => { return i.type === '电池设备厂家' })
          this.DicList.maintenanceunit = data.filter(i => { return i.type === '设备维护单位' })
          this.DicList.models = data.filter(i => { return i.type === '电池发电装置设备型号' })
          this.DicList.state = data.filter(i => { return i.type === '设备状态' })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => { return i.field_name === 'longitude' })
      this.ImgList2 = list.filter(i => { return i.field_name === 'manufacturer' })
      this.ImgList3 = list.filter(i => { return i.field_name === 'models' })
      this.ImgList4 = list.filter(i => { return i.field_name === 'cylinderno' })
    },
    formatDate (str) { return formatDate(str) },
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
          this.WriteLoading = true
          this.WriteData.operatorsitetype = 2
          this.$axios.post(AddChargingPileTaskEquipment, this.WriteData).then(res => {
            this.WriteLoading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.$emit('fatheretMore')
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
          this.$axios.put(EditTaskEquipmentBatteryGenerator, this.WriteData).then(res => {
            this.WriteLoading = false
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              this.$emit('fatheretMore')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    OpenImgBox (val) {
      if (val === 1) this.$emit('fatherOpenImgBox', '经度', 'longitude', this.ImgList1)
      if (val === 2) this.$emit('fatherOpenImgBox', '设备厂家', 'manufacturer', this.ImgList2)
      if (val === 3) this.$emit('fatherOpenImgBox', '设备型号', 'models', this.ImgList3)
      if (val === 4) this.$emit('fatherOpenImgBox', '容量(安时)', 'capacity', this.ImgList4)
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    ResetWrite () {
      // Object.assign(this.WriteData, this.$options.data().WriteDatas)
      this.$refs.WriteForm.clearValidate()
    },
    selectResource (name, id) {
      this.isShow = false
      this.WriteData.resource_id = id
      this.WriteData.resourcename = name
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1.concat(this.ImgList2, this.ImgList3, this.ImgList4)
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: {
    ImgBox,
    ResourceList
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
