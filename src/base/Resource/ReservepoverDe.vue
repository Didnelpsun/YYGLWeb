<template>
  <div v-loading="WriteLoading">
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
            <!--<tr class="el-table__row" v-show="WriteState !== 2">
              <td><div class="cell"><i class="must">*</i>区域</div></td>
              <td>
                <div class="cell">
                  <el-form-item label-width="0" class="form-item" v-model="tableData.areaid">
                      <el-cascader v-model="tableArea.AreaList" :props="areaProps" @change="changeArea(tableArea)" :options="areaOption" ref="csArea"></el-cascader>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              &lt;!&ndash; <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.provincename}}/{{tableData.cityname}}/{{tableData.areaname}}</div>
              </td> &ndash;&gt;
              <td><div class="cell"></div></td>
            </tr>-->
            <!--站点编码-->
            <tr class="el-table__row">
              <td>
                <div class="cell">
                  站点编码
                </div>
              </td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.resourcecode}}</div>
                  <div v-show="WriteState !== 2">
                    <el-input v-model="tableData.resourcecode" readonly placeholder="请选择"></el-input>
                  </div>
                </div>
              </td>
              <td>
                <div class="cell"></div>
              </td>
              <!-- <td>
                <div class="cell"></div>
              </td> -->
              <td>
                <div class="cell"></div>
              </td>
            </tr>
            <!--站点名称-->
            <tr class="el-table__row">
              <td>
                <div class="cell">站点名称</div>
              </td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.resourcename}}</div>
                  <div v-show="WriteState !== 2" @click="isShow = true">
                    <el-input v-model="tableData.resourcename" readonly placeholder="请选择"></el-input>
                  </div>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--设备类型-->
            <tr class="el-table__row">
              <td>
                <div class="cell">
                  设备类型
                </div>
              </td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.equipmenttypename}}</div>
                  <div v-show="WriteState !== 2">
                    <el-input v-model="tableData.equipmenttypename" placeholder="请选择"></el-input>
                  </div>
                </div>
              </td>
              <td>
                <div class="cell"></div>
              </td>
              <!-- <td>
                <div class="cell"></div>
              </td> -->
              <td>
                <div class="cell"></div>
              </td>
            </tr>
            <!--备电设备厂家-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>设备厂家</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.manufacturername}}</div>
                  <el-form-item label-width="0" prop="manufacturer" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.manufacturer" placeholder="请选择备电设备厂家">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option v-for="item in dictionaryList.manufacturerList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td @click="OpenImgBox('manufacturer')">
                <div class="cell">{{this.manufacturerImgList.length}}</div>
              </td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.manufacturerList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--设备型号-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>设备型号</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.modelsname}}</div>
                  <el-form-item label-width="0" prop="models" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.models" placeholder="请选择设备型号">
                      <el-option v-for="item in dictionaryList.modelsList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td @click="OpenImgBox('models')">
                <div class="cell">{{this.modelsImgList.length}}</div>
              </td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.modelsList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--入网日期-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>入网日期</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.accessdate}}</div>
                  <el-form-item label-width="0" prop="accessdate" class="form-item" v-show="WriteState !== 2">
                    <el-date-picker class="tableSelect" v-model="tableData.accessdate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择入网日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--标识码-->
            <tr class="el-table__row">
              <td><div class="cell">标识码</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.identificationcode}}</div>
                  <el-form-item label-width="0" prop="identificationcode" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.identificationcode" placeholder="请填入标识码"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--经度-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>经度</div></td>
              <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                <el-form-item label-width="0" class="form-item" prop="longitude">
                  <el-input v-model="tableData.longitude" readonly style="width: 80%"></el-input>
                  <i class="el-icon-location" style="font-size: 20px;color:#F64245;"></i>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2" @click="OpenMap(0)">
                <div class="cell location"><span>{{tableData.longitude}}</span><i class="el-icon-location icon_location"></i></div>
              </td>
              <td @click="OpenImgBox('longitude')">
                <div class="cell">{{this.longitudeList.length}}</div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--纬度-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>纬度</div></td>
              <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                <el-form-item label-width="0" class="form-item" prop="latitude">
                  <el-input v-model="tableData.latitude" readonly style="width: 80%"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2" @click="OpenMap(0)">
                <div class="cell">{{tableData.latitude}}</div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--产权单位-->
            <tr class="el-table__row">
              <td><div class="cell">产权单位</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.propertyrightunitname}}</div>
                  <el-form-item label-width="0" prop="propertyrightunit" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.propertyrightunit" placeholder="请选择产权单位">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option v-for="item in dictionaryList.propertyrightunitList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--数量-->
            <tr class="el-table__row">
              <td><div class="cell">数量</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.number}}</div>
                  <el-form-item label-width="0" prop="number" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model.number="tableData.number" placeholder="请填入数量"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--单位-->
            <tr class="el-table__row">
              <td><div class="cell">单位</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.unitname}}</div>
                  <el-form-item label-width="0" prop="unit" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.unit" placeholder="请选择单位">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option v-for="item in dictionaryList.unitList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.unitList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--生产日期-->
            <tr class="el-table__row">
              <td><div class="cell">生产日期</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.productiontime}}</div>
                  <el-form-item label-width="0" prop="productiontime" class="form-item" v-show="WriteState !== 2">
                    <el-date-picker class="tableSelect" v-model="tableData.productiontime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择生产日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
             <!--安装地址-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>详细地址</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.address}}</div>
                  <el-form-item label-width="0" prop="address" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.address" placeholder="请填入详细地址"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--备电设备细分类型-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>备电设备细分类型</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.type_name}}</div>
                  <el-form-item label-width="0" prop="type_name" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.type" placeholder="请选择备电设备厂家">
                      <el-option label="请选择" :value="null"></el-option>
                      <el-option v-for="item in dictionaryList.tyList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.tyList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--容量/功率-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>容量/功率（KW）</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.capacity}}</div>
                    <el-form-item label-width="0" prop="capacity" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.capacity" placeholder="请输入容量/功率（KW）"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td @click="OpenImgBox('capacity')"><div class="cell">{{capacityList.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--客户联系人-->
            <tr class="el-table__row">
              <td><div class="cell">客户联系人</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.linkmen}}</div>
                  <el-form-item label-width="0" prop="linkmen" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.linkmen" placeholder="请填入客户联系人"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--客户联系方法-->
            <tr class="el-table__row">
              <td><div class="cell">客户联系方法</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.linkmencontact}}</div>
                  <el-form-item label-width="0" prop="linkmencontact" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.linkmencontact" placeholder="请填入客户联系方法"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState === 2">
              <td><div class="cell">创建人</div></td>
              <td><div class="cell">{{tableData.createusername}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState === 2">
              <td><div class="cell">创建时间</div></td>
              <td><div class="cell">{{tableData.createtime}}</div></td>
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
      <el-button @click="subData" type="primary" v-show="WriteState !==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="isShow" title="选择站点" width="80%" :before-close="DetailhandleClose">
      <ResourceList @selectResource="selectResource"/>
    </el-dialog>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
  </div>
</template>

<script>
import ResourceList from 'base/Resource/ResourceList'
import GoogleMap from 'base/GoogleMap'
import { AddReservepover, EditReservepover } from 'api/api'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GlobalRes} from 'common/js/mixins'

export default {
  name: 'ReservepoverDe',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    dictionaryList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      isShow: false,
      showMap: false,
      // 精度图片列表
      longitudeList: [],
      capacityList: [],
      manufacturerImgList: [],
      modelsImgList: [],
      // 填写区域属性
      tableArea: [],
      areaOption: [],
      WriteLoading: false,
      // 新增表格相关属性
      tableData: {
        'resourcename': '',
        'type': null, // 设备类型id
        'provinceid': 0,
        'cityid': 0,
        'areaid': 0,
        'longitude': null,
        'latitude': null,
        'accessdate': '',
        'propertyrightunit': null,
        'number': null,
        'unit': null,
        'identificationcode': '',
        'productiontime': '',
        'manufacturer': null,
        'models': null,
        'state': 1,
        // 'address': '',
        'address': '测试值',
        'capacity': null,
        'linkmen': '',
        'linkmencontact': '',
        'imglist': [
          {
            'field_name': '',
            'url': '',
            'remarks': ''
          }
        ]
      },
      // 表单验证
      Rules: {
        resourcename: [
          { required: true, message: '请输入站点名称', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择备电设备细分类型', trigger: 'change' }
        ],
        areaid: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'change'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'change'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        accessdate: [
          { required: true, message: '请选择入网时间', trigger: 'blur' }
        ],
        propertyrightunit: [
          { required: true, message: '请输入产权单位', trigger: 'blur' }
        ],
        number: [
          { type: 'number', message: '必须为数字类型' }
        ],
        unit: [
          { required: true, message: '请选择单位', trigger: 'blur' }
        ],
        manufacturer: [
          { required: true, message: '请选择备电设备厂家', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
      this.setImgList(data.imglist)
    },
    //
    OpenImgBox (s) {
      switch (s) {
        case 'longitude':
          this.$emit('fatherOpenImgBox', '经度', 'longitude', this.longitudeList)
          break
        case 'capacity':
          this.$emit('fatherOpenImgBox', '容量/功(KW)', 'capacity', this.capacityList)
          break
        case 'manufacturer':
          this.$emit('fatherOpenImgBox', '设备厂家', 'manufacturer', this.manufacturerImgList)
          break
        case 'models':
          this.$emit('fatherOpenImgBox', '设备型号', 'models', this.modelsImgList)
          break
      }
    },
    // 提交函数
    subData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    validImgList () {
      if (!this.longitudeList.length) {
        return this.$message.warning('经度图片必须上传')
      }
      if (!this.capacityList.length) {
        return this.$message.warning('容量图片必须上传')
      }
      if (!this.manufacturerImgList.length) {
        return this.$message.warning('设备厂家图片必须上传')
      }
      if (!this.modelsImgList.length) {
        return this.$message.warning('设备型号图片必须上传')
      }
    },
    // 抽离共有的逻辑
    async add () {
      if (this.validImgList()) return
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData)
        if (!valid) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          this.$message.warning('请补全信息')
        } else {
          try {
            this.WriteLoading = true
            const res = await this.$axios.post(AddReservepover, this.tableData)
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
        }
      })
    },
    async edit () {
      if (this.validImgList()) return
      this.$refs.tableForm.validate(async (valid, msg) => {
        // console.log(this.tableData)
        if (!valid) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          this.$message.warning('请补全信息')
        } else {
          try {
            if (this.tableArea.areaid !== null && this.tableArea.areaid !== '' && this.tableArea.areaid !== undefined) {
              this.tableData.provinceid = this.tableArea.provinceid
              this.tableData.cityid = this.tableArea.cityid
              this.tableData.areaid = this.tableArea.areaid
            }
            this.WriteLoading = true
            const res = await this.$axios.put(EditReservepover, this.tableData)
            this.WriteLoading = false
            if (res.error === true) {
              // console.log(res.error)
            }
            // this.$message.error('输入参数为非法值，请重新输入')
            if (res.success === true) {
              this.$message.success('修改成功！')
              this.$emit('fatheretMore')
              // this.dictionaryList.areaList = []
              this.closeWrite()
            } else { this.$message.error(res.msg) }
          } catch (e) {
            console.log(e)
          }
        }
      })
    },
    setImgList (list) {
      if (list === null) return
      list.forEach((item) => {
        if (item.field_name === 'longitude') this.longitudeList.push(item)
        if (item.field_name === 'capacity') this.capacityList.push(item)
        if (item.field_name === 'manufacturer') this.manufacturerImgList.push(item)
        if (item.field_name === 'models') this.modelsImgList.push(item)
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      // this.tableData = {}
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.tableArea.splice(0, this.tableArea.length)
      this.capacityList = []
      this.longitudeList = []
      this.manufacturerImgList = []
      this.modelsImgList = []
      this.areaOption = []
      // this.getMore(1)
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    selectResource (name, id) {
      this.isShow = false
      this.tableData.resource_id = id
      this.tableData.resourcename = name
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    },
    OpenMap (val) { // 0: 查看 1: 编辑/新增
      this.showMap = true
      this.$nextTick(() => {
        this.$refs.GoogleMap.Open()
        this.$refs.GoogleMap.showType = val
        this.$refs.GoogleMap.longitude = this.tableData.longitude
        this.$refs.GoogleMap.latitude = this.tableData.latitude
      })
    },
    getMapData (longitude, latitude) {
      this.showMap = false
      if (longitude) {
        this.tableData.longitude = longitude
      }
      if (latitude) {
        this.tableData.latitude = latitude
      }
    }
  },
  computed: {
    ImgList () {
      return this.longitudeList.concat(this.capacityList, this.manufacturerImgList, this.modelsImgList)
    }
  },
  watch: {
    ImgList (val) {
      this.tableData.imglist = val
    }
  },
  components: {
    ResourceList,
    GoogleMap
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
