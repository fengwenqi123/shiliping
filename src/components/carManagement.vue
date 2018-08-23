<template>
  <!--地图管理-->
  <div class="carManagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>监狱车辆信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
    </el-breadcrumb>
    <hr>
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
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
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
      border
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
      <el-table-column
        label="车牌号码"
        show-overflow-tooltip
        sortable>
        <template slot-scope="scope">
          <p @click="openDetails(scope.row)">{{scope.row.license}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="model"
        label="车型"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="contract"
        label="所有人"
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
        prop="brand"
        label="品牌型号"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="住址"
        sortable
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="registerDate"
        label="注册日期"
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
        classification: '',
        type: '',
        code: '',
        Unit: null,
        license: '',
        model: '',
        contract: '',
        mobile: '',
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
        value7: ''
      }
    },
    mounted() {
      this.getAuth()
    },
    methods: {
      // table表格操作
      openDetails(row) {
        this.$alert(`<div>
      <p><span class="font">车牌号码:</span><span>${row.license}</span></p>
      <p><span class="font">车型:</span><span>${row.model}</span></p>
      <p><span class="font">所有人:</span><span>${row.contract}</span></p>
      <p><span class="font">联系方式:</span><span>${row.mobile}</span></p>
      <p><span class="font">品牌型号:</span><span>${row.brand}</span></p>
      <p><span class="font">住址:</span><span>${row.address}</span></p>
      <p><span class="font">注册日期:</span><span>${row.registerDate}</span></p>
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
          url: _this.apiUrl + 'car/?time=' + new Date().getTime(),
          type: 'GET',
          dataType: 'json',
          data: {
            pageNum: _this.page.pageNum,
            pageSize: _this.page.pageSize,
            code: _this.code,
            order: _this.order,
            license: _this.license,
            model: _this.model,
            contract: _this.contract,
            mobile: _this.mobile,
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
          path: '/carModification'
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
        if (this.mul[0].image !== null) {
          this.mul[0].image = this.mul[0].image.split('storage/')[1] ? this.mul[0].image.split('storage/')[1] : null
        }
        // this.$router.push({
        //   path: `/carModification_mod/${this.mul[0].id}/${this.mul[0].code}/${this.mul[0].license}/${this.mul[0].model}/${this.mul[0].contract}/${this.mul[0].mobile}/${this.mul[0].address}/${this.mul[0].nature}/${this.mul[0].brand}/${this.mul[0].number}/${this.mul[0].engine}/${this.mul[0].registerDate}/${this.mul[0].certificateDate}/${this.mul[0].image}/${this.mul[0].description}/`
        // })
        this.$router.push({
          name: 'CarModification',
          params: {
            id: this.mul[0].id,
            code: this.mul[0].code,
            license: this.mul[0].license,
            model: this.mul[0].model,
            contract: this.mul[0].contract,
            mobile: this.mul[0].mobile,
            address: this.mul[0].address,
            nature: this.mul[0].nature,
            brand: this.mul[0].brand,
            number: this.mul[0].number,
            engine: this.mul[0].engine,
            registerDate: this.mul[0].registerDate,
            certificateDate: this.mul[0].certificateDate,
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
            url: _this.apiUrl + 'car/remove',
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
  .carManagement {
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
