<template>
  <div class="monitorModification">
    <div class="left">
      <div class="demo-input-suffix">
        <span>所属监区：</span>
        <el-select v-model="Prison" clearable placeholder="请选择">
          <el-option
            v-for="item in Prison_options"
            :key="item.value"
            :label="item.name"
            :value="item">
          </el-option>
        </el-select>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>摄像头编号：</span>
        <el-input
          placeholder="请输入摄像头编号"
          v-model="code"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>摄像头名称：</span>
        <el-input
          placeholder="请输入摄像头名称"
          v-model="deviceName"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>安装位置：</span>
        <el-input
          placeholder="请输入安装位置"
          v-model="address"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>X轴坐标：</span>
        <el-input
          placeholder="请点击右侧地图选择坐标点"
          v-model="x"
          :disabled="true"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>Y轴坐标：</span>
        <el-input
          placeholder="请点击右侧地图选择坐标点"
          v-model="y"
          :disabled="true"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>经度：</span>
        <el-input
          placeholder="请输入经度"
          v-model="longitude"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>纬度：</span>
        <el-input
          placeholder="请输入纬度"
          v-model="latitude"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>设备IP地址：</span>
        <el-input
          placeholder="请输入设备IP地址"
          v-model="ip"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>端口号：</span>
        <el-input
          placeholder="请输入端口号"
          v-model="port"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>用户名：</span>
        <el-input
          placeholder="请输入用户名"
          v-model="account"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>密码：</span>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>通道号：</span>
        <el-input
          placeholder="请输入通道号"
          v-model="channel"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <el-row>
        <el-button type="success" @click="save">
          保存
        </el-button>
        <el-button @click="cancel">
          取消
        </el-button>

      </el-row>
    </div>
    <div class="right" id="right" v-show="Prison">
      <div id="r1">
      </div>
      <img :src="Prison.value" alt="" class="imgprison" id="img" @mousedown='updateXY'>
    </div>

  </div>

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor */
  // import {listToTree} from '@/common/js/listtoTree.js'
  const w = 850
  export default {
    data() {
      return {
        Prison: '',
        Prison_options: [],
        code: '',
        deviceName: '',
        address: '',
        x: '',
        y: '',
        longitude: '',
        latitude: '',
        ip: '',
        port: '',
        account: '',
        password: '',
        channel: '',
        id: '',
        mapId: '',
        mapName: '',
        token: window.localStorage.getItem('token')

      }
    },
    created() {
    },
    mounted() {
      this.getQuery()
      // this.getAll()
      this.getPrison()
    },
    methods: {
      // 获取坐标
      updateXY: function (event) {
        var image = new Image()
        image.src = this.Prison.value
        var Multiple = parseInt(image.width) / w
        this.x = event.offsetX * Multiple
        this.y = event.offsetY * Multiple
        var r1 = document.getElementById('r1')
        r1.innerHTML = ''
        var img = document.createElement('img')
        img.style.position = 'absolute'
        img.style.zIndex = 90
        img.src = 'static/img/sxt.png'
        img.style.width = '18px'
        img.style.height = '18px'
        img.style.cursor = 'crosshair'
        img.style.top = parseInt(this.y / Multiple - 9) + 'px'
        img.style.left = parseInt(this.x / Multiple - 9) + 'px'
        r1.appendChild(img)
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'gather/gps',
          type: 'GET',
          dataType: 'json',
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.longitude = res.data.longitude
              _this.latitude = res.data.latitude
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
      },
      // 获取地图
      getPrison() {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'map/',
          type: 'GET',
          dataType: 'json',
          data: {
            pageNum: 1,
            pageSize: 5000
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              res.data.dataList.forEach((item, index) => {
                var obj = {}
                obj.label = item.code
                obj.value = item.image
                obj.id = item.id
                obj.code = item.code
                obj.name = item.name
                _this.Prison_options.push(obj)
              })
              _this.Prison_options.forEach((item, index) => {
                if (_this.mapId === item.id) {
                  _this.Prison = item
                }
              })
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 获取路由传参
      getQuery() {
        this.id = this.$route.params.id
        this.address = this.$route.params.address
        this.deviceName = this.$route.params.deviceName
        this.code = this.$route.params.code
        this.longitude = this.$route.params.longitude
        this.latitude = this.$route.params.latitude
        this.x = this.$route.params.x
        this.y = this.$route.params.y
        this.ip = this.$route.params.ip
        this.port = this.$route.params.port
        this.account = this.$route.params.account
        this.password = this.$route.params.password
        this.channel = this.$route.params.channel
        this.mapId = this.$route.params.mapId
        this.mapName = this.$route.params.mapName
        if (this.id) {
          var r1 = document.getElementById('r1')
          r1.innerHTML = ''
          var Multiple = 2048 / w
          var img = document.createElement('img')
          img.style.position = 'absolute'
          img.style.zIndex = 90
          img.src = 'static/img/sxt.png'
          img.style.width = '18px'
          img.style.height = '18px'
          img.style.cursor = 'crosshair'
          img.style.top = parseInt(this.y / Multiple - 9) + 'px'
          img.style.left = parseInt(this.x / Multiple - 9) + 'px'
          r1.appendChild(img)
        }
      },
      // 保存
      save() {
        if (!this.Prison) {
          this.$message({
            message: '请先选择监区',
            type: 'warning'
          })
          return
        }
        if (!this.deviceName) {
          this.$message({
            message: '请先填写摄像头名称',
            type: 'warning'
          })
          return
        }
        if (!this.x) {
          this.$message({
            message: '请先选择坐标',
            type: 'warning'
          })
          return
        }
        if (!this.y) {
          this.$message({
            message: '请先选择坐标',
            type: 'warning'
          })
          return
        }
        if (!this.address) {
          this.$message({
            message: '请先填写安装位置',
            type: 'warning'
          })
          return
        }
        if (!this.longitude || !this.latitude) {
          this.$message({
            message: '请先填写经纬度',
            type: 'warning'
          })
          return
        }
        if (!this.ip) {
          this.$message({
            message: '请先填写ip地址',
            type: 'warning'
          })
          return
        }
        if (!this.port) {
          this.$message({
            message: '请先填写端口号',
            type: 'warning'
          })
          return
        }
        if (!this.account) {
          this.$message({
            message: '请先填写用户名',
            type: 'warning'
          })
          return
        }
        if (!this.password) {
          this.$message({
            message: '请先填写密码',
            type: 'warning'
          })
          return
        }
        if (!this.channel) {
          this.$message({
            message: '请先填写通道号',
            type: 'warning'
          })
          return
        }

        var _this = this
        $.ajax({
          url: _this.apiUrl + 'videoDevice/save',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            code: _this.code,
            deviceName: _this.deviceName,
            address: _this.address,
            longitude: _this.longitude,
            latitude: _this.latitude,
            x: _this.x,
            y: _this.y,
            ip: _this.ip,
            port: _this.port,
            account: _this.account,
            password: _this.password,
            channel: _this.channel,
            mapId: _this.Prison.id,
            mapName: _this.Prison.name
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
                _this.$router.go(-1)
              }, 3000)
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
      },
      cancel() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="less">
  .monitorModification {
    width: 100%;
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      position: relative;
      width: 850px;
      height: auto;
      .imgprison {
        width: 100%;
      }
    }
    .el-tree {
      width: 400px;
      margin-left: 118px;
      margin-top: -22px;
    }
    .el-select {
      margin-right: 30px;
    }
    em {
      color: red;
      font-style: normal;
    }
    position: absolute;
    margin-top: 80px;
    margin-left: 250px;
    .el-input {
      width: auto;
      margin-right: 30px;
    }
    .demo-input-suffix {
      margin-top: 10px;
      span {
        display: inline-block;
        width: 120px;
      }
      .el-input__inner {
        width: 230px;
      }
      .el-textarea {
        width: 623px;
      }
    }
    .el-row {
      text-align: center;
      margin-top: 20px;
    }
    .el-button {
      width: 120px;
    }
    .form-control {
      width: 221px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
  }

</style>
