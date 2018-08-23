<template>
  <div class="table1">
    <div class="table2">
    <div class="demo-input-suffix">
      驾驶人：
      <el-input
        placeholder="请输入内容"
        v-model="name"
        clearable>
      </el-input>
      登记时间：
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
    </div>
    <div class="demo-input-suffix demo-input">
      当前状态
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      关键字：
      <el-input
        placeholder="请输入内容"
        v-model="font"
        clearable>
      </el-input>
    </div>
    <div class="but">
      <el-row>
        <el-button type="success">查询</el-button>
        <el-button type="primary"><router-link tag="li" to="/newCar">手动登记</router-link></el-button>
        <el-button type="info">修改  </el-button>
        <el-button type="warning">驶离  </el-button>
      </el-row>
    </div>
    <Table></Table>
  </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  import Table from '@/base/table'

  export default {
    components: {
      Table
    },
    data() {
      return {
        name: '',
        font: '',
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
        value6: '',
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
    }
  }
</script>

<style scoped lang="less">
  .table1 {
    padding: 10px 0px;
    position: absolute;
    margin-top: 80px;
    margin-left: 250px;
    .table2{
    }
    .el-input {
      width: auto;
      margin-right: 30px;
    }
    a{
      color: #fff;
    }
    .block {
      display: inline-block;
    }
    .el-select {
      margin-right: 30px;
    }
    .demo-input {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .el-pagination{
      text-align: center;
      margin-top: 20px;
    }
    .el-button{
      width: 120px;
    }
  }

</style>
