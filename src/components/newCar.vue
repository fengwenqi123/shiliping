<template>
  <div class="newCar">
    <div class="demo-input-suffix">
      <span>车牌号码：</span>
      <el-input
        placeholder="请输入车牌号码"
        v-model="carName"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>驾驶员：</span>
      <el-input
        placeholder="请输入驾驶员姓名"
        v-model="name"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>身份证号码：</span>
      <el-input
        placeholder="请输入身份证号码"
        v-model="carId"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>联系电话：</span>
      <el-input
        placeholder="请输入联系电话"
        v-model="phoneNumber"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>随车民警：</span>
      <el-input
        placeholder="请输入随车民警"
        v-model="policeName"
        clearable>
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>进入事由：</span>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入进入事由"
        v-model="Cause">
      </el-input>
    </div>
    <div class="demo-input-suffix">
      <span>车辆跟踪器：</span>
      <el-select v-model="value4" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <el-row>
      <el-button type="success"><router-link tag="div" to="/registerList">保存</router-link></el-button>
      <el-button><router-link tag="div" to="/registerList">取消</router-link></el-button>

    </el-row>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        carName: '',
        name: '',
        carId: '',
        phoneNumber: '',
        policeName: '',
        Cause: '',
        options: [{
          value: '0',
          label: '第一卡'
        }],
        value4: ''
      }
    }
  }
</script>

<style scoped lang="less">
  .newCar {
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
    .el-row{
      text-align: center;
      margin-top: 20px;
    }
    .el-button{
      width: 120px;
    }
  }

</style>
