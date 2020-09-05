<template>
  <div class="write" style="margin:15px">
    <layuiTitle title="发电记录审核详情"></layuiTitle>
    <div class="el-table el-table--striped el-table--enable-row-hover el-table--border el-table--enable-row-transition el-table--small">
      <!--表头-->
      <div class="el-table__header-wrapper">
        <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" width="100%">
          <colgroup>
            <col width="80"/>
            <col width="100"/>
            <!-- <col width="400"/> -->
            <col width="100"/>
          </colgroup>
            <thead>
              <tr>
                <th colspan="1" rowspan="1" class="el-table_8_column_60     table-headerStyle"><div class="cell">字段</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_61     table-headerStyle"><div class="cell">属性</div></th>
                <th colspan="1" rowspan="1" class="el-table_8_column_62     table-headerStyle"><div class="cell">地图</div></th>
                <!-- <th colspan="1" rowspan="1" class="el-table_8_column_63     table-headerStyle"><div class="cell">字典</div></th> -->
              </tr>
              </thead>
            </table>
          </div>
          <!--表体-->
          <el-form :model="AuitData" :rules="Rules" ref="tableForm" v-loading="WriteLoading">
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" width="100%">
              <colgroup>
            <col width="80"/>
            <col width="100"/>
            <!-- <col width="400"/> -->
            <col width="100"/>
              </colgroup>
              <tbody>
              <tr class="el-table__row">
                <td><div class="cell">派单时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.sendsingletime}}</div>
                  </div>
                </td>
                <td rowspan="9">
                  <iframe id="show-iframe" :src="src" ref="iframe" width="100%"></iframe>
                  <div class="center cell" v-show="!isShow" style="margin: 0;">
                    <el-button @click="showauditData" type="primary" icon="el-icon-check">审核</el-button>
                    <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">开始时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.begintime}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">开始照片</div></td>
                <td @click="OpenImgBox(1)">
                  <div class="cell">
                    <div>{{ImgList1.length}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">开始位置偏差</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.startkm}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">电压</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.power}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">频率</div></td>
                <td>
                  <div class="cell">
                    <div></div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">来电时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.powerstarttime}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">结束时间</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.endtime}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">结束照片</div></td>
                <td @click="OpenImgBox(2)">
                  <div class="cell">
                    <div>{{ImgList2.length}}</div>
                  </div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td><div class="cell">结束位置偏差</div></td>
                <td>
                  <div class="cell">
                    <div>{{tableData.endkm}}</div>
                  </div>
                </td>
                <td>
                </td>
              </tr>
       <!--提交人-->
       <tr class="el-table__row" v-show="isShow">
         <td><div class="cell">提交人</div></td>
         <td>
           <div class="cell">
             <div>{{tableData.applicantname}}</div>
           </div>
         </td>
         <td></td>
       </tr>
       <tr class="el-table__row" v-show="isShow">
         <td><div class="cell">提交时间</div></td>
         <td>
           <div class="cell">
             <div>{{tableData.applytime}}</div>
           </div>
         </td>
         <td></td>
       </tr>
      <tr class="el-table__row" v-show="isShow">
          <td><div class="cell"><i class="must">*</i>发电时长</div></td>
            <td>
              <div class="cell">
                 <el-form-item label-width="0" prop="powertime" class="form-item">
                   <el-input v-model="AuitData.powertime" placeholder="请填入发电时长" type="textarea" :rows="2"></el-input>
               </el-form-item>
             </div>
           </td>
         <td></td>
       </tr>
       <tr class="el-table__row" v-show="isShow">
         <td><div class="cell"><i class="must">*</i>审核状态</div></td>
         <td>
           <div class="cell">
             <el-form-item label-width="0" prop="assistantstate" class="form-item">
               <el-select class="tableSelect" v-model="AuitData.assistantstate" placeholder="请选择审核状态">
                 <el-option key="4" label="通过" :value="4"></el-option>
                 <el-option key="3" label="不通过" :value="3"></el-option>
               </el-select>
             </el-form-item>
           </div>
         </td>
         <td></td>
       </tr>
       <tr class="el-table__row" v-show="isShow">
         <td><div class="cell">审核意见</div></td>
         <td>
           <div class="cell">
             <el-form-item label-width="0" prop="auditopinion" class="form-item">
               <el-input v-model="AuitData.auditopinion" placeholder="请填入审核意见" type="textarea" :rows="2"></el-input>
             </el-form-item>
           </div>
         </td>
         <td></td>
       </tr>
            </tbody>
            </table>
          </div>
        </el-form>
      </div>
    <div class="center" v-show="isShow" style="padding-bottom: 100px">
      <el-button @click="auditData" type="primary" icon="el-icon-check">提交审核</el-button>
      <el-button @click="closeWrite" type="primary" icon="el-icon-back">返回</el-button>
    </div>
  </div>
</template>

<script>
// import { AddEngine, EditEngine } from 'api/YJGL'
import { PowerInfoAudit } from 'api/YJGL'
import layuiTitle from 'base/layui-title'
import {GlobalRes} from 'common/js/mixins'

export default{
  name: 'PowerRecordInfoAudit',
  mixins: [GlobalRes],
  data () {
    return {
      src: './../static/GoogleMap/fourGoogleMap.html',
      iframeWin: {},
      WriteLoading: false,
      ImgList1: [], // 开始照片
      ImgList2: [], // 结束照片
      // 新增表格相关属性
      tableData: {
        id: '',
        imglist: [],
        modulecode: '',
        swver: '',
        applicanttype: 0,
        applicantname: '',
        applytime: ''
      },
      AuitData: {
        assistantstate: null,
        auditopinion: '',
        powertime: null
      },
      isShow: false,
      // 表单验证
      Rules: {
        assistantstate: [
          { required: true, message: '请选择审核状态', trigger: 'blur' }
        ],
        powertime: [
          { required: true, pattern: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/, message: '请填入发电时长', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showauditData () {
      this.isShow = true
    },
    LoadMap () {
      this.iframeWin = this.$refs.iframe.contentWindow
      const oIframe = document.getElementById('show-iframe')
      const deviceHeight = document.documentElement.clientHeight
      oIframe.style.height = deviceHeight * 0.7 + 'px'
      let parmas = {
        lonlatArr: [],
        type: 0
      }
      const obj1 = {
        longitude: this.tableData.longitude,
        latitude: this.tableData.latitude
      }
      const obj2 = {
        enginelongitude: this.tableData.enginelongitude,
        enginelatitude: this.tableData.enginelatitude
      }
      const obj3 = {
        powerpositionlongitude: this.tableData.powerpositionlongitude,
        powerpositionlatitude: this.tableData.powerpositionlatitude
      }
      const obj4 = {
        beginlongitude: this.tableData.beginlongitude,
        beginlatitude: this.tableData.beginlatitude
      }
      parmas.lonlatArr.push(obj1)
      parmas.lonlatArr.push(obj2)
      parmas.lonlatArr.push(obj3)
      parmas.lonlatArr.push(obj4)
      this.iframeWin.postMessage(parmas, '*')
    },
    setWriteData (data) {
      this.tableData = data
      this.setImgList(data.imglist)
      console.log('准备执行地图')
      this.LoadMap()
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => {
        return i.field_name === 'beginphoto'
      })
      this.ImgList2 = list.filter(i => {
        return i.field_name === 'endphoto'
      })
    },
    OpenImgBox (val) {
      if (val === 1) this.$emit('fatherOpenImgBox', '开始照片', 'beginphoto', this.ImgList1)
      if (val === 2) this.$emit('fatherOpenImgBox', '结束照片', 'endphoto', this.ImgList2)
    },
    auditData () {
      this.$refs.tableForm.validate((vali, msg) => {
        if (!vali) {
          return this.$message.error('请补全信息！')
        } else {
          if (this.AuitData.assistantstate === 3 && this.AuitData.auditopinion === '') {
            return this.$message.warning('请填写审核意见')
          }
          this.$axios.put(PowerInfoAudit, {
            id: this.tableData.id,
            powertime: this.AuitData.powertime,
            assistantstate: this.AuitData.assistantstate,
            auditopinion: this.AuitData.auditopinion
          }).then(res => {
            if (res.success === false) {
              this.$message.error(res.msg)
            }
            if (res.success === true) {
              this.$message.success('审核成功！')
              this.closeWrite()
            }
          }).catch(error => {
            console.log(error)
          })
        }
      })
    },
    // 返回关闭编辑函数
    closeWrite () {
      this.$refs.tableForm.clearValidate() // 初始化表单校验
      Object.assign(this.$data.tableData, this.$options.data().tableData)
      this.$refs.tableForm.resetFields()
      this.showWrite = !this.showWrite
      this.isShow = false
      this.$emit('fatherClose')
    }
  },
  components: {
    layuiTitle
  }
}
</script>

<style scoped>
  @import url('../../common/css/mixin.css');
</style>
