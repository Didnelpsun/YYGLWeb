<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
      <el-form :model="Query">
        <el-row>
          <el-col :span="18">
            <el-col :span="10">
              <el-form-item label="部门名称：">
                <el-input v-model="Query.name" @input="Search"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="部门编码：">
                <el-input v-model="Query.code" @input="Search"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="openWrite(0)" type="success" icon="el-icon-plus">添加顶级部门</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData1" v-loading="table1Loading"
                row-key="id" :tree-props="{children: 'child'}" default-expand-all style="margin-top: 15px;">
        <el-table-column prop="orgname" label="部门名称" width="200"></el-table-column>
        <el-table-column prop="orgtype" label="部门类型" width="200" :formatter="formatOrgType"></el-table-column>
        <el-table-column prop="orgcode" label="部门编号" width="150"></el-table-column>
        <el-table-column prop="address" label="地址" width=""></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openWrite( 0, scope.$index, scope.row)">添加</el-button>
            <el-button type="text" size="mini" @click="openWrite(1, scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加部门' : WriteState === 1 ? '编辑部门' : '添加顶级部门'"></layuiTitle>
      <el-form :model="WriteData" :rules="Rules" ref="WriteForm">
        <el-row>
          <el-col :sm="12" :md="9">
            <el-form-item label="部门名称：" prop="orgname">
              <el-input v-model="WriteData.orgname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="部门编号：" prop="orgcode">
              <el-input v-model="WriteData.orgcode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="部门类型：" prop="orgtype">
              <el-select v-model="WriteData.orgtype">
                <el-option v-for="(item, index) in OrgType" :key="item" :label="item" :value="index+1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="区域：" prop="areaname">
              <el-input v-model="WriteData.areaname" disabled>
                <el-button @click="getAreaOptions" slot="append">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12" :md="9">
            <el-form-item label="地址：" prop="address">
              <el-input v-model="WriteData.address"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="邮编：" prop="zip_Code">
              <el-input v-model="WriteData.zip_code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="联系电话：" prop="tel">
              <el-input v-model="WriteData.tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="联系方式：" prop="contact">
              <el-input v-model="WriteData.contact"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="传真：" prop="fax">
              <el-input v-model="WriteData.fax"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="备注：" prop="remark">
              <el-input v-model="WriteData.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="center">
        <el-button @click="WriteAddSub" v-show="WriteState === 0" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-plus'">添加</el-button>
        <el-button @click="WriteEditSub" v-show="WriteState === 1" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-edit'">修改</el-button>
        <el-button @click="closeWrite" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <AreaTree :data="AreaList" @selectArea="AreaClick" ref="AreaTree"></AreaTree>
  </div>
</template>

<script>
import {OrgList, AddOrg, IdOrgInfo, EditOrg, DeleteOrg} from 'api/api'
import {ORG_TYPE} from 'common/js/global'
import {_normalizeTreeData, debounce} from 'common/js/cache'
import layuiTitle from 'base/layui-title'
import AreaTree from 'base/AreaTree'

export default {
  name: 'OrganizationList',
  data () {
    return {
      Query: {
        name: '',
        code: ''
      },
      currentPage: 1,
      pageSize: 10,
      tableData1: [],
      List: [],
      table1Loading: false,

      showSelectOrg: false,
      OrgsList: [],
      showSelectArea: false,
      AreaList: [],
      OrgType: [],

      showWrite: false,
      WriteState: 0, // 0为添加，1为修改,2为添加顶级部门
      WriteData: {
        orgname: '',
        orgcode: '',
        orgtype: 1,
        areaid: '',
        areaname: '',
        address: '',
        zip_code: '',
        tel: '',
        contact: '',
        fax: '',
        remark: ''
      },
      WriteLoading: false,

      Rules: {
        orgname: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        orgcode: [{ required: true, message: '请输入部门编码', trigger: 'blur' }],
        areaname: [{ required: true, message: '请选择区域', trigger: 'blur' }],
        orgtype: [{ required: true, message: '请选择部门类型', trigger: 'change' }]
      }
    }
  },
  created () {
    window.plist = this
    this.OrgType = ORG_TYPE.slice(1)
    this.getTableData1()
  },
  methods: {
    ResetQuery () { Object.assign(Object.assign(this.$data.Query, this.$options.data().Query)) },
    ResetWrite () {
      this.WriteData = {
        orgname: '',
        orgcode: '',
        orgtype: 1,
        areaid: '',
        areaname: '',
        address: '',
        zip_code: '',
        tel: '',
        contact: '',
        fax: '',
        remark: ''
      }
    },
    Search: debounce(function () { // 热搜索
      let name = this.Query.name
      let code = this.Query.code
      this.tableData1 = this.List.filter(item =>
        item.orgname.toLowerCase().includes(name.toLowerCase()) && item.orgcode.toLowerCase().includes(code.toLowerCase())
      )
    }, 200),
    // 后期不需要分页 删除 page pageSize
    getTableData1 () {
      this.table1Loading = true
      this.$axios.post(OrgList, {
        page: 1,
        pageSize: 10000
      }).then((res) => {
        this.table1Loading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData1 = _normalizeTreeData(res.data.list, 'id', 'parentorg_id', 'child', null)
          this.List = this.tableData1
        }
      })
    },
    formatOrgType (row) { return this.OrgType[row.orgtype - 1] },

    getAreaOptions () { this.$refs.AreaTree.open() },
    AreaClick (data) {
      this.WriteData.areaid = data.id
      this.WriteData.areaname = data.name
    },

    openWrite (state, index, row) {
      this.showWrite = true
      this.WriteState = state
      if (row) {
        this.WriteData.parentorg_Id = row.id
        this.WriteData.parentorg_Name = row.orgName
      }
      if (state === 1) { // 编辑操作
        this.ResetWrite()
        this.$axios.post(IdOrgInfo, {
          id: row.id
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.WriteData = res.data
          }
        })
      }
    },
    WriteAddSub () {
      this.$refs.WriteForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('请补全完整信息！')
        } else {
          this.WriteLoading = true
          this.$axios.post(AddOrg, this.WriteData).then((res) => {
            this.WriteLoading = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('添加成功！')
              this.showWrite = false
              this.getTableData1()
              this.ResetWrite()
            }
          })
        }
      })
    },
    WriteEditSub () {
      this.$refs.WriteForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('请补全完整信息！')
        } else {
          this.WriteLoading = true
          const data = Object.assign({}, this.WriteData)
          this.$axios.post(EditOrg, data).then((res) => {
            this.WriteLoading = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('修改成功！')
              this.showWrite = false
              this.getTableData1()
              this.ResetWrite()
            }
          })
        }
      })
    },
    closeWrite () {
      this.showWrite = false
      this.ResetWrite()
    },

    handle2 (index, row) {
      this.$confirm(`您确认要删除 ${row.orgName} 部门吗？`, '警告', {
        type: 'warning'
      }).then(() => {
        this.$axios.post(DeleteOrg, {
          id: row.id
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('删除成功！')
            this.getTableData1()
          }
        })
      })
    }
  },
  components: {
    layuiTitle,
    AreaTree
  }
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
</style>
