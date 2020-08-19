<template>
  <el-dialog append-to-body class="ImgBox" :title="Flag ? '查看照片' : '选择照片'" :visible.sync="show" width="50%" center>
    <el-row style="margin-bottom: 15px">
      <div class="fl">项目：{{title}}</div>
      <el-upload v-show="!Flag" class="fr" :action="action" :headers="{Authorization: token}" :multiple="true" :show-file-list="false"
                 :on-success="onSuccess" :before-upload="beforUpload">
        <el-button :disabled="Loading" :icon="Loading ? 'el-icon-loading' : 'el-icon-upload2'" size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-table :data="List">
      <el-table-column prop="title" label="标题" width="150" v-if="imgTitle">
        <template slot-scope="scope">
          <el-input v-model="scope.row.title" v-show="!Flag"></el-input>
          <div v-show="Flag">{{scope.row.title}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="图片" width="75">
        <template slot-scope="scope">
          <el-image style="width: 50px; height: 50px" :src="`${reqURL}/${scope.row.url}`" :preview-src-list="ViewList"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remarks" v-show="!Flag"></el-input>
          <div v-show="Flag">{{scope.row.remarks}}</div>
        </template>
      </el-table-column>
      <el-table-column v-if="!Flag" prop="url" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="Delete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
  name: 'ImgBox',
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
    },
    Delete (index) { this.List.splice(index, 1) },
    handleConfirm () {
      this.$emit('changeImg', this.List, this.name)
      this.Close()
    },
    beforUpload (file) { // 过滤图片格式 图片大小
      let type = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp']
      const fileType = type.includes(file.type)
      const fileSize = file.size / 1024 / 1024 < 5
      if (!fileType) this.$message.error('上传图片只能是 JPG 和 PNG 格式!')
      if (!fileSize) this.$message.error('上传图片大小不能超过 5MB!')
      return fileType && fileSize
    },
    onSuccess (res) {
      if (res.error) {
        this.$notify.error({title: '上传失败', message: res.errorMessage})
      } else {
        this.List.push({
          url: res.data[0],
          remarks: '',
          field_name: this.name
        })
      }
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

</style>
