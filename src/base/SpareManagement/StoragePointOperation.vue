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
              <td><div class="cell">存放点名称</div></td>
              <td><div class="cell">
                <div v-if="WriteState == 2"><i class="must">*</i>{{WriteData.warehousename}}</div>
                <div v-if="WriteState !== 2" @click="SpareWarehouseShow=true">
                  <el-form-item class="form-item" prop="warehousename">
                  <el-input v-model="WriteData.warehousename" readonly placeholder="请选择存放点名称"></el-input>
                  </el-form-item>
                </div></div>
              </td>
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>操作用途</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="operationid">
                  <el-select   v-model="WriteData.operationid">
                    <el-option  v-for="i in DicList.operation" :key="i.id" :label="i.text" :value="i.value" placeholder="请选择操作用途"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.operation}}</div></td>
              <!-- <td><div class="cell"></div></td>-->
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
    <el-dialog top="1%" :visible.sync="SpareWarehouseShow" title="选择存放点" width="80%" :before-close="SpareWarehousClose">
      <SpareWarehousePicker :DicList="DicList" :provinceid="WriteData.provinceid"  :cityid="WriteData.cityid" @SpareWarehousePicker="SpareWarehousePicker"/>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import SpareWarehousePicker from 'base/SpareManagement/SpareWarehousePicker'
import {Editconfiguration, Addconfiguration} from 'api/BJGL'
export default {
  name: 'StoragePointOperation',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0
    },
    DicList: {
      type: Object,
      default () {
        return [{operation: null}]
      }
    }
  },
  data () {
    return {
      isShow: false,
      Loading: false,
      SpareWarehouseShow: false,
      WriteData: {
        operation: null,
        operationid: null,
        warehousename: '', // 存放点名称
        code: null, // 存放点编码
        warehouseid: null// 存放点id
      },
      Rules: {
        operationid: [{ required: true, message: '请选择操作通途', trigger: 'blur' }]
      }
    }
  },

  methods: {
    SpareWarehousClose () {
      this.SpareWarehouseShow = false
    },
    SpareWarehousePicker (name, code, id) {
      this.SpareWarehouseShow = false
      this.WriteData.warehousename = name.trim()
      this.WriteData.code = code
      this.WriteData.warehouseid = id
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.resetFields()
    },
    setWriteData (data) {
      this.WriteData = data
      this.WriteData.AreaList = [ data.provinceid, data.cityid ]
      this.setArea(this.WriteData.AreaList, 'csArea')
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    SubWrite () {
      switch (parseInt(this.WriteData.operationid)) {
        case 1:this.WriteData.operation = '新增'
          break
        case 2:this.WriteData.operation = '报修'
          break
        case 3:this.WriteData.operation = '送修'
          break
        case 4:this.WriteData.operation = '报废'
          break
        case 5:this.WriteData.operation = '借用'
          break
        case 6:this.WriteData.operation = '替换'
          break
        case 7:this.WriteData.operation = '归还'
          break
        case 8:this.WriteData.operation = '点验'
          break
        case 9:this.WriteData.operation = '上站'
          break
        case 10:this.WriteData.operation = '领用'
          break
        case 11:this.WriteData.operation = '返修'
          break
      }
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali || this.WriteData.warehousename === '') {
          if (this.WriteData.warehousename === '') return this.$message.error('请选择存放点名称！')
          return this.$message.error('请补全信息！')
        } else {
          this.Loading = true
          this.$axios.post(Addconfiguration, {warehouseid: this.WriteData.warehouseid, operation: this.WriteData.operation, operationid: this.WriteData.operationid}).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('添加成功!')
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
          this.$axios.put(Editconfiguration, {warehouseid: this.WriteData.warehouseid, operation: this.WriteData.operation, operationid: this.WriteData.operationid, Id: this.WriteData.id}).then(res => {
            this.Loading = false
            if (res.errorCode !== '200') return this.$message.error(res.msg)
            this.$message.success('编辑成功!')
            this.WriteClose()
          })
        }
      })
    }
  },
  components: {
    SpareWarehousePicker
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
