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
              <td><div class="cell">维修厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.manufacturername}}</div>
                <div v-if="WriteState !== 2" @click="manufactureridShow=true">
                  <el-input v-model="manufacturername" readonly placeholder="请选择维修厂家"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件厂家</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.Sparemanufacturername}}</div>
                <div v-if="WriteState !== 2" @click="SparemanufactureridShow=true">
                  <el-input v-model="Sparemanufacturername" readonly placeholder="请选择厂家"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件类型</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.sparetypename}}</div>
                <div v-if="WriteState !== 2" @click="sparetypeShow=true">
                  <el-input v-model="WriteData.sparetypename" readonly placeholder="请选择备件类型"></el-input>
                </div></div>
              </td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备件型号</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.sparemodelname}}</div>
                <div v-if="WriteState !== 2" @click="sparemodelShow=true">
                  <el-input v-model="sparemodelname" readonly placeholder="请选择备件型号"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">维修单价</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="price">
                  <el-input v-model="WriteData.price"  placeholder="请填写维修单价" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.price}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">维修期</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="maintenancettime">
                  <el-input v-model="WriteData.maintenancettime"  placeholder="请填写维修期" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.maintenancettime}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">保修期</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="warrantyperiod">
                  <el-input v-model="WriteData.warrantyperiod"  placeholder="请填写保修期" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.warrantyperiod}}</div></td>
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
import {EditSpareTyp, AddSpareTyp} from 'api/BJGL'
export default {
  name: 'MaintenanceItems',
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
    return {
      manufactureridShow: false,
      sparetypeShow: false,
      sparemodelShow: false,
      SparemanufactureridShow: false,
      isShow: false,
      Loading: false,
      WriteData: {
        id: null,
        cityname: '',
        typename: null,
        belongtype: null,
        typeencoding: '',
        remark: '',
        realityname: '',
        createtime: null,
        price: null,
        warrantyperiod: null,
        maintenancettime: null
      },
      Rules: {
        Belongtype: [{ required: true, message: '请选择所属类型', trigger: 'blur' }]

      }
    }
  },

  methods: {
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
      this.WriteData.AreaList = [ data.provinceid, data.cityid ]
      this.setArea(this.WriteData.AreaList, 'csArea')
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
      /* this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
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
      }) */
    },
    SubEdit () {
    /*  this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
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
      }) */
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
