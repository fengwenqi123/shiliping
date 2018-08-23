<template>
  <div class="perModification">
    <div class="demo-input-suffix demo1">
      <span>上级权限：</span>
      <!--<el-tree-->
      <!--:data="data2"-->
      <!--show-checkbox-->
      <!--node-key="id"-->
      <!--:check-strictly=true-->
      <!--ref="tree"-->
      <!--highlight-current-->
      <!--:default-checked-keys='[layer]'-->
      <!--:props="defaultProps"-->
      <!--v-if="id == ''"-->
      <!--&gt;-->
      <!--</el-tree>-->
      <el-select v-model="parent" v-if="id" disabled placeholder="请选择">
      </el-select>
      <select v-if="!id" class="form-control" name="supLayer" v-model="select1">
        <option value="">请选择</option>
        <option v-for="item in authArr" :value="item.layer" :key="item.id">
          <span v-if="item.layer && item.layer.length==3" v-text="item.name"></span>
          <span v-if="
/* eslint-disable no-irregular-whitespace */
item.layer && item.layer.length==6" v-text="'　┝ '+item.name"></span>
          <span v-if="item.layer && item.layer.length==9" v-text="'　　┝ '+item.name"></span>
          <span v-if="item.layer && item.layer.length==12" v-text="'　　　┝ '+item.name"></span>
          <span v-if="item.layer && item.layer.length==15" v-text="'　　　　┝ '+item.name"></span>
        </option>
      </select>
    </div>
    <div class="demo-input-suffix">
      <span>权限名称：</span>
      <el-input
        placeholder="请输入权限名称"
        v-model="name"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>权限值：</span>
      <el-input
        placeholder="请输入权限值"
        v-model="actionValue"
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
        parent: '无',
        parent_layer: '',
        id: '',
        status: '1',
        carName: '',
        token: window.localStorage.getItem('token'),
        name: '',
        actionValue: '',
        phoneNumber: '',
        sort: '',
        description: '',
        value4: '',
        data2: [],
        data: null,
        supLayer: '',
        layer: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        authArr: [],
        select1: ''
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
        this.actionValue = this.$route.params.actionValue
        this.name = this.$route.params.name
        this.sort = this.$route.params.sort
        this.status = this.$route.params.status ? this.$route.params.status.toString() : this.status
        this.layer = this.$route.params.layer
        this.description = this.$route.params.description
      },
      // 查看所有
      getAll: function () {
        var _this = this
        $.ajax({
          url: _this.apiUrl + '/authorize/',
          type: 'GET',
          dataType: 'json',
          data: {
            pageNum: 1,
            pageSize: 5000,
            order: 'layer',
            status: 1
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.authArr = res.data.dataList
              if (_this.id) {
                if (_this.layer.length < 4) {
                  _this.parent = _this.name
                } else {
                  var leng = _this.layer.substr(0, _this.layer.length - 3)
                  var list = res.data.dataList
                  list.forEach((item, index) => {
                    if (leng === item.layer) {
                      _this.parent_layer = item.layer
                      _this.parent = item.name
                    }
                  })
                }
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
      //     url: _this.apiUrl + 'authorize/findAllListWithPid/',
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
          // console.log(this.$refs.tree.getCheckedNodes())
          // this.data = this.$refs.tree.getCheckedNodes()
          // if (this.data.length === 0) {
          //   alert('请先选择上级权限！')
          //   return
          // }
          // if (this.data.length > 1) {
          //   alert('上级权限只能选一个！')
          //   return
          // }
          if (!this.select1) {
            alert('请选择上级权限！')
            return
          }
        }
        if (!this.name) {
          alert('请先填写权限名称！')
          return
        }
        if (!this.actionValue) {
          alert('请先填写权限值！')
          return
        }
        if (!this.sort) {
          alert('请先填写排序！')
          return
        }

        var _this = this
        $.ajax({
          url: _this.apiUrl + 'authorize/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            supLayer: _this.select1,
            // supLayer: _this.parent_layer ? _this.parent_layer : _this.parent_layer == null ? '0' : _this.data[0].id,
            name: _this.name,
            actionValue: _this.actionValue,
            sort: _this.sort,
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
  .perModification {
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
      width: 221px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
    }
  }

</style>
