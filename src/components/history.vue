<template>
  <div class="container-fluid">
    <div class="row">
      <el-row :gutter="20" style="width:100%;">
        <el-col :span="18">
          <div id="mapCanvas" class="mapCanvas" @click='updateXY'>
            <div class="imgsrc">
              <img
                @mouseup="canvasMouseup"
                @mousedown="canvasMousedown"
                @mousemove="canvasMousemove"
                id="images1" v-bind:src="imgUrl" alt=""/>
              <img id="imgCar" src="" alt="">
            </div>
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
          </div>
          <Progress v-if="timeAll" :timeAll="timeAll" @ievent="ievent"></Progress>
        </el-col>
        <el-col :span="6">
          <div>
            <div class="righ">
              <div>
                <webVideohf></webVideohf>
              </div>
              <div>
                <el-tabs v-model="activeName" stretch="true" type="border-card" @tab-click="handleClick">
                  <el-tab-pane class="tab1" label="告警车辆信息" name="first">
                    <div><p>驾驶员：</p><span>{{historyInfo.pilot}}</span></div>
                    <div><p>手机号码：</p><span>{{historyInfo.mobile}}</span></div>
                    <div><p>随车民警：</p><span>{{historyInfo.police}}</span></div>
                    <div><p>进入时间：</p><span>{{historyInfo.startTimeString}}</span></div>
                    <div><p>驶离时间：</p><span>{{historyInfo.endTimeString}}</span></div>
                    <div><p>停留时间：</p><span></span></div>

                  </el-tab-pane>
                  <el-tab-pane label="抓拍图片" name="pic">
                  </el-tab-pane>
                  <el-tab-pane label="历史告警信息" name="second">
                    <p v-for="item in alert" :key="item.id"><span class="time">{{item.modifyTimeString}}</span><span
                      class="alert">{{item.alert}}</span></p>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  /* eslint-disable no-new */
  /* eslint-disable */
  import webVideohf from '@/base/webVideoHF'
  import Progress from '@/base/progress'

  var list = [];
  var list1 = [];
  var arr = [];
  const images = new Image()
  export default {
    components: {
      Progress,
      webVideohf
    },
    data() {
      return {
        obj: {},
        timeAll: null,
        id: '',
        activeName: 'first',
        stop: false,
        show: '',
        tab: true,
        num_car: [],
        dataList: '',
        carList: [],
        obj1: [],
        obj2: [],
        token: window.localStorage.getItem('token'),
        leftTitle: '左侧区域',
        imgUrl: 'http://192.168.1.207:8100/storage/201806201205262740.png',
        markUrl: 'static/img/cars.png',
        markUrl_e: 'static/img/red.png',
        markUrl_check: 'static/img/yellow.png',
        zoomValue: null,
        zoomIndex: 0,
        lastPoint: [0, 0],
        isMouseDown: false,
        image: null,
        timeOut: null,
        timeOutImg: null,
        jsons: {},
        active: null,
        bl: 0,
        name: null,
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
          0.6,
          0.8,
          1,
          1.2,
          1.4,
          1.6,
          1.8,
          2.0
        ],
        width: '',
        height: '',
        historyInfo: {
          pilot: null,
          mobile: null,
          police: null,
          startTimeString: null,
          endTimeString: null
        },
        visitorInfoPointss: [],
        visitorInfoPoints: [
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:17",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 135,
            "longitude": 12,
            "latitude": 12,
            "x": 1,
            "y": 1,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '111',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '33'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 1,
              "y": 1
            }
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:18",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 135,
            "longitude": 12,
            "latitude": 12,
            "x": 12,
            "y": 12,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '111',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '33'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 11,
              "y": 12
            }
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:19.5",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 135,
            "longitude": 12,
            "latitude": 12,
            "x": 22,
            "y": 22,
            "videoDeviceId": "1",
            "alertBean": null,
            'deviceBean': {
              'id': '111',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '33'
            },
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:20",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 135,
            "longitude": 12,
            "latitude": 12,
            "x": 33,
            "y": 33,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '111',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '33'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 123,
              "y": 145
            }
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:21.2",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 135,
            "longitude": 12,
            "latitude": 12,
            "x": 44,
            "y": 44,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '111',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '33'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 123,
              "y": 145
            }
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:22",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 135,
            "longitude": 12,
            "latitude": 12,
            "x": 55,
            "y": 55,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '111',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '33'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 123,
              "y": 145
            }
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:23",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 90,
            "longitude": 12,
            "latitude": 12,
            "x": 66,
            "y": 66,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '222',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '34'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 123,
              "y": 145
            }
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:24.2",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 90,
            "longitude": 12,
            "latitude": 12,
            "x": 77,
            "y": 66,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '222',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '34'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 123,
              "y": 145
            }
          },
          {
            "id": "1",
            "addTimeString": "2018-08-22 14:17:25.5",
            "modifyTimeString": "2018-08-22 14:17:17",
            "visitorInfoId": "3svTtgZGkoyfebYQq9KMoF",
            "speed": 12,
            "course": 90,
            "longitude": 12,
            "latitude": 12,
            "x": 88,
            "y": 66,
            "videoDeviceId": "1",
            'deviceBean': {
              'id': '111',
              'ip': '192.168.27.2',
              'port': '8000',
              'account': 'admin',
              'password': 'admin123456',
              'channel': '33'
            },
            "alertBean": {
              "id": "2",
              "addTimeString": null,
              "modifyTimeString": null,
              "code": "1",
              "name": "a1",
              "alert": "跨区报警",
              "type": 1,
              "speed": 30,
              "course": 12,
              "longitude": 1.1,
              "latitude": 1,
              "x": 123,
              "y": 145
            }
          }
        ],
        flag: false
      }
    },
    mounted() {
      sessionStorage.removeItem('show')
      setTimeout(() => {
        this.visitorInfoPointss = JSON.parse(JSON.stringify(this.visitorInfoPoints))
        this.onloadImg()
        this.onloadCar()
        this.getD()
        this.video()
      }, 50)
      this.getQuery()
    },
    methods: {
      getQuery() {
        this.id = this.$route.params.id ? this.$route.params.id : window.sessionStorage.getItem('hisId')
        window.sessionStorage.setItem('hisId', this.id)
        this.getCar()
      },
      updateXY: function (event) {
        var x = event.offsetX
        var y = event.offsetY
        // alert(x + "," + y)
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getCar() {
        var _this = this
        _this.id = window.sessionStorage.getItem('hisId')
        $.ajax({
          url: `${_this.apiUrl}visitorHistoryInfo/playback/${_this.id}`,
          type: 'GET',
          dataType: 'json',
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.historyInfo = res.data.historyInfo
              // _this.visitorInfoPoints = res.data.visitorInfoPoints
              // this.visitorInfoPointss = JSON.parse(JSON.stringify(this.visitorInfoPoints))
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 加载图片
      onloadImg() {
        // 设置图片比例
        this.zoomValue = this.zoomArray[this.zoomIndex]
        // 缩放比
        this.image = document.getElementById('images1')
        var images = new Image()
        images.src = this.imgUrl
        this.width = images.width
        this.height = images.height
        this.image.width = this.width * this.zoomValue
        this.image.height = this.height * this.zoomValue
        $('.imgsrc').width(this.image.width + 'px')
        $('.imgsrc').height(this.image.height + 'px')
      },
      // 加载车辆
      onloadCar() {
        this.zoomValue = this.zoomArray[this.zoomIndex]
        // 初始化
        if (this.visitorInfoPoints.length !== null) {
          var imageCar = new Image()
          imageCar.src = this.markUrl
          var widthCar = imageCar.width
          var heightCar = imageCar.height
          $('#imgCar').attr('src', this.markUrl)
          $('#imgCar').css({
            'top': this.visitorInfoPointss[0].x * this.zoomValue + 'px',
            'left': this.visitorInfoPointss[0].y * this.zoomValue + 'px',
            'width': 25 * this.zoomValue + 'px',
            'height': 50 * this.zoomValue + 'px',
            'transform': `rotate(${this.visitorInfoPoints[0].course}deg)`
        })
          // 获取时间长短
          this.timeAll = this.getTime(this.visitorInfoPoints[0].addTimeString, this.visitorInfoPoints[this.visitorInfoPoints.length - 1].addTimeString)
        }
      },
      // 视频开始
      video(first) {
        if (first) {
          var video = first
          window.sessionStorage.removeItem('video')
          window.sessionStorage.setItem('video', JSON.stringify(video))
        }
      },
      getD() {
        this.start()
      },
      // 动画开始
      start() {
        var _this = this
        if (this.visitorInfoPointss.length >= 2) {
          var first = this.visitorInfoPointss[0]
          var last = this.visitorInfoPointss[1]
          var timec = this.getTime(first.addTimeString, last.addTimeString)
          var Xc = last.x * this.zoomValue
          var Yc = last.y * this.zoomValue
          this.video(first)
          $('#imgCar').css({
            'transform': `rotate(${first.course}deg)`
          })
          $('#imgCar').animate({
            left: Xc + 'px',
            top: Yc + 'px',
          }, timec * 1000, "linear", function () {
            _this.visitorInfoPointss.shift()
            _this.start()
          })
        } else if (this.visitorInfoPointss.length === 1) {
          var first = this.visitorInfoPointss[0]
          $('#imgCar').css({
            'transform': `rotate(${first.course}deg)`
          })
          this.video(first)
        }
      },
      // 进度条控制
      ievent(data) {
        if (this.visitorInfoPoints.length !== null) {
          var timestamp2 = new Date(this.visitorInfoPoints[0].addTimeString.substring(0, 19).replace(/-/g, '/')).getTime() / 1000 + data[0]
          var NowTime = this.getMyDate(timestamp2 * 1000)
          if (!data[1]) {
            $('#imgCar').stop()
            this.stop = true
            sessionStorage.setItem('stop', this.stop)
          } else {
            this.show = '1'
            sessionStorage.setItem('show', this.show)
            this.visitorInfoPoints.forEach((item, index) => {
              if (item.addTimeString.indexOf(NowTime) !== -1) {
                this.visitorInfoPointss = JSON.parse(JSON.stringify(this.visitorInfoPoints))
                this.visitorInfoPointss.splice(0, index)
                $('#imgCar').css({
                  'top': this.visitorInfoPointss[0].x * this.zoomValue + 'px',
                  'left': this.visitorInfoPointss[0].y * this.zoomValue + 'px',
                })
                this.start()
              }
            })
          }
        }
      },
      // 时间差
      getTime(faultDate, completeTime) {
        faultDate = faultDate.substring(0, 19).replace(/-/g, '/');
        var stime = new Date(faultDate).getTime() / 1000
        completeTime = completeTime.substring(0, 19).replace(/-/g, '/');
        var etime = new Date(completeTime).getTime() / 1000
        var usedTime = etime - stime;  //两个时间戳相差的毫秒数
        return usedTime
      },
      // 时间戳转字符串
      getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth() + 1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          oTime = oYear + '-' + this.getzf(oMonth) + '-' + this.getzf(oDay) + ' ' + this.getzf(oHour) + ':' + this.getzf(oMin) + ':' + this.getzf(oSen);//最后拼接时间
        return oTime;
      },
      //补0操作
      getzf(num) {
        if (parseInt(num) < 10) {
          num = '0' + num;
        }
        return num;
      },

      // 放大
      zoomIn: function () {
        var index = this.zoomIndex
        index++
        if (index >= this.zoomArray.length) {
          index = (this.zoomArray.length - 1)
        }
        this.zoomIndex = index
        this.onloadImg()
        this.onloadCar()
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
        this.onloadImg()
        this.onloadCar()
      }
      ,
      // 移动（left, top）
      canvasMousedown: function (e) {
        // console.log('canvasMousedown')
        this.isMouseDown = true
        $('.imgsrc').css('cursor', 'move')

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
        $('.imgsrc').css('cursor', 'auto')
        this.isMouseDown = false
      }
      ,
      canvasMousemove: function (e) {
        // console.log('X = ' + (e.offsetX / this.zoomValue) + ' | Y = ' + (e.offsetY / this.zoomValue))
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
        var marginLeft = $('.imgsrc').css('margin-left')
        var marginTop = $('.imgsrc').css('margin-top')
        marginLeft = marginLeft.substring(0, marginLeft.length - 2)
        marginTop = marginTop.substring(0, marginTop.length - 2)
        marginLeft = parseInt(marginLeft)
        marginTop = parseInt(marginTop)
        marginLeft -= left
        marginTop -= top
        $('.imgsrc').css({'margin-left': marginLeft, 'margin-top': marginTop})
        // $('#imgCar').css({'margin-left': marginLeft, 'margin-top': marginTop})
      },

    }
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
    .imgsrc {
      position: relative;
      display: inline-block;
      height: 720px;
      #images1 {
        position: absolute;
        /*top: 50%;*/
        /*left: 50%;*/
      }
      #imgCar {
        position: absolute;
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
    width: 380px;
  }
</style>
