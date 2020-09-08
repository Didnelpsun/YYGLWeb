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
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item  class="form-item" prop="AreaList">
                  <el-cascader v-model="WriteData.AreaList" placeholder="请选择区域" :props="cityareaProps" @change="changecityArea(WriteData)" ref="csArea"></el-cascader>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">厂家编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="code">
                  <el-input v-model="WriteData.code"  placeholder="请填写厂家编码" clearable></el-input>
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
                  <el-input v-model="WriteData.name"  placeholder="请填写厂家名称" clearable></el-input>
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
                  <el-input v-model="WriteData.contractno"  placeholder="请填写合同编号" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.contractno}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">合同年度</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="year">
                  <el-input v-model="WriteData.year" type="number" placeholder="请填写合同起时间"></el-input>
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
              <td><div class="cell">管理员姓名</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="administrator">
                  <el-input v-model="WriteData.administrator" placeholder="请填写管理员联系电话"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.administrator}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">管理员联系电话</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="phonenum">
                  <el-input v-model="WriteData.phonenum" placeholder="请填写管理员联系电话"></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.remark}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">{{WriteData.realityname}}</div></td>

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
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {AreaList} from 'api/api'
import {Addmanufacturerinfo, Editmanufacturerinfo} from 'api/BJGL'
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
      isShow: false,
      Loading: false,
      ImgList1: [],
      WriteData: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        id: null,
        cityname: '',
        imglist: [],
        remark: '',
        realityname: '',
        createtime: null

      },
      Rules: {
        /* AreaList: [{ required: true, message: '请选择区域', trigger: 'change' }],
        typename: [{ required: true, message: '请填入类型名称', trigger: 'change' }],
        Belongtype: [{ required: true, message: '请选择所属类型', trigger: 'blur' }],
        typeencoding: [{ required: true, message: '请填入类型编码', trigger: 'change' }] */
      }
    }
  },

  methods: {
    changecityArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
    },
    setArea (list, key = 'csArea') {
      this.nodes = list
      this.$refs[key].panel.activePath = []
      this.$refs[key].panel.loadCount = 0
      this.$refs[key].panel.lazyLoad()
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
    },
    setWriteData (data) {
      this.WriteData = data
      this.setImgList(data.imglist)
      this.WriteData.AreaList = [ data.provinceid, data.cityid ]
      this.setArea(this.WriteData.AreaList, 'csArea')
      if (parseInt(this.WriteState) === 2) {
        this.WriteData.belongtype !== 2 ? this.WriteData.belongtype = '资源' : this.WriteData.belongtype = '备件'
      }
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
      this.setArea([])
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
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
        if (!vali) {
          this.$message.error('请补全信息！')
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
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
