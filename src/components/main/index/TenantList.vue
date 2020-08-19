<template>
  <div class="content">
    <div class="main"  v-show="!showWrite && !showView">
      <!--头部表单 start-->
      <el-form :model="Query" ref="Queryform">
        <el-row>
          <el-col :span="18">
            <el-col :span="10">
              <el-form-item label="租户名称：">
                <el-input v-model="Query.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否启用：">
                <el-select v-model="Query.enabled">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0">
              <el-button @click="searchTable1" :disabled="QueryLoading" :icon="QueryLoading ? 'el-icon-loading' : 'el-icon-search'">查询</el-button>
              <el-button @click="resetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
        <!--<el-col :sm="11" :md="7" :offset="1">
        </el-col>-->
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleWrite('add')" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <!--头部表单 end-->
      <!--table表单 start-->
      <el-table :data="Table1" v-loading="Table1Loading" @selection-change="handleSelect1" style="margin-top: 15px;">
        <el-table-column label="序号" width="50">
        <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
        </el-table-column>
        <el-table-column prop="name" label="租户名称"></el-table-column>
        <el-table-column label="申请时间" align="center" prop="createtime"></el-table-column>
        <el-table-column label="创建人" width="150" prop="createusername"></el-table-column>
        <el-table-column label="生效时间 " align="center" prop="starttime"></el-table-column>
        <el-table-column label="失效时间 " align="center" prop="endtime"></el-table-column>
        <el-table-column label="是否启用 " width="150" :formatter="formatIE"></el-table-column>
        <el-table-column label="操作 " width="130px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="handleWrite('edit', scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--table表单 end-->
    </div>
    <!--添加-修改内容 start -->
    <div class="Add" v-show="showWrite">
    <layuiTitle :title="changeTitle+'租户'"></layuiTitle>
    <el-form :model="WriteForm" :rules="Rules" ref="WriteForm">
      <el-row :gutter="30">
        <el-col :sm="12" :md="8">
          <el-form-item label="租户名称：" prop="name">
            <el-input v-model="WriteForm.name" placeholder="请输入租户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="租户网址："  prop="weburl">
            <el-input v-model="WriteForm.weburl" placeholder="请输入租户网址"></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="缴费金额(元)：" label-width="125" prop="payprice">
            <el-input style="width:205px" v-model="WriteForm.payprice" placeholder="请输入缴费金额" @mousewheel.native.prevent type="number"></el-input>
            <!--<el-input-number v-model="WriteForm.payprice" style="width:205px;" placeholder="请输入缴费金额" :controls="false"></el-input-number>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :sm="12" :md="8">
          <el-form-item label="缴费周期：" prop="paycycle">
            <el-input v-model="WriteForm.paycycle" placeholder="请输入缴费周期" @mousewheel.native.prevent type="number"></el-input>
            <!--<el-input-number v-model="WriteForm.paycycle" style="width:220px;" placeholder="请输入缴费周期" :controls="false"></el-input-number>-->
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="租用年限：" prop="leaseterm">
            <el-input v-model="WriteForm.leaseterm" placeholder="请输入租用年限" @mousewheel.native.prevent type="number"></el-input>
            <!--<el-input-number v-model="WriteForm.leaseterm" style="width:220px;" placeholder="请输入租用年限" :controls="false"></el-input-number>-->
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="客户经理：" prop="counterpart">
            <el-input v-model="WriteForm.counterpart" placeholder="请输入客户经理"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :sm="12" :md="8">
          <el-form-item label="租户类型：" prop="tenanttype" >
            <el-select v-model="WriteForm.tenanttype" style="width: 220px;" placeholder="请选择租户类型">
              <el-option label="免费" :value="0"></el-option>
              <el-option label="收费" :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="是否启用：" prop="enable">
            <el-select v-model="WriteForm.enable" style="width: 220px;" placeholder="请选择状态属性">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8" v-if="WriteState === 'edit'">
          <el-form-item label="租户管理员账号：" label-width="130" prop="admincode">
            <el-input v-model="WriteForm.admincode"  placeholder="请输入管理账号" style="width: 195px;" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :sm="12" :md="8">
          <el-form-item label="生效时间：" prop="starttime">
            <el-date-picker v-model="WriteForm.starttime" type="date"
                            @change="starttime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择申请时间"> </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :md="8">
          <el-form-item label="失效时间：" prop="endtime">
            <el-date-picker v-model="WriteForm.endtime" type="date"
                            @change="endtime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="请选择失效时间"> </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="center">
      <el-button @click="WriteSubInfo(`${changeTitle}`)" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">{{changeTitle}}</el-button>
      <el-button @click="showWrite = false" icon="el-icon-arrow-left">返回</el-button>
    </div>
  </div>
    <!--添加 修改内容 end-->
    <!--查看内容 start-->
    <div class="view" v-show="showView">
      <el-tabs class="content-card" v-model="ViewTabIndex" @tab-click="handleTabs">
        <el-tab-pane label="租户信息">
          <el-form>
            <el-row :gutter="20">
              <el-col :sm="12" :md="8">
                <el-form-item label="租户名称：">{{TenantData.lessee.name}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="租户网址：">{{TenantData.lessee.weburl}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="缴费金额：">{{TenantData.lessee.payprice}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :sm="12" :md="8">
                <el-form-item label="缴费周期：">{{TenantData.lessee.paycycle}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="租用年限：">{{TenantData.lessee.leaseterm}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="客户经理：">{{TenantData.lessee.counterpart}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :sm="12" :md="8">
                <el-form-item label="租户类型：">{{TenantData.lessee.tenanttype === 0 ? '免费': '收费'}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="是否启用：">{{TenantData.lessee.enable === true ? '是': '否'}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="租户管理员账号：" label-width="130px">{{TenantData.lessee.admincode}}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :sm="12" :md="8">
            <el-form-item label="生效时间：">{{TenantData.lessee.starttime}}</el-form-item>
          </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="失效时间：">{{TenantData.lessee.endtime}}</el-form-item>
              </el-col>
              <el-col :sm="12" :md="8">
                <el-form-item label="创建时间：">{{TenantData.lessee.applytime}}</el-form-item>
              </el-col>
            </el-row>
            <!--<el-row :gutter="20">-->
              <!--<el-col :sm="12" :md="8">-->
                <!--<el-form-item label="创建人：">{{TenantData.lessee.createusername}}</el-form-item>-->
              <!--</el-col>-->
            <!--</el-row>-->
          </el-form>
          <div class="center">
            <el-button @click="showView = !showView" icon="el-icon-arrow-left">返 回</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="授权角色">
          <el-table :data="TenantData.role">
            <el-table-column prop="role_name" label="角色名称"></el-table-column>
            <!--<el-table-column prop="id" label="角色编码"></el-table-column>-->
            <el-table-column :formatter="roleType" label="角色类型" width="130"></el-table-column>
            <el-table-column prop="remarks" label="角色描述" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column  :formatter="formatIE" label="是否授权" width="130" sortable><!--:formatter="formatIE"-->
            </el-table-column>
          </el-table>
          <div class="center">
            <!--<el-button @click="handleSave('role')"  :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提 交</el-button>-->
            <el-button @click="showView = !showView" icon="el-icon-arrow-left">返 回</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="授权区域">
          <el-table :data="TenantData.area">
            <el-table-column prop="name" label="区域名称"></el-table-column>
            <el-table-column prop="id" label="区域ID" width="130"></el-table-column>
            <el-table-column :formatter="area_level" label="区域级别" width="130"></el-table-column>
            <el-table-column prop="enable" :formatter="formatIE" label="是否授权" width="130" sortable></el-table-column>
          </el-table>
          <div class="center">
            <!--<el-button @click="handleSave('area')" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提 交</el-button>-->
            <el-button @click="CloseView" icon="el-icon-arrow-left">返 回</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="授权资源">
          <el-table :data="TenantData.resources">
            <el-table-column prop="name" label="资源名称"></el-table-column>
            <!--<el-table-column prop="id" label="资源编码"></el-table-column>-->
            <el-table-column prop="" :formatter="resourceType" label="资源类型" width="130"></el-table-column>
            <el-table-column prop="weburl" label="资源地址" width="130" show-overflow-tooltip></el-table-column>
            <el-table-column  label="是否授权" width="130" sortable :formatter="formatIE" ></el-table-column>
          </el-table>
          <div class="center">
            <!--<el-button @click="handleSave('resource')" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">提 交</el-button>-->
            <el-button @click="showView = !showView" icon="el-icon-arrow-left">返 回</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--查看内容 end-->
    <!--分页区域 start-->
    <div class="center" v-show="!showWrite && !showView">
      <!--<el-pagination @current-change="getTableData1More" :current-page.sync="currentPage" background layout="prev, pager, next" :page-size="pageSize" :total="total"></el-pagination>-->
      <el-pagination @size-change="handelSizeChange" @current-change="getTableData1More"
                     :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </div>
    <!--分页区域 end -->
  </div>
</template>
<script>
import {TENANT_TYPE, ROLE_TYPE, RESOURCE_TYPE, AREA_LEVEL} from 'common/js/global'
import {TenantList, EditTenant, AddTenant, DeleteTenant, InfoAsync, TenantIdlistRole, ViewUserAuthorizedOrArea} from 'api/api'
import layuiTitle from 'base/layui-title'
import {mapGetters} from 'vuex'
export default {
  name: 'TenantList',
  data () {
    return {
      // 查询字段
      Query: {
        name: '', // 名称
        enabled: ''
      },
      QueryLoading: false,
      currentPage: 1, // 页引
      pageSize: 10, // 页数据条
      total: 0, // 总数据
      Table1: [], // 请求拿到的数据
      selectTable1: [],
      Table1Loading: false, // 加载动画
      showWrite: false, // 控制添加和编辑的显示隐藏
      WriteState: '', // 0为添加，1为编辑
      showView: false, // 控制查看页面显示
      AddLoading: false, // 按钮的loading动画
      EditLoading: false,
      Rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '用户名长度在2～10个字符', trigger: 'blur' }
        ],
        leaseterm: [
          { required: true, message: '请填入租用年限', trigger: 'blur' }
        ],
        tenanttype: [
          { required: true, message: '请选择租户类型', trigger: 'change' }
        ],
        paycycle: [
          { required: true, message: '请填入租用周期', trigger: 'blur' }
        ],
        payprice: [
          { required: true, message: '请输入缴费金额', trigger: 'blur' }
        ],
        enable: [
          { required: true, message: '请选择启用类型', trigger: 'change' }
        ]
      },
      WriteForm: {
        name: '', // 租户名称
        weburl: '', // 租户网址
        admincode: '', // 租户管理员账号
        // applytime: '', // 申请时间
        id: 1, // 租户id
        counterpart: '', // 租户经理
        tenanttype: '', // 租户类型
        leaseterm: '', // 租用年限
        paycycle: '', // 缴费周期
        payprice: '', // 缴费金额
        starttime: '', // 生效时间
        endtime: '', // 失效时间
        enable: '', // 是否启用
        submittime: '' // 提交时间
        // submitter: ''// 提交人
      },
      WriteLoading: false,
      TENANT_TYPE: [], // 外部方法转存变量
      ViewTabIndex: '0', // tabs栏页引
      ViewRowId: 0, //  点击的列表对应的row 值
      TenantData: {
        lessee: [], // 租户信息
        role: [], // 角色授权
        area: [], // 区域授权
        resources: [] // 资源授权
      }

    }
  },
  created () {
    this.TENANT_TYPE = TENANT_TYPE.slice(1)
    this.getTableData1()
  },
  methods: {
    // formatter 过滤属性
    createdTime (row) { return row.applytime.replace('T', ' ') }, // 创建时间
    tenantType (row) { return `${TENANT_TYPE[row.tenanttype]}` }, // 租户类型
    resourceType (row) { return `${RESOURCE_TYPE[row.resourcetype]}` },
    roleType (row) { return `${ROLE_TYPE[row.role_type]}` },
    area_level (row) { return `${AREA_LEVEL[row.leveltype]}` }, // 区域级别
    formatIE (row) { return row.enable ? '是' : '否' }, // 是否启用
    starttime (val) { this.WriteForm.starttime = val },
    endtime (val) { this.WriteForm.endtime = val },

    // 查询字段
    async searchTable1 () {
      this.QueryLoading = true
      let data = Object.assign({}, this.Query, { page: 1, pageSize: this.pageSize })
      const res = await this.$axios.post(TenantList, data)
      if (res.error) return this.$message.error(res.errorMessage)
      this.Table1 = res.data.list
      this.total = res.data.total
      this.QueryLoading = false
    },
    // 请求数据
    async getTableData1 () {
      this.Table1Loading = true
      let param = { page: 1, pageSize: this.pageSize }
      const res = await this.$axios.post(TenantList, param)
      this.Table1Loading = false
      if (res.error) return this.$message.error(res.errorMessage)
      this.Table1 = res.data.list
      this.total = res.data.total
      // console.log(this.Table1)
    },
    // 重置
    resetQuery () {
      this.Query.name = ''
      this.Query.enabled = ''
      this.getTableData1()
    },
    // 分页改变触发事件
    handelSizeChange (newSize) {
      this.pageSize = newSize
      this.getTableData1()
    },
    // 数据尾处理寒函数
    getTableData1More (page) {
      this.currentPage = page
      this.Table1Loading = true
      this.$axios.post(TenantList, Object.assign({}, this.Query, {
        page: page,
        pageSize: this.pageSize
      })).then((res) => {
        this.Table1Loading = false
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.Table1 = res.data.list
        }
      })
    },
    handleSelect1 (list) {
      // console.log('list', list)
      this.selectTable1 = list
    },

    handleView (index, row) { // 查看按钮处理事件    参数 0 object
      this.ViewTabIndex = '0'
      this.ViewRowId = row.id
      this.tabs0()
      this.showView = true
    },
    // 添加按钮&&修改按钮触发事件
    async handleWrite (state, index, row) {
      this.showWrite = true // 显示视图窗口
      this.WriteState = state // WriteState 赋值状态
      switch (state) { // 添加
        case 'add':
          this.$refs.WriteForm.resetFields()// 重置表单val值
          // 提交转到WriteSubInfo
          break

        case 'edit':
          // 发送请求当前id数据渲染至列表
          const res = await this.$axios.post(InfoAsync, { id: row.id })
          if (res.error) return this.$message.error(res.errorMessage)
          let {WriteForm} = this
          WriteForm.name = res.data.name
          WriteForm.weburl = res.data.weburl
          WriteForm.admincode = res.data.admincode
          WriteForm.id = res.data.id

          // WriteForm.applytime = res.data.applytime
          WriteForm.counterpart = res.data.counterpart
          WriteForm.tenanttype = res.data.tenanttype

          WriteForm.leaseterm = res.data.leaseterm
          WriteForm.paycycle = res.data.paycycle
          WriteForm.payprice = res.data.payprice
          WriteForm.tenanttype = res.data.tenanttype

          WriteForm.starttime = res.data.starttime
          WriteForm.endtime = res.data.endtime
          WriteForm.tenanttype = res.data.tenanttype

          WriteForm.enable = res.data.enable
          WriteForm.submittime = res.data.submittime
          // WriteForm.submitter = res.data.submitter

          break
        default:
      }
    },
    // 处理添加&&编辑的提交按钮
    WriteSubInfo (handle) {
      switch (handle) {
        case '添加':
          // console.log("点击了添加提交按钮");
          // 发送添加请求
          this.$refs.WriteForm.validate(async valid => {
            if (!valid) return
            this.WriteLoading = true // 提交loading动画
            const res = await this.$axios.post(AddTenant, this.WriteForm)
            if (res.error) return this.$message.error(res.errorMessage)
            this.showWrite = false // 关闭添加窗口
            this.$message.success('添加成功！')
            this.getTableData1()
          })
          break

        case '编辑':
          // console.log("点击了修改提交按钮");
          // 发起请求拿到对应的进行编辑
          this.$refs.WriteForm.validate(async valid => {
            if (!valid) return
            this.WriteLoading = true // 开始loading动画
            const res = await this.$axios.post(EditTenant, this.WriteForm)
            if (res.error) return this.$message.error(res.errorMessage)
            this.showWrite = false // 关闭添加窗口
            this.getTableData1()
          })
          break
        default:
      }
      this.WriteLoading = false// 结束loading动画
    },
    // 处理删除事件按钮
    async handleDelete (index, row) { // 删除按钮处理事件
      const confirmResult = await this.$confirm(`您确定要删除 ${row.name} 资源吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除！')
      const res = await this.$axios.post(DeleteTenant, { id: row.id }) // 参数需要改
      if (res.error) return this.$message.error(res.error)
      this.$message.success('删除成功！')
      this.getTableData1() // 刷新列表数据
    },
    // 查看Tabs提交 子按钮
    handleSave (type) {
      switch (type) {
        case 'role':
          this.WriteLoading = true
          console.log('role')
          this.WriteLoading = false
          break

        case 'area':
          this.WriteLoading = true
          console.log('area')
          this.WriteLoading = false
          break

        case 'resource':
          this.WriteLoading = true
          console.log('resource')
          this.WriteLoading = false
          break

        default:
      }
    },
    // 返回按钮触发事件
    CloseView () {
      this.ViewTabIndex = '0'
      this.ViewRowId = 0
      this.showView = false
    },
    handleTabs () {
      if (this.ViewTabIndex === '0') { this.tabs0() }
      if (this.ViewTabIndex === '1') { this.tabs1() }
      if (this.ViewTabIndex === '2') { this.tabs2() }
      if (this.ViewTabIndex === '3') { this.tabs3() }
    },
    // 租户信息
    async tabs0 () {
      const res = await this.$axios.post(InfoAsync, { id: this.ViewRowId })
      if (res.error) return this.$message.error(res.errorMessage)
      this.TenantData.lessee = res.data
    },
    // 角色授权
    async tabs1 () {
    // 用于发送请求tabs1 的数据
      const res = await this.$axios.post(TenantIdlistRole, { id: this.ViewRowId, type: 1 })
      if (res.error) return this.$message.error(res.errorMessage)
      this.TenantData.role = res.data
    },
    // 区域授权
    async tabs2 () {
      const res = await this.$axios.post(ViewUserAuthorizedOrArea, { id: '08d80c4f-1229-e6f2-723d-b44a8db0434d', type: 3 })
      if (res.error) return this.$message.error(res.errorMessage)
      this.TenantData.area = res.data
    },
    // 资源授权
    async tabs3 () {
      // 用于发送请求tabs1 的数据
      const res = await this.$axios.post(TenantIdlistRole, { id: this.ViewRowId, type: 2 })
      if (res.error) return this.$message.error(res.errorMessage)
      this.TenantData.resources = res.data
    }
  },

  components: {
    layuiTitle
  },
  computed: {
    ...mapGetters(['UserInfo']),
    changeTitle () {
      if (this.WriteState === 'add') {
        return '添加'
      }
      return '编辑'
    }
  },
  watch: {
    showWrite (val) { // 监听启用事件
      if (!val) {
        this.WriteForm.enable = ''
        this.WriteForm.tenanttype = ''
      }
      // this.WriteForm.submitter = this.UserInfo.username
    }

  }
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
  .el-input{
    width: 220px;
  }
  .el-select{
    width:230px
  }
  /*谷歌*/
  /deep/ input::-webkit-outer-spin-button,
  /deep/ input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
  /*火狐*/
  /deep/ input[type="number"]{
    -moz-appearance: textfield;
  }
</style>
