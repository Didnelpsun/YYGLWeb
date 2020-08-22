<template>
  <el-dialog append-to-body class="ImgBox" :title="Flag ? '查看照片' : '选择照片'" :visible.sync="show" width="50%" center>
    <el-row :gutter="20">
      <el-col :span="24" v-if="List.length">
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='315°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='315°').title}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='0°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='0°').title}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='45°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='45°').title}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='270°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='270°').title}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="container info">
            360度环境照
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='90°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='90°').title}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='225°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='225°').title}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='180°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='180°').title}}</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-image class="container" :src="reqURL+ '/' +List.find(i => i.title==='135°').url" :preview-src-list="ViewList"></el-image>
            <p class="angle">{{List.find(i => i.title==='135°').title}}</p>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <span slot="footer" class="dialog-footer">
      <el-button @click="Close" type="">关 闭</el-button>
<!--      <el-button @click="handleConfirm">确 定</el-button>-->
    </span>

  </el-dialog>
</template>

<script>
import {reqURL, UploadImg} from 'api/api'
import {mapGetters} from 'vuex'

export default {
  name: 'EnvironmentImgBox',
  data () {
    return {
      show: false,
      Loading: false,
      Flag: false,
      action: '',
      reqURL: '',
      List: [],
      title: '',
      name: '',
      imgTitle: false
    }
  },
  created () {
    this.reqURL = reqURL
    this.action = UploadImg
  },
  methods: {
    Open () { this.show = true },
    Close () { this.show = false },
    SetData (title, name, list, imgTitle = false) {
      this.title = title
      this.name = name
      this.List = list
      this.imgTitle = imgTitle
    }
  },
  computed: {
    ViewList () {
      return this.List.map(item => {
        return `${reqURL}/${item.url}`
      })
    },
    ...mapGetters(['token'])
  }
}
</script>

<style scoped>
  .container {
    width: 100%;
    height: 200px;
  }
  .angle {
    text-align: center;
    color: #000;
    font-size: 16px;
  }
  .info {
    text-align: center;
    line-height: 200px;
    color: #000;
    font-weight: bold;
    font-size: 26px;
  }
</style>
