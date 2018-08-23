<template>
  <div class="mapModification">
    <div class="left">
      <div class="demo-input-suffix">
        <span>编码：</span>
        <el-input
          placeholder="请输入登录名"
          v-model="code"
          clearable>
        </el-input>
      </div>
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
        <span>名称：</span>
        <el-input
          placeholder="请输入名称"
          v-model="name"
          clearable>
        </el-input>
      </div>
      <div class="demo-input-suffix">
        <span>部门ID：</span>
        <select class="form-control" name="supLayer" v-model="selected">
          <option value="">请选择</option>
          <option v-for="item in data2" :value="item.id" :key="item.id">
            <span v-if="!item.layer" v-text="item.name"></span>
            <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
            <span v-if="
/* eslint-disable no-irregular-whitespace */
item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
            <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
          </option>
        </select>
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

      </el-row>
    </div>
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
        selected: '',
        data2: [],
        code: '',
        upLoadUrl: this.ImgUploadUrl,
        id: '',
        departmentId: '',
        name: '',
        image: '',
        status: '1',
        description: '',
        upLoadData: {},
        fileList: [],
        // fileList: [{name: '', url: ''}],
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
      console.log(this.fileList)
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
        return this.$confirm(`确定移除 ${ file.url }？`)
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
        if (this.id) {
          this.fileList.push({name: '', url: ''})
          this.code = this.$route.params.code
          this.name = this.$route.params.name
          this.image = this.$route.params.image
          this.departmentId = this.$route.params.departmentId
          this.status = this.$route.params.status ? this.$route.params.status.toString() : '1'
          this.description = this.$route.params.description
          this.fileList[0].name = this.$route.params.image
          if (this.fileList[0].name === '') {
            this.fileList = []
          } else {
            this.fileList[0].url = this.fileList[0].name
          }
        }
        this.getAll()
      },
      // 查看所有
      getAll: function () {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'department/',
          type: 'GET',
          data: {
            pageNum: 1,
            pageSize: 50,
            order: 'layer',
            sort: '',
            status: 1
          },
          cache: false,
          headers: {
            accessToken: _this.token
          },
          dataType: 'json',
          contentType: 'application/json',
          success: function (res) {
            if (res.code === 200) {
              _this.data2 = res.data.dataList
              _this.data2.forEach((item, index) => {
                if (_this.departmentId === item.id) {
                  // alert(item.layer)
                  _this.selected = _this.departmentId
                }
              })
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 保存
      save() {
        if (!this.code) {
          this.$message({
            message: '请先选择编号',
            type: 'warning'
          })
          return
        }
        if (!this.image) {
          this.$message({
            message: '请先选择图片',
            type: 'warning'
          })
          return
        }
        if (!this.name) {
          this.$message({
            message: '请先选择名称',
            type: 'warning'
          })
          return
        }
        if (!this.selected) {
          this.$message({
            message: '请先选择部门ID',
            type: 'warning'
          })
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'map/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            code: _this.code,
            name: _this.name,
            image: _this.image,
            departmentId: _this.selected,
            status: _this.status,
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
  .mapModification {
    width: 100%;
    .el-tree {
      width: 400px;
      margin-left: 118px;
      margin-top: -22px;
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
        width: 120px;
      }
      .el-input__inner {
        width: 230px;
      }
      .el-textarea {
        width: 423px;
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
      width: 400px;
      display: inline-block;
    }
    .el-upload__input {
      display: none !important;
    }
    .form-control {
      width: 221px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
  }

</style>
