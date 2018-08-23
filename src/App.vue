<template>
  <div class="app">
    <div class="app_1" v-if="falg">
      <div class="top">
        <div class="top_p">
          监狱外来车辆自动跟踪查询系统
          <div class="span1" @click="show = !show">
            <img class="img1" :src="headImage" :onerror="errorImg01" alt="">
            <div class="el-dropdown-link" @mouseover="flag=true" @mouseout="flag=false">
              欢迎您：<em>{{userName}}</em>
              <div class="msg" v-if="flag">
                <img class="user-avatar" :src="headImage" :onerror="errorImg01">
                <p class="username" v-text="userName"></p>
                <div class="con">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-button type="primary" @click="out">切换用户</el-button>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">
                        <el-button type="warning" @click="mod_pw">修改密码</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <el-row>
        <el-col :span="4">
          <div class="left" v-if="falg">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#222d32"
              text-color="#fff"
              active-text-color="#ffd04b"
              :unique-opened=true
              :router=true>
              <el-submenu index="1">
                <template slot="title">
                  <i class="iconfont icon-shouye"></i>
                  <span>首页</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="map">车辆跟踪</el-menu-item>

                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="iconfont icon-cheliang-"></i>
                  <span>车辆登记管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/mapManagement">地图管理</el-menu-item>
                  <el-menu-item index="/carInformation">车辆信息登记</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="2-2">
                  <template slot="title">历史登记信息</template>
                  <el-menu-item index="/historicalManagement">历史信息</el-menu-item>
                  <el-menu-item index="2-2-2">告警信息</el-menu-item>
                  <el-menu-item index="2-2-3">轨迹回放</el-menu-item>
                </el-submenu>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="iconfont icon-jksb"></i>
                  <span>监控设备</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/monitorManagement">监控设备</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="iconfont icon-luxianguanli"></i>
                  <span>行驶线路管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/lineManagement">线路管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="iconfont icon-cheliang-"></i>
                  <span>车辆管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/carManagement">车辆信息维护</el-menu-item>
                  <!--<el-menu-item index="5-1">车辆信息维护</el-menu-item>-->
                  <el-menu-item index="/trackerManagement">追踪器管理</el-menu-item>
                  <el-menu-item index="/blackListManagement">黑名单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!--<el-submenu index="6">-->
              <!--<template slot="title">-->
              <!--<i class="iconfont icon-xinxiguanli"></i>-->
              <!--<span>监狱车辆信息管理</span>-->
              <!--</template>-->
              <!--<el-menu-item-group>-->
              <!--<el-menu-item index="/mapManagement">地图管理</el-menu-item>-->
              <!--<el-menu-item index="/carManagement">车辆管理</el-menu-item>-->
              <!--<el-menu-item index="/carInformation">车辆信息登记</el-menu-item>-->
              <!--</el-menu-item-group>-->
              <!--</el-submenu>-->
              <el-submenu index="7">
                <template slot="title">
                  <i class="iconfont icon-shezhi"></i>
                  <span>系统设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/userManagement">用户管理</el-menu-item>
                  <el-menu-item index="/autManagement">权限管理</el-menu-item>
                  <el-menu-item index="/roleManagement">角色管理</el-menu-item>
                  <el-menu-item index="/bmManagement">部门管理</el-menu-item>
                  <el-menu-item index="/dataDictionary">数据字典管理</el-menu-item>
                  <el-menu-item index="/sysManagement">系统账号管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="root">
              <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-dupe-keys */
  export default {
    data() {
      return {
        top: 'top',
        show: false,
        isCollapse: true,
        curPath: '/',
        falg: false,
        flag: false,
        headImage: '',
        userName: '',
        errorImg01: 'this.src="' + require('@/common/image/noLogin.png') + '"'
      }
    },
    // methods: {
    //   handleOpen(key, keyPath) {
    //     console.log(key, keyPath)
    //   },
    //   handleClose(key, keyPath) {
    //     console.log(key, keyPath)
    //   }
    // },
    beforeCreate() {
      // window.localStorage.removeItem('token')
      this.getPath
    },
    created() {
      this.getPath
    },

    methods: {
      handleCommand(command) {
        if (command === 'change') {
          this.change()
        }
      },
      getPath() {
        this.curPath = this.$route.path
        if (this.curPath !== '/login' && this.curPath !== '/SynRegistration') {
          this.falg = true
        } else {
          this.falg = false
        }
        // if (this.curPath !== '/map') {
        //   sessionStorage.removeItem('reload')
        // }
        if (!window.localStorage.getItem('token')) {
          this.$router.push({
            path: '/login'
          })
        } else {
          this.data = window.localStorage.getItem('data')
          // console.log(JSON.parse(this.data))
          this.userName = JSON.parse(this.data).loginName
          this.headImage = JSON.parse(this.data).headImage
        }
      },
      change() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('data')
        window.localStorage.removeItem('loginName')
        this.$router.push({
          path: '/login'
        })
      },
      out() {
        this.flag = false
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('data')
        window.localStorage.removeItem('loginName')
        this.$router.push({
          path: '/login'
        })
      },
      mod_pw() {
        this.$router.push({
          path: '/passWord'
        })
      }
    },
    watch: {
      '$route': 'getPath'
    }
  }
</script>

<style scoped lang="less">
  .left {
    /*display: none;*/

  }

  .el-dropdown-link {
    position: relative;
    color: #fff;
    .msg {
      text-align: center;
      position: absolute;
      width: 300px;
      background: #e3e3e3;
      right: -50px;
      .user-avatar {
        width: 100px;
      }
      .username {
        padding: 0px;
        height: 30px;
        color: #000;
      }
    }
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    margin-top: 80px;
  }

  .app {
    .main {
      .left {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        min-height: 100%;
        width: 240px;
        z-index: 99;
        background-color: #000;
        overflow-y: scroll;
      }
      .root {
        position: fixed;
        width: calc(100% - 250px);
        /*padding: 10px 20px;*/
        /*position: absolute;*/
        /*margin-top: 80px;*/
        /*padding-left: 250px;*/
      }
    }
    .top {
      position: fixed;
      width: 100%;
      z-index: 200;
      background: #607B8B;
      /* margin-left: 200px;*/
      em {
        font-style: normal;
      }
      .top_p {
        height: 80px;
        /*background-size: 100% 100%;*/
        background: #ccc;
        background: url("common/image/car_top.png") no-repeat;
        line-height: 80px;
        font-size: 22px;
        padding-left: 320px;
        color: #fff;
        font-size: 30px;
        position: relative;
        .span1 {
          font-size: 16px;
          position: absolute;
          top: 0px;
          right: 5%;
          cursor: pointer;
          .img1 {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: absolute;
            top: 26px;
            left: -46px;
          }
          .tc {
            width: 300px;
            height: 190px;
            position: absolute;
            top: 80px;
            right: -60px;
            background: rgba(34, 45, 50, 0.7);
            .img2 {
              text-align: center;
              img {
                width: 80px;
                height: 80px;
                border-radius: 50%;
              }
              p {
                height: 20px;
                line-height: 20px;
                margin-top: -20px;
              }

            }
          }
        }
      }
    }
  }
</style>
