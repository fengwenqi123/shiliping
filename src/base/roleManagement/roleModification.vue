<template>
  <div class="roleModification">
    <div class="demo-input-suffix demo1">
      <span>添加权限：</span>
      <el-tree
        :data="data2"
        show-checkbox
        node-key="id"
        :check-strictly=true
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
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
  import {listToTree} from '@/common/js/listtoTree.js'

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
        }
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
        this.id = this.$route.params.id ? this.$route.params.id : ''
        this.name = this.$route.params.name ? this.$route.params.name : ''
        this.status = this.$route.params.status ? this.$route.params.status : '1'
        this.description = this.$route.params.description ? this.$route.params.description : ''
      },
      // 查看所有
      getAll: function () {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'authorize/findAllListWithPid/',
          type: 'GET',
          dataType: 'json',
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              var list = res.data
              _this.data2 = listToTree('id', 'layer', list)
              console.log(_this.data2)
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 保存
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes())
        this.data = this.$refs.tree.getCheckedNodes()
        var mun = []
        this.data.forEach((item, index) => {
          mun.push(item.id)
        })
        if (this.data.length === 0) {
          alert('请先选择上级权限！')
          return
        }
        if (!this.name) {
          alert('请先填写权限名称！')
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'role/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            name: _this.name,
            status: _this.status,
            description: _this.description,
            authorizeIds: mun
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
  .roleModification {
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
