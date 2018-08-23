<template>
  <div class="container-fluid">
    <div class="row">
      <div id="mapCanvas" class="col-md-9 mapCanvas">
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
      </div>
      <div class="col-md-3">
        <div class="panel panel-default">
          <div class="panel-heading" style="background-color: darkslateblue; height: 250px;">
          </div>
        </div>
        <div>
          <el-tabs stretch="true" type="border-card" @tab-click="handleClick">
            <el-tab-pane class="tab1" label="告警车辆信息" name="first">
              <div><p>驾驶员：</p><span>{{last_list.pilot}}</span></div>
              <div><p>车牌号码：</p><span>{{last_list.carBean.license}}</span></div>
              <div><p>手机号码：</p><span>{{last_list.carBean.mobile}}</span></div>
              <div><p>随车民警：</p><span>{{last_list.police}}</span></div>
              <div><p>进入时间：</p><span>{{last_list.carBean.addTimeString}}</span></div>
              <div><p>停留时间：</p><span></span></div>
              <div><p>定位标示：</p><span></span></div>

            </el-tab-pane>
            <el-tab-pane label="历史告警信息" name="second">历史告警信息</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /* eslint-disable */
  /* eslint-disable no-new */
  /* eslint-disable */

  var list = [];
  var list1 = [];
  var arr = []
  export default {
    data() {
      return {
        id: '',
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
        imgUrl: 'static/img/2.jpg',
        markUrl: 'static/img/car2.png',
        zoomValue: 1,
        zoomIndex: null,
        lastPoint: [0, 0],
        isMouseDown: false,
        color: ['#008B8B', '#6959CD', '#90EE90', '#9BCD9B', '#FFF68F', '#EEC900', '#EE6363', '#CDBA96', '#FF8C69', '#FFAEB9'],
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
        last_list: {
          carBean: {
            license: ''
          }
        },
        zoomArray: [
          0.5,
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
      this.getQuery()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 获取路由传参
      getQuery() {
        this.id = this.$route.params.id
        this.getTrack()

      },
      // 获取轨迹位置
      getTrack() {
        var _this = this
        $.ajax({
          url: `${_this.apiUrl}visitorHistoryInfo/playback/${_this.id}`,
          type: 'GET',
          dataType: 'json',
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
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
      // 加载图片
      drawImage1: function () {
        var _this = this
        var canvas = document.getElementById('imageCanvas')
        var ctx = canvas.getContext('2d')
        var image = new Image()
        image.src = _this.imgUrl

        _this.zoomValue = _this.zoomArray[_this.zoomIndex]

        // 清除显示
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // 缩放比
        image.width = image.width * _this.zoomValue
        image.height = image.height * _this.zoomValue

        canvas.width = image.width
        canvas.height = image.height
        ctx.scale(_this.zoomValue, _this.zoomValue)
        ctx.drawImage(image, 0, 0)
        // 叠加覆盖物
        // this.refreshCover(ctx)
        _this.refreshCoverCar(ctx)

        if (_this && !_this._isDestroyed) {
          setTimeout(() => {
            if (_this && !_this._isDestroyed) {
              // _this.drawImage1()
              window.requestAnimationFrame(_this.drawImage1);
            }
          }, 10000)
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
        var markImage = new Image()
        markImage.src = _this.markUrl
        for (var h = 0, max = _this.obj.length; h < max; h++) {

          // for (var n = 1, max1 = _this.obj[h].length; n < max1; n++) {
          if (_this.obj[h].length >= 2) {
            var xy = _this.obj[h].pop()
            var xy1 = _this.obj[h].pop()
            _this.obj[h].push(xy1)
            _this.obj[h].push(xy)
            var a = xy.split(',')[0]
            var b = xy.split(',')[1]
            var a1 = xy1.split(',')[0]
            var b1 = xy1.split(',')[1]
            // 偏离量
            var px = (a - a1) / 400
            var py = (b - b1) / 400
            _this.a2[h] = _this.a2[h] === undefined ? 0 : _this.a2[h] + Math.floor(px)
            _this.b2[h] = _this.b2[h] === undefined ? 500 : _this.b2[h] - Math.floor(py)
            // console.log(px)
            // console.log(py)
            ctx.drawImage(markImage, _this.a2[h], _this.b2[h])
          }
          // }
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
          console.log('canvasMousemove')
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
        console.log('left = ' + left + ' | top = ' + top)
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
    },
    created() {
      this.zoomIndex = 3
    },
    watch: {
      zoomIndex: {
        handler: function () {
          this.drawImage1()
        }
        ,
        deep: true
      }
    }
    ,
  }
</script>
<style scoped lang="less">
  .container-fluid {
    margin-left: 250px;
    padding-top: 80px;
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
</style>
