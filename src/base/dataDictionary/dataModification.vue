<template>
  <div class="dataModification">
    <div class="demo-input-suffix">
      <span>分类：</span>
      <el-input
        placeholder="请输入权限名称"
        v-model="classification "
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>项目名称：</span>
      <el-input
        placeholder="请输入权限值"
        v-model="itemName"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>项目值：</span>
      <el-input
        placeholder=""
        v-model="itemValue"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>排序：</span>
      <el-input
        placeholder=""
        v-model="sort"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>类型：</span>
      <el-radio v-model="type" label="1">系统</el-radio>
      <el-radio v-model="type" label="2">自定义</el-radio>
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

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor */

  export default {
    data() {
      return {
        classification: '',
        id: '',
        itemName: '',
        itemValue: '',
        status: '1',
        sort: '',
        type: '1',
        description: '',
        token: window.localStorage.getItem('token')
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
        this.classification = this.$route.params.classification
        this.itemName = this.$route.params.itemName
        this.itemValue = this.$route.params.itemValue
        this.sort = this.$route.params.sort
        this.type = this.$route.params.type ? this.$route.params.type.toString() : '1'
        this.status = this.$route.params.status ? this.$route.params.status.toString() : '1'
        this.description = this.$route.params.description
      },
      // 保存
      save() {
        if (!this.classification) {
          this.$message('请先填写分类名称！')
          return
        }
        if (!this.itemName) {
          this.$message('请先填写项目名称！')
          return
        }
        if (!this.itemValue) {
          this.$message('请先填写项目值！')
          return
        }
        if (!this.sort) {
          this.$message('请先填写排序！')
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'dataDictionary/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            classification: _this.classification,
            itemName: _this.itemName,
            itemValue: _this.itemValue,
            sort: _this.sort,
            status: _this.status,
            type: _this.type,
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
  .dataModification {
    .el-tree {
      width: 400px;
      margin-left: 118px;
      margin-top: -22px;
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
  }

</style>
