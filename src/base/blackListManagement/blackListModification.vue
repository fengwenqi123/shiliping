<template>
  <div class="trackerModification">
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
      <span>备注：</span>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入备注"
        v-model="description">
      </el-input>
    </div>
    <el-row>
      <el-button type="success" @click="getCheckedNodes">
        保存
      </el-button>
      <el-button @click="cancel">
        取消
      </el-button>

    </el-row>
  </div>

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor */
  // import {listToTree} from '@/common/js/listtoTree.js'

  export default {
    data() {
      return {
        id: '',
        token: window.localStorage.getItem('token'),
        description: '',
        license: ''
      }
    },
    created() {
    },
    mounted() {
      this.getQuery()
    },
    methods: {
      // 获取路由传参
      getQuery() {
        this.id = this.$route.params.id
        this.license = this.$route.params.license
        this.description = this.$route.params.description
      },
      // 保存
      getCheckedNodes() {
        if (!this.license) {
          this.$message({
            message: '请先填写车牌号码',
            type: 'warning'
          })
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'blacklist/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            license: _this.license,
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
  .trackerModification {
    .el-tree {
      width: 400px;
      margin-left: 118px;
      margin-top: -22px;
    }
    em {
      color: red;
      font-style: normal;
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
