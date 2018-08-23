<template>
  <!--线路管理-->
  <div class="lineManagement">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>线路管理</el-breadcrumb-item>
      <el-breadcrumb-item>线路管理</el-breadcrumb-item>
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
      <!--<el-button type="warning" icon="el-icon-edit-outline" size="small" @click="modify">修改</el-button>-->
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
          <!--prop="mapName"-->
          <!--label="所属监区">-->
        <!--</el-table-column>-->
        <el-table-column
          label="所属监区"
          sortable>
          <template slot-scope="scope">
            <p class="nei" @click="openDetails(scope.row)">{{scope.row.mapName}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="code"
          label="线路编号"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="name"
          label="线路名称"
          sortable
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status"
          label="路线状态">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium" v-bind:class="{ active_gender: scope.row.status =='1' }">{{ scope.row.status =='1' ?
                '启用' :
                '禁用' }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="maxSpeed"
          label="最高限速"
          sortable
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
        mapId: '',
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
      <p><span class="font">所属监区:</span><span>${row.mapName}</span></p>
      <p><span class="font">线路编号:</span><span>${row.code}</span></p>
      <p><span class="font">线路名称:</span><span>${row.name}</span></p>
      <p><span class="font">路线状态:</span><span>${row.status}</span></p>
      <p><span class="font">最高限速:</span><span>${row.maxSpeed}</span></p>
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
          url: _this.apiUrl + 'line/?time=' + new Date().getTime(),
          type: 'GET',
          dataType: 'json',
          data: {
            pageNum: _this.page.pageNum,
            pageSize: _this.page.pageSize,
            status: _this.status,
            order: _this.order,
            sort: _this.sort,
            keyword: _this.Keyword,
            mapId: _this.mapId
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
          path: '/lineModification'
        })
      },
      // 修改
      modify() {
        if (this.mul.length === 0) {
          this.$message({
            type: 'warning',
            message: '请先选择'
          })
          return
        }
        if (this.mul.length > 1) {
          this.$message({
            type: 'warning',
            message: '只能选择一条'
          })
          return
        }
        this.$router.push({
          name: 'LineModification',
          params: {
            id: this.mul[0].id,
            code: this.mul[0].code,
            description: this.mul[0].description,
            mapId: this.mul[0].mapId,
            maxSpeed: this.mul[0].maxSpeed,
            name: this.mul[0].name,
            mapName: this.mul[0].mapName,
            status: this.mul[0].status
          }
        })
      },
      // 删除
      del() {
        if (this.mul.length === 0) {
          this.$message({
            type: 'warning',
            message: '请先选择'
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
          console.log(num)
          var _this = this
          $.ajax({
            url: _this.apiUrl + 'line/remove',
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
  .lineManagement {
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
