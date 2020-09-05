<template>
  <div class="write">
    <el-tabs class="content-card" v-model="ViewTabIndex"  v-loading="WriteLoading" @tab-click="changeTab">
      <el-tab-pane :label="WriteState===0? '油机新增':WriteState===1?'油机编辑':'油机详情'">
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
                    <el-form-item label-width="0" class="form-item"  prop="AreaList">
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
            <!--油机编码-->
            <tr class="el-table__row">
              <td><div class="cell">油机编码</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.machinenumber}}</div>
                  <el-form-item label-width="0" prop="machinenumber" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.machinenumber" placeholder="请填入油机编码"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--油机缸号-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>油机缸号</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.machinebatchno}}</div>
                  <el-form-item label-width="0" prop="machinebatchno" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model="tableData.machinebatchno" placeholder="请填入油机缸号"></el-input>
                  </el-form-item>
                </div>
              </td>
               <td @click="OpenImgBox('machinebatchno')"><div class="cell">{{this.machinebatchnoImgList.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--厂家-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>厂家</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.manufactorname}}</div>
                  <el-form-item label-width="0" prop="manufactor" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.manufactor" placeholder="请选择厂家">
                      <el-option label="请选择" value="null"></el-option>
                      <el-option v-for="item in dictionaryList.manufactorList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.manufactorList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--型号-->
            <tr class="el-table__row">
              <td><div class="cell">型号</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.modelname}}</div>
                  <el-form-item label-width="0" prop="model" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.model" placeholder="请选择型号">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="item in dictionaryList.modelList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.modelsList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--归属单位-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>归属单位</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.unitname}}</div>
                  <el-form-item label-width="0" prop="unit" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.unit" placeholder="请选择归属单位">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="item in dictionaryList.unitList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.unitList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--燃油类型-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>燃油类型</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.fueltypename}}</div>
                  <el-form-item label-width="0" prop="fueltype" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.fueltype" placeholder="请选择燃油类型">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="item in dictionaryList.fueltypeList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{this.writeDic(dictionaryList.unitList)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--功率-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>功率</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.power}}</div>
                  <el-form-item label-width="0" prop="power" class="form-item" v-show="WriteState !== 2">
                    <el-input v-model.number="tableData.power" placeholder="请填入功率"></el-input>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!-- 油机状态 -->
          <!--  <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>油机状态</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.enginestatename}}</div>
                  <el-form-item label-width="0" prop="enginestate" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.enginestate" placeholder="请选择油机状态">
                      <el-option label="请选择" value=""></el-option>
                      <el-option v-for="item in dictionaryList.enginestateList" :key="item.id" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td><div class="cell"></div></td>
              &lt;!&ndash; <td><div class="cell">{{this.writeDic(dictionaryList.stateList)}}</div></td> &ndash;&gt;
              <td><div class="cell"></div></td>
            </tr>-->
            <!--标签二维码-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>标签编码</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.modulecode}}</div>
                  <div label-width="0"  class="form-item" v-show="WriteState !== 2" @click="tagOpen">
                    <el-form-item label-width="0" prop="modulecode" class="form-item">
                    <el-input v-model="tableData.modulecode" prop="modulecode" placeholder="请填入标签" readonly></el-input>
                    </el-form-item>
                  </div>
                </div>
              </td>
             <!-- <td @click="OpenImgBox('tagid')"><div class="cell">{{this.tagidImgList.length}}</div></td>-->
               <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
            <!--采集器ID-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>采集器ID</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.swver}}</div>
                  <div label-width="0" prop="swver" class="form-item" v-show="WriteState !== 2" @click="collectorOpen">
                    <el-form-item label-width="0" prop="swver" class="form-item">
                    <el-input v-model="tableData.swver" placeholder="请填入采集器ID" readonly></el-input>
                    </el-form-item>
                  </div>
                </div>
              </td>
            <!--  <td @click="OpenImgBox('collectorid')"><div class="cell">{{this.collectoridImgList.length}}</div></td>-->
            <td><div class="cell"></div></td>
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
            </table>
          </div>
        </el-form>
      </div>
      </el-tab-pane>
      <el-tab-pane label="调度日志" v-if="WriteState!==0">
        <el-table :data="tableData2" v-loading="WriteLoading">
          <!-- <el-table-column v-if="isSite=='1'" type="selection" width="40"></el-table-column> -->
          <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
          <el-table-column prop="cityname" label="地市" width=""></el-table-column>
          <el-table-column prop="areaname" label="区域" width=""></el-table-column>
          <el-table-column prop="code" label="工单号" width=""></el-table-column>
          <el-table-column prop="resourcesname" label="站点名称" width=""></el-table-column>
          <el-table-column prop="dispatchtypename" label="调度类型" width=""></el-table-column>
          <el-table-column prop="positiondeviation" label="位置偏差" width=""></el-table-column>
          <el-table-column prop="username" label="操作人" width=""></el-table-column>
          <el-table-column prop="dateinfo" label="操作时间" width=""></el-table-column>
        </el-table>
        <div class="center">
          <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="center" v-show="WriteState!==3" style="padding-bottom: 100px">
      <el-button @click="handleData(false)" type="primary" v-if="WriteState!==2&&ViewTabIndex==='0'" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="handleData(true)" type="primary" v-if="WriteState!==2&&ViewTabIndex==='0'" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交审核</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <div class="center" v-show="WriteState==3" style="padding-bottom: 100px">
      <el-button @click="handleData3(false)" type="primary" v-if="WriteState!==2&&ViewTabIndex==='0'" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">保存</el-button>
      <el-button @click="handleData3(true)" type="primary" v-if="WriteState!==2&&ViewTabIndex==='0'" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交审核</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="colShow" title="选择采集器ID" width="80%" :before-close="DetailhandleClose">
      <CollectorPicker @selectCollector="selectCollector" ref="collector"/>
    </el-dialog>
    <el-dialog top="1%" :visible.sync="tagShow" title="选择标签ID" width="80%" :before-close="DetailhandleClose2">
      <TagPicker @selectTag="selectTag" ref="tag"/>
    </el-dialog>
  </div>
</template>

<script>
import { AddEngine, EditEngine, GetEngineidlog } from 'api/YJGL'
import CollectorPicker from 'base/YJGL/CollectorPicker'
import TagPicker from 'base/YJGL/TagPicker'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'BatteryDe',
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
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      colShow: false,
      tagShow: false,
      // 填写区域属性
      ViewTabIndex: '0',
      areaOption: [],
      WriteLoading: false,
      // 图片列表
      tagidImgList: [],
      collectoridImgList: [],
      machinebatchnoImgList: [],
      // 新增表格相关属性
      tableData: {
        'AreaList': [],
        'provinceid': null,
        'cityid': null,
        'areaid': null,
        'machinenumber': '',
        'machinebatchno': '',
        'enginestate': '',
        'unit': '',
        'unitname': '',
        'manufactor': '',
        'manufactorname': '',
        'modelname': '',
        'model': null,
        'fueltype': '',
        'power': '',
        'tagid': '',
        'modulecode': '',
        'collectorid': '',
        'swver': '',
        'applicanttype': 2,
        'issubmit': false,
        'imglist': [
          {
            'field_name': '',
            'url': '',
            'remarks': ''
          }
        ]
      },
      tableData2: [],
      // 分页数据
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      // 表单验证
      Rules: {
        machinebatchno: [
          { required: true, message: '请选择油机缸号', trigger: 'change' }
        ],
        manufactor: [
          { required: true, message: '请选择厂家', trigger: 'blur' }
        ],
        fueltype: [
          { required: true, message: '请选择燃油类型', trigger: 'blur' }
        ],
        power: [
          { required: true, message: '请输入功率', trigger: 'blur' },
          { type: 'number', message: '必须为数字类型' }
        ],
        unit: [
          { required: true, message: '请选择归属单位', trigger: 'blur' }
        ],
        modulecode: [
          { required: true, message: '请选择标签编码', trigger: 'change' }
        ],
        swver: [
          { required: true, message: '请选择采集器ID', trigger: 'change' }
        ]

        /*,
        enginestate: [
          { required: true, message: '请选择油机状态', trigger: 'blur' }
        ] */
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data, data2) {
      this.tableData = data
      this.setImgList(data.imglist)
      this.tableData2 = data2
      this.setArea([])
    },
    OpenImgBox (s) {
      switch (s) {
        case 'tagid':
          this.$emit('fatherOpenImgBox', '标签二维码', 'tagid', this.tagidImgList)
          break
        case 'collectorid':
          this.$emit('fatherOpenImgBox', '采集器图片', 'collectorid', this.collectoridImgList)
          break
        case 'machinebatchno':
          this.$emit('fatherOpenImgBox', '油机缸号', 'machinebatchno', this.machinebatchnoImgList)
          break
      }
    },
    // 提交函数
    handleData (issubmit) {
      this.tableData.issubmit = issubmit
      if (this.WriteState === 0) {
        this.tableData.id = null
        this.add()
      }
      if (this.WriteState === 1) this.edit()
    },
    handleData3 (issubmit) {
      this.tableData.issubmit = issubmit
      this.add()
    },
    validImgList () {
      if (this.machinebatchnoImgList.length === 0) {
        return this.$message.warning('油机缸号照片必须上传')
      }
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate((valid, msg) => {
        if (this.machinebatchnoImgList.length === 0) {
          return this.$message.warning('油机缸号照片必须上传')
        }

        if (!valid || this.tableData.AreaList.length === 0) {
          if (this.tableData.AreaList.length === 0) return this.$message.warning('请选择区域')
          return this.$message.warning('请补全信息')
        } else {
          this.tableData.applicanttype = 2
          this.WriteLoading = true
          this.$axios.post(AddEngine, Object.assign({}, this.tableData, this.tableArea)).then(
            res => {
              this.WriteLoading = false
              if (res.error === true) {
                this.$message.warning('请补全信息')
              }
              if (res.success === true) {
                this.$message.success('添加成功！')
                this.$emit('fatheretMore')
                this.dictionaryList.areaList = []
                this.closeWrite()
              } else { this.$message.warning(res.msg) }
            }
          )
        }
      })
    },
    // 修改提交
    async edit () {
      if (this.validImgList()) return
      this.$refs.tableForm.validate((valid, msg) => {
        if (!valid || this.machinebatchnoImgList.length === 0) {
          if (this.machinebatchnoImgList.length === 0) return this.$message.warning('油机缸号照片必须上传')
          this.$message.warning('请补全信息')
        } else {
          this.tableData.applicanttype = 2
          this.WriteLoading = true
          this.$axios.put(EditEngine, this.tableData).then(res => {
            this.WriteLoading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.closeWrite()
          })
        }
      })
    },
    setImgList (list) {
      if (list !== null && list !== undefined) {
        list.forEach((item) => {
          if (item.field_name === 'collectorid') this.collectoridImgList.push(item)
          if (item.field_name === 'tagid') this.tagidImgList.push(item)
          if (item.field_name === 'machinebatchno') this.machinebatchnoImgList.push(item)
        })
      }
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.tagidImgList = []
      this.collectoridImgList = []
      this.machinebatchnoImgList = []
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$refs.tableForm.resetFields()
      this.ViewTabIndex = '0'
      this.areaOption = []
      // this.getMore(1)
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    tagOpen () {
      this.tagShow = true
      if (this.$refs.tag) {
        this.$refs.tag.getMore(1)
      }
    },
    collectorOpen () {
      this.colShow = true
      if (this.$refs.collector) {
        this.$refs.collector.getMore(1)
      }
    },
    selectCollector (id, swver) {
      this.colShow = false
      this.tableData.collectorid = id
      this.tableData.swver = swver
    },
    selectTag (id, modulecode) {
      this.tagShow = false
      this.tableData.tagid = id
      this.tableData.modulecode = modulecode
    },
    DetailhandleClose () {
      this.colShow = !this.colShow
    },
    DetailhandleClose2 () {
      this.tagShow = !this.tagShow
    },
    changeTab () {
      if (this.ViewTabIndex === '0') {
        this.$emit('fathersetData', this.WriteState, this.id)
      }
      if (this.ViewTabIndex === '1') {
        this.getMore(1)
      }
    },
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    async getMore (page) {
      this.pagination.currentPage = page
      this.WriteLoading = true
      this.$axios.get(GetEngineidlog, {
        params: {
          id: this.id,
          PageIndex: page,
          PageSize: this.pagination.pageSize
        }
      }).then(res => {
        this.tableData2 = res.data.list
        this.pagination.total = res.data.total
      }).catch(error => {
        console.log(error)
      })
      this.WriteLoading = false
    }
  },
  computed: {
    ImgList () {
      return this.machinebatchnoImgList
    }
  },
  watch: {
    ImgList (val) {
      this.tableData.imglist = val
    }
  },
  components: {
    CollectorPicker,
    TagPicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
