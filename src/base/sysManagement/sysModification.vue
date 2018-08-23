<template>
  <div class="sysModification">
    <el-row>
      <el-col :span="12">
        <div class="left">
          <div class="demo-input-suffix">
            <span>登录名：</span>
            <el-input
              placeholder="请输入登录名"
              v-model="loginName"
              clearable>
            </el-input>
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
            <span>员工编号：</span>
            <el-input
              placeholder="请输入员工编号"
              v-model="code"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>性别：</span>
            <el-radio v-model="gender" label="1">启用</el-radio>
            <el-radio v-model="gender" label="2">禁用</el-radio>
          </div>
          <div class="demo-input-suffix">
            <span>email：</span>
            <el-input
              placeholder="请输入email"
              v-model="email"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>手机：</span>
            <el-input
              placeholder="请输入手机"
              v-model="mobile"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>身份证：</span>
            <el-input
              placeholder="请输入身份证"
              v-model="idCard"
              clearable>
            </el-input>
          </div>
          <div class="demo-input-suffix">
            <span>生日：</span>
            <div class="block">
              <el-date-picker
                v-model="value2"
                align="right"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </div>
          <div class="demo-input-suffix">
            <span>地址：</span>
            <el-input
              placeholder="请输入地址"
              v-model="address"
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
            <span>选择角色：</span>
            <el-checkbox-group v-model="checkList" v-for="item in roleArr" :key="item.id">
              <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="demo-input-suffix">
            <span>选择部门：</span>
            <el-checkbox-group v-model="checkList1" v-for="item in departArr" :key="item.id">
              <el-checkbox :label="item.id" v-if="item.layer.length==3">{{item.name}}</el-checkbox>
              <el-checkbox :label="item.id" v-if="item.layer.length==6" class="second">{{item.name}}</el-checkbox>
              <el-checkbox :label="item.id" v-if="item.layer.length==9" class="three">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  /* eslint-disable no-undef,no-array-constructor */

  export default {
    data() {
      return {
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        value1: '',
        value2: '',
        loginName: '',
        id: '',
        name: '',
        code: '',
        email: '',
        mobile: '',
        idCard: '',
        address: '',
        checkList: [],
        checkList1: [],
        status: '1',
        gender: '1',
        roleArr: '',
        departArr: '',
        url: this.apiUrl,
        description: '',
        token: window.localStorage.getItem('token')
      }
    },
    created() {
    },
    mounted() {
      this.getQuery()
      this.getData()
    },
    methods: {
      // 获取路由传参
      getQuery() {
        this.id = this.$route.params.id
        this.loginName = this.$route.params.loginName
        this.name = this.$route.params.name
        this.status = this.$route.params.status ? this.$route.params.status.toString() : '1'
        this.description = this.$route.params.description
        this.mobile = this.$route.params.mobile
      },
      getData() {
        var _this = this
        $.ajax({
          url: _this.url + 'department/',
          type: 'GET',
          dataType: 'json',
          data: {
            order: 'layer',
            status: 1
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.departArr = res.data.dataList
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
        $.ajax({
          url: _this.url + 'role/',
          type: 'GET',
          dataType: 'json',
          data: {
            status: 1
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.roleArr = res.data.dataList
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 保存
      save() {
        console.log(this.checkList)
        console.log(this.checkList1)
        if (!this.loginName) {
          alert('请先填写登录名！')
          return
        }
        if (!this.mobile) {
          alert('请先填写手机号！')
          return
        }
        if (!this.email) {
          alert('请先填写email！')
          return
        }
        if (!this.idCard) {
          alert('请先填写身份证！')
          return
        }
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'personnel/',
          type: 'POST',
          dataType: 'json',
          data: {
            id: _this.id,
            loginName: _this.loginName,
            code: _this.code,
            email: _this.email,
            name: _this.name,
            mobile: _this.mobile,
            idCard: _this.idCard,
            gender: _this.gender,
            birthday: _this.value2,
            address: _this.address,
            status: _this.status,
            description: _this.description,
            roleIds: _this.checkList,
            departmentIds: _this.departmentIds
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
  .sysModification {
    /*display: flex;*/
    /*.right, .left {*/
    /*flex: 1;*/
    /*}*/
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
    margin-left: 240px;
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
  }

</style>
