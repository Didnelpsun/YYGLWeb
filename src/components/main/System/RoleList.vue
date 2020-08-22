<template>
  <el-main class="content RoleList" v-loading="FullLoading" element-loading-text="数据加载中！！">
    <!--主要页面-->
    <div class="main" v-show="!showWrite && !showView">
      <el-form :model="query" ref="form">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="角色名称：">
                <el-input v-model="query.role_name" @keyup.enter.native="searchQueryData"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色编码：">
                <el-input v-model="query.rolenum"  @keyup.enter.native="searchQueryData"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色类型：">
                <el-select v-model="query.role_type">
                  <el-option label="全部" value=""></el-option>
                  <el-option v-for="(item, index) in ROLE_TYPE" :key="item" :label="item" :value="index+1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="租户名称：">
                <el-input v-model="query.tenantname"  @keyup.enter.native="searchQueryData"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色描述：">
                <el-input v-model="query.remarks"  @keyup.enter.native="searchQueryData"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="searchQueryData" :disabled="tableLoading" :icon="tableLoading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="ResetSearch" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="openWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="tableLoading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="role_name" label="角色名称" width="100"></el-table-column>
        <el-table-column prop="rolenum" label="角色编码" width="100"></el-table-column>
        <el-table-column prop="role_type" label="角色类型" width="100" :formatter="formatRoleType"></el-table-column>
        <el-table-column prop="tenantname" label="租户名称" width="100"></el-table-column>
        <el-table-column prop="remarks" label="角色描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="160"></el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.$index, scope.row)">复用</el-button>
            <el-button type="text" size="mini" @click="openWrite(1,scope.$index, scope.row)">修改</el-button>
            <el-button type="text" size="mini" @click="handle4(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @current-change="getRoleMore" @size-change="changeSize1" :page-sizes="[10, 20, 30, 50]"
                       :current-page="currentPage" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div class="write" v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加角色' : '修改角色'"></layuiTitle>
      <el-form :model="WriteData" :rules="Rules" ref="WriteForm">
        <el-row>
          <el-col :sm="12" :md="9">
            <el-form-item label="角色名称：" prop="role_name">
              <el-input v-model="WriteData.role_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="角色编码：" prop="rolenum">
              <el-input v-model="WriteData.rolenum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="是否启用：" prop="enabled">
              <el-switch v-model="WriteData.enabled" :inactive-value="false" :active-value="true" inactive-text="禁用" active-text="启用"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9" v-if="UserInfo.usertype === 3">
            <el-form-item label="租户选择：" prop="tenantid">
              <el-select v-model="WriteData.tenantid">
                <el-option v-for="item in TenantList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12" :md="9">
            <el-form-item label="角色描述：">
              <el-input v-model="WriteData.remarks" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9" v-show="WriteState === 1">
            <el-form-item label="角色类型：">{{formatRoleType(WriteData)}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="center">
        <el-button @click="WriteAdd" v-show="WriteState===0" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">添加</el-button>
        <el-button @click="WriteEdit" v-show="WriteState===1" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">修改</el-button>
        <el-button @click="closeWrite" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <div class="view" v-show="showView">
      <el-tabs v-model="ViewTabIndex" class="content-card" @tab-click="handleTabs">
        <el-tab-pane label="角色信息" name="1">
          <el-form :model="ViewInfo">
            <el-col :sm="12" :md="9">
              <el-form-item label="角色名称：">{{ViewInfo.role_name}}</el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="角色编码：">{{ViewInfo.rolenum}}</el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="角色类型：">{{formatRoleType(ViewInfo)}}</el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="租户名称：">{{ViewInfo.tenantname}}</el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="角色描述：">{{ViewInfo.remarks}}</el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="是否启用：">{{formatToF(ViewInfo.enabled)}}</el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="提交时间：">{{ViewInfo.createtime}}</el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="提交人：">{{ViewInfo.createusername}}</el-form-item>
            </el-col>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="授权资源" name="2">
          <el-form :model="resQuery" ref="resQuery">
            <el-row>
              <el-col :sm="12" :md="9">
                <el-form-item label="资源类型：">
                  <el-select v-model="resQuery.resource">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item, index) in resTypeOp" :key="item" :label="item" :value="index+1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="12" :md="9" :offset="1">
                <el-button @click="getMore2(1)" icon="el-icon-search">查询</el-button>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="ViewResource" v-loading="ViewReLoading" :tree-props="{children: 'child'}" row-key="id" ref="ViewResourceTable">
            <el-table-column prop="name" label="资源名称" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="resources" label="资源类型" width="70" :formatter="formatRType"></el-table-column>
            <el-table-column prop="url" label="资源路径" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="isope" label="操作授权" width="150">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isope" inactive-color="#ff4949" @change="changeSwitch(scope.row)"></el-switch>
              </template>
            </el-table-column>

          </el-table>
          <div class="center">
            <el-pagination @current-change="getMore2" @size-change="changeSize2" :page-sizes="[10, 20, 30, 50]"
                           :current-page="currentPage2" :page-size="pageSize2" :total="total2"
                           background layout="total, prev, pager, next, sizes"></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="授权用户" name="3">
          <el-table :data="ViewUser" v-loading="ViewUserLoading">
            <el-table-column prop="id" label="序号" width="70">
              <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
            </el-table-column>
            <el-table-column prop="username" label="用户名称" width="150"></el-table-column>
            <el-table-column prop="realityname" label="真实姓名" width="150"></el-table-column>
            <el-table-column prop="usertype" label="用户类型" :formatter="formatUserType"></el-table-column>
            <el-table-column prop="orgname" label="所属部门"></el-table-column>
            <el-table-column prop="createtime" label="提交时间" width="150"></el-table-column>
            <el-table-column prop="createname" label="提交人"></el-table-column>
          </el-table>
          <div class="center">
            <el-pagination @current-change="getViewUserMore" @size-change="changeSize3" :page-sizes="[10, 20, 30, 50]"
                           :current-page="ViewUserCurrentPage" :page-size="ViewUserPageSize" :total="ViewUserTotal"
                           background layout="total, prev, pager, next, sizes"></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="center">
        <el-button @click="CloseView" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

  </el-main>
</template>

<script>
import {TenantList, RoleList, AddRole, EditRole, RoleInfo, DeleteRole,
  RolesAuthorizedResources, RoleAuthorizeUser, AuthorizeRole, DeleteUserAuthorizeRole,
  CopyRole} from 'api/api'
import {_normalizeTreeData} from '../../../common/js/cache'
import {mapGetters} from 'vuex'
import {USER_TYPE, ROLE_TYPE, RESOURCE_TYPE} from 'common/js/global'
import layuiTitle from 'base/layui-title'

export default {
  name: 'RoleList',
  data () {
    return {
      query: {
        role_name: '',
        rolenum: '',
        role_type: '',
        tenantname: '',
        remarks: ''
      },
      FullLoading: false,
      tableLoading: false,
      total: 0,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      ROLE_TYPE: [],
      resTypeOp: [],
      TenantList: [],

      showWrite: false,
      WriteState: 0, // 0为添加，1为修改编辑
      WriteId: '',
      WriteData: {
        role_name: '',
        rolenum: '',
        tenantid: '',
        enabled: true,
        remarks: ''
      },
      WriteLoading: false,
      Rules: {
        role_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        rolenum: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
        role_type: [{ required: true, message: '请选择角色类型', trigger: 'change' }],
        tenantid: [{ required: true, message: '请选择角色类型', trigger: 'change' }]
      },

      showView: false,
      ViewTabIndex: '1',
      ViewRoleId: 0,
      ViewInfo: {},
      resQuery: {resource: ''},
      ViewResource: [],
      total2: 0,
      currentPage2: 1,
      pageSize2: 10,
      ViewReLoading: false,
      ViewChecking: false,
      ViewUser: [],
      ViewUserCurrentPage: 1,
      ViewUserPageSize: 10,
      ViewUserTotal: 0,
      ViewUserLoading: false
      // usertype: null
    }
  },
  created () {
    this.ROLE_TYPE = ROLE_TYPE.slice(1)
    this.resTypeOp = RESOURCE_TYPE.slice(1)
    this.getRoleList()
    this.getTenantList()
    // this.usertype = this.UserInfo.usertype
  },
  methods: {
    ResetSearch () { Object.assign(this.$data.query, this.$options.data().query) },
    ResetWriteData () { Object.assign(this.$data.WriteData, this.$options.data().WriteData) },
    getTenantList () {
      this.$axios.post(TenantList, {
        page: 1,
        pageSize: 10000
      }).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.TenantList = res.data.list
        }
      })
    },
    _getRoleList (data) {
      this.tableLoading = true
      return this.$axios.post(RoleList, data).then((res) => {
        this.tableLoading = false
        return Promise.resolve(res)
      })
    },
    // 搜索模块
    searchQueryData () {
      this.tableLoading = true
      const data = Object.assign({}, this.query, {
        page: 1,
        pagesize: this.pageSize
      })
      this._getRoleList(data).then((res) => {
        this.tableLoading = false
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    getRoleList () {
      const data = {
        page: 1,
        pagesize: this.pageSize
      }
      this._getRoleList(data).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    getRoleMore (page) {
      this.currentPage = page
      const data = Object.assign({}, this.query, {
        page: page,
        pagesize: this.pageSize
      })
      this._getRoleList(data).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    changeSize1 (n) {
      this.pageSize = n
      this.getRoleMore(this.currentPage)
    },
    formatUserType (row) { return USER_TYPE[row.usertype] },
    formatRoleType (row) { return `${ROLE_TYPE[row.role_type]}` },
    formatRType (row) { return RESOURCE_TYPE[row.resourcetype] },
    formatToF (item) { return item ? '开启' : '关闭' },

    openWrite (state, index, row) {
      this.showWrite = true
      this.WriteState = state
      this.$refs.WriteForm.resetFields()// 重置表单验证红色部分
      if (row) { this.WriteId = row.id }
      if (state === 1) {
        this.$axios.post(RoleInfo, {
          id: this.WriteId
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.WriteData.remarks = res.data.remarks
            this.WriteData.enabled = res.data.enabled
            this.WriteData.rolenum = res.data.rolenum
            this.WriteData.role_name = res.data.role_name
            this.WriteData.tenantid = res.data.tenantid
            this.WriteId = res.data.id
            this.WriteData.role_type = row.role_type
          }
        })
      }
    },

    closeWrite () {
      this.showWrite = false
      this.WriteState = 0 // 0为添加，1为修改编辑
      this.WriteId = 0
      this.ResetWriteData()
    },
    WriteAdd () {
      this.$refs.WriteForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('请输入完整信息！')
        } else {
          this.$axios.post(AddRole, this.WriteData).then((res) => {
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('添加成功！')
              this.closeWrite()
              this.getRoleMore(this.currentPage)
            }
          })
        }
      })
    },
    WriteEdit () {
      this.$refs.WriteForm.validate((valid) => {
        if (!valid) {
          this.$message.warning('请输入完整信息')
        } else {
          this.$axios.post(EditRole, Object.assign({}, this.WriteData, {id: this.WriteId})).then((res) => {
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('编辑成功！')
              this.closeWrite()
              this.getRoleMore(this.currentPage)
            }
          })
        }
      })
    },

    handle1 (index, row) {
      this.showView = true
      this.ViewLoding = true
      this.ViewTabIndex = '1'
      this.ViewRoleId = row.id
      this.tabs1()
    },
    CloseView () {
      this.ViewTabIndex = '1'
      this.ViewRoleId = 0
      this.showView = false
    },
    handleTabs () {
      if (this.ViewTabIndex === '1') { this.tabs1() }
      if (this.ViewTabIndex === '2') { this.tabs2() }
      if (this.ViewTabIndex === '3') { this.tabs3() }
    },
    tabs1 () {
      this.FullLoading = true
      this.$axios.post(RoleInfo, {
        id: this.ViewRoleId
      }).then((res) => {
        this.FullLoading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.ViewInfo = res.data
        }
      })
    },
    tabs2 () {
      this.ViewReLoading = true
      this.$axios.post(RolesAuthorizedResources, {
        id: this.ViewRoleId,
        page: 1,
        pagesize: this.pageSize2
      }).then((res) => {
        this.ViewReLoading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.ViewResource = _normalizeTreeData(res.data, 'id', 'parentid', 'child', null)
        }
      })
    },
    changeSwitch (row) {
      if (row.isope) { // 授权操作
        this.$axios.post(AuthorizeRole, {
          targettype: 1,
          targetid: this.ViewRoleId,
          resourceid: [row.id]
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('授权成功！')
          }
        })
      } else { // 取消授权（删除授权）
        this.$axios.post(DeleteUserAuthorizeRole, {
          id: row.permissionid
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('取消授权！')
          }
        })
      }
    },
    getMore2 (val) {
      this.currentPage2 = val
      this.$axios.post(RolesAuthorizedResources, Object.assign({}, this.resQuery, {
        id: this.ViewRoleId,
        page: val,
        pagesize: this.pageSize2
      })).then((res) => {
        this.ViewReLoading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.ViewResource = res.data.list
          this.total2 = res.data.total
        }
      })
    },
    changeSize2 (n) {
      this.pageSize2 = n
      this.getMore2(this.currentPage2)
    },
    tabs3 () {
      this.ViewUserLoading = true
      this.$axios.post(RoleAuthorizeUser, {
        id: this.ViewRoleId,
        page: 1,
        pageSize: this.ViewUserPageSize
      }).then((res) => {
        this.ViewUserLoading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.ViewUser = res.data.list
          this.ViewUserTotal = res.data.total
        }
      })
    },
    getViewUserMore (page) {
      this.ViewUserLoading = true
      this.ViewUserCurrentPage = page
      this.$axios.post(RoleAuthorizeUser, {
        id: this.ViewRoleId,
        page: page,
        pageSize: this.ViewUserPageSize
      }).then((res) => {
        this.ViewUserLoading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.ViewUser = res.data.list
          this.ViewUserTotal = res.data.total
        }
      })
    },
    changeSize3 (n) {
      this.ViewUserPageSize = n
      this.getViewUserMore(this.ViewUserCurrentPage)
    },

    handle2 (index, row) {
      this.$confirm(`您确认要复用 ${row.role_name} 吗？`, '确认', {
        type: 'warning'
      }).then(() => {
        this.$axios.post(CopyRole, {id: row.id}).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('复用成功！')
            this.getRoleMore(this.currentPage)
          }
        })
      })
    },

    handle4 (index, row) {
      this.$confirm('您确认要删除此角色吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.post(DeleteRole, {
          id: row.id
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('删除成功！')
            this.getRoleList()
            this.currentPage = 1
          }
        })
      })
    }

  },
  computed: {
    ...mapGetters(['UserInfo'])
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
  .col {
    display: flex;
    align-items: center;
  }
  .checkbox {
    flex: 1;
  }

  .tag {
    display: block;
    flex: 0 0 46px;
    width: 46px;
    /*margin-left: 10px;*/
  }
</style>
