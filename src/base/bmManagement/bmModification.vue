<template>
  <div class="bmModification">
    <div class="demo-input-suffix demo1">
      <span>归属：</span>
      <select v-if="!id" class="form-control" name="supLayer" v-model="selected">
        <option value="">请选择</option>
        <option v-for="item in data2" :value="item.layer" :key="item.id">
          <span v-if="!item.layer" v-text="item.name"></span>
          <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
          <span v-if="
/* eslint-disable no-irregular-whitespace */
item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
          <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
        </option>
      </select>
      <el-select v-model="parent" :data="p1" v-if="id" disabled placeholder="请选择">
      </el-select>
    </div>
    <div class="demo-input-suffix">
      <span>部门名称：</span>
      <el-input
        placeholder="请输入部门名称"
        v-model="name"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>部门编号：</span>
      <el-input
        placeholder="请输入部门编号"
        v-model="code"
        clearable>
      </el-input>
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

  export default {
    data() {
      return {
        parent: '',
        id: '',
        selected: '',
        token: window.localStorage.getItem('token'),
        name: '',
        code: '',
        description: '',
        data2: [],
        layer: ''
      }
    },
    created() {
    },
    mounted() {
      this.getQuery()
      this.getAll()
    },
    methods: {
      // 获取路由传参
      getQuery() {
        this.id = this.$route.params.id
        this.name = this.$route.params.name
        this.code = this.$route.params.code
        this.layer = this.$route.params.layer
        this.description = this.$route.params.description
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
              if (_this.id) {
                _this.data2.forEach((item, index) => {
                  if (_this.layer.length === 3) {
                    if (_this.layer === item.layer) {
                      _this.parent = item.name
                    }
                  } else {
                    _this.layer = _this.layer.substr(0, _this.layer.length - 3)
                    if (_this.layer === item.layer) {
                      _this.parent = item.name
                    }
                  }
                })
              }
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },

      // getAll: function () {
      //   var _this = this
      //   $.ajax({
      //     url: _this.apiUrl + 'department/findListByPersonnel',
      //     type: 'GET',
      //     dataType: 'json',
      //     headers: {
      //       accessToken: _this.token
      //     },
      //     success: function (res) {
      //       if (res.code === 200) {
      //         var list = res.data
      //         _this.data2 = listToTree('id', 'layer', list)
      //         console.log(_this.data2)
      //         list.forEach((item, index) => {
      //           if (_this.id === item.id) {
      //             _this.parent_layer = item.layer
      //           }
      //         })
      //         list.forEach((item, index) => {
      //           if (_this.parent_layer === item.id) {
      //             _this.parent = item.name
      //           }
      //         })
      //       }
      //     },
      //     error: function () {
      //       console.log('请求失败')
      //     }
      //   })
      // },
      // 保存
      getCheckedNodes() {
        if (this.id === '') {
          if (!this.selected) {
            this.$message('请先选择归属！')
            return
          }
        }
        if (!this.name) {
          this.$message('请先填写部门名称！')
          return
        }
        if (!this.code) {
          this.$message('请先填写部门编号！')
          return
        }

        var _this = this
        $.ajax({
          url: _this.apiUrl + 'department/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            supLayer: _this.selected ? _this.selected : _this.layer,
            code: _this.code,
            name: _this.name,
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
  .bmModification {
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
    .form-control {
      display: inline-block;
      width: 197px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
  }

</style>
