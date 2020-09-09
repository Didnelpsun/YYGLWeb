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
                <div v-if="WriteState == 0 && isTask === 0">交流配电箱</div>
                <div v-else>
                  <el-input v-model="WriteData.equipmenttypename"></el-input>
                </div></div>
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
            <!--总容量(A)-->
            <tr class="el-table__row">
              <td><div class="cell">总容量(A)</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="totalcapacity">
                  <el-input v-model="WriteData.totalcapacity"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.totalcapacity}}</div></td>
              <td @click="OpenImgBox(3)"><div class="cell">{{ImgList3.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!-- 是否预留移动油机输入接口 -->
            <tr class="el-table__row">
              <td><div class="cell">是否预留移动油机输入接口</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="Oilmachineinputinterface">
                  <el-select v-model="WriteData.Oilmachineinputinterface">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.Oilmachineinputinterface ? '是' : '否'}}</div></td>
              <td @click="OpenImgBox(4)"><div class="cell">{{ImgList4.length}}</div></td>
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

    <el-dialog top="1%" :visible.sync="isShow" title="选择站点" width="80%" :before-close="DetailhandleClose">
      <ResourceList :resourcetype="2" @selectResource="selectResource"/>
    </el-dialog>
  </div>
</template>

<script>
import {DictionaryInfoList} from 'api/api'
import {GetAcDistriButionBoxInfo, GetTaskEquipmentAcDistriButionBoxInfo, AddAcDistriButionBox, EditAcDistriButionBox,
  AddTaskEquipmentAcDistriButionBox, EditTaskEquipmentAcDistriButionBox} from 'api/SurveyManagement'
import {formatDate} from 'common/js/cache'
import {GlobalRes} from 'common/js/mixins'
import ResourceList from 'base/Resource/ResourceList'

export default {
  name: 'AcDistriButionBoxDetail',
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
      Loading: false,
      isShow: false,
      ImgList1: [],
      ImgList2: [],
      ImgList3: [],
      ImgList4: [],
      WriteData: {
        task_id: '',
        resource_id: '',
        resourcename: '',
        resourcecode: '',
        equipmenttype_id: '',
        equipmenttypename: '',
        manufacturer: null,
        models: null,
        state: 1,
        totalcapacity: '',
        Oilmachineinputinterface: false,
        imglist: []
      },
      Rules: {
        manufacturer: [
          { required: true, message: '请选择资源厂家', trigger: 'change' }
        ],
        models: [
          { required: true, message: '请选择资源型号', trigger: 'change' }
        ],
        accessdate: [
          { required: true, message: '请选择入网日期', trigger: 'change' }
        ]
      },
      DicList: {}
    }
  },
  created () {
    this.getDicList()
    if (this.WriteState) {
      this.Loading = true
      this.$axios.get(this.isTask ? GetTaskEquipmentAcDistriButionBoxInfo : GetAcDistriButionBoxInfo, {
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
      let arr = ['交流配电箱设备厂家', '交流配电箱设备型号']
      this.$axios.post(DictionaryInfoList, arr).then(res => {
        if (res.errorCode === '200') {
          this.$set(this.DicList, 'manufacturer', res.data.filter(i => { return i.type === '交流配电箱设备厂家' }))
          this.DicList.models = res.data.filter(i => { return i.type === '交流配电箱设备型号' })
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
      this.ImgList4 = []
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
        this.$emit('fatherOpenImgBox', '总容量(A)', 'manufacturer', this.ImgList3)
      }
      if (val === 4) {
        this.$emit('fatherOpenImgBox', '是否预留移动油机输入接口', 'models', this.ImgList4)
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
          this.$axios.post(AddAcDistriButionBox, this.WriteData).then(res => {
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
          this.$axios.put(EditAcDistriButionBox, this.WriteData).then(res => {
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
          this.$axios.post(AddTaskEquipmentAcDistriButionBox, this.WriteData, {
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
          this.$axios.put(EditTaskEquipmentAcDistriButionBox, this.WriteData, {
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
      this.ImgList3 = list.filter(i => { return i.field_name === 'totalcapacity' })
      this.ImgList4 = list.filter(i => { return i.field_name === 'Oilmachineinputinterface' })
    },
    DetailhandleClose () { this.isShow = !this.isShow },
    selectResource (name, id, code) {
      this.isShow = false
      this.WriteData.resource_id = id
      this.WriteData.resourcecode = code
      this.WriteData.resourcename = name
    },
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
  components: {ResourceList}
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
