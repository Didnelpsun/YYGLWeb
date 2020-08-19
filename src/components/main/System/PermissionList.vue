<template>
  <div class="content">
    <div class="main" v-show="!showView && !showWrite">
      <el-form :model="query">
        <el-row>
          <el-col :span="18">
            <el-col :span="8">
              <el-form-item label="资源名称：">
                <el-input v-model="query.name" :readonly="tableLoading" @input="Search"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资源地址：">
                <el-input v-model="query.url" :readonly="tableLoading" @input="Search"></el-input>
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="6">
            <div class="fr" style="margin-top: 0"><el-button @click="ResetQuery" icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableData" v-loading="tableLoading" :tree-props="{children: 'child'}" row-key="id" style="margin-top: 15px;">
        <el-table-column prop="name" label="资源名称" width="150" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="resourcetype" label="资源类型" width="70" :formatter="formatResType"></el-table-column>
        <el-table-column prop="menutype" label="平台类型" width="70" :formatter="formatMenuType"></el-table-column>
        <el-table-column prop="enabled" label="是否启用" width="70"><template slot-scope="scope">{{formatToF(scope.row.isenabled)}}</template></el-table-column>
        <el-table-column prop="url" label="资源路径" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="handleWrite( 1,scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="center">
        <!--<el-pagination @current-change="getMore" @size-change="changeSize1" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="total"
                       background layout="total, prev, pager, next, sizes">
        </el-pagination>-->
      </div>
    </div>

    <div class="View" v-show="showView">
      <layuiTitle title="查看资源信息"></layuiTitle>
      <el-form class="clearfix" :model="ViewData">
        <el-col :sm="12" :md="9">
          <el-form-item label="资源名称：">{{ViewData.name}}</el-form-item>
        </el-col>
        <el-col :sm="12" :md="9">
          <el-form-item label="资源地址：">{{ViewData.url}}</el-form-item>
        </el-col>
        <el-col :sm="12" :md="9">
          <el-form-item label="资源类型：">{{formatResType(ViewData)}}</el-form-item>
        </el-col>
        <el-col :sm="12" :md="9">
          <el-form-item label="是否启用：">{{formatToF(ViewData.isenabled)}}</el-form-item>
        </el-col>
        <el-col :sm="12" :md="9">
          <el-form-item label="备注：">{{ViewData.remarks}}</el-form-item>
        </el-col>
        <el-col :sm="12" :md="9">
          <el-form-item label="提交时间：">{{ViewData.createtime}}</el-form-item>
        </el-col>
        <el-col :sm="12" :md="9">
          <el-form-item label="提交人：">{{ViewData.createtime}}</el-form-item>
        </el-col>

      </el-form>
      <div class="center">
        <el-button @click="showView = false" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <div class="write" v-show="showWrite">
      <layuiTitle :title=" WriteState===0 ? '添加资源' : '修改资源'"></layuiTitle>
      <el-form :model="WriteData" :rules="Rules" ref="WriteForm">
        <el-row>
          <el-col :sm="12" :md="9">
            <el-form-item label="资源名称：" prop="name">
              <el-input v-model="WriteData.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="资源地址：" prop="url">
              <el-input v-model="WriteData.url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="资源类型：" prop="resourcetype">
              <el-select v-model="WriteData.resourcetype" placeholder="请选择资源类型">
                <el-option v-for="item in ResourceType" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="是否启用：">
              <el-switch v-model="WriteData.isenabled" active-text="是" inactive-text="否"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :sm="12" :md="9">
            <el-form-item label="所属菜单：" prop="menuname">
              <el-input v-model="WriteData.menuname" placeholder="请选择所属菜单" disabled>
                <el-button @click="openMenuTree" slot="append">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12" :md="9">
            <el-form-item label="备注：">
              <el-input v-model="WriteData.remarks" type="textarea" maxlength="300"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="center">
        <el-button v-show="WriteState === 0" @click="WriteAddSub" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-check'">添加</el-button>
        <el-button v-show="WriteState === 1" @click="WriteEditSub" :disabled="WriteLoading" :icon="WriteLoading ? 'el-icon-loading' : 'el-icon-edit'">编辑</el-button>
        <el-button @click="WriteClose" icon="el-icon-arrow-left">返回</el-button>
      </div>
    </div>

    <MenuTree :showCheckBox="true" :checkStrictly="true" :isRadio="true" :expandAll="true" @Confirm="ConfirmMenu" ref="MenuTree"></MenuTree>
  </div>
</template>

<script>
import {ResrouceList, AddResource, ResourceInfo, EditResource, DelResource} from 'api/api'
import {RESOURCE_TYPE, MENU_TYPE} from 'common/js/global'
import {_normalizeTreeData, debounce} from 'common/js/cache'
import {mapGetters} from 'vuex'
import layuiTitle from 'base/layui-title'
import MenuTree from 'base/MenuTree'

export default {
  name: 'ResourceList',
  data () {
    return {
      RESOURCE_TYPE: [],
      query: {
        isenabled: '',
        resourcetype: '',
        name: '',
        url: ''
      },
      tableData: [],
      List: [],
      tableLoading: false,
      pageSize: 10,
      currentPage: 1,
      total: 1,
      ResourceType: [
        {
          name: '页面',
          id: 1
        }, {
          name: '菜单',
          id: 2
        }, {
          name: '接口',
          id: 3
        }],
      MenuList: [],

      showView: false,
      ViewData: {},

      showWrite: false,
      WriteState: 0, // 0为添加，1为编辑
      WriteId: 0,
      WriteData: {
        name: '',
        url: '',
        resourcetype: 1,
        remarks: '',
        isenabled: true,
        menuid: '',
        menuname: ''
      },
      WriteLoading: false,
      Rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        url: [{ required: false, message: '请输入资源地址', trigger: 'blur' }],
        menu: [{ required: true, message: '请选择资源菜单', trigger: 'blur' }],
        resourcetype: [{ required: true, message: '请选择资源类型', trigger: 'change' }],
        menuname: [{ required: true, message: '请选择所属菜单', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.RESOURCE_TYPE = RESOURCE_TYPE.slice(1)
    this.getTableList()
  },
  methods: {
    ResetQuery () { Object.assign(this.$data.query, this.$options.data().query) },
    ResetWriteData () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      // this.$refs.MenuTree.MenuTree.setCheckedKeys([])
    },
    getTableList () {
      this.tableLoading = true
      this.$axios.post(ResrouceList, {
        page: 1,
        pageSize: this.pageSize
      }).then((res) => {
        this.tableLoading = false
        if (res.error) {
          setTimeout(() => {
            this.getTableList()
          }, 10000)
        } else {
          this.tableData = _normalizeTreeData(res.data, 'id', 'parentid', 'child', null)
          this.List = this.tableData
        }
      })
    },
    getMore (page) {
      this.currentPage = page
      this.tableLoading = true
      this.$axios.post(ResrouceList, {
        page: page,
        pageSize: this.pageSize
      }).then((res) => {
        this.tableLoading = false
        if (res.error) {
          setTimeout(() => {
            this.getMore(page)
          }, 1000)
        } else {
          this.tableData = _normalizeTreeData(res.data, 'id', 'parentid', 'child', null)
        }
      })
    },
    changeSize1 (n) {
      this.pageSize = n
      this.getMore(this.currentPage)
    },
    formatMenuType (row) { return MENU_TYPE[row.menutype] },
    formatResType (row) { return row.resourcetype === 1 ? '页面' : row.resourcetype === 2 ? '菜单' : '接口' },
    formatToF (item) { return item ? '是' : '否' },
    formatIE (row) { return row.isenabled ? '是' : '否' },

    handleWrite (state, index, row) {
      this.showWrite = true
      this.WriteState = state
      if (state === 1) { // 编辑逻辑
        this.WriteId = row.id
        this.ResetWriteData()
        this.$axios.post(ResourceInfo, {
          id: row.id
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.WriteData = {
              name: res.data.name,
              url: res.data.url,
              resourcetype: res.data.resourcetype,
              isenabled: res.data.isenabled,
              remarks: res.data.remarks,
              menuid: res.data.menuid,
              menuname: res.data.menuname
            }
          }
        })
      }
    },
    WriteClose () {
      this.showWrite = false
      if (this.WriteState === 1) {
        this.ResetWriteData()
      }
    },
    WriteAddSub () {
      this.$refs.WriteForm.validate((valid) => {
        if (!valid) {
          this.$message.error('验证错误，请重新填写信息。')
        } else {
          this.WriteLoading = true
          this.$axios.post(AddResource, this.WriteData).then((res) => {
            console.log('asdasdasdasd')
            this.WriteLoading = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('添加成功！')
              this.showWrite = false
              this.getMore(this.currentPage)
              this.ResetWriteData()
            }
          }).catch((err) => {
            this.$message.error(err.data.title)
            this.WriteLoading = false
          })
        }
      })
    },
    WriteEditSub () {
      this.$refs.WriteForm.validate((valid) => {
        if (!valid) {
          this.$message.error('验证错误，请重新填写信息。')
        } else {
          this.WriteLoading = true
          this.$axios.post(EditResource, Object.assign({}, this.WriteData, {
            id: this.WriteId
          })).then((res) => {
            this.WriteLoading = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('编辑成功！')
              this.showWrite = false
              this.getMore(this.currentPage)
              this.ResetWriteData()
            }
          })
        }
      })
    },
    openMenuTree () {
      this.$refs.MenuTree.open([this.WriteData.menuid])
      console.log(this.$refs.MenuTree)
      // this.$refs.MenuTree.setCheckedKeys([this.WriteData.menuid])
    },
    ConfirmMenu (data) {
      this.WriteData.menuid = data[0].id
      this.WriteData.menuname = data[0].name
    },
    handleView (index, row) {
      console.log(index, row)
      this.showView = true
      this.$axios.post(ResourceInfo, {
        id: row.id
      }).then((res) => {
        if (res.error) this.handleView(index, row)
        this.ViewData = res.data
      })
    },
    handleDelete (index, row) {
      this.$confirm(`您确定要删除 ${row.name} 资源吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.post(DelResource, {
          id: row.id
        }).then((res) => {
          if (res.error) {
            this.$message.error(res.errorMessage)
          } else {
            this.$message.success('删除成功!')
            this.getTableList()
            this.currentPage = 1
          }
        })
      })
    },
    Search: debounce(function () { // 热搜索
      let name = this.query.name
      let url = this.query.url
      this.tableData = this.List.filter(item =>
        item.name.toLowerCase().includes(name.toLowerCase()) && item.url.toLowerCase().includes(url.toLowerCase())
      )
    }, 200)
  },
  computed: {
    ...mapGetters(['UserInfo'])
  },
  watch: {
    'WriteData.resourcetype': function (val) {
      if (val === 2) {
        this.Rules.menuname[0].required = false
      } else {
        this.Rules.menuname[0].required = true
      }
    }
  },
  components: {
    layuiTitle,
    MenuTree
  }
}
</script>

<style scoped>
  @import url(../../../common/css/mixin.css);
</style>
