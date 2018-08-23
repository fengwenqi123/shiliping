<template>
  <div class="carRegistration">
    <el-row>
      <el-col :span="12">
        <div class="left">
          <div class="demo-input-suffix">
            <span>车牌号码：</span>
            <el-input
              placeholder="请输入车牌号码"
              v-model="carId"
              clearable>
            </el-input>
            <em>*</em>
          </div>
          <div class="demo-input-suffix">
            <span>驾驶员：</span>
            <el-input
              placeholder="请输入驾驶员"
              v-model="pilot"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>身份证号：</span>
            <el-input
              placeholder="请输入身份证号"
              v-model="idCard"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>联系电话：</span>
            <el-input
              placeholder="请输入联系电话"
              v-model="mobile"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>随车民警：</span>
            <el-input
              placeholder="请输入随车民警"
              v-model="police"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>事由：</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入事由"
              v-model="cause">
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>车辆跟踪器：</span>
            <el-select v-model="positionDeviceId" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <em>*</em>
          </div>
          <div class="demo-input-suffix">
            <span>行驶线路：</span>
            <el-select v-model="lineId" clearable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
      </el-col>
      <el-col :span="12">
        <div class="right">
          <div class="demo-input-suffix">
            <span>上传图片：</span>
            <el-upload
              ref="upload"
              :action="upLoadUrl"
              :auto-upload="true"
              :headers="headers"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              list-type="picture-card"
              :limit="limit"
              :on-exceed="limit1"
              class="upload"
              :on-success="success"
              :file-list="fileList"
              :before-remove="beforeRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor,template-curly-spacing */

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        limit: 1,
        carId: '',
        pilot: '',
        police: '',
        mobile: '',
        cause: '',
        idCard: '',
        positionDeviceId: '',
        lineId: '',
        id: '',
        image: '',
        description: '',
        upLoadData: {},
        fileList: [],
        token: window.localStorage.getItem('token'),
        upLoadUrl: this.ImgUploadUrl,
        options: [],
        options1: []
      }
    },
    computed: {
      headers() {
        return {
          accessToken: this.token
        }
      }
    },
    created() {
    },
    mounted() {
      this.getQuery()
      this.getLine()
      this.getPositionDevice()
    },
    methods: {
      success(response, file, fileList) {
        if (response.code === 200) {
          this.image = `${this.apiUrl}storage/${response.data}`
        } else {
          this.$alert(response.msg, '提示', {
            confirmButtonText: '确定'
          })
        }
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`)
      },
      limit1() {
        this.$alert('最多只能选择一张图片', '提示', {
          confirmButtonText: '确定'
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
        this.image = null
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      // 获取路由传参
      getQuery() {
        this.id = this.$route.params.id
        this.pilot = this.$route.params.pilot
        this.idCard = this.$route.params.idCard
        this.police = this.$route.params.police
        this.mobile = this.$route.params.mobile
        this.cause = this.$route.params.cause
        this.image = this.$route.params.image
        this.carId = this.$route.params.carId
        this.positionDeviceId = this.$route.params.positionDeviceId
        this.lineId = this.$route.params.lineId
        this.description = this.$route.params.description
        if (!this.$route.params.image) {
          this.fileList = []
        } else {
          this.fileList.push({
            name: '',
            url: ''
          })
          this.fileList[0].name = this.$route.params.image
          this.fileList[0].url = this.$route.params.image
        }
      },
      // 获取路线
      getLine() {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'line/',
          type: 'GET',
          dataType: 'json',
          data: {
            pageSize: 100000
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              var data = res.data.dataList
              data.forEach((item, index) => {
                var obj = {}
                obj.value = item.id
                obj.label = item.name
                _this.options1.push(obj)
              })
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 获取跟踪器
      getPositionDevice() {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'positionDevice/',
          type: 'GET',
          dataType: 'json',
          data: {
            pageSize: 100000
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              var data = res.data.dataList

              data.forEach((item, index) => {
                var obj = {}
                obj.value = item.id
                obj.label = item.name
                _this.options.push(obj)
              })
              console.log(_this.options)
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 保存
      save() {
        if (!this.carId) {
          this.$message({
            message: '请先填写车牌号码',
            type: 'warning'
          })
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'visitorInfo/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            pilot: _this.pilot,
            idCard: _this.idCard,
            police: _this.police,
            mobile: _this.mobile,
            cause: _this.cause,
            image: _this.image,
            license: _this.carId,
            positionDeviceId: _this.positionDeviceId,
            lineId: _this.lineId,
            description: _this.description
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
  .carRegistration {
    em {
      color: red;
      font-style: normal;
    }
    .block {
      display: inline-block;
    }
    padding: 10px 20px;
    position: absolute;
    margin-top: 80px;
    margin-left: 300px;
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
        width: 270px;
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
  }

</style>
