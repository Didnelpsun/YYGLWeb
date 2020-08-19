<template>
  <div class="content">
    <layuiTitle title="个人资料"></layuiTitle>
    <el-form class="clearfix" :model="UserData" :rules="UserRules" size="mini">
      <el-col :span="12">
        <el-form-item label="用户账号：">
          <el-input v-model="UserData.userName" :span="12"></el-input>
        </el-form-item>
        <el-form-item label="用户名称：">
          <el-input v-model="UserData.realityName" ></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="UserData.mobile_No"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：">
          <el-input v-model="UserData.email"></el-input>
        </el-form-item>
        <el-form-item label="部门：">
          <el-input v-model="UserData.orgName" placeholder="请选择部门" disabled>
            <el-button @click="openOrgTree" slot="append">选择</el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="头像：">
          <el-upload class="avatar-uploader" :action="UploadImg" :headers="ajaxHeaders" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="UserData.registerphoto" :src="UserData.registerphoto" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-form>
    <div class="center">
      <el-button @click="SubUserInfo" :icon="SubLoading ? 'el-icon-loading' : 'el-icon-check'" :disabled="SubLoading">提交</el-button>
    </div>

    <OrgTree :showCheckBox="true" :checkStrictly="true" :isRadio="true" @Confirm="ConfirmOrg" ref="OrgTree"></OrgTree>
<!--    <OrgTree :data="OrgData" @selectOrg="selectOrg" ref="OrgTree"></OrgTree>-->
  </div>
</template>

<script>
import {reqURL, UploadImg, ViewUserInfo, EditUser} from 'api/api'
import {mapGetters} from 'vuex'
import layuiTitle from 'base/layui-title'
import OrgTree from 'base/OrgTree'
export default {
  name: 'UserInfo',
  data () {
    return {
      UserData: {
        userName: '',
        realityName: '',
        mobile_No: '',
        email: '',
        orgId: '',
        orgName: '',
        registerphoto: ''
      },
      OrgData: [],
      UserRules: {},
      UploadImg: '',
      SubLoading: false,
      ajaxHeaders: {
        Authorization: ''
      }

    }
  },
  computed: {
    ...mapGetters(['token', 'UserInfo'])
  },
  created () {
    this.UploadImg = UploadImg
    this.ajaxHeaders.Authorization = this.token
  },
  activated () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      console.log(this.UserInfo)
      this.$axios.post(ViewUserInfo, {
        id: this.UserInfo.id
      }).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.UserData = res.data
        }
      })
    },
    openOrgTree () {
      this.$refs.OrgTree.open()
    },
    selectOrg () {
      this.UserData.orgId = ''
      this.UserData.orgName = ''
    },
    ConfirmOrg (data) {
      if (data.length) {
        this.UserData.orgname = data[0].orgname
        this.UserData.org_id = data[0].id
      }
    },
    SubUserInfo () {
      this.$axios.post(EditUser, this.UserData).then((res) => {
        if (res.error) {
          this.$message.error(res.errorMessage)
        } else {
          this.$message.success('提交成功！')
        }
      })
    },
    handleAvatarSuccess (res) { // 头像上传
      if (res.error) {
        this.$message.error(res.errorMessage)
      } else {
        this.$message.success('上传成功！')
        this.UserData.registerphoto = `${reqURL}/${res.data[0]}`
      }
    },
    beforeAvatarUpload (file) { // 上传头像格式
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

  },
  components: {
    layuiTitle,
    OrgTree
  }
}
</script>

<style scoped>
  @import url('../../../common/css/mixin.css');
</style>
