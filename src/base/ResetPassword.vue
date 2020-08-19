<template>
  <div class="ResetPassword">
    <el-dialog title="修改密码" :visible.sync="showDialog" :modal-append-to-body="false">
      <el-form :model="form" ref="addForm" label-width="100px" size="small">
        <el-row>
          <el-col :span="6" :offset="6">
            <el-form-item label="用户账号：" prop="pass1">
              {{Info.userName}}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名称：" prop="pass1">
              {{Info.realityName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="当前密码：" prop="pass1">
              <el-input v-model="form.pass1" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="新密码：" prop="pass2">
              <el-input v-model="form.pass2" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="6">
            <el-form-item label="确认密码：" prop="pass3">
              <el-input v-model="form.pass3" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="Sub">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {ResetPassword} from 'api/api'
export default {
  name: 'ResetPassword',
  props: {
    Info: {
      type: Object,
      default () {
        return {
          userName: '',
          realityName: '',
          id: 0
        }
      }
    }
  },
  data () {
    return {
      showDialog: false,
      form: {
        pass1: '',
        pass2: '',
        pass3: ''
      }
    }
  },
  methods: {
    open () {
      this.showDialog = true
      this.form = {
        pass1: '',
        pass2: '',
        pass3: ''
      }
    },
    close () {
      this.showDialog = false
    },
    Sub () {
      const data = {
        id: this.Info.id,
        old: this.form.pass1,
        new: this.form.pass2
      }
      this.$axios.post(ResetPassword, data).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  .ResetPassword {

  }

</style>
