<template>
  <div class="content">
    <div class="main" v-show="!showWrite">
          <el-form :data="query" ref="NodeQueryForm">
            <el-row>
              <el-col :span="18">
                <el-col :span="8">
                  <el-form-item label="表名：">
                    <el-input v-model="query.tablename"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="字段名：">
                    <el-input v-model="query.fieldname"></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="6">
                <div class="fr" style="margin-top: 0">
                  <el-button type="primary" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-search'" @click="getMore(1)">查询</el-button>
                  <el-button type="primary" icon="el-icon-refresh" @click="resetQueryForm">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

      <el-row>
        <el-col :span="4" class="SearchResult">查询结果</el-col>
        <el-col :offset="2" :span="18" class="fr">
          <div class="fr">
            <el-button @click="handleWrite(0)" type="success" icon="el-icon-plus">新增</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="tableList" v-loading="Loading" style="margin-top: 15px;">
        <el-table-column label="序号" width="50"><template slot-scope="scope">{{scope.$index+(pagination.currentPage - 1) * pagination.pageSize + 1}}</template></el-table-column>
        <el-table-column prop="tablename" label="表名" width="150"></el-table-column>
        <el-table-column prop="fieldname" label="字段名" width="150"></el-table-column>
        <!-- <el-table-column prop="requireds" label="是否必要" width="120"></el-table-column> -->
        <el-table-column prop="remarks" label="填写规范" width=""></el-table-column>
        <el-table-column prop="createusername" label="创建人" width="150"></el-table-column>
        <el-table-column prop="createtime" label="创建时间" width="100"></el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleWrite(2, scope.row)">详情</el-button>
            <el-button type="text" size="mini" @click="handleWrite(1, scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="center">
        <el-pagination @current-change="getMore" @size-change="changeSize" :current-page="pagination.currentPage"
                       :page-sizes="[10, 20, 50, 100]" :page-size="pagination.pageSize" :total="pagination.total"
                       background layout="total, prev, pager, next, sizes"></el-pagination>
      </div>
    </div>

    <div v-show="showWrite">
      <layuiTitle :title="WriteState === 0 ? '添加页面规范配置' : WriteState === 1 ? '编辑页面规范配置' : '页面规范配置详情'"></layuiTitle>
          <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="80"/>
            <col width="150"/>
            <!-- <col width="250"/> -->
            <col width="200"/>
          </colgroup>
          <thead>
          <tr>
            <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
            <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
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
              <col width="80"/>
              <col width="150"/>
              <!-- <col width="250"/> -->
              <col width="200"/>
            </colgroup>
            <tbody>
            <!--表名-->
            <tr class="el-table__row el-table__row--striped">
              <td><div class="cell"><i class="must">*</i>表名</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.tablename}}</div>
                  <div v-show="WriteState !== 2">
                    <el-input v-model="tableData.tablename" placeholder="请输入表名"></el-input>
                  </div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--字段名-->
            <tr class="el-table__row el-table__row--striped">
              <td>
                <div class="cell"><i class="must">*</i>字段名</div>
              </td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.fieldname}}</div>
                  <div v-show="WriteState !== 2" >
                    <el-input v-model="tableData.fieldname" placeholder="请输入字段名"></el-input>
                  </div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--是否必须-->
            <tr class="el-table__row el-table__row--striped">
              <td><div class="cell"><i class="must">*</i>是否必须</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.requireds===true?'是':'否'}}</div>
                  <el-form-item label-width="0" class="form-item" v-show="WriteState !== 2">
                    <el-select class="tableSelect" v-model="tableData.requireds" placeholder="请选择是否必须">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="是" :value="true"></el-option>
                      <el-option label="否" :value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--填写规范-->
            <tr class="el-table__row el-table__row--striped">
              <td><div class="cell">填写规范</div></td>
              <td>
                <div class="cell">
                  <div v-show="WriteState == 2">{{tableData.remarks}}</div>
                  <div v-show="WriteState !== 2">
                    <el-input type="textarea" v-model="tableData.remarks" placeholder="请输入填写规范" :rows="2"></el-input>
                  </div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--创建人-->
            <tr v-show="WriteState == 2" class="el-table__row el-table__row--striped">
              <td><div class="cell">创建人</div></td>
              <td>
                <div class="cell">
                  <div>{{tableData.createusername}}</div>
                </div>
              </td>
              <!-- <td>
                <div class="cell" v-show="WriteState === 1">{{tableData.name}}</div>
              </td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--创建时间-->
            <tr v-show="WriteState == 2" class="el-table__row el-table__row--striped">
              <td>
                <div class="cell">创建时间</div>
              </td>
              <td>
                <div class="cell">
                  <div>{{tableData.createtime}}</div>
                </div>
              </td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
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
    </div>
  </div>
</template>

<script>
import layuiTitle from 'base/layui-title'
import { GetPageSpecificationList, GetPageSpecificationInfo, DelPageSpecification, AddPageSpecification, UpdatePageSpecification } from 'api/api'
import { GlobalRes } from 'common/js/mixins'

export default {
  name: 'Battery',
  // 合并对象，必须以文件名:[导出对象名]的格式
  mixins: [GlobalRes],
  data () {
    return {
      // 查询相关属性
      query: {
        tablename: '',
        fieldname: ''
      },
      // 加载
      Loading: false,
      WriteLoading: false,
      isShow: false,
      tableList: [
      ],
      tableData: {
        tablename: '',
        fieldname: '',
        requireds: '',
        remarks: '',
        createusername: '',
        createtime: ''
      },
      // 分页相关属性
      pagination: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      showWrite: false,
      WriteState: 0, // 0为添加 1为编辑 2为查看
      // 表单验证
      Rules: {
        tablename: [
          { required: true, message: '请输入表名', trigger: 'blur' }
        ],
        fieldname: [
          { required: true, message: '请输入字段名', trigger: 'blur' }
        ],
        requireds: [
          { required: true, message: '请选择是否为必须', trigger: 'blur' }
        ]
      }
    }
  },
  activated () {
    // this.check(AreaList)
    this.getMore(1)
  },
  created () {
  },
  methods: {
    // writeDic: GlobalRes.methods.writeDic,
    getMore (e) {
      this.Loading = true
      this.pagination.currentPage = e
      this.$axios.get(GetPageSpecificationList,
        {
          params: {
            pageIndex: e,
            pageSize: this.pagination.pageSize,
            tablename: this.query.tablename,
            fieldname: this.query.fieldname
          }
        })
        .then(res => {
          this.Loading = false
          this.tableList = res.data.list
          this.pagination.total = res.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 重置表单按钮
    resetQueryForm () {
      Object.assign(this.$data.query, this.$options.data().query)
      this.getMore(1)
    },
    // 分页处理函数
    changeSize (page) {
      this.pagination.pageSize = page
      this.getMore(this.pagination.currentPage)
    },
    // 处理编辑函数
    handleWrite (state, row) {
      this.WriteLoading = true
      if (this.$data.tableData !== null || this.$data.tableData !== undefined) {
        Object.assign(this.$data.tableData, this.$options.data().tableData)
      }
      this.WriteState = state
      if (state === 0) this.showWrite = true
      if (state) {
        this.$axios.get(GetPageSpecificationInfo, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.error !== true) {
            this.showWrite = true
            try {
              this.tableData = res.data
            } catch (e) {
              console.log(e)
            }
          } else { this.$message.error('查询详情失败') }
        })
      }
      this.WriteLoading = false
    },
    handleDelete (row) {
      this.$confirm(`您确定要删除 ${row.code} 设备吗？`, '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.delete(DelPageSpecification, {
          params: {
            id: row.id
          }
        }).then(res => {
          if (res.errorCode === '200') {
            this.getMore(this.pagination.currentPage)
            this.$message.success('删除成功！')
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    // 提交函数
    subData () {
      if (this.WriteState === 0) this.add()
      if (this.WriteState === 1) this.edit()
    },
    // 添加提交
    async add () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.post(AddPageSpecification, this.tableData)
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
    // 修改提交
    async edit () {
      this.$refs.tableForm.validate(async (valid, msg) => {
        try {
          this.WriteLoading = true
          const res = await this.$axios.put(UpdatePageSpecification, this.tableData)
          this.WriteLoading = false
          if (res.error === true) {
            this.$message.warning('请补全信息')
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
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.showWrite = !this.showWrite
      this.getMore(1)
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url('./../../../common/css/mixin.css');
</style>
