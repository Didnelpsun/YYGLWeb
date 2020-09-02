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
              <td><div class="cell"><i class="must">*</i>存放点类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="warehousetype">
                  <el-select v-model="WriteData.warehousetype">
                    <el-option v-for="i in DicList.warehousetype" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择存放点类型"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.warehousetypename}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>区域</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item  class="form-item" prop="AreaList">
                  <el-cascader v-model="WriteData.AreaList" placeholder="请选择区域" :props="areaProps" @change="changeArea(WriteData)" ref="csArea"></el-cascader>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>仓库名称</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="typename">
                  <el-input v-model="WriteData.name"  placeholder="请填写仓库名称" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.name}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>仓库编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="code">
                  <el-input v-model="WriteData.code"  placeholder="请填写仓库编码" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.code}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>仓库单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="orgid">
                  <el-input v-model="WriteData.orgid"  placeholder="请填写仓库单位" clearable></el-input>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.orgid}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>仓库管理员</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2">{{WriteData.administratoridname}}</div>
                <div v-if="WriteState !== 2" @click="manufactureridShow=true">
                  <el-input v-model="administratoridname" readonly placeholder="请选择仓库管理员"></el-input>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr  class="el-table__row">
              <td><div class="cell">仓库管理员联系电话</div></td>
              <div v-if="WriteState == 2">{{WriteData.phonenum}}</div>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item">
                  <el-input  v-model="phonenum"  placeholder="请填写仓库管理员联系电话" clearable></el-input>
                </el-form-item>
              </div></td>
              <td><div class="cell"  v-if="WriteState == 2"></div>
                <div class="cell" v-show="WriteState !== 2">按照顺序填写电话,多个电话使用逗号隔开</div></td>
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
    <el-dialog top="1%" :visible.sync="manufactureridShow" title="选择仓库管理员" width="80%" :before-close="manufactureridClose">
      <Details  @Chooseusr="Chooseusr"/>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import {Addwarehouse, Editwarehouse} from 'api/BJGL'
import Details from 'base/SpareManagement/selSpareWarehouse'
export default {
  name: 'SpareWarehouse',
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
      administratoridname: '',
      manufactureridShow: false,
      isShow: false,
      Loading: false,
      phonenum: null,
      administratorid: null,
      phone: [],
      WriteData: {
        AreaList: [],
        provinceid: null,
        cityid: null,
        areaid: null,
        id: null,
        cityname: '',
        remark: '',
        realityname: '',
        createtime: null,
        warehousetype: null,
        warehousetypename: null,
        name: ' ',
        code: '',
        orgid: null,
        administrators: [

        ]
      },
      Rules: {
        AreaList: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        warehousetype: [{ required: true, message: '请选择存放点类型', trigger: 'blur' }],
        name: [{ required: true, message: '请填入仓库名称', trigger: 'change' }],
        code: [{ required: true, message: '请填入仓库编码', trigger: 'change' }],
        orgid: [{ required: true, message: '请填入仓库单位', trigger: 'change' }],
        administratorname: [{ required: true, message: '请选择仓库管理员', trigger: 'blur' }]
      }
    }
  },

  methods: {
    Chooseusr (arr) {
      this.manufactureridShow = false
      var users = []
      var administrators = []
      arr.forEach(function (item, index) {
        users[index] = item.realityname
        administrators.push({administratorid: item.id})
      })
      this.administratoridname = users.join(',')
      this.WriteData.administrators = administrators
      users = null
      administrators = null
    /*  this.WriteData.manufacturerid = id
      this.WriteData.manufacturersname = name */
    },
    manufactureridClose () { this.manufactureridShow = !this.manufactureridShow },
    /* changenum (i, value) {
      console.log(i)
      console.log(value)
    }, */
    _normalizeCityAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) list[i].leaf = true
      }
      return list
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
      this.administratoridname = null
      this.phone = null
    },
    setWriteData (data) {
      this.WriteData = data
      this.WriteData.AreaList = [data.provinceid, data.cityid, data.areaid]
      this.setArea(this.WriteData.AreaList, 'csArea')
      if (parseInt(this.WriteState) === 2) {
        switch (parseInt(this.WriteData.warehousetype)) {
          case 1:this.WriteData.warehousetypename = '市公司备件库'
            break
          case 2:this.WriteData.warehousetypename = '市公司维修库库'
            break
          case 3:this.WriteData.warehousetypename = '市公司报废库'
            break
          case 4:this.WriteData.warehousetypename = '工作备件库'
            break
        }
      }
    },
    WriteClose () {
      this.setArea([])
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    SubWrite () {
      var reg = /,+/
      this.phone = this.phonenum.split(reg)
      for (var i in this.WriteData.administrators) {
        if (this.phone[i]) {
          this.WriteData.administrators[i].phonenum = this.phone[i]
        }
      }
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(Addwarehouse, this.WriteData).then(res => {
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
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.put(Editwarehouse, this.WriteData).then(res => {
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
  components: {
    Details
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
