<template>
  <div class="video">
    <OBJECT id="testocx" width="380" height="380" classid="CLSID:90D43DFD-D1C9-4D54-B4E4-964A4E6B28D7">
    </OBJECT>
  </div>
</template>

<script>
  /* eslint-disable no-undef,no-unused-vars */
  var logID = null
  var PlayHandle = null
  var ip = ''
  var Username = ''
  var Password = ''
  var Channel = ''
  var DevicePort = ''
  var id = null
  var addTimeString = null
  var leaveTimeString = null

  function PlayIt() {
    testocx.Ipaddress = ip
    testocx.Channel = Channel
    testocx.Username = Username
    testocx.Password = Password
    testocx.DevicePort = DevicePort
    testocx.StartTime = addTimeString
    // alert(`${addTimeString}...${leaveTimeString}`)
    testocx.EndTime = leaveTimeString
    logID = testocx.LoginDvr()
    PlayHandle = testocx.RemotePlay(-1)
  }

  function StopIt() {
    // testocx.PlayIndex=0; // 停掉哪个画面  网页关闭时必须对每个画面在播放的画面停掉
    testocx.StopPlayBack(PlayHandle)
    PlayHandle = null
    logID = null
  }

  function getVideo() {
    var video = JSON.parse(sessionStorage.getItem('video'))
    var show = parseInt(sessionStorage.getItem('show'))
    var stop = sessionStorage.getItem('stop')
    // alert(show)
    if (id !== video.deviceBean.id) {
      id = video.deviceBean.id
      ip = video.deviceBean.ip
      Username = video.deviceBean.account
      Password = video.deviceBean.password
      Channel = video.deviceBean.channel
      DevicePort = video.deviceBean.port
      addTimeString = video.addTimeString.substring(0, 19)
      leaveTimeString = getMyDate((new Date(addTimeString.replace(/-/g, '/')).getTime() / 1000 + 3600 * 1) * 1000)
      if (PlayHandle !== null) {
        StopIt()
      }
      PlayIt()
    }
    if (show - 1 >= 0) {
      if (addTimeString !== video.addTimeString.substring(0, 19)) {
        id = video.deviceBean.id
        ip = video.deviceBean.ip
        Username = video.deviceBean.account
        Password = video.deviceBean.password
        Channel = video.deviceBean.channel
        DevicePort = video.deviceBean.port
        addTimeString = video.addTimeString.substring(0, 19)
        leaveTimeString = getMyDate((new Date(addTimeString.replace(/-/g, '/')).getTime() / 1000 + 3600 * 1) * 1000)
        if (PlayHandle !== null) {
          StopIt()
        }
        PlayIt()
        show--
        sessionStorage.setItem('show', show)
      }
    }
    if (stop === 'true') {
      testocx.StopPlay()
      stop = false
      sessionStorage.setItem('stop', stop)
    }
    setTimeout(() => {
      getVideo()
    }, 1000)
  }

  function getMyDate(str) {
    oDate = new Date(str)
    oYear = oDate.getFullYear()
    oMonth = oDate.getMonth() + 1
    oDay = oDate.getDate()
    oHour = oDate.getHours()
    oMin = oDate.getMinutes()
    oSen = oDate.getSeconds()
    oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen)
    return oTime
  };

  // 补0操作
  function getzf(num) {
    if (parseInt(num) < 10) {
      num = '0' + num
    }
    return num
  }

  $(function () {
    setTimeout(function () {
      getVideo()
      // forJsonds()
    }, 100)
  })
  // var testocx = testocx
  // export default {
  //   data() {
  //     return {
  //       falg: false,
  //       s_jsons: {},
  //       l_jsons: {},
  //       s_id: '',
  //       l_id: '',
  //       obj_id: '',
  //       loginip: '',
  //       port: '',
  //       username: '',
  //       password: '',
  //       testocx: document.getElementById('testocx')
  //     }
  //   },
  //   created() {
  //   },
  //   mounted() {
  //     // this.a()
  //     // this.jsonds()
  //     // this.jsond()
  //     this.PlayIt()
  //   },
  //   methods: {
  //     PlayIt() {
  //       this.testocx.Ipaddress = '192.168.27.2'
  //       this.testocx.Channel = '33'
  //       this.testocx.Username = 'admin'
  //       this.testocx.Password = 'admin123456'
  //       this.testocx.DevicePort = '8000'
  //       this.testocx.StartTime = '2018-08-22 14:17:17'
  //       // alert(`${addTimeString}...${leaveTimeString}`)
  //       this.testocx.EndTime = '2018-08-22 14:22:17'
  //       var logID = this.testocx.LoginDvr()
  //       var PlayHandle = this.testocx.RemotePlay(-1)
  //     }
  //   }
  // }
</script>

<style scoped lang="less">
  .black {
    width: 290px;
    height: 270px;
    background: #000;
    color: #fff;
    font-size: 14px;
    line-height: 270px;
    text-align: center;
    p {
      cursor: pointer;
      .el-icon-warning {
        margin-right: 10px;
      }
    }
  }
</style>
