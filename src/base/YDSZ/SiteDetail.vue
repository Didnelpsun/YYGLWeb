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
            <tr class="el-table__row" v-if="WriteState === 0">
              <td><div class="cell">区域</div></td>
              <td><div class="cell">
                <el-form-item class="form-item" prop="AreaList">
                  <el-cascader v-model="WriteData.AreaList" :props="areaProps" @change="changeArea(WriteData)"
                               ref="csArea"></el-cascader>
                </el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">地市</div></td>
              <td><div class="cell">{{WriteData.cityname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">区域</div></td>
              <td><div class="cell">{{WriteData.areaname}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">站址编码</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="sitecode">
                  <el-input v-model="WriteData.sitecode"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.sitecode}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell"><i class="must">*</i>站址名称</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="sitename">
                  <el-input v-model="WriteData.sitename"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.sitename}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">经度</div></td>
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
              <td><div class="cell">纬度</div></td>
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
              <td><div class="cell">位置描述</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="locationdescribe">
                  <el-input v-model="WriteData.locationdescribe"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.locationdescribe}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">机房类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="roomtype">
                  <el-select v-model="WriteData.roomtype" size="small">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.roomtype" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.roomtypename}}</div></td>

              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.roomtype)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">机房面积（平米）</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="roomacreage">
                  <el-input v-model="WriteData.roomacreage"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.roomacreage}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">天面类型</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="dayfacetype">
                  <el-select v-model="WriteData.dayfacetype" size="small">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="i in DicList.dayfacetype" :key="i.value" :label="i.text" :value="i.value"></el-option>
                  </el-select>
                </el-form-item>
              </div></td>
              <td v-if="WriteState == 2"><div class="cell">{{WriteData.dayfacetypename}}</div></td>

              <td><div class="cell"></div></td>
              <!-- <td><div class="cell">{{writeDic(DicList.dayfacetype)}}</div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">天面高度（米）</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="dayfaceheight">
                  <el-input v-model="WriteData.dayfaceheight"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.dayfaceheight}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">机房外观图片</div></td>
              <td><div class="cell"></div></td>
              <td @click="OpenImgBox(1)"><div class="cell" style="cursor: pointer;color: #409EFF;">有&nbsp;{{ImgList1.length}}&nbsp;张图片</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">机房内部图片</div></td>
              <td><div class="cell"></div></td>
              <td @click="OpenImgBox(2)"><div class="cell" style="cursor: pointer;color: #409EFF;">有&nbsp;{{ImgList2.length}}&nbsp;张图片</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">天面照片</div></td>
              <td><div class="cell"></div></td>
              <td @click="OpenImgBox(3)"><div class="cell" style="cursor: pointer;color: #409EFF;">有&nbsp;{{ImgList3.length}}&nbsp;张图片</div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row">
              <td><div class="cell">RRU数量</div></td>
              <td v-show="WriteState !== 2"><div class="cell">
                <el-form-item class="form-item" prop="rrunumber">
                  <el-input v-model="WriteData.rrunumber"></el-input>
                </el-form-item>
              </div></td>
              <td v-show="WriteState == 2"><div class="cell">{{WriteData.rrunumber}}</div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">确认时间</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.confirmtime == ('0001-01-01 ') ? '' : WriteData.confirmtime}}</el-form-item>
              </div></td>
              <td><div class="cell"></div></td>
              <!-- <td><div class="cell"></div></td> -->
              <td><div class="cell"></div></td>
            </tr>
            <tr class="el-table__row" v-if="WriteState !== 0">
              <td><div class="cell">确认人</div></td>
              <td><div class="cell">
                <el-form-item class="form-item">{{WriteData.confirmusername}}</el-form-item>
              </div></td>
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
                <el-form-item class="form-item">{{WriteData.createtime == ('0001-01-01 ') ? '' : WriteData.createtime}}</el-form-item>
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
import {AreaList} from 'api/api'
import {CreateSite, UpdateSite} from 'api/YDSZ'
import {isValidLongitude, isValidLatitude} from 'common/js/validata'

export default {
  mixins: [GlobalRes],
  name: 'SiteDetail',
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
    var _this = this
    return {
      areaProps: {
        lazy: true,
        label: 'name',
        value: 'id',
        lazyLoad (node, resolve) {
          if (!node.level) {
            _this.$axios.post(AreaList, {parentid: null}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            })
          } else {
            if (!node.hasChildren) return resolve([])
            _this.$axios.post(AreaList, {parentid: node.data.id}).then((res) => {
              if (res.error) {
                _this.$message.error(res.errorMessage)
              } else {
                resolve(_this._normalizeAreaLevel(res.data))
              }
            })
          }
        }
      },
      resList: [],
      Loading: false,
      WriteLoading: false,
      ResourceChoose: false,
      isShow: false,
      WriteData: {
        AreaList: [],
        provinceid: 0,
        cityid: 0,
        areaid: 0,
        sitename: '',
        sitecode: '',
        longitude: null,
        latitude: null,
        locationdescribe: '',
        roomtype: 0,
        roomtypename: '',
        roomacreage: '',
        dayfacetypename: '',
        dayfacetype: 0,
        dayfaceheight: '',
        rrunumber: '',
        imglist: [],
        confirmtime: '',
        id: '',
        createuserid: '',
        createtime: '',
        createusername: ''
      },
      // 表单验证
      Rules: {
        sitename: [
          { required: true, message: '请输入站址名称', trigger: 'blur' }
        ],
        longitude: [
          {required: false, message: '请填写经度', trigger: 'blur'},
          {pattern: isValidLongitude, message: '请输入正确的经度', trigger: 'blur'}
        ],
        latitude: [
          {required: false, message: '请填写纬度', trigger: 'blur'},
          {pattern: isValidLatitude, message: '请输入正确的纬度', trigger: 'blur'}
        ]
      },
      ImgList1: [],
      ImgList2: [],
      ImgList3: []

    }
  },
  activated () {
  },
  methods: {
    changeArea (obj) {
      // console.log(obj)
      obj.provinceid = obj.AreaList[0]
      obj.cityid = obj.AreaList[1]
      obj.areaid = obj.AreaList[2]
    },
    setArea (list, key = 'csArea') {
      this.nodes = list
      this.$refs[key].panel.activePath = []
      this.$refs[key].panel.loadCount = 0
      this.$refs[key].panel.lazyLoad()
    },
    OpenImgBox (val) {
      if (val === 1) this.$emit('fatherOpenImgBox', '机房外观图片', 'roomlook_img', this.ImgList1)
      if (val === 2) this.$emit('fatherOpenImgBox', '机房内部图片', 'roominternal_img', this.ImgList2)
      if (val === 3) this.$emit('fatherOpenImgBox', '天面照片', 'dayface_img', this.ImgList3)
    },
    SubWrite () {
      if (this.WriteState === 0) this.SubAdd()
      if (this.WriteState === 1) this.SubEdit()
    },
    SubAdd () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请输入站址名称！')
        } else {
          this.Loading = true
          this.WriteData.longitude = this.WriteData.longitude ? this.WriteData.longitude : 0
          this.WriteData.latitude = this.WriteData.latitude ? this.WriteData.latitude : 0
          this.$axios.post(CreateSite, this.WriteData).then(res => {
            this.Loading = false
            if (res.errorCode === '200') {
              this.$message.success('添加成功!')
              this.$emit('fatheretMore')
              this.WriteClose()
            } else {
              this.$message.error(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },
    SubEdit () {
      this.$refs.WriteForm.validate((vali, msg) => {
        if (!vali) {
          if (msg.longitude) return this.$message.warning(msg.longitude[0].message)
          if (msg.latitude) return this.$message.warning(msg.latitude[0].message)
          return this.$message.error('请输入站址名称！')
        } else {
          this.Loading = true
          this.WriteData.longitude = this.WriteData.longitude ? this.WriteData.longitude : 0
          this.WriteData.latitude = this.WriteData.latitude ? this.WriteData.latitude : 0
          this.WriteData.imglist = this.WriteData.imglist ? this.WriteData.imglist : []
          this.$axios.put(UpdateSite, this.WriteData).then(res => {
            this.Loading = false
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
    setWriteData (data) {
      this.WriteData = data
      this.setImgList(data.imglist)
    },
    setImgList (list) {
      if (list === null) return
      this.ImgList1 = list.filter(i => { return i.field_name === 'roomlook_img' })
      this.ImgList2 = list.filter(i => { return i.field_name === 'roominternal_img' })
      this.ImgList3 = list.filter(i => { return i.field_name === 'dayface_img' })
    },
    WriteClose () {
      this.ResetWrite()
      this.$emit('fatherClose')
    },
    DetailhandleClose () {
      this.isShow = !this.isShow
    },
    ResetWrite () {
      this.ImgList1 = []
      this.ImgList2 = []
      this.ImgList3 = []
      Object.assign(this.$data.WriteData, this.$options.data().WriteData)
      this.$refs.WriteForm.clearValidate()
      // this.setArea([])
    }
  },
  computed: {
    ImgList () {
      return this.ImgList1.concat(this.ImgList2, this.ImgList3)
    }
  },
  watch: {
    ImgList (val) {
      this.WriteData.imglist = val
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
