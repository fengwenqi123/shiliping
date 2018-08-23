<template>
  <!--车辆登记信息-->
  <div class="carInformation">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监狱车辆信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>车辆登记信息</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <div class="demo-input-suffix">
      <span>驾驶人：</span>
      <el-input
        placeholder="请输入关键字"
        v-model="driver"
        clearable>
      </el-input>
      <span>当前状态</span>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="demo-input-suffix">
      <span>关键字：</span>
      <el-input
        placeholder="请输入关键字"
        v-model="Keyword"
        clearable>
      </el-input>
      <span>登记时间：</span>
      <div class="block">
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
    </div>
    <el-row>
      <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">手动登记</el-button>
      <el-button type="warning" icon="el-icon-edit-outline" size="small" @click="modify">修改</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="del">删除</el-button>
      <el-button icon="el-icon-remove" size="small" @click="out">驶离</el-button>
    </el-row>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="Id"
          label="序号"
          type="index"
          sortable
          width="80">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="carBean.license"-->
        <!--label="车牌号码"-->
        <!--show-overflow-tooltip-->
        <!--sortable>-->
        <!--</el-table-column>-->
        <el-table-column
          label="车牌号码"
          sortable>
          <template slot-scope="scope">
            <p class="nei" @click="openDetails(scope.row)">{{scope.row.carBean === null ? null:scope.row.carBean.license}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="pilot"
          label="驾驶人"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="positionDeviceId"
          label="跟踪器"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系方式"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="lineId"
          label="行驶线路"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="police"
          label="随车民警"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="登记人员"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="当前状态">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-bind:class="{ active: scope.row.status =='1' }">{{ scope.row.status =='1' ? '已授权'
                :
                '未授权' }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="startTimeString"
          label="登记时间"
          sortable
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination
        background
        :total="page.total"
        layout="prev, pager, next, jumper"
        :current-page.sync="page.pageNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  export default {
    data() {
      return {
        Keyword: '',
        token: window.localStorage.getItem('token'),
        order: '',
        sort: '',
        addTimeMinString: '',
        addTimeMaxString: '',
        idCard: '',
        Unit: null,
        driver: '',
        mobile: '0',
        page: {
          // 当前页
          pageNum: 1,
          // 每页10行
          pageSize: 10,
          // 总页数
          total: 0
        },
        tableData3: [],
        mul: [],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value7: '',
        options: [{
          value: '0',
          label: '未授权'
        }, {
          value: '1',
          label: '已授权'
        }],
        value4: ''
      }
    },
    mounted() {
      this.getAuth()
    },
    methods: {
      // table表格操作
      openDetails(row) {
        this.$alert(`<div>
      <p><span class="font">车牌号码:</span><span>${row.carBean.license}</span></p>
      <p><span class="font">驾驶人:</span><span>${row.pilot}</span></p>
      <p><span class="font">跟踪器:</span><span>${row.positionDeviceId}</span></p>
      <p><span class="font">联系方式:</span><span>${row.mobile}</span></p>
      <p><span class="font">行驶线路:</span><span>${row.lineId}</span></p>
      <p><span class="font">随车民警:</span><span>${row.police}</span></p>
      <p><span class="font">登记人员:</span><span>${row.userName}</span></p>
      <p><span class="font">行驶线路:</span><span>${row.lineId}</span></p>
      <p><span class="font">当前状态:</span><span>${row.code === 1 ? '已授权' : '未授权'}</span></p>
      <p><span class="font">登记时间:</span><span>${row.startTimeString}</span></p>
  </div>`, '查看', {dangerouslyUseHTMLString: true})
      },
      handleSelectionChange(val) {
        this.mul = val
        console.log(this.mul)
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        this.page.pageNum = val
        console.log(this.page.pageNum)
        this.getAuth()
      },
      // 查看列表
      getAuth: function () {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'visitorInfo/?time=' + new Date().getTime(),
          type: 'GET',
          dataType: 'json',
          data: {
            pageNum: _this.page.pageNum,
            pageSize: _this.page.pageSize,
            sort: _this.sort,
            order: _this.order,
            addTimeMinString: _this.addTimeMinString,
            addTimeMaxString: _this.addTimeMaxString,
            idCard: _this.idCard,
            mobile: _this.mobile,
            keyword: _this.Keyword
          },
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.tableData3 = res.data.dataList
              _this.page = res.data.page
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 查看单元
      getUnit: function (id) {
        var _this = this
        $.ajax({
          url: _this.apiUrl + 'authorize/' + id,
          type: 'GET',
          dataType: 'json',
          headers: {
            accessToken: _this.token
          },
          success: function (res) {
            if (res.code === 200) {
              _this.Unit = res.data
              console.log(_this.Unit)
            }
          },
          error: function () {
            console.log('请求失败')
          }
        })
      },
      // 新增
      add() {
        this.$router.push({
          path: '/carRegistration'
        })
      },
      // 修改
      modify() {
        if (this.mul.length === 0) {
          this.$message({
            message: '请先选择',
            type: 'warning'
          })
          return
        }
        if (this.mul.length > 1) {
          this.$message({
            message: '只能选择一条',
            type: 'warning'
          })
          return
        }
        // if (this.mul[0].image !== null) {
        //   this.mul[0].image = this.mul[0].image.split('storage/')[1] ? this.mul[0].image.split('storage/')[1] : null
        // }
        this.$router.push({
          name: 'CarRegistration',
          params: {
            id: this.mul[0].id,
            pilot: this.mul[0].pilot,
            idCard: this.mul[0].idCard,
            police: this.mul[0].police,
            mobile: this.mul[0].mobile,
            cause: this.mul[0].cause,
            lineId: this.mul[0].lineId,
            positionDeviceId: this.mul[0].positionDeviceId,
            carId: this.mul[0].carBean.license,
            image: this.mul[0].image,
            description: this.mul[0].description
          }
        })
      },
      // 删除
      del() {
        if (this.mul.length === 0) {
          this.$message({
            message: '请先选择！',
            type: 'warning'
          })
          return
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = []
          this.mul.forEach((item, index) => {
            num.push(item.id)
          })
          var _this = this
          $.ajax({
            url: _this.apiUrl + 'visitorInfo/remove',
            type: 'PUT',
            dataType: 'json',
            data: {
              id: num
            },
            traditional: true,  // 传id数组
            headers: {
              accessToken: _this.token
            },
            success: function (res) {
              if (res.code === 200) {
                _this.$message({
                  type: 'success',
                  message: res.msg
                })
                _this.getAuth()
              }
            },
            error: function () {
              _this.$message({
                type: 'warning',
                message: res.msg
              })
              console.log('请求失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      // 驶离
      out() {
        if (this.mul.length === 0) {
          this.$message({
            message: '请先选择',
            type: 'warning'
          })
          return
        }
        if (this.mul.length > 1) {
          this.$message({
            message: '只能选择一条',
            type: 'warning'
          })
          return
        }
        this.$confirm('此操作即将启动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = ''
          this.mul.forEach((item, index) => {
            num = item.id
          })
          console.log(num)
          var _this = this
          $.ajax({
            url: 'http://192.168.1.102:8100/' + 'visitorInfo/end',
            type: 'GET',
            dataType: 'json',
            data: {
              id: num
            },
            headers: {
              accessToken: _this.token
            },
            success: function (res) {
              if (res.code === 200) {
                _this.$message({
                  type: 'success',
                  message: res.msg
                })
                _this.getAuth()
              } else {
                _this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            },
            error: function () {
              _this.$message({
                type: 'warning',
                message: res.msg
              })
              _this.getAuth()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },

      // Enable
      Enable() {
        if (this.mul.length === 0) {
          alert('请先选择！')
          return
        }
        this.$confirm('此操作即将启动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = []
          this.mul.forEach((item, index) => {
            num.push(item.id)
          })
          console.log(num)
          var _this = this
          $.ajax({
            url: _this.apiUrl + 'map/enable',
            type: 'PUT',
            dataType: 'json',
            data: {
              id: num
            },
            traditional: true,  // 传id数组
            headers: {
              accessToken: _this.token
            },
            success: function (res) {
              if (res.code === 200) {
                _this.$message({
                  type: 'success',
                  message: res.msg
                })
                _this.getAuth()
              } else {
                _this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            },
            error: function () {
              console.log('请求失败')
              _this.getAuth()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      // disEnable
      disEnable() {
        if (this.mul.length === 0) {
          alert('请先选择！')
          return
        }
        this.$confirm('此操作即将启动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var num = []
          this.mul.forEach((item, index) => {
            num.push(item.id)
          })
          console.log(num)
          var _this = this
          $.ajax({
            url: _this.apiUrl + 'map/disable',
            type: 'PUT',
            dataType: 'json',
            data: {
              id: num
            },
            traditional: true,  // 传id数组
            headers: {
              accessToken: _this.token
            },
            success: function (res) {
              if (res.code === 200) {
                _this.$message({
                  type: 'success',
                  message: res.msg
                })
                _this.getAuth()
              } else {
                _this.$message({
                  type: 'warning',
                  message: res.msg
                })
              }
            },
            error: function () {
              console.log('请求失败')
              _this.getAuth()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      // 根据关键字查询
      query() {
        this.getAuth()
      },
      // 重置
      reset() {
        this.Keyword = ''
        this.page.pageNum = 1
        this.getAuth()
      }
    }
  }
</script>

<style scoped lang="less">
  .carInformation {
    width: 100%;
    padding: 10px 0px;
    position: absolute;
    margin-top: 80px;
    margin-left: 250px;
    .demo-input-suffix {
      margin-top: 10px;
      span {
        display: inline-block;
        width: 80px;
      }
      .el-input {
        width: auto;
        margin-right: 30px;
      }
    }
    .el-row {
      margin-top: 20px;
    }
    .table {
      margin-top: 20px;
    }
    .fenye {
      margin: 20px 0;
      text-align: center;
    }
    .active {
      background: #67c23a;
      color: #fff;
    }
    .active_gender {
      background: yellowgreen;
      color: #fff;
    }
    .block {
      display: inline-block;
    }
  }

</style>
