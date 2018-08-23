<template>
  <div class="login">
    <div class="content">
      <p>
        监狱车辆跟踪管理系统
      </p>
      <div class="main">
        <el-input
          class="input"
          placeholder="请输入姓名"
          v-model="userName"
          clearable>
        </el-input>
        <el-input
          class="input"
          placeholder="请输入密码"
          v-model="passWord"
          type="password"
          clearable>
        </el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable spaced-comment */
  /* eslint-disable */
  export default {
    data() {
      return {
        userName: '',
        passWord: '',
        url: this.apiUrl
      }
    },
    mounted(){
      this.submit()
    },
    methods: {
      submit() {
          var lett=this;
          document.onkeydown=function(e){
            var key=window.event.keyCode;
            if(key==13){
              lett.login();
            }
          }

      },
      login() {
        if (!this.userName) {
          this.$message({
            message: '请输入用户名',
            type: 'warning'
          })
          return
        }
        if (!this.passWord) {
          this.$message({
            message: '请输入密码',
            type: 'warning'
          })
          return
        }
        var _this = this
        $.ajax({
          url: _this.url + 'login/login',
          type: 'POST',
          data: {
            loginName: _this.userName,
            password: _this.passWord,
            loginType: 1,
            loginSource: 1
          },
          success: function (res) {
            if (res.code === 200) {
              var token = res.data
              window.localStorage.setItem('token', token)
              window.localStorage.setItem('loginName', _this.userName)
              //获取用户信息
              $.ajax({
                url: _this.url + 'login/online',
                type: 'GET',
                dataType: 'json',
                data: {
                  accessToken: token
                },
                success: function (res) {
                  if (res.code === 200) {
                    window.localStorage.setItem('authorizeSet', res.data.authorizeSet)
                    window.localStorage.setItem('data', JSON.stringify(res.data))
                    _this.$router.push('/map')
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
            } else {
              _this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          },
          error: function (res) {
            console.log(res)
          }

        })
      }
    }
  }
</script>

<style scoped lang="less">
  .login {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: url("../common/image/background.jpg") no-repeat;
    background-size: 100% 100%;
    .content {
      width: 400px;
      text-align: center;
      margin-right: 200px;
      p {
        color: #fff;
      }
      .main {
        margin-top: 20px;
        .input {
          margin-top: 20px;

        }
        .el-button {
          width: 100%;
          margin-top: 20px;
        }
      }
    }
  }
</style>
