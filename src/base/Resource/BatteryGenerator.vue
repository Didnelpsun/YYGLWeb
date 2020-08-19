<template>
  <div class="write">
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col name="el-table_8_column_60" width="80"/>
            <col name="el-table_8_column_61" width="100"/>
            <col name="el-table_8_column_62" width="50"/>
            <!-- <col name="el-table_8_column_63" width="400"/> -->
            <col name="el-table_8_column_64" width="100"/>
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
              <col name="el-table_8_column_60" width="80"/>
              <col name="el-table_8_column_61" width="100"/>
              <col name="el-table_8_column_62" width="50"/>
              <!-- <col name="el-table_8_column_63" width="400"/> -->
              <col name="el-table_8_column_64" width="100"/>
            </colgroup>
            <tbody>
            <!--选择区域-->
            <tr class="el-table__row" v-if="WriteState">
              <td><div class="cell"><i class="must">*</i>地市</div></td>
              <td><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState">
              <td><div class="cell"><i class="must">*</i>区域</div></td>
              <td><div class="cell">{{WriteData.areaname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState === 2">
              <td><div class="cell">所属资源站点</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.resourcename}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState !== 2">
              <td><div class="cell"><i class="must">*</i>站点名称</div></td>
              <td><div class="cell" @click="isShow = true">
                <el-form-item class="form-item" prop="resourcename">
                  <el-input v-model="WriteData.resourcename" readonly placeholder="请选择"></el-input>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">经度</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="longitude">
                  <el-input v-model="WriteData.longitude" @mousewheel.native.prevent type="number"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.longitude}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">纬度</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="latitude">
                  <el-input v-model="WriteData.latitude" @mousewheel.native.prevent type="number"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.latitude}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
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
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.propertyrightunit}}</div></td>
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
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.number}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <!--<el-form-item class="form-item" prop="unit">
                  <el-input v-model.number="WriteData.unit"></el-input>
                </el-form-item>-->
                <el-select class="tableSelect" v-model="WriteData.unit">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="item in DicList.unitList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                </el-select>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.unit}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">质保编号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="qualitycode">
                  <el-input v-model="WriteData.qualitycode"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.qualitycode}}</div></td>
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
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.identificationcode}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.operatorsitetype)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--生产日期-->
            <tr class="el-table__row">
              <td><div class="cell">生产日期</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="productiontime">
                  <el-date-picker v-model="WriteData.productiontime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.productiontime}}</div></td>
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
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.maintenanceunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
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
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.manufacturername}}</div></td>
              <td @click="OpenImgBox(1)"><div class="cell">{{ImgList1.length}}</div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.manufacturer)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">设备型号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="models">
                  <el-select v-model="WriteData.models">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.models" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.modelsname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.models)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">设备状态</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="state">
                  <el-select v-model="WriteData.state">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.state" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.statename}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>装置编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="devicecode">
                  <el-input v-model="WriteData.devicecode"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.devicecode}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>缸号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="cylinderno">
                  <el-input v-model="WriteData.cylinderno"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.cylinderno}}</div></td>
              <td @click="OpenImgBox(2)"><div class="cell">{{ImgList2.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>容量/功率</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="capacity">
                  <el-input v-model="WriteData.capacity"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.capacity}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>发电联系人</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="powergenerationuser">
                  <el-input v-model="WriteData.powergenerationuser"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.powergenerationuser}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>发电联系方式</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="powergenerationphone">
                  <el-input v-model="WriteData.powergenerationphone"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.powergenerationphone}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState !== 0">
              <td><div class="cell">创建人</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createusername}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState !== 0">
              <td><div class="cell">创建时间</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createtime}}</el-form-item>
              </div></td>
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
      <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
    </div>

    <el-dialog top="1%" :visible.sync="isShow" width="80%" :before-close="DetailhandleClose">
      <ResourceList @selectResource="selectResource"/>
    </el-dialog>

  </div>
</template>

<script>
import ResourceList from 'base/Resource/ResourceList'
import {AddBatteryGenerator, EditBatteryGenerator} from 'api/api'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {formatDate} from 'common/js/cache'
import {GlobalRes} from 'common/js/mixins'

export default {
  name: 'BatteryDetail',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    DicList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isShow: false,
      Loading: false,
      ImgList1: [],
      ImgList2: [],
      WriteData: {
        resource_id: '',
        resourcename: '',
        AreaList: [],
        unit: '',
        provinceid: 0,
        areaid: 0,
        cityid: 0,
        longitude: '',
        latitude: '',
        accessdate: '',
        propertyrightunit: 0,
        number: null,
        qualitycode: '',
        identificationcode: '',
        productiontime: '',
        maintenanceunit: 1,
        manufacturer: 1,
        models: 0,
        state: 1,
        devicecode: '',
        cylinderno: '',
        capacity: 1,
        powergenerationuser: '',
        powergenerationphone: '',
        imglist: []
      },
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        resourcename: [{ required: true, message: '请选择站点', trigger: 'change' }],
        accessdate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        longitude: [
          {required: false, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: false, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        number: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
        unit: [{ type: 'number', message: '请输入数字', trigger: 'blur' }],
        state: [{ required: true, message: '请填写站点类型', trigger: 'blur' }],
        capacity: [{ required: true, message: '请填写功率', trigger: 'blur' }],
        cylinderno: [{ required: true, message: '请填写缸号', trigger: 'blur' }],
        devicecode: [{ required: true, message: '请填写装置编码', trigger: 'blur' }],
        powergenerationuser: [{ required: true, message: '请填写发电联系人', trigger: 'blur' }],
        powergenerationphone: [{ required: true, message: '请填写发电联系方式', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.ImgList1 = []
      this.ImgList2 = []
      this.$nextTick(() => {
        this.$refs.WriteForm.clearValidate()
      })
    },
    formatDate (str) { return formatDate(str) },
    setWriteData (data) {
      this.WriteData = data
      this.setImgList(data.imglist)
    },
    OpenImgBox (val) {
      if (val === 1) {
        this.$emit('fatherOpenImgBox', '设备厂家', 'manufacturer', this.ImgList1)
      }
      if (val === 2) {
        this.$emit('fatherOpenImgBox', '缸号', 'cylinderno', this.ImgList2)
      }
    },
    _normalizeAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) list[i].leaf = true
      }
      return list
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    },
    selectResource (name, id) {
      this.isShow = false
      this.WriteData.resource_id = id
      this.WriteData.resourcename = name
    },
    SubAdd () {
      if (this.validImgList()) return
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(AddBatteryGenerator, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.errorMessage)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.WriteClose()
          }).catch(err => {
            this.Loading = false
            console.log(err)
          })
        }
      })
    },
    SubEdit () {
      if (this.validImgList()) return
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.put(EditBatteryGenerator, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.errorMessage)
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              this.$emit('fatheretMore')
              this.WriteClose()
            } else {
              this.$message.error(res.errorMessage)
            }
          }).catch(() => {
            this.Loading = false
          })
        }
      })
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    validImgList () {
      if (!this.ImgList1.length) {
        return this.$message.warning('设备厂家图片必须上传')
      }
      if (!this.ImgList2.length) {
        return this.$message.warning('缸号图片必须上传')
      }
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => { return i.field_name === 'manufacturer' })
      this.ImgList2 = list.filter(i => { return i.field_name === 'cylinderno' })
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
  components: { ResourceList }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
