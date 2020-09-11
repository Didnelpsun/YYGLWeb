<template>
  <div class="content">
    <div class="main" >
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
      </el-row>
      <el-table :data="tableData1" v-loading="table1Loading"
                row-key="id" :tree-props="{children: 'child'}" default-expand-all style="margin-top: 15px;">
        <el-table-column prop="orgname" label="部门名称" width="200"></el-table-column>
        <el-table-column prop="orgtype" label="部门类型" width="200" :formatter="formatOrgType"></el-table-column>
        <el-table-column prop="orgcode" label="部门编号" width="150"></el-table-column>
        <el-table-column prop="address" label="地址" width=""></el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleSelect(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {OrgList} from 'api/api'
import {ORG_TYPE} from 'common/js/global'
import {_normalizeTreeData, debounce} from 'common/js/cache'
export default {
  name: 'WarehouseUintPicker',
  data () {
    return {
      Query: {
        name: '',
        code: ''
      },
      currentPage: 1,
      pageSize: 10,
      tableData1: [],
      table1Loading: false,
      showSelectOrg: false,
      OrgsList: [],
      showSelectArea: false,
      AreaList: [],
      OrgType: []
    }
  },
  created () {
    window.plist = this
    this.OrgType = ORG_TYPE.slice(1)
    this.getTableData1()
  },
  methods: {
    Search: debounce(function () { // 热搜索
      let name = this.Query.name
      let code = this.Query.code
      this.tableData1 = this.List.filter(item =>
        item.orgname.toLowerCase().includes(name.toLowerCase()) && item.orgcode.toLowerCase().includes(code.toLowerCase())
      )
    }, 200),
    ResetQuery () {
      Object.assign(Object.assign(this.$data.Query, this.$options.data().Query))
    },
    handleSelect (row) {
      this.$emit('WarehouseUintPicker', row.id, row.orgname)
    },
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
    formatOrgType (row) {
      return this.OrgType[row.orgtype - 1]
    },
    closeWrite () {
      this.ResetWrite()
    }
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
