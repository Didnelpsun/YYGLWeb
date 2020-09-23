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
              <td><div class="cell">电表编号 </div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="electricmeterno">
                  <el-input v-model="WriteData.electricmeterno"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.electricmeterno}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">电表户号 </div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="electricmeterdoorno">
                  <el-input v-model="WriteData.electricmeterdoorno"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.electricmeterdoorno}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">供电方式</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-select v-model="WriteData.powersupplymode" placeholder="请选择" size="small">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="i in DicList.powersupplymode" :key="i.value" :label="i.text" :value="i.value"></el-option>
                </el-select>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.powersupplymodename}}</div></td>

              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.propertyrightunit)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">止码 </div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="checkcode">
                  <el-input v-model="WriteData.checkcode"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.checkcode}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">经度 </div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="longitude">
                  <el-input v-model="WriteData.longitude"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.longitude}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">纬度 </div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="latitude">
                  <el-input v-model="WriteData.latitude"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.latitude}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">安装地址 </div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="address">
                  <el-input v-model="WriteData.address"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.address}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">总电流（A）</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="totalcurrent">
                  <el-input v-model="WriteData.totalcurrent"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.totalcurrent}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">测量照片</div></td>
              <td><div class="cell"></div></td>
              <td @click="OpenImgBox(1)"><div class="cell" style="cursor: pointer;color: #409EFF;">有&nbsp;{{ImgList1.length}}&nbsp;张图片</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">资产序列号</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="sharingnumber">
                  <el-input v-model="WriteData.sharingnumber"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.sharingnumber}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">创建人</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.createusername}}</el-form-item>
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
  </div>
</template>

<script>
import {GlobalRes} from 'common/js/mixins'
import ResourceList from 'base/Resource/ResourceList'

export default {
  mixins: [GlobalRes],
  props: {
    WriteState: {
      type: Number,
      default: 0 // 0为添加 1为编辑 2为查看
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
      WriteData: {
        powersupplymode: null,
        electricmeterno: '',
        electricmeterdoorno: '',
        checkcode: '',
        longitude: null,
        latitude: null,
        address: '',
        totalcurrent: '',
        imglist: [],
        sharingnumber: '',
        createtime: '',
        createusername: '',
        id: ''
      },
      // 表单验证
      Rules: {
      },
      ImgList1: []
    }
  },
  activated () {
  },
  methods: {
    OpenImgBox (val) {
      if (val === 1) this.$emit('fatherOpenImgBox', '测量图片', 'photogram', this.ImgList1)
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
    },
    SubEdit () {
    },
    setWriteData (data) {
      this.WriteData = data
      this.setImgList(data.imglist)
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => { return i.field_name === 'photogram' })
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    ResetWrite () {
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.clearValidate()
      // this.setArea([])
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
