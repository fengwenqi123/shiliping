<template>
  <div class="SynRegistration">
    <h2>车辆登记</h2>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          <span width="400px">浙A1vf88</span>
        </template>
        <p>驾驶人:</p>
        <p>身份证号：</p>
        <p>联系电话：</p>
        <p>随车民警：</p>
        <p>进入事由：</p>
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
        <span class="tab cargz1">行驶线路:</span>
        <el-select v-model="value4" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br><br>
        <span class="tab cargz2">车辆跟踪器:</span>
        <el-select v-model="value4" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br>
        <el-button type="primary" class="bott">登记</el-button>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <span width="400px">浙A1vf88</span>
        </template>
        <p>驾驶人:</p>
        <p>身份证号：</p>
        <p>联系电话：</p>
        <p>随车民警：</p>
        <p>进入事由：</p>
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
        <span class="tab cargz1">行驶线路:</span>
        <el-select v-model="value4" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br><br>
        <span class="tab cargz2">车辆跟踪器:</span>
        <el-select v-model="value4" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <br>
        <el-button type="primary" class="bott">登记</el-button>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
  /* eslint-disable template-curly-spacing */

  export default {
    data() {
      return {
        upLoadUrl: this.ImgUploadUrl,
        activeNames: ['1'],
        options: [{
          value: '0',
          label: '第一卡'
        }],
        value4: '',
        limit: 1,
        dialogImageUrl: '',
        dialogVisible: false,
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
      handleChange(val) {
        console.log(val)
      }
    }
  }
</script>

<style scoped lang="less">
  .SynRegistration {
    padding: 10px 0px;
    position: absolute;
    margin-left: 100px;
    h2 {
      color: blue;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .tab {
      display: inline-block;
      width: 80px;
      margin-top: 10px;
    }
    .cargz {
      margin-left: 200px;
    }
    .el-collapse-item {
      width: 600px;
    }
    .bott {
      margin-top: 20px;
      width: 190px;
    }
  }

</style>
