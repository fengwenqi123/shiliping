<template>
  <div class="carModification">
    <el-row>
      <el-col :span="12">
        <div class="left">
          <div class="demo-input-suffix">
            <span>编码：</span>
            <el-input
              placeholder="请输入编码"
              v-model="code"
              clearable>
            </el-input>
            <em>*</em>
          </div>
          <div class="demo-input-suffix">
            <span>车牌号码：</span>
            <el-input
              placeholder="请输入车牌号码"
              v-model="license"
              clearable>
            </el-input>
            <em>*</em>
          </div>
          <div class="demo-input-suffix">
            <span>车辆类型：</span>
            <el-input
              placeholder="请输入车辆类型"
              v-model="model"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>所有人：</span>
            <el-input
              placeholder="请输入所有人"
              v-model="contract"
              clearable>
            </el-input>
            <em>*</em>
          </div>
          <div class="demo-input-suffix">
            <span>所有人联系电话：</span>
            <el-input
              placeholder="请输入所有人联系电话"
              v-model="mobile"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>住址：</span>
            <el-input
              placeholder="请输入住址"
              v-model="address"
              clearable>
            </el-input>
          </div>

          <div class="demo-input-suffix">
            <span>使用性质：</span>
            <el-input
              placeholder="请输入使用性质"
              v-model="nature"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>品牌型号：</span>
            <el-input
              placeholder="请输入品牌型号"
              v-model="brand"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>车辆识别代号：</span>
            <el-input
              placeholder="请输入车辆识别代号"
              v-model="number"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>注册日期：</span>
            <el-date-picker
              v-model="registerDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
          <div class="demo-input-suffix">
            <span>备注：</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入备注"
              v-model="description">
            </el-input>
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
          <div class="demo-input-suffix">
            <span>发动机号：</span>
            <el-input
              placeholder="请输入发动机号"
              v-model="engine"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>发证日期：</span>
            <el-date-picker
              v-model="certificateDate"
              type="date"
              placeholder="选择发证日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd">
            </el-date-picker>
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
        code: '',
        license: '',
        model: '',
        contract: '',
        mobile: '',
        address: '',
        nature: '',
        brand: '',
        number: '',
        engine: '',
        upLoadUrl: this.ImgUploadUrl,
        registerDate: '',
        certificateDate: '',
        id: '',
        image: '',
        description: '',
        upLoadData: {},
        fileList: [],
        token: window.localStorage.getItem('token')
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
        this.code = this.$route.params.code
        this.license = this.$route.params.license
        this.model = this.$route.params.model
        this.contract = this.$route.params.contract
        this.mobile = this.$route.params.mobile
        this.address = this.$route.params.address
        this.nature = this.$route.params.nature
        this.brand = this.$route.params.brand
        this.number = this.$route.params.number
        this.engine = this.$route.params.engine
        this.registerDate = this.$route.params.registerDate
        this.certificateDate = this.$route.params.certificateDate
        this.image = this.$route.params.image ? `${this.apiUrl}storage/${this.$route.params.image}` : ''
        this.description = this.$route.params.description
        if (!this.$route.params.image) {
          this.fileList = []
        } else {
          this.fileList.push({
            name: '',
            url: ''
          })
          this.fileList[0].name = this.$route.params.image
          this.fileList[0].url = `${this.apiUrl}storage/${this.fileList[0].name}`
        }
      },
      // 保存
      save() {
        console.log(this.registerDate)
        if (!this.code) {
          this.$message({
            message: '请先填写编码',
            type: 'warning'
          })
          return
        }
        if (!this.license) {
          this.$message({
            message: '请先填写车牌号码',
            type: 'warning'
          })
          return
        }
        if (!this.contract) {
          this.$message({
            message: '请先填写所有人',
            type: 'warning'
          })
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'car/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            code: _this.code,
            license: _this.license,
            model: _this.model,
            contract: _this.contract,
            mobile: _this.mobile,
            address: _this.address,
            nature: _this.nature,
            brand: _this.brand,
            number: _this.number,
            engine: _this.engine,
            registerDate: _this.registerDate,
            certificateDate: _this.certificateDate,
            image: _this.image,
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
  .carModification {
    width: 100%;
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
    margin-left: 200px;
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
  }

</style>
