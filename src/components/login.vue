<template>
  <div class="login">
    <div class="login-content">
      <el-row>
        <el-col :span="14">&nbsp;</el-col>
        <el-col :span="10">
          <div class="login-form">
            <el-row>
              <el-col :span="24"><div class="title">登录：</div></el-col>
              <!--<el-col :span="24"><div class="desc">站址资源</div></el-col>-->
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-input suffix-icon="el-icon-user" v-model="username" size="medium" placeholder="用户名"></el-input>
              </el-col>
              <el-col :span="24">
                <el-input v-model="userpassword" size="medium" placeholder="密码" type="password"  show-password></el-input>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-input v-model="userVali" size="medium" placeholder="验证码"></el-input>
              </el-col>
              <el-col :span="8">
                <img class="VailImg" :src="ImgUrl" @click="handleVailImg" alt="">
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-button class="login-btn" @click="_login" :loading="Logging" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {loginAPI, ValiImg} from '../api/api'
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      username: 'sjw',
      userpassword: 'Dzl123wuh',
      userVali: '',
      fullscreenLoading: false,
      Logging: false, // 登录中
      ImgUrl: '',
      code: ''
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  created () {
    this.hasToken()
    this.handleVailImg()
  },
  mounted () {
    // 绑定enter事件
    this.enterKeyup()
  },
  destroyed () {
    // 销毁enter事件
    this.enterKeyupDestroyed()
  },
  methods: {
    enterKey (event) {
      const componentName = this.$options.name
      if (componentName === 'login') {
        const code = event.keyCode
          ? event.keyCode
          : event.which
            ? event.which
            : event.charCode
        if (code === 13) {
          this._login()
        }
      }
    },
    enterKeyupDestroyed () { document.removeEventListener('keyup', this.enterKey) },
    enterKeyup () { document.addEventListener('keyup', this.enterKey) },
    hasToken () {
      let token = localStorage.getItem('token')
      if (token) {
        this.$router.push({
          path: '/main'
        })
      }
    },
    handleVailImg () {
      this.$axios({
        method: 'get',
        url: ValiImg
      }).then((res) => {
        this.ImgUrl = 'data:image/png;base64,' + res.data.data
        this.code = res.data.code
      }).catch(error => {
        console.log(error)
      })
    },
    _login () {
      if (!this.username) return this.$message.warning('请输入用户名')
      if (!this.userpassword) return this.$message.warning('请输入密码')
      if (this.code.toLowerCase() !== this.userVali.toLowerCase()) {
        this.userVali = ''
        return this.$message.error('验证码错误')
      }
      if (this.Logging) return false
      const data = {
        username: this.username,
        password: this.userpassword,
        code: this.userVali
      }
      this.Logging = true // 登录中
      this.fullscreenLoading = true
      this.$axios.post(loginAPI, data).then((res) => {
        if (res.error) {
          setTimeout(() => { // 登录失败
            this.fullscreenLoading = false
            this.Logging = false
            this.$message.error(res.errorMessage)
          }, 1000)
          return
        }
        setTimeout(() => {
          this.$router.push({
            path: '/main'
          })
          let token = `${res.data.token.token_type} ${res.data.token.access_token}`
          // let UserInfo = JSON.stringify(res.data.data)
          localStorage.setItem('token', token)
          // localStorage.setItem('UserInfo', UserInfo)
          this.setToken(token)
          this.fullscreenLoading = false
          this.Logging = false
        }, 1000)
      }).catch(() => {
        this.Logging = false
        this.fullscreenLoading = false
        this.$message.error('登录失败')
      })
    },
    ...mapMutations({
      setToken: 'SET_TOKEN',
      setUserInfo: 'SET_USER_INFO'
    })
  }
}
</script>

<style scoped>
  .el-col {
    margin-bottom: 20px;
    color: #fff;
  }
  .login {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url("../common/img/background.jpg");
    background-size: cover;
  }
  .login-content {
    width: 750px;
    height: 360px;
    margin: 15% auto 0 auto;
  }
  .login-form {
    height: 295px;
    padding: 20px;
    background: rgba(255,255,255, .3);
    border: 1px solid rgba(255,255,255, .3);
    border-radius: 5px;
    user-select: none;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
  }
  .desc {
    font-size: 16px;
  }
  .login-btn {
    width: 100%;
  }
  .login-btn:hover { background: #1a7bb9; }
  .VailImg {
    margin-top: 3px;
  }

</style>
