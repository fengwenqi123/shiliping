<template>
  <!--地图管理-->
  <div class="mapmanagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监狱车辆信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>地图管理</el-breadcrumb-item>
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
      <el-button type="success" icon="el-icon-circle-check-outline" size="small" @click="Enable">启用</el-button>
      <el-button type="warning" icon="el-icon-circle-close-outline" size="small" @click="disEnable">禁用</el-button>
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
          width="80"
          sortable>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="code"-->
          <!--label="编码"-->
          <!--show-overflow-tooltip-->
          <!--sortable>-->
        <!--</el-table-column>-->
        <el-table-column
          label="编码"
          sortable>
          <template slot-scope="scope">
            <p class="nei" @click="openDetails(scope.row)">{{scope.row.code}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="image"-->
        <!--label="图片"-->
        <!--sortable-->
        <!--show-overflow-tooltip>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="image"
          label="图片路径">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="" style="width: 90px;height: 90px">
          </template>

        </el-table-column>
        <el-table-column
          prop="departmentId"
          label="部门ID"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          sortable>
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-bind:class="{ active: scope.row.status =='1' }">{{ scope.row.status =='1' ? '启用' :
                '禁用' }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="modifyTimeString"
          label="更新时间"
          sortable
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
        departmentId: '',
        classification: '',
        type: '',
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
        // this.getUnit(row.id)
        console.log(row)
        this.$alert(`<div>
      <p><span class="font">编码:</span><span>${row.code}</span></p>
      <p><span class="font">名称:</span><span>${row.name}</span></p>
      <p><span class="font">图片路径:</span><span>${row.image}</span></p>
      <p><span class="font">部门ID:</span><span>${row.departmentId}</span></p>
      <p><span class="font">备注:</span><span>${row.description}</span></p>
      <p><span class="font">状态:</span><span>${row.code === 1 ? '启用' : '禁用'}</span></p>
      <p><span class="font">更新时间:</span><span>${row.modifyTimeString}</span></p>
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
          url: _this.apiUrl + 'map/?time=' + new Date().getTime(),
          type: 'GET',
          dataType: 'json',
          data: {
            pageNum: _this.page.pageNum,
            pageSize: _this.page.pageSize,
            status: _this.status,
            order: _this.order,
            departmentId: _this.departmentId,
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
          path: '/MapModification'
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
        this.$router.push({
          name: 'MapModification',
          params: {
            id: this.mul[0].id,
            code: this.mul[0].code,
            name: this.mul[0].name,
            image: this.mul[0].image,
            departmentId: this.mul[0].departmentId,
            status: this.mul[0].status,
            description: this.mul[0].description
          }
        })
      },
      // 删除
      del() {
        if (this.mul.length === 0) {
          alert('请先选择！')
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
            url: _this.apiUrl + 'map/remove',
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
  .mapmanagement {
    /*min-width: 1200px;*/
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
