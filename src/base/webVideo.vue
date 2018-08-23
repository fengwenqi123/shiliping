<template>
  <div class="video">
    <OBJECT id="testocx" width="290" height="290" classid="CLSID:90D43DFD-D1C9-4D54-B4E4-964A4E6B28D7">
    </OBJECT>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  var logID
  var PlayID
  var logID1
  var PlayID1
  var ip = ''
  var Username = ''
  var Password = ''
  var Channel = ''
  var DevicePort = ''
  var id
  var i = 1

  function PlayIt() {
    console.log(testocx)
    testocx.Ipaddress = ip
    testocx.Channel = Channel
    testocx.Username = Username
    testocx.Password = Password
    testocx.DevicePort = DevicePort
    logID = testocx.LoginDvr()
    PlayID = testocx.StartPlay()
  }

  function PlayIt1() {
    if (i % 2 === 1) {
      testocx.Ipaddress = ip
      testocx.Channel = Channel
      testocx.Username = Username
      testocx.Password = Password
      testocx.DevicePort = DevicePort
      logID1 = testocx.LoginDvr()
      PlayID1 = testocx.StartPlay()
      StopIt()
    } else {
      testocx.Ipaddress = ip
      testocx.Channel = Channel
      testocx.Username = Username
      testocx.Password = Password
      testocx.DevicePort = DevicePort
      logID = testocx.LoginDvr()
      PlayID = testocx.StartPlay()
      StopIt1()
    }
    i++
  }

  function StopIt() {
    // testocx.PlayIndex=0; // 停掉哪个画面  网页关闭时必须对每个画面在播放的画面停掉
    testocx.SetPlayID(PlayID)
    testocx.StopPlay()
    testocx.LogOutDVR(logID)
  }

  function StopIt1() {
    testocx.SetPlayID(PlayID1)
    testocx.StopPlay()
    testocx.LogOutDVR(logID1)
  }

  function jsonds() {
    var sJsons = JSON.parse(sessionStorage.getItem('JsonJK'))
    id = sJsons.id
    ip = sJsons.ip
    Username = sJsons.account
    Password = sJsons.password
    Channel = sJsons.channel
    DevicePort = '8000'
    PlayIt()
  }

  function forJsonds() {
    setTimeout(function () {
      // alert(111)
      var url = window.location.href
      if (url.substring(url.length - 4) === '/map') {
        var sJsons = JSON.parse(sessionStorage.getItem('JsonJK'))
        if (id !== sJsons.id) {
          id = sJsons.id
          ip = sJsons.ip
          Username = sJsons.account
          Password = sJsons.password
          Channel = sJsons.channel
          DevicePort = '8000'
          PlayIt1()
        }
      }
      forJsonds()
    }, 100)
  }

  $(function () {
    setTimeout(function () {
      jsonds()
      forJsonds()
    }, 100)
  })

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
  //       password: ''
  //     }
  //   },
  //   created() {
  //   },
  //   mounted() {
  //     // this.a()
  //     // this.jsonds()
  //     // this.jsond()
  //     this.a()
  //   },
  //   methods: {
  //     down() {
  //       var url = `http://${window.location.host}/static/img/WebComponents.exe`
  //       window.open(url)
  //     },
  //     a() {
  //       setTimeout(function () {
  //         alert(111)
  //         window.PlayIt()
  //       }, 10)
  //     }
  //     // jsond() {
  //     //   setTimeout(() => {
  //     //     if (this.$route.path === '/map') {
  //     //       this.s_jsons = JSON.parse(sessionStorage.getItem('JsonJK'))
  //     //       this.l_jsons = JSON.parse(localStorage.getItem('JsonJK'))
  //     //       this.s_id = this.s_jsons.id
  //     //       this.l_id = this.l_jsons.id
  //     //       if (this.l_id !== this.s_id) {
  //     //         var ip = document.getElementById('ip').value
  //     //         $('#loginip').val(this.s_jsons.ip)
  //     //         $('#port').val(this.s_jsons.port)
  //     //         $('#username').val(this.s_jsons.account)
  //     //         $('#password').val(this.s_jsons.password)
  //     //         localStorage.setItem('JsonJK', JSON.stringify(this.s_jsons))
  //     //         window.clickLogin()
  //     //         setTimeout(() => {
  //     //           document.getElementById('ip').value = ip
  //     //           window.clickLogout()
  //     //         }, 100)
  //     //       }
  //     //       setTimeout(() => {
  //     //         this.jsond()
  //     //       }, 500)
  //     //     }
  //     //   }, 300)
  //     // },
  //     // jsonds() {
  //     //   setTimeout(() => {
  //     //     var sJsons = JSON.parse(sessionStorage.getItem('JsonJK'))
  //     //     $('#loginip').val(sJsons.ip)
  //     //     $('#port').val(sJsons.port)
  //     //     $('#username').val(sJsons.account)
  //     //     $('#password').val(sJsons.password)
  //     //     localStorage.setItem('JsonJK', JSON.stringify(sJsons))
  //     //     window.clickLogin()
  //     //   }, 100)
  //     // }
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
