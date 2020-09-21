<template>
  <div class="write">
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="80"/>
            <col width="100"/>
            <!--  <col width="50"/>-->
            <col width="100"/>
          </colgroup>
          <thead>
          <tr>
            <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
            <!--<th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>-->
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
              <col width="80"/>
              <col width="100"/>
              <!--  <col width="50"/>-->
              <col width="100"/>
            </colgroup>
            <tbody>
            <tr class="el-table__row">
              <td><div class="cell">城市</div></td>
              <td v-if="WriteState !== 2"><div class="cell">
                <el-form-item  class="form-item" prop="AreaList">
                  <el-cascader :key="key" v-model="WriteData.AreaList"  placeholder="请选择区域" :props="cityareaProps" @change="changecityArea(WriteData)" ref="csArea"></el-cascader>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">厂家编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="code">
                  <el-input v-model="WriteData.code"   @input="update" placeholder="请填写厂家编码" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.code}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>厂家名称</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="name">
                  <el-input v-model="WriteData.name"   @input="update" placeholder="请填写厂家名称" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.name}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>合同编号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="contractno">
                  <el-input v-model="WriteData.contractno"   @input="update" placeholder="请填写合同编号" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.contractno}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>合同年度</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item label-width="0" class="form-item" prop="year">
                  <el-input v-model="WriteData.year"  @input="update" placeholder="请填写合同年度"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.year}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">合同起时间</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item label-width="0" class="form-item" prop="starttime">
                  <el-date-picker v-model="WriteData.starttime" type="datetime" format="yyyy-MM-dd HH:mm"   value-format="yyyy-MM-dd HH:mm" placeholder="选择合同起时间"></el-date-picker>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.starttime}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">合同止时间</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item label-width="0" class="form-item" prop="endtime">
                  <el-date-picker v-model="WriteData.endtime" type="datetime" format="yyyy-MM-dd HH:mm"   value-format="yyyy-MM-dd HH:mm" placeholder="选择合同止时间"></el-date-picker>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.endtime}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">合同文件</div></td>
              <td @click="OpenImgBox(1)"><div class="cell">{{ImgList1.length}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell">点击数据上传合同图片</div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>管理员姓名</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{administratorname}}</div>
                <div v-if="WriteState !== 2" @click="administratorShow=true">
                  <el-form-item  class="form-item">
                  <el-input v-model="administratorname" readonly placeholder="请选择管理员联系电话"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteData.phonenum">
              <td><div class="cell">管理员联系电话</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="phonenum">
                  <el-input v-model="WriteData.phonenum" placeholder="请填写管理员联系电话"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.phonenum}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">{{WriteData.createusername}}</div></td>

              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交时间</div></td>
              <td><div class="cell">{{WriteData.createtime}}</div></td>
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
      <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <div v-if="administratorShow">
      <el-dialog top="1%" :visible.sync="administratorShow" title="选择管理员" width="80%" :before-close="administratorClose">
        <Details  @selectUser="Chooseusr"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {AreaList} from 'api/api'
import {Addmanufacturerinfo, Editmanufacturerinfo} from 'api/BJGL'
import Details from 'base/SpareManagement/SelectUser'
export default {
  name: 'AfterSaleContract',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0
    },
    DicList: {
      type: Object,
      default () {
        return []
      }
    }
  },
  data () {
    var _this = this
    return {
      cityareaProps: {
        lazy: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            _this.$axios.post(AreaList, {parentid: null}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeCityAreaLevel(res.data))
              }
            })
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeCityAreaLevel(res.data))
              }
            })
          }
        }
      },
      key: 1,
      administratorname: null,
      administratorShow: false,
      isShow: false,
      Loading: false,
      ImgList1: [],
      WriteData: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        imglist: [],
        administrator: null,
        phonenum: null
      },
      Rules: {
        year: [{ required: true, message: '请填入合同年度', trigger: 'change' },
          { type: 'number', message: '合同年度内容必须填入数字' }],
        code: [{ required: true, message: '请填入厂家编码', trigger: 'change' }],
        name: [{ required: true, message: '请填入厂家名称', trigger: 'change' }],
        contractno: [{ required: true, message: '请填入合同编号', trigger: 'change' }]

      }
    }
  },

  methods: {
    update () {
      this.$forceUpdate()
    },
    Chooseusr (id, name, phone) {
      this.administratorShow = false
      this.administratorname = name
      this.WriteData.phonenum = phone
      this.WriteData.administrator = id
    },
    administratorClose () { this.administratorShow = !this.administratorShow },
    setArea (list, key = 'csArea') {
      this.nodes = list
      this.$refs[key].panel.activePath = []
      this.$refs[key].panel.loadCount = 0
      this.$refs[key].panel.lazyLoad()
    },
    changecityArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
      this.$forceUpdate()
    },
    _normalizeCityAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 2) list[i].leaf = true
      }
      return list
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
      this.ImgList1 = []
      this.WriteData.phonenum = ''
      this.administratorname = null
    },
    setWriteData (data) {
      //   console.log(data)
      this.WriteData = data
      this.setImgList(data.imglist)
      this.key++
      this.WriteData.AreaList = [data.provinceid, data.cityid]
      /*   this.setArea(this.WriteData.AreaList, 'csArea') */
      if (parseInt(this.WriteState) === 2) {
        this.WriteData.belongtype !== 2 ? this.WriteData.belongtype = '资源' : this.WriteData.belongtype = '备件'
      }
      this.administratorname = this.WriteData.administratorname
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => {
        return i.field_name === 'files'
      })
    },
    OpenImgBox (val) {
      if (val === 1) this.$emit('fatherOpenImgBox', '合同文件', 'files', this.ImgList1)
    },
    WriteClose () {
      this.ResetWrite()
      this.key = 1
      this.$emit('fatherClose')
    },
    SubWrite () {
      if (this.WriteData.year) {
        this.WriteData.year = parseInt(this.WriteData.year)
      }
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali || this.ImgList1.length === 0 || this.administratorname === null) {
          if (this.ImgList1.length === 0) return this.$message.warning('请上传合同照片')
          if (this.administratorname === null) return this.$message.warning('请选择管理员')
          if (msg.year) {
            return this.$message.error(msg.year[0].message)
          }
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(Addmanufacturerinfo, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
            this.$emit('fatheretMore')
            this.WriteClose()
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali || this.ImgList1.length === 0) {
          this.$message.error('请补全信息！')
          if (this.ImgList1.length === 0) return this.$message.warning('请上传合同照片')
        } else {
          this.Loading = true
          this.$axios.put(Editmanufacturerinfo, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('编辑成功!')
            this.$emit('fatheretMore')
            this.ResetWrite()
            this.WriteClose()
          })
        }
      })
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
    }
  },
  components: {
    Details
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
