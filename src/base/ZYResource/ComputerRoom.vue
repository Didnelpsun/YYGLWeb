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
            <!--站点编码-->
            <tr class="el-table__row">
              <td><div class="cell">站点编码</div></td>
              <td><div class="cell">
                <div v-if="WriteState !== 2 && isTask === 0" @click="isShow = true">
                  <el-input v-model="WriteData.resourcecode" readonly placeholder="请选择"></el-input>
                </div>
                <div v-else>
                  {{WriteData.resourcecode}}
                </div>
              </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--站点名称-->
            <tr class="el-table__row">
              <td><div class="cell">站点名称</div></td>
              <td><div class="cell">
                <div v-if="WriteState !== 2 && isTask === 0" @click="isShow = true">
                  <el-input v-model="WriteData.resourcename" readonly placeholder="请选择"></el-input>
                </div>
                <div v-else>
                  {{WriteData.resourcename}}
                </div>
              </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--资源类型-->
            <tr class="el-table__row">
              <td><div class="cell">资源类型</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 0 && isTask === 0">机房</div>
                <div v-else>
                  <el-input v-model="WriteData.equipmenttypename"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--经度-->
            <tr class="el-table__row">
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
              <td @click="OpenImgBox(3)"><div class="cell">{{ImgList3.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--纬度-->
            <tr class="el-table__row">
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
            <!--资源厂家-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>资源厂家</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="manufacturer">
                  <el-select v-model="WriteData.manufacturer">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.manufacturer" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.manufacturername}}</div></td>
              <td @click="OpenImgBox(1)"><div class="cell">{{ImgList1.length}}</div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.manufacturer)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--资源型号-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>资源型号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="models">
                  <el-select v-model="WriteData.models">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.models" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.modelsname}}</div></td>
              <td @click="OpenImgBox(2)"><div class="cell">{{ImgList2.length}}</div></td>
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
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.identificationcode}}</div></td>
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
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.propertyrightunit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.propertyrightunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.powersupplymode)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--数量-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>数量</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="number">
                  <el-input v-model="WriteData.number"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.number}}</div></td>
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
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.unitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.powersupplymode)}}</div></td> -->
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
            <!--机房类型-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>机房类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="computerroomtype">
                  <el-select v-model="WriteData.computerroomtype">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.computerroomtype" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.computerroomtypename}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.powersupplymode)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--机房移交情况-->
            <tr class="el-table__row">
              <td><div class="cell">机房移交情况</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="handoversituation">
                  <el-input v-model="WriteData.handoversituation"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.handoversituation}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--进深(m)-->
            <tr class="el-table__row">
              <td><div class="cell">进深(m)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="depth">
                  <el-input v-model="WriteData.depth"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.depth}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--开间(m)-->
            <tr class="el-table__row">
              <td><div class="cell">开间(m)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="studio">
                  <el-input v-model="WriteData.studio"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.studio}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--机房净高(m)-->
            <tr class="el-table__row">
              <td><div class="cell">机房净高(m)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="clearheight">
                  <el-input v-model="WriteData.clearheight"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.clearheight}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!-- 能否上站发电 -->
            <tr class="el-table__row">
              <td><div class="cell">是否警示标识</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="powergeneration">
                  <el-select v-model="WriteData.powergeneration">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.powergeneration ? '是' : '否'}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!-- 是否含油机房 -->
            <tr class="el-table__row">
              <td><div class="cell">是否含油机房</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="oiliness">
                  <el-select v-model="WriteData.oiliness">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.oiliness ? '是' : '否'}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--产权性质-->
            <tr class="el-table__row">
              <td><div class="cell">产权性质</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="propertyrights">
                  <el-input v-model="WriteData.propertyrights"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.propertyrights}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--(原)产权单位-->
            <tr class="el-table__row">
              <td><div class="cell">(原)产权单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="rawpropertyrightunit">
                  <el-select v-model="WriteData.rawpropertyrightunit">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.rawpropertyrightunit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.rawpropertyrightunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.rawpropertyrightunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--共享单位-->
            <tr class="el-table__row">
              <td><div class="cell">共享单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="sharedunit">
                  <el-select v-model="WriteData.sharedunit">
                    <el-option label="请选择" :value="null"></el-option>
                    <el-option v-for="i in DicList.sharedunit" :key="i.id" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.sharedunitname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.sharedunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--机位数量(个)-->
            <tr class="el-table__row">
              <td><div class="cell">机位数量(个)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="reservation">
                  <el-input v-model="WriteData.reservation"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.reservation}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--机架数量(个)-->
            <tr class="el-table__row">
              <td><div class="cell">机架数量(个)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="rack">
                  <el-input v-model="WriteData.rack"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.rack}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--机房电流(A)-->
            <tr class="el-table__row">
              <td><div class="cell">机房电流(A)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="current">
                  <el-input v-model="WriteData.current"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.current}}</div></td>
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
      <el-button v-show="WriteState !==2 && isTask === 1" @click="SubWrite(1)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交审核</el-button>
      <el-button v-show="WriteState !==2" @click="SubWrite(0)" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <GoogleMap v-if="showMap" ref="GoogleMap" @fatherGetData="getMapData"></GoogleMap>
    <el-dialog top="1%" :visible.sync="isShow" title="选择站点" width="80%" :before-close="DetailhandleClose">
      <ResourceList :resourcetype="2" @selectResource="selectResource"/>
    </el-dialog>
  </div>
</template>

<script>
import GoogleMap from 'base/GoogleMap'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {DictionaryInfoList} from 'api/api'
import {GetComputerRoomInfo, GetComputerRoomTaskEquipmentInfo, AddComputerRoom, UpdateComputerRoom,
  AddComputerRoomTaskEquipment, EditComputerRoomTaskEquipment} from 'api/SurveyManagement'
import {formatDate} from 'common/js/cache'
import {GlobalRes} from 'common/js/mixins'
import ResourceList from 'base/Resource/ResourceList'

export default {
  name: 'ComputerRoomDetail',
  mixins: [GlobalRes],
  props: {
    DeviceID: {
      type: String,
      default: ''
    },
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    isTask: {
      type: Number,
      default: 0 // 1为任务设备
    }
  },
  data () {
    return {
      showMap: false,
      Loading: false,
      isShow: false,
      ImgList1: [],
      ImgList2: [],
      ImgList3: [],
      WriteData: {
        task_id: '',
        resource_id: '',
        resourcename: '',
        resourcecode: '',
        equipmenttype_id: '',
        equipmenttypename: '',
        longitude: null,
        latitude: null,
        manufacturer: null,
        models: null,
        propertyrightunit: null,
        accessdate: '',
        identificationcode: '',
        state: 1,
        number: '',
        unit: null,
        productiontime: '',
        computerroomtype: null,
        handoversituation: '',
        depth: '',
        studio: '',
        clearheight: '',
        powergeneration: false,
        oiliness: false,
        propertyrights: '',
        rawpropertyrightunit: null,
        sharedunit: null,
        reservation: '',
        rack: '',
        current: '',
        imglist: []
      },
      Rules: {
        longitude: [
          {required: true, message: '请填写经度', trigger: 'change'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'change'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ],
        manufacturer: [
          { required: true, message: '请选择资源厂家', trigger: 'change' }
        ],
        models: [
          { required: true, message: '请选择资源型号', trigger: 'change' }
        ],
        accessdate: [
          { required: true, message: '请选择入网日期', trigger: 'change' }
        ],
        computerroomtype: [
          { required: true, message: '请选择机房类型', trigger: 'change' }
        ]
      },
      DicList: {}
    }
  },
  created () {
    this.getDicList()
    if (this.WriteState) {
      this.Loading = true
      this.$axios.get(this.isTask ? GetComputerRoomTaskEquipmentInfo : GetComputerRoomInfo, {
        params: {
          id: this.DeviceID
        }
      }).then(res => {
        this.Loading = false
        this.WriteData = res.data
        this.setImgList(res.data.imglist)
      })
    }
  },
  methods: {
    getDicList () {
      let arr = ['设备单位', '机房设备厂家', '机房设备型号', '设备产权单位', '机房设备类型', '机房设备共享单位', '机房设备原产权单位']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.$set(this.DicList, 'propertyrightunit', res.data.filter(i => { return i.type === '设备产权单位' }))
          this.DicList.manufacturer = res.data.filter(i => { return i.type === '机房设备厂家' })
          this.DicList.models = res.data.filter(i => { return i.type === '机房设备型号' })
          this.DicList.unit = res.data.filter(i => { return i.type === '设备单位' })
          this.DicList.computerroomtype = res.data.filter(i => { return i.type === '机房设备类型' })
          this.DicList.sharedunit = res.data.filter(i => { return i.type === '机房设备共享单位' })
          this.DicList.rawpropertyrightunit = res.data.filter(i => { return i.type === '机房设备原产权单位' })
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.ImgList1 = []
      this.ImgList2 = []
      this.ImgList3 = []
      this.$refs.WriteForm.clearValidate()
    },
    formatDate (str) { return formatDate(str) },
    setWriteData (data) {
      this.WriteData = data
      this.setImgList(data.imglist)
    },
    OpenImgBox (val) {
      if (val === 1) {
        this.$emit('fatherOpenImgBox', '资源厂家', 'manufacturer', this.ImgList1)
      }
      if (val === 2) {
        this.$emit('fatherOpenImgBox', '资源型号', 'models', this.ImgList2)
      }
      if (val === 3) {
        this.$emit('fatherOpenImgBox', '经度', 'models', this.ImgList3)
      }
    },
    SubWrite (state) {
      if (this.isTask) {
        if (this.WriteState === 0) this.SubTaskAdd(state)
        if (this.WriteState === 1) this.SubTaskEdit(state)
      } else {
        if (this.WriteState === 0) this.SubAdd()
        if (this.WriteState === 1) this.SubEdit()
      }
    },
    SubAdd () {
      if (this.validImgList()) return
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(AddComputerRoom, this.WriteData).then(res => {
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
          this.$axios.put(UpdateComputerRoom, this.WriteData).then(res => {
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
    SubTaskAdd (state) {
      if (this.validImgList()) return
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(AddComputerRoomTaskEquipment, this.WriteData, {
            params: {
              censusstate: state
            }
          }).then(res => {
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
    SubTaskEdit (state) {
      if (this.validImgList()) return
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.put(EditComputerRoomTaskEquipment, this.WriteData, {
            params: {
              censusstate: state
            }
          }).then(res => {
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
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => { return i.field_name === 'manufacturer' })
      this.ImgList2 = list.filter(i => { return i.field_name === 'models' })
      this.ImgList3 = list.filter(i => { return i.field_name === 'longitude' })
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
    },
    DetailhandleClose () { this.isShow = !this.isShow },
    selectResource (name, id, code) {
      this.isShow = false
      this.WriteData.resource_id = id
      this.WriteData.resourcecode = code
      this.WriteData.resourcename = name
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1.concat(this.ImgList2, this.ImgList3)
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: {GoogleMap, ResourceList}
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
