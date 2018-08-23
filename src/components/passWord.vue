<template>
  <div class="password">
    <el-card class="main">
      <div class="demo-input-suffix">
        <span>原密码：</span>
        <el-input
          placeholder="请输入原密码"
          v-model="old"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>新密码：</span>
        <el-input
          placeholder="请输入新密码"
          v-model="newpassword1"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>请再次输入新密码：</span>
        <el-input
          placeholder="请再次输入新密码"
          v-model="newpassword2"
          clearable>
        </el-input>
      </div>
      <el-button type="primary" class="but" @click="mod">确认修改</el-button>
    </el-card>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  export default {
    data() {
      return {
        old: '',
        newpassword1: '',
        newpassword2: '',
        token: window.localStorage.getItem('token')
      }
    },
    methods: {
      mod() {
        if (!this.old) {
          this.$message({
            message: '请输入原密码'
          })
          return
        }
        if (!this.newpassword1) {
          this.$message({
            message: '请输入新密码'
          })
          return
        }
        if (!this.newpassword2) {
          this.$message({
            message: '请再次输入新密码'
          })
          return
        }
        if (this.newpassword1 !== this.newpassword2) {
          this.$message({
            message: '两次密码不一致，请重新输入'
          })
          this.newpassword1 = ''
          this.newpassword2 = ''
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'personnel/updatePassword',
          type: 'PUT',
          dataType: 'json',
          data: {
            id: JSON.parse(window.localStorage.getItem('data')).id.toString(),
            password: _this.old,
            newPassword: _this.newpassword2
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.$message({
                message: res.msg,
                type: 'success'
              })
              setTimeout(() => {
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('data')
                window.localStorage.removeItem('loginName')
                _this.$router.push({
                  path: '/login'
                })
              }, 2000)
            } else {
              _this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .password {
    text-align: center;
    width: 100%;
    padding: 10px 0px;
    position: absolute;
    margin-top: 80px;
    margin-left: 250px;
    .demo-input-suffix {
      margin-top: 15px;
      span {
        width: 200px;
        display: inline-block;
        text-align: right;
      }
      .el-input {
        width: 300px !important;
      }
    }
    .but {
      margin-top: 15px;
    }

  }
</style>
