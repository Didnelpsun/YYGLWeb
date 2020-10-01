<template>
  <div class="header">
    <div class="logo"><span>生产辅助协同平台</span></div>
    <el-menu class="header-nav" @select="handleSelect" mode="horizontal" background-color="#3CA0EC" text-color="#fff" active-text-color="#fff">
      <el-submenu index="0">
        <template slot="title">当前用户：{{UserInfo.username}} &nbsp ({{UserInfo.usertype === 1 ? '超级管理员' : UserInfo.usertype === 2 ? '运营管理员' : UserInfo.usertype === 3 ? '租户管理员' : '普通用户'}})</template>
        <el-menu-item index="0-1"><router-link tag="div" to="">个人资料</router-link></el-menu-item>
        <el-menu-item index="0-2">修改密码</el-menu-item>
        <el-menu-item index="0-3"><router-link tag="div" to="">安全退出</router-link></el-menu-item>
      </el-submenu>
      <el-menu-item index="1"><i class="message el-icon-message"></i></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'myHeader',
  computed: {
    ...mapGetters(['UserInfo'])
  },
  methods: {
    handleSelect (e) {
      if (e === '0-1') {
        let obj = {id: 500, parentid: null, name: '个人资料', url: '/main/UserInfo'}
        this.$emit('addTabs', obj)
        this.$router.push({path: '/main/UserInfo'})
      }
      if (e === '0-2') {
        let obj = {id: 501, parentid: null, name: '重置密码', url: '/main/map'}
        this.$emit('addTabs', obj)
        this.$router.push({path: '/main/map'})
      }
      if (e === '0-3') {
        localStorage.clear()
        sessionStorage.clear()
        this.setToken('')
        this.setUserInfo({})
        this.$router.push({path: '/login'})
      }
    },
    ...mapMutations({
      setToken: 'SET_TOKEN',
      setUserInfo: 'SET_USER_INFO'
    })

  }
}
</script>

<style scoped>
  .header {
    width: 100%;
    height: 50px;
    background: #3CA0EC;
    user-select: none;
  }
  .header .logo {
    height: 50px;
    margin: 0 20px;
    font-size: 22px;
    color: #fff;
    line-height: 50px;
    float: left;
  }
  .header .header-nav {
    margin-right: 20px;
    background: #3CA0EC;
    float: right;
  }

  .header .message {
    color: #fff;
    font-size: 20px;
  }
</style>
