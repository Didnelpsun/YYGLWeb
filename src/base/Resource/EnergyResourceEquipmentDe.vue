<template>
  <div v-loading="WriteLoading">
      <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
        <!--表头-->
        <div class="el-table__header-wrapper">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
            <colgroup>
              <col name="el-table_8_column_60" width="80"/>
              <col name="el-table_8_column_61" width="230"/>
              <col name="el-table_8_column_62" width="50"/>
              <col name="el-table_8_column_64" width="100"/>
            </colgroup>
            <thead>
            <tr>
              <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
              <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
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
              <col name="el-table_8_column_60" width="80"/>
              <col name="el-table_8_column_61" width="230"/>
              <col name="el-table_8_column_62" width="50"/>
              <col name="el-table_8_column_64" width="100"/>
            </colgroup>
            <tbody>
            <!--站点名称-->
            <tr class="el-table__row el-table__row--striped">
              <td class="el-table_8_column_60">
                <div class="cell"><i class="must">*</i>站点名称</div>
              </td>
              <td class="el-table_8_column_61">
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.resourcecode}}</div>
                  <div v-show="WriteState !== 2" @click="isShow = true">
                    <el-input v-model="tableData.resourcecode" readonly placeholder="请选择"></el-input>
                  </div>
                </div>
              </td>
              <td class="el-table_8_column_62"><div class="cell"></div></td>
              <td class="el-table_8_column_64"><div class="cell"></div></td>
            </tr>
            <!--设备类型-->
            <tr class="el-table__row el-table__row--striped">
              <td class="el-table_8_column_60">
                <div class="cell"><i class="must">*</i>设备类型</div>
              </td>
              <td class="el-table_8_column_61">
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.equipmenttypename}}</div>
                  <div v-show="WriteState !== 2" prop="equipmenttype_id">
                    <el-select v-model="tableData.equipmenttype_id" filterable remote reserve-keyword :filter-method="querySearch" :loading="WriteLoading" size="small">
                      <el-option v-for="item in queryList" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </td>
              <td class="el-table_8_column_62"><div class="cell"></div></td>
              <td class="el-table_8_column_64"><div class="cell"></div></td>
            </tr>
            <!--必须-->
            <tr class="el-table__row el-table__row--striped">
              <td class="el-table_8_column_60">
                <div class="cell">是否必须</div>
              </td>
              <td class="el-table_8_column_61">
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.necessary ? '是' : '否'}}</div>
                  <el-form-item label-width="0" prop="necessary" class="form-item" v-show="WriteState !== 2">
                    <el-select v-model="tableData.necessary">
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td class="el-table_8_column_62"><div class="cell"></div></td>
              <td class="el-table_8_column_64"><div class="cell"></div></td>
            </tr>
            <!--是否单记录-->
            <tr class="el-table__row el-table__row--striped">
              <td class="el-table_8_column_60">
                <div class="cell">是否单记录</div>
              </td>
              <td class="el-table_8_column_61">
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.manyrecords ? '是' : '否'}}</div>
                  <el-form-item label-width="0" prop="manyrecords" class="form-item" v-show="WriteState !== 2">
                    <el-select v-model="tableData.manyrecords">
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <td class="el-table_8_column_62"><div class="cell"></div></td>
              <td class="el-table_8_column_64"><div class="cell"></div></td>
            </tr>
              <!--创建人-->
              <tr class="el-table__row el-table__row--striped" v-show="WriteState == 2">
                <td class="el-table_8_column_60">
                  <div class="cell">创建人</div>
                </td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <div>{{tableData.createusername}}</div>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
              <!--创建时间-->
              <tr class="el-table__row el-table__row--striped" v-show="WriteState == 2">
                <td class="el-table_8_column_60">
                  <div class="cell">创建时间</div>
                </td>
                <td class="el-table_8_column_61">
                  <div class="cell">
                    <div>{{tableData.createtime}}</div>
                  </div>
                </td>
                <td class="el-table_8_column_62"><div class="cell"></div></td>
                <td class="el-table_8_column_64"><div class="cell"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
        </el-form>
      </div>
      <div class="center" style="padding-bottom: 100px">
      <el-button @click="subData" type="primary" v-show="WriteState !==2" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="isShow" title="选择站点" width="80%" :before-close="DetailhandleClose">
      <ResourceList v-if="isShow" @selectResource="selectResource" />
    </el-dialog>
  </div>
</template>

<script>
import ResourceList from 'base/Resource/ResourceList'
import { AddEnergyResourceEquipment, UpdateEnergyResourceEquipment, GetEquipmentTypeList } from 'api/api'
import {GlobalRes} from 'common/js/mixins'

export default {
  name: 'ResourceEquipmentDe',
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    }
  },
  data () {
    return {
      isShow: false,
      WriteLoading: false,
      query: {
        equipmenttype: ''
      },
      queryList: [],
      tableData: {
        resourcecode: '',
        equipmenttype_id: '0',
        necessary: true,
        manyrecords: false
      },
      // 表单验证
      Rules: {
        resourcecode: [
          { required: true, message: '请输入站点名称', trigger: 'change' }
        ],
        equipmenttype_id: [
          { required: true, message: '请输入设备类型', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 在进行提交新增时赋值方法，在父组件中调用该方法
    setWriteData (data) {
      this.tableData = data
      let obj = {
        name: data.equipmenttypename,
        id: data.equipmenttype_id
      }
      this.queryList.push(obj)
    },
    querySearch (query) {
      this.Loading = true
      this.$axios.get(GetEquipmentTypeList, {
        params: {
          name: query,
          classify: 1,
          PageIndex: 1,
          PageSize: 200
        }
      }).then(res => {
        this.queryList = res.data.list
      }).catch(error => {
        console.log(error)
      })
      this.Loading = false
    },
    // 提交函数
    subData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 抽离共有的逻辑
    async add () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.post(AddEnergyResourceEquipment, this.tableData)
          this.WriteLoading = false
          if (res.error === true) {
            this.$message.warning('请补全信息')
            console.log(res.errorMessage)
          }
          if (res.success === true) {
            this.$message.success('添加成功！')
            this.$emit('fatheretMore')
            this.closeWrite()
          } else { this.$message.warning(res.msg) }
        } catch (e) {
          console.log(e)
        }
      })
    },
    async edit () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.put(UpdateEnergyResourceEquipment, this.tableData)
          this.WriteLoading = false
          if (res.error === true) {
            this.$message.warning('请补全信息')
            console.log(res.errorMessage)
          }
          if (res.success === true) {
            this.$message.success('修改成功！')
            this.$emit('fatheretMore')
            this.closeWrite()
          } else { this.$message.warning(res.msg) }
        } catch (e) {
          console.log(e)
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      this.$nextTick(() => { this.$refs.tableForm.resetFields() })
      // this.tableData = {}
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.queryList = []
      // this.getMore(1)
      this.showWrite = !this.showWrite
      this.$emit('fatherClose')
    },
    selectResource (name, id) {
      this.isShow = false
      this.tableData.resource_id = id
      this.tableData.resourcecode = name
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    }
  },
  components: {
    ResourceList
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
