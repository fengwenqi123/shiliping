<template>
  <div class="lineModification">
    <div class="left">
      <div class="demo-input-suffix">
        <span>所属监区：</span>
        <el-select v-model="Prison" placeholder="请选择" @change="changeselect">
          <el-option
            v-for="item in Prison_options"
            :key="item.value"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>路线编号：</span>
        <el-input
          placeholder="请输入路线编号"
          v-model="code"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>路线名称：</span>
        <el-input
          placeholder="请输入路线名称"
          v-model="name"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>最高限速：</span>
        <el-input
          placeholder="请输入最高限速"
          v-model="maxSpeed"
          clearable>
        </el-input>
        <em>*</em>
      </div>
      <div class="demo-input-suffix">
        <span>状态：</span>
        <el-radio v-model="status" label="1">启用</el-radio>
        <el-radio v-model="status" label="2">禁用</el-radio>
      </div>
      <el-row>
        <el-button type="success" @click="save">
          保存
        </el-button>
        <el-button @click="cancel">
          取消
        </el-button>
        <el-button class="back" @click="back" v-if="JSON.stringify(Prison) !=='{}'">
          撤回
        </el-button>

      </el-row>
      <el-dialog title="路线设置" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="经度" :label-width="formLabelWidth">
            <el-input v-model="form.longitude" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="纬度" :label-width="formLabelWidth">
            <el-input v-model="form.latitude" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="x" :label-width="formLabelWidth" v-show="true">
            <el-input v-model="form.x" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="y" :label-width="formLabelWidth" v-show="true">
            <el-input v-model="form.y" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="摄像头名称" :label-width="formLabelWidth">
            <el-select v-model="form.videoDeviceId" placeholder="请选择活动区域">
              <el-option v-for="item in xy" :key="item.id" :label=item.code :value=item.id></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel1">取 消</el-button>
          <el-button type="primary" @click="sure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="right" id="right" v-show="JSON.stringify(Prison) !=='{}'" @click="img">
      <img :src="Prison.value" alt="" class="Prison">
      <div id="parent"></div>
      <canvas id="canvas"></canvas>
    </div>
  </div>

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor,template-curly-spacing */

  // const p = 4
  const w = 850
  export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          longitude: '',
          latitude: '',
          x: '',
          y: '',
          videoDeviceId: ''
        },
        formLabelWidth: '120px',
        Prison: {},
        Prison_options: [],
        status: '1',
        code: '',
        name: '',
        mapId: '',
        maxSpeed: '',
        id: '',
        description: '',
        x: '',
        y: '',
        num: [],
        mapCode: '',
        Points: [],
        xy: [],
        xy_mod: [],
        xy_img: [],
        array_num: [],
        ctx: '',
        arr: [],
        token: window.localStorage.getItem('token')
      }
    },
    created() {
    },
    mounted() {
      this.getPrison()
    },
    methods: {
      handleClose(done) {
        $('.right').children('p:last-child').remove()
        done()
      },
      sure() {
        this.dialogFormVisible = false
        var obj = {}
        obj.x = this.form.x
        obj.y = this.form.y
        obj.longitude = this.form.longitude
        obj.latitude = this.form.latitude
        obj.videoDeviceId = this.form.videoDeviceId
        this.array_num.push(obj)
        // console.log(this.array_num)
      },
      cancel1() {
        this.dialogFormVisible = false
        $('.right').children('p:last-child').remove()
      },
      img(event) {
        var image = new Image()
        image.src = this.Prison.value
        var Multiple = parseInt(image.width) / w
        var x = Math.round(event.offsetX * Multiple)
        var y = Math.round(event.offsetY * Multiple)
        var img = document.createElement('p')
        var right = document.getElementById('right')
        img.setAttribute('data-x', x)
        img.setAttribute('data-y', y)
        img.style.position = 'absolute'
        img.style.zIndex = 91
        img.style.borderRadius = '10px'
        img.style.backgroundColor = '#00EEEE'
        img.style.width = '10px'
        img.style.height = '10px'
        img.style.cursor = 'crosshair'
        img.style.top = y / Multiple - 5 + 'px'
        img.style.left = x / Multiple - 5 + 'px'
        this.form.x = x
        this.form.y = y
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
              _this.form.longitude = res.data.longitude
              _this.form.latitude = res.data.latitude
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
        this.dialogFormVisible = true
        right.appendChild(img)
      },
      changeselect() {
        this.num = []
        var id = this.Prison.id
        this.getPoints(id)
        // this.getRound()
      },
      // 获取所有监控
      getPoints(mapId) {
        var _this = this
        $.ajax({
          url: ` ${_this.apiUrl}videoDevice/map/${mapId}`,
          type: 'GET',
          dataType: 'json',
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.xy = res.data
              setTimeout(() => {
                _this.getRound()
              }, 100)
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 获取监区地图
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
                obj.label = item.name
                obj.value = item.image
                obj.id = item.id
                obj.code = item.code
                _this.Prison_options.push(obj)
              })
              _this.Prison_options.forEach((item, index) => {
                if (_this.mapId === item.id) {
                  _this.Prison = item
                }
              })
              console.log(_this.Prison)
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 生成监控设备坐标
      getRound() {
        var image = new Image()
        image.src = this.Prison.value
        var Multiple = parseInt(image.width) / w
        var parent = document.getElementById('parent')
        parent.innerHTML = ''
        for (var i = 0; i < this.xy.length; i++) {
          var y = this.xy[i].y / Multiple
          var x = this.xy[i].x / Multiple
          var img = document.createElement('img')
          img.setAttribute('data-x', x)
          img.setAttribute('data-y', y)
          img.setAttribute('data-id', this.xy[i].id)
          img.style.position = 'absolute'
          img.style.zIndex = 90
          img.src = 'static/img/sxt.png'
          img.style.width = '18px'
          img.style.height = '18px'
          img.style.cursor = 'crosshair'
          img.style.top = y - 9 + 'px'
          img.style.left = x - 9 + 'px'
          img.onmouseover = function () {
            this.style.width = '26px'
            this.style.height = '26px'
          }
          img.onmouseout = function () {
            this.style.width = '18px'
            this.style.height = '18px'
          }
          parent.appendChild(img)
        }
      },
      // 撤销划线
      back() {
        this.array_num.pop()
        $('.right').children('p:last-child').remove()
      },
      // 保存
      save() {
        if (!this.Prison) {
          this.$message({
            message: '请先选择所属监区',
            type: 'warning'
          })
          return
        }
        if (!this.code) {
          this.$message({
            message: '请先填写线路编号',
            type: 'warning'
          })
          return
        }
        if (!this.name) {
          this.$message({
            message: '请先填写路线名称',
            type: 'warning'
          })
          return
        }
        if (!this.maxSpeed) {
          this.$message({
            message: '请先填写最高限速',
            type: 'warning'
          })
          return
        }
        this.mapId = this.Prison.id
        var _this = this
        for (var i = 0; i < this.num.length; i++) {
          _this.Points.push(this.num[i].id)
        }
        var Points = _this.Points.join(',')
        console.log(Points)
        $.ajax({
          url: _this.apiUrl + 'line/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            code: _this.code,
            name: _this.name,
            mapId: _this.mapId,
            maxSpeed: _this.maxSpeed,
            status: _this.status,
            description: _this.description,
            gatherPoints: JSON.stringify(_this.array_num)
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
  .lineModification {
    width: 100%;
    em {
      color: red;
      font-style: normal;
    }
    display: flex;
    .left {
      flex: 1;
    }
    .right {
      width: 850px;
      position: relative;
      .Prison {
        width: 100%;
      }
      #parent {
        position: absolute;
        top: 0;
        left: 0px;
        img {
          position: absolute;
          wdith: 10px;
          height: 10px;
        }
      }
      #canvas {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .block {
      display: inline-block;
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
        width: 130px;
      }
      .el-input__inner {
        width: 230px;
      }
      .el-textarea {
        display: inline-block;
        width: 370px;
      }
    }
    .el-row {
      text-align: center;
      margin-top: 20px;
    }
    .el-button {
      width: 120px;
    }
    .second {
      text-indent: 10px;
    }

    .three {
      text-indent: 20px;
    }
    .upload {
      width: 334px;
      display: inline-block;
    }
    .el-select {
      margin-right: 30px;
    }
  }

</style>
