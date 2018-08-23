<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      size="medium"
      :highlight-current-row=true>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号"
        width="40">
      </el-table-column>
      <el-table-column
        label="车牌号码"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="驾驶人"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="联系电话"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="跟踪器"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="行驶线路"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="随车民警"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="登记人员"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="登记时间"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address1"
        label="当前状态"
        width="120"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          id: '01',
          date: '浙A1BN33',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          address1: '上海市普陀区金沙江路 1518 111弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {}
  }
</script>
