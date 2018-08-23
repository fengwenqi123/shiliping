<template>
  <!--监控管理-->
  <div class="monitorManagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监控管理</el-breadcrumb-item>
      <el-breadcrumb-item>监控设备管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
    <div class="demo-input-suffix">
      <span>关键字：</span>
      <el-input
        placeholder="请输入关键字"
        v-model="Keyword"
        clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search" size="small" @click="query">查询</el-button>
      <el-button icon="el-icon-refresh" size="small" @click="reset">重置</el-button>
    </div>
    <el-row>
      <el-button type="primary" icon="el-icon-circle-plus" size="small" @click="add">添加</el-button>
      <el-button type="warning" icon="el-icon-edit-outline" size="small" @click="modify">修改</el-button>
      <el-button type="danger" icon="el-icon-delete" size="small" @click="del">删除</el-button>
    </el-row>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="Id"
          label="序号"
          type="index"
          width="80">
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="code"-->
          <!--label="编号">-->
        <!--</el-table-column>-->
        <el-table-column
          label="编号"
          sortable>
          <template slot-scope="scope">
            <p class="nei" @click="openDetails(scope.row)">{{scope.row.code}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="安装位置"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="longitude"
          label="经度"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="latitude"
          label="纬度"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="设备IP"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="port"
          label="端口号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="channel"
          label="通道号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="addTimeString"
          label="添加日期"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div class="fenye">
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="page.total"
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
        flag: false,
        Keyword: '',
        token: window.localStorage.getItem('token'),
        order: '',
        sort: '',
        Unit: null,
        status: 0,
        page: {
          // 当前页
          pageNum: 1,
          // 每页10行
          pageSize: 10,
          // 总页数
          total: 0
        },
        tableData3: [],
        mul: []
      }
    },
    mounted() {
      this.getAuth()
    },
    methods: {
      // table表格操作
      openDetails(row) {
        this.$alert(`<div>
      <p><span class="font">编号:</span><span>${row.code}</span></p>
      <p><span class="font">设备名称:</span><span>${row.deviceName}</span></p>
      <p><span class="font">安装位置:</span><span>${row.address}</span></p>
      <p><span class="font">经度:</span><span>${row.longitude}</span></p>
      <p><span class="font">纬度:</span><span>${row.latitude}</span></p>
      <p><span class="font">设备IP:</span><span>${row.ip}</span></p>
      <p><span class="font">端口号:</span><span>${row.port}</span></p>
      <p><span class="font">账号:</span><span>${row.account}</span></p>
      <p><span class="font">密码:</span><span>${row.password}</span></p>
      <p><span class="font">通道号:</span><span>${row.channel}</span></p>
      <p><span class="font">添加日期:</span><span>${row.addTimeString}</span></p>
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
          url: _this.apiUrl + 'videoDevice/devices/?time=' + new Date().getTime(),
          type: 'GET',
          dataType: 'json',
          data: {
            pageNum: _this.page.pageNum,
            pageSize: _this.page.pageSize,
            order: _this.order,
            sort: _this.sort,
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
          path: '/monitorModification'
        })
      },
      // 修改
      modify() {
        if (this.mul.length === 0) {
          this.$message('请先选择！')
          return
        }
        if (this.mul.length > 1) {
          this.$message('只能选择一条！')
          return
        }
        this.$router.push({
          name: 'MonitorModification',
          params: {
            id: this.mul[0].id,
            code: this.mul[0].code,
            deviceName: this.mul[0].deviceName,
            address: this.mul[0].address,
            longitude: this.mul[0].longitude,
            latitude: this.mul[0].latitude,
            x: this.mul[0].x,
            y: this.mul[0].y,
            ip: this.mul[0].ip,
            port: this.mul[0].port,
            account: this.mul[0].account,
            password: this.mul[0].password,
            channel: this.mul[0].channel,
            mapId: this.mul[0].mapId,
            mapName: this.mul[0].mapName
          }
        })
      },
      // 删除
      del() {
        if (this.mul.length === 0) {
          this.$message('请先选择！')
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
          console.log(num)
          var _this = this
          $.ajax({
            url: _this.apiUrl + 'videoDevice/remove',
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
            message: '已取消删除'
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
  .monitorManagement {
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
  }

</style>
