<template>
    <div class="content">
      <div class="main" v-show="!showView && !showWrite">
        <el-button class="fr" style="padding-top: 0" size="" @click="openWrite(0)" icon="el-icon-plus" type="text">添加子系统</el-button>

        <el-table :data="list" v-loading="table1Loading" :tree-props="{children: 'child'}"
                  row-key="id" >
          <el-table-column prop="name" label="菜单名称" width="200" :show-overflow-tooltip="true" sortable></el-table-column>
          <el-table-column prop="menutype" label="系统类型" width="110" sortable :formatter="formatMenuType"></el-table-column>
          <el-table-column prop="enabled" label="是否启用" width="70" :formatter="formatEna"></el-table-column>
          <el-table-column prop="url" label="菜单地址" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button type="text" @click="handleDel(scope.$index, scope.row)">删除</el-button>
              <el-button type="text" @click="handle5(scope.$index, scope.row)">上移</el-button>
              <el-button type="text" @click="handle6(scope.$index, scope.row)">下移</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="center">
          <!--<el-pagination :current-page="currentPage" @current-change="getMenuListMore" background layout="prev, pager, next" :page-size="pageSize" :total="total"></el-pagination>-->
        </div>
      </div>

      <div class="wreite" v-show="showWrite">
        <layuiTitle :title="WriteState === 0 ? '添加子系统' : WriteState === 1 ? '添加菜单' : '编辑菜单'"></layuiTitle>
        <el-form :model="AddForm" :rules="AddRules" ref="AddForm">
          <el-row :gutter="50">
            <el-col :sm="12" :md="9">
              <el-form-item :label="!WriteState ? '系统名称：' : '菜单名称：'" prop="name">
                <el-input v-model="AddForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="9">
              <el-form-item label="菜单图标：">
                <el-select v-model="AddForm.icon" filterable @blur="selectBlur" placeholder="请选择菜单图标">
                  <el-option v-for="(item, index) in iconList" :key="index" :value="item">
                    <i :class="item" style="font-size: 20px"></i>
                    <span style="">{{ item }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :sm="12" :md="9">
              <el-form-item label="是否启用：">
                <el-switch v-model="AddForm.enabled" inactive-text="关闭" active-text="开启"></el-switch>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :md="9" v-if="WriteState === 1 || WriteState === 3">
              <el-form-item label="菜单地址：">
                <el-select v-model="AddForm.resourceid" filterable @blur="selectURL" placeholder="请选择菜单资源">
                  <el-option v-for="item in ResourceList" :key="item.id" :label="item.name" :value="item.id">
                    <span class="fl">{{ item.name }}</span>
                    <span class="fr" style="color: #8492a6; font-size: 13px">{{ item.url }}</span>
                  </el-option>
                </el-select>
              </el-form-item></el-col>
            <el-col :sm="12" :md="9" v-if="WriteState === 0 || WriteState === 2">
              <el-form-item label="系统类型：" prop="menutype">
                <el-radio v-model="AddForm.menutype" :label="1">手机</el-radio>
                <el-radio v-model="AddForm.menutype" :label="2">后台</el-radio>
                <el-radio v-model="AddForm.menutype" :label="3">微信</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="center">
          <el-button @click="SubAddMenu" v-show="WriteState <= 1 " :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
          <el-button @click="SubEditMenu" v-show="WriteState >= 2" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
          <el-button @click="CloseAdd" :disabled="table1Loading" :icon="table1Loading ? 'el-icon-loading' : 'el-icon-arrow-left'">返回</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import {MenuList, ResrouceList, AddMenu, EditMenu, DeleteMenu, MoveMenu} from 'api/api'
import {MENU_TYPE, ICON_LIST, RESOURCE_TYPE} from 'common/js/global'
import {_normalizeTreeData} from 'common/js/cache'
import layuiTitle from 'base/layui-title'
import {mapGetters} from 'vuex'

export default {
  name: 'MenuList',
  data () {
    return {
      query: '',
      page: 1,
      pageSize: 10,
      list: [],
      iconList: [],
      ResourceList: [],
      MenuList: [],
      table1Loading: false,
      isTop: false,
      SwitchLoading: false,

      showView: false,
      ViewDataLoading: false,
      ViewId: 0,
      ViewData: [],

      showWrite: false,
      WriteState: 0, // 0为顶级菜单,1为添加子级菜单,2为修改编辑(parentid为0),3为修改编辑(parentid不为0)
      WriteId: 0,

      AddForm: {
        id: '',
        name: '',
        menutype: 2,
        parentid: null,
        enabled: true,
        resourceid: '',
        icon: ''
      },
      AddRules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        resourceid: [{ required: true, message: '请选择菜单资源', trigger: 'change' }],
        menutype: [{ required: true, message: '请选择系统类型', trigger: 'change' }]
      }
    }
  },
  activated () {
    this.iconList = ICON_LIST
    this.getMenuList()
    this.getResrouceList()
  },
  methods: {
    getMenuList () {
      this.table1Loading = true
      this.$axios.post(MenuList, {
        page: 1,
        pagesize: this.pageSize
      }).then((res) => {
        this.table1Loading = false
        if (res.error) setTimeout(() => { this.getMenuList() }, 1000)
        res.data.sort((a, b) => {
          return b.sort - a.sort
        })
        this.list = _normalizeTreeData(res.data, 'id', 'parentid', 'child', null)
      })
    },
    getResrouceList () {
      this.$axios.post(ResrouceList, {
        resourcetype: 2,
        page: 1,
        pagesize: 1000
      }).then((res) => {
        if (res.error) {
          setTimeout(() => {
            return this.getResrouceList()
          }, 2000)
        }
        this.ResourceList = res.data
      })
    },
    formatEna (row) { return row.enabled ? '是' : '否' },
    formatMenuType (row) { return MENU_TYPE[row.menutype] },
    forResourceType (row) { return RESOURCE_TYPE[row.resourcetype] },

    openWrite (state, row) {
      this.showWrite = true
      this.WriteState = state
      if (row) {
        this.WriteId = row.id
      }
      if (state === 2) { // 编辑
        this.$axios.post()
      }
    },

    CloseAdd () {
      Object.assign(this.$data.AddForm, this.$options.data().AddForm)
      this.$refs.AddForm.clearValidate()
      this.showWrite = false
    },
    handleAdd (index, row) {
      this.showWrite = true
      this.WriteState = 1
      this.AddForm.parentid = row.id
    },
    SubAddMenu () {
      this.$refs.AddForm.validate((vali, msg) => {
        if (!vali) {
          this.$message.warning('请补全信息！')
        } else {
          if (this.WriteState === 0) this.AddForm.parentId = null
          let data = {
            name: this.AddForm.name,
            enabled: this.AddForm.enabled,
            icon: this.AddForm.icon
          }
          if (this.WriteState === 1) {
            data = Object.assign({}, data, {
              parentid: this.AddForm.parentid,
              resourceid: this.AddForm.resourceid
            })
          }
          if (this.WriteState === 0) {
            data = Object.assign({}, data, {
              menutype: parseInt(this.AddForm.menutype)
            })
          }
          this.table1Loading = true
          this.$axios.post(AddMenu, data).then((res) => {
            this.table1Loading = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('菜单添加成功！')
              this.getMenuList()
              this.showWrite = false
              Object.assign(this.$data.AddForm, this.$options.data().AddForm)
            }
          }).catch(() => {
            this.table1Loading = false
          })
        }
      })
    },

    handleEdit (index, row) {
      this.showWrite = true
      if (row.parentid === '00000000-0000-0000-0000-000000000000' || row.parentid === null) {
        this.WriteState = 2
      } else {
        this.WriteState = 3
      }
      this.AddForm = {
        id: row.id,
        name: row.name,
        menutype: row.menutype,
        enabled: row.enabled,
        resourceid: row.resourceid,
        icon: row.icon,
        parentid: row.parentid
      }
    },
    SubEditMenu () {
      this.$refs.AddForm.validate((vali, msg) => {
        if (!vali) {
          this.$message.warning('请补全信息！')
        } else {
          if (this.WriteState === 2) this.AddForm.parentId = null
          let data = {
            id: this.AddForm.id,
            name: this.AddForm.name,
            enabled: this.AddForm.enabled,
            icon: this.AddForm.icon
          }
          if (this.WriteState === 2) {
            data = Object.assign({}, data, {
              menutype: this.AddForm.menutype
            })
          }
          if (this.WriteState === 3) {
            data = Object.assign({}, data, {
              parentid: this.AddForm.parentid,
              resourceid: this.AddForm.resourceid
            })
          }
          this.table1Loading = true
          this.$axios.post(EditMenu, data).then((res) => {
            this.table1Loading = false
            this.isTop = false
            if (res.error) {
              this.$message.error(res.errorMessage)
            } else {
              this.$message.success('修改成功！')
              this.showWrite = false
              this.getMenuList()
              Object.assign(this.$data.AddForm, this.$options.data().AddForm)
            }
          })
        }
      })
    },
    handleDel (index, row) {
      this.$confirm(`确认删除${row.name}菜单？`, '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post(DeleteMenu, {
          id: row.id
        }).then((res) => {
          if (res.error) return false
          this.$message.success('删除成功')
          this.getMenuList()
        })
      })
    },
    async handle5 (index, row) {
      this.table1Loading = true
      const res = await this.$axios.post(MoveMenu, { id: row.id, type: 1 })
      if (res.error) {
        this.$message.error(res.errorMessage)
        this.table1Loading = false
        return
      }
      this.$message.success('上移成功！')
      this.table1Loading = false
      this.getMenuList()
      this.$emit('RefreshNav')
    },
    async handle6 (index, row) {
      this.table1Loading = true
      const res = await this.$axios.post(MoveMenu, {id: row.id, type: 2})
      if (res.error) {
        this.$message.error(res.errorMessage)
        this.table1Loading = false
        return
      }
      this.$message.success('下移成功！')
      this.table1Loading = false
      this.getMenuList()
      this.$emit('RefreshNav')
    },
    changeSwitch (index, row) {
      this.SwitchLoading = true
      setTimeout(() => {
        this.$message.success(`资源id：${row.id}，已${row.isEnabled ? '开启' : '关闭'}`)
        this.SwitchLoading = false
      }, 1000)
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    selectBlur (e) {
      this.AddForm.icon = e.target.value
    },
    selectURL (e) {
      this.AddForm.resourceid = e.target.value
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
  @import url('../../../common/css/mixin.css');
</style>
