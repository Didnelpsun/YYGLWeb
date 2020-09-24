<template>
  <div class="content">
    <div class="main" v-show="!userInfoBox && !showView">
      <el-form :model="Query">
        <el-row >
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="用户账号：">
                <el-input v-model="Query.username" @keyup.enter.native="getTableData1More(currentPage)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用户名称：">
                <el-input v-model="Query.realityname" @keyup.enter.native="getTableData1More(currentPage)"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button style="margin-left: 20px" @click="getTableData1More(currentPage)" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="resetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="addUserInfo" type="success" icon="el-icon-plus">添加</el-button>
            <el-button @click="handle3" type="danger" icon="el-icon-delete">删除</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData1" v-loading="table1Loading" ref="table1" @selection-change="handleSelect1" style="margin-top: 15px;">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="序号" width="50">
          <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="username" label="用户账号"></el-table-column>
        <el-table-column prop="realityname" label="用户名称" width="110"></el-table-column>
        <el-table-column prop="mobile_no" label="联系电话" width="110"></el-table-column>
        <el-table-column prop="orgname" label="部门" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="用户类型" width="100" :formatter="formatUserType"></el-table-column>
        <el-table-column label="注册时间" width="160" :formatter="formatTime"></el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handle1(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="handle2(scope.$index, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <el-pagination @size-change="handelSizeChange" @current-change="getTableData1More" :page-sizes="[10, 20, 30, 50]"
                       :current-page.sync="currentPage" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div class="add" v-show="userInfoBox">
      <layuiTitle :title="userInfoType == 'add' ? '添加用户' : '修改用户信息'">
        <el-button class="title-btn" slot="btns" v-show="userInfoType=='edit'" @click="ResetPwd" icon="el-icon-refresh" type="text">重置密码</el-button>
      </layuiTitle>
      <el-form :model="AddForm" :rules="Rules" ref="AddForm">
        <el-row>
          <el-col :sm="12" :md="9">
            <el-form-item label="用户账号：" prop="username">
              <el-input v-model="AddForm.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="用户名称：" prop="realityname">
              <el-input v-model="AddForm.realityname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9" v-if="userInfoType === 'add'">
            <el-form-item label="登录密码：" prop="password">
              <el-input v-model="AddForm.password" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9" v-if="userInfoType === 'add'">
            <el-form-item label="确认密码：" prop="rpassword">
              <el-input v-model="AddForm.rpassword" type="password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="联系电话：" prop="mobile_no">
              <el-input v-model="AddForm.mobile_no"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="电子邮箱：" prop="email">
              <el-input v-model="AddForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="用户部门：" prop="orgname">
              <el-input v-model="AddForm.orgname" placeholder="请选择部门" disabled>
                <el-button @click="openOrgTree" slot="append">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9" v-if="UserInfo.usertype === 2">
            <el-form-item label="选择租户：" prop="tenantid">
              <el-select v-model="AddForm.tenantid" placeholder="请选择租户管理员">
                <el-option v-for="item in TenantList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9" v-show="userInfoType === 'edit'">
            <el-form-item label="用户类型：" prop="usertype">{{formatUserType(AddForm)}}</el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
          <el-form-item label="头像上传：">
            <el-upload class="avatar-uploader" action="http://111.47.173.162:8051/Admin/UploadImage/Upload"
                       :headers="{Authorization: token}" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="AddForm.registerphoto" :src="AddForm.registerphoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        </el-row>
      </el-form>
      <div class="center">
        <el-button @click="UserInfoUpdate" :disabled="UserInfoLoading" :icon="UserInfoLoading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
        <el-button @click="userInfoBox = !userInfoBox" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <div class="view" v-show="showView">
      <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="handleTabs">
        <el-tab-pane label="用户信息">
          <el-form :model="ViewData">
            <el-row :gutter="20">
              <el-col :sm="12" :md="8">
                <el-form-item label="用户账号：">{{ViewData.username}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="用户名称：">{{ViewData.realityname}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :sm="12" :md="8">
                <el-form-item label="联系电话：">{{ViewData.mobile_no}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="电子邮箱：">{{ViewData.email}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :sm="12" :md="8">
                <el-form-item label="用户部门：">{{ViewData.orgname}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="用户类型：">{{formatUserType(ViewData)}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :sm="12" :md="8">
                <el-form-item label="用户头像：">
                  <img class="avatar" style="border-radius: 5px" v-if="ViewData.registerphoto" :src="ViewData.registerphoto">
                </el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="注册时间：">{{formatTime(ViewData)}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="授权角色">
          <el-table :data="ViewRoles" v-loading="ViewLoading">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="role_name" label="角色名称"></el-table-column>
            <el-table-column prop="rolenum" label="角色编码" width="100"></el-table-column>
            <el-table-column label="角色类型" width="100" :formatter="formatRoleType"></el-table-column>
            <el-table-column prop="tenantname" label="租户名称"></el-table-column>
            <el-table-column prop="remarks" label="角色描述"></el-table-column>
            <el-table-column label="授权" width="80" sortable>
              <template slot-scope="scope">
                <el-switch v-model="scope.row.isope" inactive-color="#ff4949" @change="changeSwitch(scope.row)"></el-switch>
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="center">-->
            <!--<el-button @click="showView = !showView" icon="el-icon-arrow-left">返 回</el-button>-->
          <!--</div>-->
        </el-tab-pane>
        <el-tab-pane label="授权区域">
          <div style="width: 50%;height: 60vh">
            <el-scrollbar style="height: 100%">
              <el-tree :props="{label: 'name',isLeaf: 'leaf',children: 'child'}" lazy :load="loadArea"
                       @check-change="CheckChange"
                       show-checkbox :check-strictly="true" ref="AreaCheckTree" node-key="id"></el-tree>
            </el-scrollbar>
          </div>

        </el-tab-pane>
        <el-tab-pane label="授权资源">
          <el-table :data="ViewResource" v-loading="ViewLoading" row-key="id" lazy :load="handleLoadChild"
                    :tree-props="{children: 'child', hasChildren: 'hasChild'}" ref="table2">
            <el-table-column prop="name" label="菜单名称" width="200"></el-table-column>
            <el-table-column prop="" label="菜单资源" width="250">
              <template slot-scope="scope">
                <el-row>
                  <!--<el-col :span="6" v-for="item in scope.row.menuresource" :key="item.id">
                    <el-checkbox v-if="item.resourcesname"
                                 :label="item.id"
                                 v-model="item.isCheck"
                                 @change="changeResourceSwitch(item)">
                      {{item.resourcesname}}
                    </el-checkbox>
                  </el-col>-->
                  <el-checkbox v-for="item in scope.row.menuresource" :key="item.id"
                               v-if="item.resourcesname"
                               :label="item.id"
                               v-model="item.isope"
                               @change="changeResourceSwitch(item)">
                    {{item.resourcesname}}
                  </el-checkbox>
                </el-row>
                <!--</el-checkbox-group>-->
              </template>
            </el-table-column>
            <el-table-column prop="" label="接口资源">
              <template slot-scope="scope">
                <el-row>
                  <!--<el-col :span="6" v-for="item in scope.row.menuresource" :key="item.id">
                    <el-checkbox  v-if="item.resourcesname"
                                  :label="item.id"
                                  v-model="item.isCheck"
                                  @change="changeResourceSwitch(item)">
                      {{item.resourcesname}}
                    </el-checkbox>
                  </el-col>-->
                  <!--<el-col :span="6" v-for="item in scope.row.interresource" :key="item.id">
                    <el-checkbox v-if="item.resourcesname"
                                 :label="item.id"
                                 v-model="item.isCheck"
                                 @change="changeResourceSwitch(item)">
                      {{item.resourcesname}}
                    </el-checkbox>
                  </el-col>-->
                  <el-checkbox v-for="item in scope.row.interresource[0]" :key="item.id"
                               v-if="item.resourcesname"
                               :label="item.id"
                               v-model="item.isope"
                               @change="changeResourceSwitch(item)">
                    {{item.resourcesname}}
                  </el-checkbox>
                </el-row>
                <!--</el-checkbox-group>-->
              </template>
            </el-table-column>
          </el-table>
          <!--<div class="center">-->
          <!--<el-button @click="CloseView" icon="el-icon-arrow-left">返 回</el-button>-->
          <!--</div>-->
        </el-tab-pane>
      </el-tabs>
      <div class="center">
        <el-button v-show="ViewTabIndex === '2'" @click="SubArea" icon="el-icon-check">提交</el-button>
        <el-button @click="CloseView" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <OrgTree :showCheckBox="true" :checkStrictly="true" :isRadio="true" :expandAll="true" @Confirm="ConfirmOrg" ref="OrgTree"></OrgTree>

  </div>

</template>

<script>
import {reqURL, UserListAsync, AddUser, EditUser, ResetPassword, AreaList, ViewUserInfo, ViewUserAuthorizedOrArea,
  DelUser, UserAuthorizeRoleOrAreaAsync, TenantList, DeleteAuthorizeRoleOrArea, UserAuthorizesThoseResources,
  UserAuthorizeRoleAsync, DeleteUserAuthorizeRole} from 'api/api'
import {isValidTelNum, isValidEmail} from 'common/js/validata'
import {_normalizeTreeData} from 'common/js/cache'
import {USER_TYPE, ROLE_TYPE, RESOURCE_TYPE} from 'common/js/global'
import {mapGetters} from 'vuex'
import OrgTree from 'base/OrgTree'
import layuiTitle from 'base/layui-title'

export default {
  name: 'UserList',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.AddForm.rpassword !== '') {
          this.$refs.AddForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      console.log(rule, value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.AddForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      Query: {},
      tableData1: [],
      selectTable1: [],
      table1Loading: false,
      WriteLoading: false,

      showOrg: false,
      OrgTreeList: [],
      TenantList: [],

      userInfoBox: false,
      userInfoType: '',
      AddForm: {
        username: '',
        realityname: '',
        password: '',
        rpassword: '',
        mobile_no: '',
        email: '',
        org_id: '',
        orgname: '',
        registerphoto: '',
        usestateid: 0,
        tenantid: null
      },
      EditId: 0,

      Rules: {
        username: [{required: true, message: '请输入用户账号', trigger: 'blur'}],
        realityname: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
        password: [
          {required: true, message: '请输入用户密码', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        rpassword: [
          {required: true, message: '请输入确认密码', trigger: 'blur'},
          {validator: validatePass2, trigger: 'blur'}
        ],
        mobile_no: [
          {required: true, message: '请输入联系电话', trigger: 'blur'},
          {pattern: isValidTelNum, message: '请输入正确的电话', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {pattern: isValidEmail, message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        orgname: [{required: true, message: '请选择部门', trigger: 'blur'}],
        tenantid: [{required: true, message: '请选择租户', trigger: 'change'}]
      },
      UserInfoLoading: false,

      showView: false,
      ViewLoading: false,
      ViewData: {},
      ViewRoles: [],
      ViewAreaIds: [],
      ViewResource: [],
      ViewTabIndex: '0',
      ViewId: ''
    }
  },
  created () {
    this.getTableData1()
    if (this.UserInfo.usertype === 2) this.getTenantList()
  },
  methods: {
    handelSizeChange (newSize) {
      this.pageSize = newSize
      this.getTableData1()
    },
    getTableData1 () {
      this.table1Loading = true
      this.$axios.post(UserListAsync, {
        page: 1,
        pageSize: this.pageSize
      }).then((res) => {
        this.table1Loading = false
        if (res.error) {
          setTimeout(() => {
            this.getTableData1()
          }, 10000)
        } else {
          this.tableData1 = res.data.list
          this.total = res.data.total
        }
      })
    },
    getTableData1More (e) {
      this.currentPage = e
      this.table1Loading = true
      let data = Object.assign({}, this.Query, {
        page: e,
        pageSize: this.pageSize
      })
      this.$axios.post(UserListAsync, data).then((res) => {
        this.table1Loading = false
        if (res.error) {
          this.getTableData1()
        } else {
          this.tableData1 = res.data.list
          this.total = res.data.total
        }
      })
    },
    resetQuery () { Object.assign(this.$data.Query, this.$options.data().Query) },
    formatTime (row) { return row.createtime ? row.createtime.replace('T', ' ') : '' },
    formatResType (row) {
      return RESOURCE_TYPE[row.resourcetype]
    },
    formatUserType (row) { return USER_TYPE[row.usertype] },
    formatRoleType (row) { return ROLE_TYPE[row.role_type] },

    UserInfoUpdate () {
      if (this.userInfoType === 'add') {
        this.SubAdd()
      } else if (this.userInfoType === 'edit') {
        this.SubEdit()
      }
    },

    openOrgTree () {
      this.$refs.OrgTree.open()
      this.$refs.OrgTree.getOrgList()
      let data = [this.AddForm.org_id]
      this.$refs.OrgTree.setCheckedKeys(data)
    },
    ConfirmOrg (data) {
      if (data.length) {
        this.AddForm.orgname = data[0].orgname
        this.AddForm.org_id = data[0].id
      }
    },
    addUserInfo () {
      this.userInfoBox = true
      Object.assign(this.$data.AddForm, this.$options.data().AddForm)
      this.userInfoType = 'add'
      this.$refs.AddForm.resetFields()
    },
    SubAdd () {
      console.log(0)
      console.log(this.$refs.AddForm)
      this.$refs.AddForm.validate((valid, msg) => {
        console.log(valid, msg)
        if (!valid) {
          console.log(1)
          this.$message.warning('请补全完整信息！')
        } else {
          console.log(2)
          this.UserInfoLoading = true
          this.$axios.post(AddUser, this.AddForm).then((res) => {
            this.UserInfoLoading = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.userInfoBox = false
              this.$message.success('添加成功！')
              this.getTableData1More(this.currentPage)
              Object.assign(this.$data.AddForm, this.$options.data().AddForm)
            }
          })
        }
      })
    },
    ResetPwd () {
      this.$confirm('您确认要重置登录密码吗？', '警告', {
        type: 'warning'
      }).then(() => {
        this.$axios.post(ResetPassword, {
          id: this.EditId
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('重置成功！')
          }
        })
      })
    },
    SubEdit () {
      this.$refs.AddForm.validate((vali) => {
        if (!vali) {
          this.$message.error('请补全表单信息')
        } else {
          this.UserInfoLoading = true
          this.$axios.post(EditUser, this.AddForm).then((res) => {
            this.UserInfoLoading = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('修改成功！')
              this.userInfoBox = false
              this.getTableData1More(this.currentPage)
              Object.assign(this.$data.AddForm, this.$options.data().AddForm)
            }
          })
        }
      })
    },
    handle1 (index, row) {
      this.showView = true
      this.ViewData = {}
      this.ViewRoles = []
      this.ViewAreaIds = []
      this.ViewTabIndex = '0'
      this.ViewId = row.id
      this.tabs1()
    },
    handle2 (index, row) {
      this.userInfoBox = true
      this.userInfoType = 'edit'
      Object.assign(this.$data.AddForm, this.$options.data().AddForm)
      this.$refs.AddForm.resetFields()
      this.$axios.post(ViewUserInfo, {
        id: row.id
      }).then((res) => {
        if (res.error) {
          this.handle2(index, row)
        } else {
          this.AddForm = res.data
          this.EditId = row.id
        }
      })
    },

    handleSelect1 (list) { this.selectTable1 = list },
    CloseView () {
      this.ViewTabIndex = '0'
      this.ViewId = '0'
      this.showView = false
      this.ViewResource = []
    },
    handleTabs () {
      if (this.ViewTabIndex === '0') { this.tabs1() }
      if (this.ViewTabIndex === '1') { this.tabs2() }
      if (this.ViewTabIndex === '2') { this.tabs3() }
      if (this.ViewTabIndex === '3') { this.tabs4() }
    },
    tabs1 () {
      this.$axios.post(ViewUserInfo, { // 信息
        id: this.ViewId
      }).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.ViewData = res.data
        }
      })
    },
    tabs2 () {
      this.ViewReLoading = true
      this.$axios.post(ViewUserAuthorizedOrArea, { // 角色
        type: 1,
        id: this.ViewId
      }).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.ViewRoles = res.data
        }
      })
    },
    async changeSwitch (row) {
      if (row.isope) {
        const res = await this.$axios.post(UserAuthorizeRoleOrAreaAsync, {
          type: 1,
          userid: this.ViewId,
          typeid: [row.id]
        })
        res.error ? this.$message.error(res.errorMessage) : this.$message.success('授权成功！')
      } else {
        const res = await this.$axios.post(DeleteAuthorizeRoleOrArea, { id: row.permissionid })
        if (res.error) return this.$message.error(res.errorMessage)
        this.$message.warning('取消授权！')
      }
    },
    tabs3 () {
      this.ViewUserLoading = true
      this.$axios.post(ViewUserAuthorizedOrArea, { // 区域
        type: 2,
        id: this.ViewId
      }).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          let ids = []
          for (let i in res.data) {
            ids.push(res.data[i].id)
          }
          this.ViewAreaIds = ids
          this.setCheckedNodes()
        }
      })
    },
    loadArea (node, resolve) {
      if (node.level <= 0) {
        this.$axios.post(AreaList, {
          parentid: null
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            resolve(this._normalizeArea(res.data))
          }
        })
      } else {
        this.$axios.post(AreaList, {
          parentid: node.data.id
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            resolve(this._normalizeArea(res.data))
            this.setCheckedNodes()
          }
        })
      }
    },
    _normalizeArea (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) { // 默认地区最小leveltype为3
          list[i].leaf = true
        }
      }
      return list
    },
    setCheckedNodes () {
      this.$nextTick(() => {
        this.$refs.AreaCheckTree.setCheckedKeys(this.ViewAreaIds)
      })
    },
    CheckChange (data, check) {
      let index = this.ViewAreaIds.indexOf(data.id)
      if (check) {
        if (index < 0) { this.ViewAreaIds.push(data.id) }
      } else {
        if (index >= 0) this.ViewAreaIds.splice(index, 1)
      }
    },
    SubArea () {
      this.$axios.post(UserAuthorizeRoleOrAreaAsync, {
        type: 2,
        userid: this.ViewId,
        typeid: this.ViewAreaIds
      }).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.$message.success('提交成功！')
        }
      })
    },
    tabs4 () {
      this.ViewLoading = true
      this.$axios.post(UserAuthorizesThoseResources, {
        id: this.ViewId
      }).then((res) => {
        this.ViewLoading = false
        if (res.error) {
          setTimeout(() => {
            this.tabs4()
          }, 10000)
        } else {
          res.data.sort((a, b) => { return b.id - a.id })
          let list = _normalizeTreeData(res.data, 'id', 'parentid', 'child', null)
          this.ViewResource = this.hasChilds(list)
        }
      })
    },
    hasChilds (list) {
      for (let i in list) {
        if (list[i].child && list[i].child.length) {
          list[i].hasChild = true
        } else {
          list[i].hasChild = false
        }
      }
      return list
    },
    handleLoadChild (row, treeNode, resolve) {
      if (!treeNode.level) {
        resolve(this.hasChilds(row.child))
      }
    },
    changeResourceSwitch (row) {
      console.log(row)
      if (row.isope) {
        this.$axios.post(UserAuthorizeRoleAsync, {
          targettype: 2,
          targetid: this.ViewId,
          resourceid: [row.resourcesid]
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
            row.isope = !row.isope
          } else {
            this.$message.success('授权成功！')
          }
        })
      } else {
        this.$axios.post(DeleteUserAuthorizeRole, {
          id: row.permissionid
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
            row.isope = !row.isope
          } else {
            this.$message.warning('取消授权！')
          }
        })
      }
    },

    handle3 () {
      if (!this.selectTable1.length) return this.$message.warning('请勾选用户列表')
      this.$confirm('您确认要批量删除选中的用户吗？', '警告', {
        type: 'warning'
      }).then(() => {
        let list = this.selectTable1
        let ids = []
        for (let i in list) {
          ids.push(list[i].id)
        }
        this.$axios.post(DelUser, {
          ids
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('删除成功！')
            this.getTableData1More(this.currentPage)
          }
        })
      })
    },

    getTenantList () {
      this.$axios.post(TenantList, {
        page: 1,
        pagesize: 10000
      })
        .then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.TenantList = res.data.list
          }
        })
    },

    handleAvatarSuccess (res) { // 头像上传
      if (res.error) return
      this.$message.success('上传成功！')
      if (this.userInfoBox) {
        this.AddForm.registerphoto = `${reqURL}/${res.data[0]}`
      }
    },
    beforeAvatarUpload (file) { // 上传头像格式
      let type = ['', 'image/png', 'image/jpeg']
      const isJPG = type.indexOf(file.type)
      const fileSize = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 和 png 格式!')
      }
      if (!fileSize) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && fileSize
    },
    handelData (row) {
      switch (row.name) {
        case '角色授权':
          this.pageType = 'role'
          break
        case '区域授权':
          this.pageType = 'region'
          break
        default:
      }
    }
  },
  watch: {
    userInfoType (val) {
      /* if (val === 'add') {
        this.Rules.pass[0].required = true
        this.Rules.checkpass[0].required = true
      } else {
        this.Rules.pass[0].required = false
        this.Rules.checkpass[0].required = false
      } */
    },
    userInfoBox (newVal, oldVal) {
      if (newVal === false) {
        this.$refs.AddForm.clearValidate()
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'UserInfo'])
  },
  components: {
    layuiTitle,
    OrgTree
  }
}
</script>

<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
