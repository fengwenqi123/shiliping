<template>
  <div class="progresses">
    <div class="contral">停止</div>
    <div class="test"></div>
    <div style="text-align:center;margin:50px 0; font:normal 14px/24px 'MicroSoft YaHei';">
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  import '../../static/js/jquery-PlayBar.min'
  import '../../static/css/barstyle.css'

  export default {
    data() {
      return {}
    },
    props: ['timeAll'],
    mounted() {
      this.on()
    },
    methods: {
      on() {
        var action = true
        var _this = this
        $('.contral').click(function () {
          if (action) {
            $.playBar.Stop()
            action = false
            $(this).html('开始')
          } else {
            $.playBar.Begin()
            action = true
            $(this).html('停止')
          }
          var all = []
          var arr = []
          arr = $('.BarBeginTime').html().split(':')
          var num = parseInt(arr[0]) * 60 + parseInt(arr[1])
          all.push(num)
          all.push(action)
          _this.$emit('ievent', all)
        })
        $.playBar.addBar($('.test'), 1000 * _this.timeAll)// 第一个参数是需要显示播放器的容器，第二个参数为时间，单位毫秒
        $.playBar.changeBarColor('#72dfff')// 设置进度条颜色
      }
    }
  }
</script>

<style scoped lang="less">
  .progresses {
    text-align: center;
  }

  .test {
    width: 400px;
    height: 20px;
    display: inline-block;
  }

  .contral {
    width: 50px;
    height: 30px;
    line-height: 30px;
    background: #3498DB;
    cursor: pointer;
    color: #fff;
    text-align: center;
    display: inline-block;
  }
</style>
