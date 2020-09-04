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
      <el-form :model="WriteData" :rules="Rules" v-loading="WriteLoading" ref="WriteForm" label-width="0" :show-message="false">
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
            <!--站点编码-->
            <tr class="el-table__row">
              <td><div class="cell">站点编码</div></td>
              <td><div class="cell">{{WriteData.resourcecode}}</div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <!--站点名称-->
            <tr class="el-table__row">
              <td><div class="cell">站点名称</div></td>
              <td><div class="cell">{{WriteData.resourcename}}</div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <!--设备类型-->
            <tr class="el-table__row">
              <td><div class="cell">设备类型</div></td>
              <td><div class="cell">{{WriteData.equipmenttypename}}</div></td>
              <td><div class="cell"></div></td>
              <!--<td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <!--设备厂家-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>设备厂家</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="manufacturer">
                  <el-select v-model="WriteData.manufacturer">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.manufacturer" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.manufacturername}}</div></td>
              <td @click="OpenImgBox(2)"><div class="cell">{{ImgList2.length}}</div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.manufacturer)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--设备型号-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>设备型号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="models">
                  <el-select v-model="WriteData.models">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.models" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.modelsname}}</div></td>
              <td @click="OpenImgBox(3)"><div class="cell">{{ImgList3.length}}</div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.models)}}</div></td> -->
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
            <!--标识码-->
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
            <!--经度-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>经度</div></td>
              <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                <el-form-item class="form-item" prop="longitude">
                  <el-input v-model="WriteData.longitude" readonly style="width: 80%" @mousewheel.native.prevent type="number"></el-input>
                  <i class="el-icon-location" style="font-size: 20px;color:#F64245;"></i>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2" @click="OpenMap(0)">
                <div class="cell location"><span>{{WriteData.longitude}}</span><i class="el-icon-location icon_location"></i></div>
              </td>
              <td @click="OpenImgBox(1)"><div class="cell">{{ImgList1.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--纬度-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>纬度</div></td>
              <td v-show="WriteState !== 2" @click="OpenMap(1)"><div class="cell">
                <el-form-item class="form-item" prop="latitude">
                  <el-input v-model="WriteData.latitude" readonly style="width: 80%" @mousewheel.native.prevent type="number"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2" @click="OpenMap(0)"><div class="cell">{{WriteData.latitude}}</div></td>

              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--产权单位-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>产权单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="propertyrightunit">
                  <el-select v-model="WriteData.propertyrightunit">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.propertyrightunit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.propertyrightunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.propertyrightunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--数量-->
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
            <!--单位-->
            <tr class="el-table__row">
              <td><div class="cell">单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="unit">
                  <el-select v-model="WriteData.unit">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.unit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.unitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.unit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--质保编号-->
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
            <!--生产日期-->
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
            <!--维护单位-->
            <tr class="el-table__row">
              <td><div class="cell">维护单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="maintenanceunit">
                  <el-select v-model="WriteData.maintenanceunit">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.maintenanceunit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.maintenanceunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.maintenanceunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--设备状态-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>设备状态</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="state">
                  <el-select v-model="WriteData.state">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.state" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.statename}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.state)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--安装地址-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>安装地址</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="address">
                  <el-input v-model="WriteData.address"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.address}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--细分类型-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>细分类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="facilitytype">
                  <el-select v-model="WriteData.facilitytype">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.facilitytype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.facilitytypename}}</div></td>
              <td @click="OpenImgBox(4)"><div class="cell">{{ImgList4.length}}</div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.facilitytype)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--充电桩类型-->
            <tr class="el-table__row" v-show="WriteState === 2">
              <td><div class="cell">充电桩类型</div></td>
              <td><div class="cell">{{WriteData.facilitytypename}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--端口数-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>端口数</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="portnumber">
                  <el-input v-model.number="WriteData.portnumber"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.portnumber}}</div></td>
              <td @click="OpenImgBox(5)"><div class="cell">{{ImgList5.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--供电类型-->
            <tr class="el-table__row">
              <td><div class="cell">供电类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="powersupply">
                  <el-select v-model="WriteData.powersupply">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.powersupply" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.powersupplyname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.powersupply)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!-- 雨棚 -->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>是否有雨棚</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="canopy">
                  <el-select v-model="WriteData.canopy">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.canopy ? '是' : '否'}}</div></td>
              <td @click="OpenImgBox(6)"><div class="cell">{{ImgList6.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteData.canopy || WriteState === 2">
              <td><div class="cell">雨棚面积(平米)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="canopyarea">
                  <el-input v-model="WriteData.canopyarea"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.canopyarea}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteData.canopy || WriteState === 2">
              <td><div class="cell">雨棚材质</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="canopymaterial">
                  <el-input v-model="WriteData.canopymaterial"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.canopymaterial}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!-- 门禁 -->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>是否安装门禁卡</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="accesscontrol">
                  <el-select v-model="WriteData.accesscontrol">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.accesscontrol ? '是' : '否'}}</div></td>
              <td @click="OpenImgBox(7)"><div class="cell">{{ImgList7.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteData.accesscontrol || WriteState === 2">
              <td><div class="cell">门禁厂家</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="accesscontrolmanufacturer">
                  <el-select v-model="WriteData.accesscontrolmanufacturer">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.accesscontrolmanufacturer" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.accesscontrolmanufacturername}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.accesscontrolmanufacturer)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteData.accesscontrol || WriteState === 2">
              <td><div class="cell">门禁型号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="accesscontrolno">
                  <el-input v-model="WriteData.accesscontrolno"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.accesscontrolno}}</div></td>
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
      <el-button v-show="WriteState !==2" @click="SubWrite(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交审核</el-button>
      <el-button v-show="WriteState !==2" @click="SubWrite(0)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
  </div>
</template>

<script>
import {DictionaryInfoList} from 'api/api'
import GoogleMap from 'base/GoogleMap'
import {GlobalRes} from 'common/js/mixins'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GetChargingPileTaskEquipment, AddChargingPileTaskEquipment, EditChargingPileTaskEquipment} from 'api/SurveyManagement'
import {formatDate} from 'common/js/cache'

export default {
  mixins: [GlobalRes],
  name: 'TaskChargingPile',
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
      showMap: false,
      WriteLoading: false,
      Loading: false,
      ImgList1: [], // 经度
      ImgList2: [], // 设备厂家
      ImgList3: [], // 设备型号
      ImgList4: [], // 细分类型
      ImgList5: [], // 端口数
      ImgList6: [], // 是否有雨棚
      ImgList7: [], // 是否安装门禁
      WriteData: {
        task_id: '',
        equipmenttype_id: '',
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        resource_id: '', // 站点id
        resourcecode: '',
        resourcename: '',
        latitude: null,
        longitude: null,
        accessdate: '', // 入网日期
        propertyrightunit: null, // 产权单位
        equipmenttypename: '',
        equipmenttype: null,
        number: 0, // 数量
        unit: null, // 单位
        qualitycode: '', // 质保编号
        identificationcode: '', // 标识码
        productiontime: null, // 生产日期
        manufacturer: null, // 设备厂家
        maintenanceunit: null, // 维护单位
        models: null, // 设备型号
        state: null, // 设备状态
        address: '', // 安装地址
        facilitytype: null, // 细分类型id
        portnumber: 0, // 端口数
        powersupply: null, // 供电类型id
        canopy: false, // 是否有雨棚
        canopyarea: '', // 雨棚面积
        canopymaterial: '', // 雨棚材质
        accesscontrol: false, // 是否安装门禁
        accesscontrolmanufacturer: null, // 门禁厂家
        accesscontrolno: '', // 门禁编号
        imglist: []
      },
      Rules: {
        manufacturer: [
          { required: true, message: '请选择设备厂家', trigger: 'change' }
        ],
        models: [
          { required: true, message: '请选择设备型号', trigger: 'change' }
        ],
        accessdate: [
          { required: true, message: '请选择入网日期', trigger: 'change' }
        ],
        propertyrightunit: [
          { required: true, message: '请选择产权单位', trigger: 'change' }
        ],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'change'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'change'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        number: [
          {required: false, message: '请填数量', trigger: 'blur'},
          { type: 'number', message: '必须为数字类型' }
        ],
        state: [{ required: true, message: '请填写设备状态', trigger: 'blur' }],
        address: [{ required: true, message: '请填写安装地址', trigger: 'blur' }],
        facilitytype: [{ required: true, message: '请填写细分类型', trigger: 'change' }],
        portnumber: [
          {required: false, message: '请填端口数', trigger: 'blur'},
          { type: 'number', message: '必须为数字类型' }
        ]
      },
      DicList: {}
    }
  },
  created () {
    this.getDic()
    if (this.WriteState) {
      this.WriteLoading = true
      this.$axios.get(GetChargingPileTaskEquipment, {
        params: {
          id: this.DeviceID
        }
      }).then(res => {
        this.WriteLoading = false
        this.WriteData = res.data
        this.setImgList(res.data.imglist)
      })
    }
  },
  methods: {
    getDic () {
      let arr = ['充电桩设备厂家', '设备状态', '设备产权单位', '设备单位', '充电桩设备型号', '设备维护单位', '设备存放点类型', '充电桩设备细分类型', '充电桩设备供电类型', '充电桩设备门禁厂家']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          let data = res.data
          this.DicList.propertyrightunit = data.filter(i => { return i.type === '设备产权单位' })
          this.$set(this.DicList, 'unit', data.filter(i => { return i.type === '设备单位' }))
          this.DicList.manufacturer = data.filter(i => { return i.type === '充电桩设备厂家' })
          this.DicList.maintenanceunit = data.filter(i => { return i.type === '设备维护单位' })
          this.DicList.models = data.filter(i => { return i.type === '充电桩设备型号' })
          this.DicList.state = data.filter(i => { return i.type === '设备状态' })
          this.DicList.facilitytype = data.filter(i => { return i.type === '充电桩设备细分类型' })
          this.DicList.powersupply = data.filter(i => { return i.type === '充电桩设备供电类型' })
          this.DicList.accesscontrolmanufacturer = data.filter(i => { return i.type === '充电桩设备门禁厂家' })
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
      this.ImgList4 = list.filter(i => { return i.field_name === 'facilitytype' })
      this.ImgList5 = list.filter(i => { return i.field_name === 'portnumber' })
      this.ImgList6 = list.filter(i => { return i.field_name === 'canopy' })
      this.ImgList7 = list.filter(i => { return i.field_name === 'accesscontrol' })
    },
    formatDate (str) { return formatDate(str) },
    SubWrite (state) {
      if (this.WriteState === 0) this.SubAdd(state)
      if (this.WriteState === 1) this.SubEdit(state)
    },
    SubAdd (state) {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.WriteData.operatorsitetype = 2
          this.$axios.post(AddChargingPileTaskEquipment, this.WriteData, {
            params: {
              censusstate: state
            }
          }).then(res => {
            this.WriteLoading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              // this.$emit('fatheretMore')
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
    SubEdit (state) {
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.$axios.put(EditChargingPileTaskEquipment, this.WriteData, {
            params: {
              censusstate: state
            }
          }).then(res => {
            this.WriteLoading = false
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              // this.$emit('fatheretMore')
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
      if (val === 4) this.$emit('fatherOpenImgBox', '细分类型', 'facilitytype', this.ImgList4)
      if (val === 5) this.$emit('fatherOpenImgBox', '端口数', 'portnumber', this.ImgList5)
      if (val === 6) this.$emit('fatherOpenImgBox', '是否有雨棚', 'canopy', this.ImgList6)
      if (val === 7) this.$emit('fatherOpenImgBox', '是否安装门禁', 'accesscontrol', this.ImgList7)
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    ResetWrite () {
      this.ImgList1 = []
      this.ImgList2 = []
      this.ImgList3 = []
      this.ImgList4 = []
      this.ImgList5 = []
      this.ImgList6 = []
      this.ImgList7 = []
      this.$refs.WriteForm.resetFields()
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
      return this.ImgList1.concat(this.ImgList2, this.ImgList3, this.ImgList4, this.ImgList5, this.ImgList6, this.ImgList7)
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: {GoogleMap}
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
