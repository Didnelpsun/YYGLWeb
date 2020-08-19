<template>
  <div class="write" >
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small" v-loading="WriteLoading">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="120"/>
            <col width="100"/>
            <col width="50"/>
            <!-- <col width="400"/> -->
            <col width="100"/>
          </colgroup>
          <thead>
          <tr>
            <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
            <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">照片</div></th>
            <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
            <th colspan="1" rowspan="1" class="el-table_8_column_64     table-headerStyle"><div class="cell">填写要求</div></th>
          </tr>
          </thead>
        </table>
      </div>
      <!--表体-->
      <el-form :model="WriteData" :rules="Rules" ref="WriteForm" label-width="0" :show-message="false">
        <div class="el-table__body-wrapper is-scrolling-none">
          <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
            <colgroup>
              <col width="120"/>
              <col width="100"/>
              <col width="50"/>
              <!-- <col width="400"/> -->
              <col width="100"/>
            </colgroup>
            <tbody>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>系统编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="systemcode">
                  <el-input v-model="WriteData.systemcode"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.systemcode}}</div></td>
              <td @click="OpenImgBox(1)"><div class="cell">{{ImgList1.length}}</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <!--系统名称-->
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>系统名称</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="systemname">
                  <el-input v-model="WriteData.systemname"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.systemname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState!==2">
              <td><div class="cell"><i class="must">*</i>所属资源站点</div></td>
              <td><div class="cell" @click="isShow = true">
                <el-form-item class="form-item" prop="resourcename">
                  <el-input v-model="WriteData.resourcename" readonly placeholder="请选择"></el-input>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState===2">
              <td><div class="cell"><i class="must">*</i>资源站点名称</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.resourcename}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState===2">
              <td><div class="cell">资源站点编码</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.resourcecode}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">产权单位</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-select v-model="WriteData.propertyrightunit" placeholder="请选择" size="small">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="i in DicList.propertyrightunit" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.propertyrightunitname}}</div></td>

              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.propertyrightunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">备注</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="remark">
                  <el-input v-model="WriteData.remark"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.remark}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">创建人</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createname}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">创建时间</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createtime}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            </tbody>
          </table>
        </div>
      </el-form>
    </div>
    <div class="center" style="padding-bottom: 10px">
      <el-button v-show="WriteState !==2" @click="SubWrite" :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-check'">提交</el-button>
      <el-button @click="WriteClose" type="primary" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <el-dialog top="1%" :visible.sync="isShow" width="80%" :before-close="DetailhandleClose">
      <ResourceList :resourcetype="2" @selectResource="selectResource"/>
    </el-dialog>
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ResourceList from 'base/Resource/ResourceList'
import {GetEnergyListAsync, AddOperatorSite, UpdateOperatorSite} from 'api/api'

export default {
  mixins: [GlobalRes],
  name: 'Details',
  props: {
    WriteData: {
      // type: Object,
      default () {
        return {}
      }
    },
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
    },
    // 运营商站点图片列表
    ImgList1: {
      type: Array,
      default () {
        return []
      }
    },
    DicList: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      resList: [],
      Loading: false,
      WriteLoading: false,
      ResourceChoose: false,
      isShow: false,
      WriteDatas: {
        AreaList: [],
        imglist: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        operatorsitecode: '', // 系统编码
        operatorsitename: '', // 系统名称
        openingdate: '', // 开通日期
        propertyrightunit: '', // 设备产权单位
        lifecycle: '', // 生命周期
        resource_id: '',
        resourcename: '',
        id: ''
      },
      // 表单验证
      Rules: {
        // resourcename: [{ required: true, message: '请选择所属站点', trigger: 'blur' }],
        operatorsitecode: [
          { required: true, message: '请输入系统编码', trigger: 'change' }
        ],
        operatorsitename: [
          { required: true, message: '请输入系统名称', trigger: 'blur' }
        ]
      }
    }
  },
  activated () {
  },
  methods: {
    OpenImgBox (val) {
      // console.log(val)
      this.$emit('fatherOpenImgBox', val)
    },
    querySearchAsync (query) {
      console.log('query', query)
      if (!query.length) return
      this.$axios.get(GetEnergyListAsync, {
        params: {
          name: query,
          PageIndex: 1,
          PageSize: 10000
        }
      }).then((res) => {
        if (res.errorCode === '200') {
          this.resList = res.data.list
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    _normalizeAreaLevel (list) {
      for (let i in list) {
        if (list[i].leveltype >= 3) list[i].leaf = true
      }
      return list
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      if (!this.WriteData.resourcename) {
        return this.$message.error('请选择所属站点')
      }
      if (!this.ImgList1.length) {
        return this.$message.warning('系统编码图片必须上传')
      }
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.WriteData.operatorsitetype = 2
          this.$axios.post(AddOperatorSite, this.WriteData).then(res => {
            this.WriteLoading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.$emit('fatheretMore')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            this.Loading = false
            console.log(err)
          })
        }
      })
    },
    SubEdit () {
      if (!this.WriteData.resourcename) {
        return this.$message.error('请选择所属站点')
      }
      if (!this.ImgList1.length) {
        return this.$message.warning('运营商站点编码图片必须上传')
      }
      this.$refs.WriteForm.validate(vali => {
        if (!vali) {
          this.$message.error('请补全信息！')
        } else {
          this.WriteLoading = true
          this.$axios.put(UpdateOperatorSite, this.WriteData).then(res => {
            this.WriteLoading = false
            if (res.errorCode === '200') {
              this.$message.success('编辑成功!')
              this.$emit('fatheretMore')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    },
    ResetWrite () {
      Object.assign(this.WriteData, this.$options.data().WriteDatas)
      this.$nextTick(() => {
        this.$refs.WriteForm.clearValidate()
      })
      // this.setArea([])
    },
    selectResource (name, id) {
      this.isShow = false
      this.WriteData.resource_id = id
      this.WriteData.resourcename = name
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
