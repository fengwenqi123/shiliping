<template>
  <div class="container-fluid">
    <div class="nav">
      <el-col :span="4">
        <p class="fonts" @click="url">
          车辆登记
        </p>
      </el-col>
      <el-col :span="18">
        <p class="license">
          <el-row>
            <el-col :span="6" v-for="(item,key) in four_list" :key="item.id">
              <!--<div class="grid-content"><span @click="out(item.carBean.id)">{{item.carBean.license}}</span></div>-->
              <el-dropdown>
                <el-button type="primary">
                  {{item.carBean.license}}<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native='out(item.id)'>驶离</el-dropdown-item>
                  <el-dropdown-item @click.native='logout(key)'>选中</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </p>
      </el-col>
      <el-col :span="2">
        <div class="show" @click="show = !show">
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-col>
      <div class="cols" v-if="show">
        <el-col :span="4">&nbsp;</el-col>
        <el-col :span="18">
          <p class="license1">
            <el-row>
              <el-col :span="6" v-for="(item,key) in other_list" :key="item.id">
                <!--<div class="grid-content" :dataId="item.id"><span class="cus" @click="out(item.id)">{{item.carBean.license}}</span></div>-->
                <el-dropdown>
                  <el-button type="primary">
                    {{item.carBean.license}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native='out(item.id)'>驶离</el-dropdown-item>
                    <el-dropdown-item @click.native='logout(key+4)'>选中</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </p>
        </el-col>
      </div>
    </div>
    <div class="row">
      <el-row :gutter="20" style="width:100%;">
        <el-col :span="19"><div id="mapCanvas" class=" mapCanvas" @click='updateXY'>
          <canvas id="imageCanvas" style="position: absolute; margin-left: 0;margin-top: 0;"
                  @mouseup="canvasMouseup"
                  @mousedown="canvasMousedown"
                  @mousemove="canvasMousemove"
                  @dblclick="zoomDefault"></canvas>

          <div id="positionButtonDiv">
            <p>
            <span>
							<img id="zoomInButton" class="zoomButton" src="../common/image/zoomIn.png" title="zoom in" alt="zoom in"
                   @click="zoomIn"/>
							<img id="zoomOutButton" class="zoomButton" src="../common/image/zoomOut.png" title="zoom out"
                   alt="zoom out"
                   @click="zoomOut"/>
						</span>
            </p>
            <p>
						<span class="positionButtonSpan">
							<map name="positionMap" class="positionMapClass">
								<area id="topPositionMap" shape="rect" coords="20,0,40,20" title="move up" alt="move up"
                      @click="canvasMoveTo(0, 20)"/>
								<area id="leftPositionMap" shape="rect" coords="0,20,20,40" title="move left" alt="move left"
                      @click="canvasMoveTo(20, 0)"/>
								<area id="rightPositionMap" shape="rect" coords="40,20,60,40" title="move right" alt="move right"
                      @click="canvasMoveTo(-20, 0)"/>
								<area id="bottomPositionMap" shape="rect" coords="20,40,40,60" title="move bottom" alt="move bottom"
                      @click="canvasMoveTo(0, -20)"/>
							</map>
							<img src="../common/image/position.png" usemap="#positionMap"/>
						</span>
            </p>
          </div>
        </div></el-col>
        <el-col :span="5"><div>
          <div class="righ">
            <div>
              <WebVideo></WebVideo>
            </div>
            <div>
              <el-tabs v-model="activeName" stretch="true" type="border-card" @tab-click="handleClick">
                <el-tab-pane class="tab1" label="告警车辆信息" name="first">
                  <div><p>驾驶员：</p><span>{{last_list.pilot}}</span></div>
                  <div><p>车牌号码：</p><span>{{last_list.carBean.license}}</span></div>
                  <div><p>手机号码：</p><span>{{last_list.carBean.mobile}}</span></div>
                  <div><p>随车民警：</p><span>{{last_list.police}}</span></div>
                  <div><p>进入时间：</p><span>{{last_list.carBean.addTimeString}}</span></div>
                  <div><p>停留时间：</p><span></span></div>
                  <div><p>定位标示：</p><span></span></div>

                </el-tab-pane>
                <el-tab-pane label="历史告警信息" name="second">
                  <p v-for="item in alert" :key="item.id"><span class="time">{{item.modifyTimeString}}</span><span
                    class="alert">{{item.alert}}</span></p>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div></el-col>
      </el-row>
    </div>
    <div>
    </div>
    <div class="img" v-show="false">
      <img id="img_car0" src="" alt="">
      <img id="img_car1" src="" alt="">
      <img id="img_car2" src="" alt="">
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  /* eslint-disable no-new */
  /* eslint-disable */
  import WebVideo from '@/base/webVideo'

  var list = [];
  var list1 = [];
  var arr = [];
  const images = new Image()
  export default {
    components: {
      WebVideo
    },
    data() {
      return {
        activeName: 'first',
        show: false,
        tab: true,
        num_car: [],
        dataList: '',
        carList: [],
        obj: [],
        obj1: [],
        obj2: [],
        token: window.localStorage.getItem('token'),
        leftTitle: '左侧区域',
        imgUrl: '',
        markUrl: 'static/img/blue.png',
        markUrl_e: 'static/img/red.png',
        markUrl_check: 'static/img/yellow.png',
        zoomValue: 1,
        zoomIndex: null,
        lastPoint: [0, 0],
        isMouseDown: false,
        image: '',
        timeOut: null,
        timeOutImg: null,
        jsons: {},
        active: null,
        bl: 0,
        name: null,
        a1: 10,
        b1: 300,
        c1: 200,
        d1: 700,
        a2: [],
        b2: [],
        a3: 10,
        b3: 300,
        lineList: [],
        four_list: [],
        other_list: [],
        alert: [],
        last_list: {
          carBean: {
            license: ''
          }
        },
        zoomArray: [
          0.65,
          0.75,
          0.9,
          1,
          1.25,
          1.5,
          1.75,
          2,
          2.5,
          3
        ]
      }
    },
    mounted() {
      this.geta()
      this.getMap()
      this.drawImage1()
    },
    methods: {
      handleCommand(command) {
        if (command === 'logout') {
          this.logout()
        }
      },
      logout(key) {
        this.bl = key
        this.last_list = this.carList[this.bl]
        var _this = this
        // this.getAlarm(this.carList[this.bl].id, _this)
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      updateXY: function (event) {
        var x = event.offsetX
        var y = event.offsetY
        // alert(x + "," + y)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      url() {
        window.open(window.location.origin + '/#/SynRegistration')
      },
      out(id) {
        this.$confirm('确定该车辆已经驶离监管区域吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this
          $.ajax({
            url: _this.apiUrl + 'visitorInfo/end',
            type: 'PUT',
            dataType: 'json',
            data: {
              id: id
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
                  location.reload()
                }, 1500)
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      // 获得列表
      geta() {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'map/my',
          type: 'GET',
          dataType: 'json',
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.data = res.data
              _this.imgUrl = res.data.image

              $.ajax({
                url: _this.apiUrl + 'visitorInfo/findListByMapId/?time=' + new Date().getTime(),
                type: 'GET',
                dataType: 'json',

                data: {
                  mapId: res.data.id
                },
                headers: {
                  accessToken: _this.token
                },
                success: function (res) {
                  if (res.code === 200) {
                    _this.carList = res.data
                    _this.bl = res.data.length - 1
                    // if (_this.carList.length > 4) {
                    //   _this.four_list = _this.carList.splice(0, 4)
                    //   _this.other_list = _this.carList
                    // } else {
                    //   _this.four_list = _this.carList
                    // }
                    // _this.last_list = _this.carList ? _this.carList[_this.carList.length - 1] : null
                    // if(_this.last_list){
                    //   _this.$options.methods.getAlarm(_this.last_list.id, _this)
                    // }
                  }
                },
                error: function () {
                  console.log('请求失败')
                }
              })
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 告警信息列表
      getAlarm(id, _this) {
        $.ajax({
          url: _this.apiUrl + 'alert/',
          type: 'GET',
          dataType: 'json',
          data: {visitorInfoId: id},
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.alert = res.data.dataList
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 获得地图信息
      getMap: function () {
        if (this.$route.path === '/map') {
          var _this = this
          $.ajax({
            url: _this.apiUrl + 'map/my',
            type: 'GET',
            dataType: 'json',
            headers: {
              accessToken: _this.token
            },
            success: function (res) {
              if (res.code === 200) {
                _this.data = res.data
                $.ajax({
                  url: _this.apiUrl + 'visitorInfo/findListByMapId/?time=' + new Date().getTime(),
                  type: 'GET',
                  dataType: 'json',
                  data: {
                    mapId: res.data.id
                  },
                  headers: {
                    accessToken: _this.token
                  },
                  success: function (res) {
                    if (res.code === 200) {
                      _this.carList = res.data
                      if (_this.carList.length > 4) {
                        _this.four_list = _this.carList.splice(0, 4)
                        _this.other_list = _this.carList
                      } else {
                        _this.four_list = _this.carList
                      }
                      _this.last_list = _this.carList ? _this.carList[_this.bl] : null
                      if (_this.last_list) {
                        _this.$options.methods.getAlarm(_this.carList[_this.bl].id, _this)
                      }
                      if (_this.carList[_this.bl].videoDeviceBean !== null) {
                        if (sessionStorage.getItem('JsonJK')) {
                          var JSONID = JSON.parse(sessionStorage.getItem('JsonJK')).id
                          if (JSONID !== _this.carList[_this.bl].videoDeviceBean.id) {
                            _this.jsons.account = _this.carList[_this.bl].videoDeviceBean.account
                            _this.jsons.ip = _this.carList[_this.bl].videoDeviceBean.ip
                            _this.jsons.port = _this.carList[_this.bl].videoDeviceBean.port
                            _this.jsons.password = _this.carList[_this.bl].videoDeviceBean.password
                            _this.jsons.id = _this.carList[_this.bl].videoDeviceBean.id
                            _this.jsons.channel = _this.carList[_this.bl].videoDeviceBean.channel
                            sessionStorage.setItem('JsonJK', JSON.stringify(_this.jsons))
                          }
                        } else {
                          _this.jsons.account = _this.carList[_this.bl].videoDeviceBean.account
                          _this.jsons.ip = _this.carList[_this.bl].videoDeviceBean.ip
                          _this.jsons.port = _this.carList[_this.bl].videoDeviceBean.port
                          _this.jsons.password = _this.carList[_this.bl].videoDeviceBean.password
                          _this.jsons.id = _this.carList[_this.bl].videoDeviceBean.id
                          _this.jsons.channel = _this.carList[_this.bl].videoDeviceBean.channel
                          sessionStorage.setItem('JsonJK', JSON.stringify(_this.jsons))
                        }
                      }

                      for (var i = 0; i < res.data.length; i++) {
                        var num = []
                        _this.a1 = res.data[i].x ? res.data[i].x : -100
                        _this.b1 = res.data[i].y ? res.data[i].y : -100
                        _this.active = res.data[i].alert ? res.data[i].alert : false
                        _this.name = res.data[i].carBean.license ? res.data[i].carBean.license : '未知车辆'
                        num.push(_this.a1)
                        num.push(_this.b1)
                        num.push(_this.active)
                        num.push(_this.name)
                        _this.obj1[i] = _this.obj1[i] === undefined ? `${_this.a1},${_this.b1},${_this.active},${_this.name}` : _this.obj1[i] + '.' + num   //生成字符串组
                        // obj为车辆位移数组
                        _this.obj[i] = _this.obj1[i].split('.')  // 切割字符串为数组
                      }
                      this.timeOut = setTimeout(() => {
                        _this.getMap()
                      }, 1000)
                    }
                  },
                  error: function () {
                    console.log('请求失败')
                  }
                })
              }
            },
            error: function () {
              console.log('请求失败')
            }
          })
        } else {
          this.timeOut = ''
        }
      },
      // 加载图片
      drawImage1: function () {
        if (this.$route.path === '/map') {
          var _this = this
          var canvas = document.getElementById('imageCanvas')
          var ctx = canvas.getContext('2d')
          _this.image = new Image()
          _this.image.src = _this.imgUrl

          _this.zoomValue = _this.zoomArray[_this.zoomIndex]

          // 清除显示
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          // 缩放比
          _this.image.width = _this.image.width * _this.zoomValue
          _this.image.height = _this.image.height * _this.zoomValue

          canvas.width = _this.image.width
          canvas.height = _this.image.height
          ctx.scale(_this.zoomValue, _this.zoomValue)
          ctx.drawImage(_this.image, 0, 0)
          // 叠加覆盖物
          // this.refreshCover(ctx)
          _this.refreshCoverCar(ctx)

          if (_this && !_this._isDestroyed) {
            this.timeOutImg = setTimeout(() => {
              if (_this && !_this._isDestroyed) {
                _this.drawImage1()
                // window.requestAnimationFrame(_this.drawImage1);
              }
            }, 20)
          }
        } else {
          this.timeOutImg = ''
        }
      }
      ,
      // 加载覆盖物
      refreshCover: function (ctx) {
        var _this = this
        if (_this.obj.length >= 2) {
          for (var i = 0; i < _this.obj.length; i++) {
            ctx.beginPath()
            ctx.strokeStyle = _this.color[i]
            ctx.lineWidth = 5

            ctx.moveTo(_this.obj[i][0].split(',')[0], _this.obj[i][0].split(',')[1])

            for (var h = 0, max = _this.obj[i].length; h < max; h++) {
              // console.log(_this.obj[i][h])
              ctx.lineTo(_this.obj[i][h].split(',')[0], _this.obj[i][h].split(',')[1])
            }

            ctx.stroke()

          }
        }
        _this.refreshCoverCar(ctx)
      },
      // 加载车辆
      refreshCoverCar: function (ctx) {
        var _this = this
        // var markImage = new Image()
        // markImage.src = this.markUrl
        // _this.obj 长度为车辆数量
        var markImage0 = document.getElementById('img_car0')
        var markImage1 = document.getElementById('img_car1')
        var markImage2 = document.getElementById('img_car2')
        for (var h = 0, max = _this.obj.length; h < max; h++) {
          // markImage.src = _this.markUrl
          if (_this.obj[h].length >= 2) {
            var xy = _this.obj[h].pop()
            var xy1 = _this.obj[h].pop()
            _this.obj[h].push(xy1)
            _this.obj[h].push(xy)
            var a = xy.split(',')[0]
            var b = xy.split(',')[1]
            var active = xy.split(',')[2]
            var name = xy.split(',')[3]
            var a1 = xy1.split(',')[0]
            var b1 = xy1.split(',')[1]
            // 偏离量
            var px = (a - a1) / 50
            var py = (b - b1) / 50
            _this.a2[h] = _this.a2[h] === undefined ? parseInt(a1) : _this.a2[h] + px
            _this.b2[h] = _this.b2[h] === undefined ? parseInt(b1) : _this.b2[h] + py
            if (active === 'false') {
              markImage0.src = _this.markUrl
              ctx.drawImage(markImage0, _this.a2[h] - 32, _this.b2[h] - 32)
              ctx.font = "26px Arial"
              ctx.fillStyle = '#FCFCFC'
              ctx.fillText(name, _this.a2[h] - 52, _this.b2[h] - 32);
            }
            if (h === _this.bl) {
              // alert(h)
              markImage2.src = _this.markUrl_check
              ctx.drawImage(markImage2, _this.a2[h] - 32, _this.b2[h] - 32)
              ctx.font = "26px Arial"
              ctx.fillStyle = 'yellow'
              ctx.fillText(name, _this.a2[h] - 52, _this.b2[h] - 32);
            }
            if (active === 'true') {
              if (h === _this.bl) {
                markImage1.src = _this.markUrl_e
                ctx.drawImage(markImage1, _this.a2[h] - 32, _this.b2[h] - 32)
                ctx.font = "26px Arial"
                ctx.fillStyle = 'yellow'
                ctx.fillText(name, _this.a2[h] - 52, _this.b2[h] - 32);
              } else {
                markImage1.src = _this.markUrl_e
                ctx.drawImage(markImage1, _this.a2[h] - 32, _this.b2[h] - 32)
                ctx.font = "26px Arial"
                ctx.fillStyle = '#FCFCFC'
                ctx.fillText(name, _this.a2[h] - 52, _this.b2[h] - 32);
              }

            }
          }
        }
      }
      ,
      refreshCoverTrackLine: function () {

      }
      ,
      // 还原大小
      zoomDefault: function () {
        this.zoomIndex = 3
      }
      ,
      // 放大
      zoomIn: function () {
        var index = this.zoomIndex
        index++
        if (index >= this.zoomArray.length) {
          index = (this.zoomArray.length - 1)
        }
        this.zoomIndex = index
      }
      ,
      // 缩小
      zoomOut: function () {
        var index = this.zoomIndex
        index--
        if (index < 0) {
          index = 0
        }
        this.zoomIndex = index
      }
      ,
      // 移动（left, top）
      canvasMousedown: function (e) {
        // console.log('canvasMousedown')
        this.isMouseDown = true
        $('#imageCanvas').css('cursor', 'move')

        // var x = e.offsetX / this.zoomValue
        // var y = e.offsetY / this.zoomValue
        var x = e.offsetX
        var y = e.offsetY

        // 上一个节点
        this.lastPoint[0] = x
        this.lastPoint[1] = y
      }
      ,
      canvasMouseup: function (e) {
        $('#imageCanvas').css('cursor', 'auto')
        this.isMouseDown = false
      }
      ,
      canvasMousemove: function (e) {
        console.log('X = ' + (e.offsetX / this.zoomValue) + ' | Y = ' + (e.offsetY / this.zoomValue))
        if (this.isMouseDown === true) {
          // console.log('canvasMousemove')
          // 当前节点
          // var x = e.offsetX / this.zoomValue
          // var y = e.offsetY / this.zoomValue
          var x = e.offsetX
          var y = e.offsetY
          // 移动
          this.canvasMoveTo(this.lastPoint[0] - x, this.lastPoint[1] - y)
        }
      }
      ,
      canvasMoveTo: function (left, top) {
        // console.log('left = ' + left + ' | top = ' + top)
        var marginLeft = $('#imageCanvas').css('margin-left')
        var marginTop = $('#imageCanvas').css('margin-top')
        marginLeft = marginLeft.substring(0, marginLeft.length - 2)
        marginTop = marginTop.substring(0, marginTop.length - 2)
        marginLeft = parseInt(marginLeft)
        marginTop = parseInt(marginTop)
        marginLeft -= left
        marginTop -= top
        $('#imageCanvas').css({'margin-left': marginLeft, 'margin-top': marginTop})
      },
      reload() {
        if (sessionStorage.getItem('reload') === null) {
          sessionStorage.setItem('reload', '2')
          location.reload()
        }
      },
      // 获取告警列表
      getList() {

      }

    },
    created() {
      // this.reload()
      this.zoomIndex = 0
    },
    // watch: {
    //   zoomIndex: {
    //     handler: function () {
    //
    //     }
    //     ,
    //     deep: true
    //   }
    // }
    // ,
  }
</script>
<style scoped lang="less">
  .container-fluid {
    margin-left: 250px;
    padding-top: 100px;
    width: 100%;
    .tab1 {
      div {
        margin-top: 10px;
        p {
          display: inline-block;
          width: 80px;
        }
        span {
          display: inline-block;
        }
      }
    }
    .nav {
      position: relative;
      .fonts {
        display: inline-block;
        width: 140px;
        height: 60px;
        line-height: 60px;
        font-size: 22px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        background: url("../common/image/u160.png") no-repeat;
        background-size: 100% 100%;
      }
      .license {
        height: 60px;
        line-height: 60px;
        /*margin: 10px !important;*/
        .el-col-6 {
          text-align: center;
          span {
            width: 160px;
            display: inline-block;
            padding: 0 10px;
            color: #fff;
            border-radius: 6px;
            height: 40px;
            line-height: 40px;
            background: #409EFF;
            cursor: pointer;
          }
        }
      }
      .license1 {
        background: rgba(255, 255, 255, 0.5);
        .el-col-6 {
          text-align: center;
          .grid-content {
            margin-bottom: 20px;
            span {
              width: 160px;
              display: inline-block;
              padding: 0 10px;
              cursor: pointer;
              color: #fff;
              border-radius: 6px;
              height: 40px;
              line-height: 40px;
              background: #409EFF;
            }
          }
        }
      }
      .el-icon-arrow-right {
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
      .cols {
        width: 100%;
        position: absolute;
        top: 60px;
        left: 0px;
        z-index: 99;
        /*margin-top: 10px;*/
        .grid-content {
          margin-top: 10px;
        }
      }
    }
  }

  .mapCanvas {
    overflow: hidden;
    height: 720px;
    background: whitesmoke;
    position: relative;
  }

  #positionButtonDiv {
    /* Fallback for web browsers that doesn't support RGBa */
    background: rgb(58, 56, 63);
    /* RGBa with 0.6 opacity */
    background: rgba(58, 56, 63, 0.4);
    border: solid 1px #100000;
    color: #FFFFFF;
    padding: 8px;
    text-align: left;
    position: absolute;
    right: 35px;
    top: 10px;
  }

  #positionButtonDiv .positionButtonSpan img {
    float: right;
    border: 0;
  }

  .positionMapClass area {
    cursor: pointer;
  }

  .zoomButton {
    border: 0;
    cursor: pointer;
  }

  .righ {
    width: 290px;
  }
</style>
