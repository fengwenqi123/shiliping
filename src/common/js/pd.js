function pd() {
  if (WebVideoCtrl.I_CheckPluginInstall() === -1) {
    var num = '您还未安装过插件，双击开发包目录里的WebComponents.exe安装！'
    return num
  }
}

export { // 很关键
  pd
}
