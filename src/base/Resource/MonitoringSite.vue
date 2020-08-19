<template>
  <div class="write">
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col name="el-table_8_column_60" width="120"/>
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
      <el-form :model="WriteData" :rules="Rules" ref="WriteForm" label-width="0" :show-message="false">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col name="el-table_8_column_60" width="120"/>
              <col name="el-table_8_column_61" width="100"/>
              <col name="el-table_8_column_62" width="50"/>
              <!-- <col name="el-table_8_column_63" width="400"/> -->
              <col name="el-table_8_column_64" width="100"/>
            </colgroup>
            <tbody>
            <tr class="el-table__row" v-if="WriteState!==2">
              <td><div class="cell"><i class="must">*</i>所属站点</div></td>
              <td><div class="cell" @click="isShow = true">
                <el-form-item class="form-item" prop="resourcename">
                  <el-input v-model="WriteData.resourcename" readonly placeholder="请选择"></el-input>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState===2">
              <td><div class="cell"><i class="must">*</i>所属站点名称</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.resourcename}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState===2">
              <td><div class="cell"><i class="must">*</i>所属站点编码</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.resourcecode}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>运维ID</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="monitoringcode">
                  <el-input v-model="WriteData.monitoringcode"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.monitoringcode}}</div></td>
              <td @click="OpenImgBox(1)"><div class="cell">{{ImgList1.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--运维站点名称-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>运维站点名称</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="monitoringname">
                  <el-input v-model="WriteData.monitoringname"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.monitoringname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>经度</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="longitude">
                  <el-input v-model="WriteData.longitude" @mousewheel.native.prevent type="number"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState === 2"><div class="cell">{{WriteData.longitude}}</div></td>

              <td @click="OpenImgBox(2)"><div class="cell">{{ImgList2.length}}</div></td>
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
              <td v-if="WriteState === 2"><div class="cell">{{WriteData.latitude}}</div></td>

              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">创建人</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createname}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
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
    <div class="center" style="padding-bottom: 10px">
      <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
    </div>

    <el-dialog top="1%" :visible.sync="isShow" width="80%" :before-close="DetailhandleClose">
      <ResourceList :resourcetype="2" @selectResource="selectResource"/>
    </el-dialog>

    <ImgBox ref="ImgBox"></ImgBox>
  </div>
</template>

<script>
import {GetEnergyListAsync, AddMonitoringSite, EditMonitoringSite} from 'api/api'
import ResourceList from 'base/Resource/ResourceList'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'
import {GlobalRes} from 'common/js/mixins'
import ImgBox from 'base/ImgBox'

export default {
  name: 'DetailsMonitoringSite',
  mixins: [GlobalRes],
  props: {
    WriteData: {
      // type: Object,
      default () {
        return {}
      }
    },
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    ImgList1: {
      type: Array,
      default () {
        return []
      }
    },
    ImgList2: {
      type: Array,
      default () {
        return []
      }
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
      resList: [],
      Loading: false,
      WriteLoading: false,
      isShow: false,
      WriteDatas: {
        AreaList: [],
        imglist: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        resource_id: '',
        resourcename: '',
        monitoringcode: '',
        monitoringname: '',
        longitude: null,
        latitude: null
      },
      Rules: {
        monitoringcode: [{ required: true, message: '请填写运维ID', trigger: 'blur' }],
        monitoringname: [{ required: true, message: '请填写运维站点名称', trigger: 'blur' }],
        longitude: [
          {required: true, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: true, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ResetWrite () {
      Object.assign(this.WriteData, this.$options.data().WriteDatas)
      this.$nextTick(() => {
        this.$refs.WriteForm.clearValidate()
      })
      // this.setArea([])
    },
    setWriteData (data) {
      this.WriteData = data
      this.setImgList(data.imglist)
    },
    OpenImgBox (val) {
      this.$emit('fatherOpenImgBox', val)
      /* switch (val) {
        case 1:
          this.$refs.ImgBox.SetData('运维站点编码', 'monitoringcode', this.ImgList1)
          break
        case 2:
          this.$refs.ImgBox.SetData('经度', 'longitude', this.ImgList2)
          break
      }
      this.$refs.ImgBox.Open()
      this.WriteState === 2 ? this.$refs.ImgBox.Flag = true : this.$refs.ImgBox.Flag = false */
    },
    querySearchAsync (query) {
      if (!query.length) return
      this.$axios.get(GetEnergyListAsync, {
        params: {
          name: query,
          pageIndex: 1,
          pageSize: 10000
        }
      }).then((res) => {
        if (res.errorCode === '200') {
          this.resList = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
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
      if (!this.WriteData.resourcename) {
        return this.$message.error('请选择所属站点')
      }
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.WriteData.workordersitetype = 2
          this.$axios.post(AddMonitoringSite, this.WriteData).then(res => {
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
      if (!this.WriteData.resourcename) {
        return this.$message.error('请选择所属站点')
      }
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.WriteData.workordersitetype = 2
          this.$axios.put(EditMonitoringSite, this.WriteData).then(res => {
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
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    setImgList (list) {
      list.forEach(item => {
        // console.log(list)
        // 运维编码列表
        if (item.field_name === 'monitoringcode') this.ImgList1.push(item)
        // 经度列表
        if (item.field_name === 'longitude') this.ImgList2.push(item)
      })
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
  components: {
    ImgBox,
    ResourceList
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
