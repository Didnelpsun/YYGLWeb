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
              <td><div class="cell"><i class="must">*</i>城市</div></td>
              <td v-if="WriteState !== 2"><div class="cell">
                <el-form-item  class="form-item" prop="AreaList">
                  <el-cascader v-model="WriteData.AreaList" placeholder="请选择区域" :props="cityareaProps" @change="changecityArea(WriteData)" ref="csArea"></el-cascader>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>类型名称</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="typename">
                  <el-input v-model="WriteData.typename"  placeholder="请填写类型名称" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.typename}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>类型编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="typeencoding">
                  <el-input v-model="WriteData.typeencoding"  placeholder="请填写类型编码" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.typeencoding}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">说明</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="remark">
                  <el-input v-model="WriteData.remark" placeholder="请填写说明" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.remark}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交时间</div></td>
              <td><div class="cell">{{WriteData.createtime}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-show="WriteState==2">
              <td><div class="cell">提交人</div></td>
              <td><div class="cell">{{WriteData.realityname}}</div></td>

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
import {EditSpareTyp, AddSpareTyp} from 'api/BJGL'
export default {
  name: 'Sparetype',
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
      WriteData: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        tpename: null,
        typeencoding: '',
        remark: ''
      },
      Rules: {
        typename: [{ required: true, message: '请填入类型名称', trigger: 'change' }],
        typeencoding: [{ required: true, message: '请填入类型编码', trigger: 'change' }]
      }
    }
  },

  methods: {
    changecityArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
      this.$forceUpdate()
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
    },
    setWriteData (data) {
      this.WriteData = data
      if (this.WriteState !== 2) {
        this.WriteData.AreaList = [ data.provinceid, data.cityid ]
        this.setArea(this.WriteData.AreaList, 'csArea')
      }
      if (parseInt(this.WriteState) === 2) {
        this.WriteData.belongtype !== 2 ? this.WriteData.belongtype = '资源' : this.WriteData.belongtype = '备件'
      }
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali || this.WriteData.AreaList.length === 0) {
          if (this.WriteData.AreaList.length === 0) return this.$message.error('请选择区域！')
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(AddSpareTyp, this.WriteData).then(res => {
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
        if (!vali || this.WriteData.AreaList.length === 0) {
          if (this.WriteData.AreaList.length === 0) return this.$message.error('请选择区域！')
          this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.put(EditSpareTyp, this.WriteData).then(res => {
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
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
