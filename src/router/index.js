/* eslint-disable no-undef */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const INdex = (resolve) => {
  import('@/components/index').then((module) => {
    resolve(module)
  })
}
const Login = (resolve) => {
  import('@/components/login').then((module) => {
    resolve(module)
  })
}
const Role = (resolve) => {
  import('@/components/role').then((module) => {
    resolve(module)
  })
}
const RegisterList = (resolve) => {
  import('@/components/registerList').then((module) => {
    resolve(module)
  })
}
const NewCar = (resolve) => {
  import('@/components/newCar').then((module) => {
    resolve(module)
  })
}
const SynRegistration = (resolve) => {
  import('@/components/SynRegistration').then((module) => {
    resolve(module)
  })
}
const AutManagement = (resolve) => {
  import('@/components/autManagement').then((module) => {
    resolve(module)
  })
}
const PerModification = (resolve) => {
  import('@/base/autManagement/perModification').then((module) => {
    resolve(module)
  })
}
const RoleManagement = (resolve) => {
  import('@/components/roleManagement').then((module) => {
    resolve(module)
  })
}
const DepManagement = (resolve) => {
  import('@/components/depManagement').then((module) => {
    resolve(module)
  })
}
const RoleModification = (resolve) => {
  import('@/base/roleManagement/roleModification').then((module) => {
    resolve(module)
  })
}
const BmManagement = (resolve) => {
  import('@/components/bmManagement').then((module) => {
    resolve(module)
  })
}
const BmModification = (resolve) => {
  import('@/base/bmManagement/bmModification').then((module) => {
    resolve(module)
  })
}
const DataDictionary = (resolve) => {
  import('@/components/dataDictionary').then((module) => {
    resolve(module)
  })
}
const DataModification = (resolve) => {
  import('@/base/dataDictionary/dataModification').then((module) => {
    resolve(module)
  })
}
const SysManagement = (resolve) => {
  import('@/components/sysManagement').then((module) => {
    resolve(module)
  })
}
const SysModification = (resolve) => {
  import('@/base/sysManagement/sysModification').then((module) => {
    resolve(module)
  })
}
const UserManagement = (resolve) => {
  import('@/components/userManagement').then((module) => {
    resolve(module)
  })
}
const UserModification = (resolve) => {
  import('@/base/userManagement/userModification').then((module) => {
    resolve(module)
  })
}
const MapManagement = (resolve) => {
  import('@/components/mapManagement').then((module) => {
    resolve(module)
  })
}
const MapModification = (resolve) => {
  import('@/base/mapManagement/mapModification').then((module) => {
    resolve(module)
  })
}
const CarManagement = (resolve) => {
  import('@/components/carManagement').then((module) => {
    resolve(module)
  })
}
const CarModification = (resolve) => {
  import('@/base/carManagement/carModification').then((module) => {
    resolve(module)
  })
}
const CarInformation = (resolve) => {
  import('@/components/carInformation').then((module) => {
    resolve(module)
  })
}
const CarRegistration = (resolve) => {
  import('@/base/carInformation/carRegistration').then((module) => {
    resolve(module)
  })
}
const LineManagement = (resolve) => {
  import('@/components/lineManagement').then((module) => {
    resolve(module)
  })
}
const Map = (resolve) => {
  import('@/components/map').then((module) => {
    resolve(module)
  })
}
const LineModification = (resolve) => {
  import('@/base/lineManagement/lineModification').then((module) => {
    resolve(module)
  })
}
const TrackerManagement = (resolve) => {
  import('@/components/trackerManagement').then((module) => {
    resolve(module)
  })
}
const TrackerModification = (resolve) => {
  import('@/base/trackerManagement/trackerModification').then((module) => {
    resolve(module)
  })
}
const MonitorManagement = (resolve) => {
  import('@/components/monitorManagement').then((module) => {
    resolve(module)
  })
}
const MonitorModification = (resolve) => {
  import('@/base/monitorManagement/monitorModification').then((module) => {
    resolve(module)
  })
}
const BlackListManagement = (resolve) => {
  import('@/components/blackListManagement').then((module) => {
    resolve(module)
  })
}
const BlackListModification = (resolve) => {
  import('@/base/blackListManagement/blackListModification').then((module) => {
    resolve(module)
  })
}
const HistoricalManagement = (resolve) => {
  import('@/components/historicalManagement').then((module) => {
    resolve(module)
  })
}
const TrackBack = (resolve) => {
  import('@/components/trackBack').then((module) => {
    resolve(module)
  })
}
const WebVideo = (resolve) => {
  import('@/base/webVideo').then((module) => {
    resolve(module)
  })
}
const passWord = (resolve) => {
  import('@/components/passWord').then((module) => {
    resolve(module)
  })
}
const progress = (resolve) => {
  import('@/base/progress').then((module) => {
    resolve(module)
  })
}
const history = (resolve) => {
  import('@/components/history').then((module) => {
    resolve(module)
  })
}
const mapAll = (resolve) => {
  import('@/components/mapAll').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      component: INdex,
      meta: {
        requireAuth: true  // 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/role',
      component: Role
    },
    {
      path: '/registerList',
      component: RegisterList
    }, {
      path: '/newCar',
      component: NewCar
    }, {
      path: '/SynRegistration',
      component: SynRegistration
    }, {
      path: '/autManagement',
      component: AutManagement
    }, {
      path: '/perModification',
      name: 'PerModification',
      component: PerModification
    }, {
      path: '/roleManagement',
      component: RoleManagement
    }, {
      path: '/depManagement',
      component: DepManagement
    },
    {
      path: '/roleModification',
      name: 'RoleModification',
      component: RoleModification
    }, {
      path: '/bmManagement',
      component: BmManagement
    },
    {
      path: '/bmModification',
      name: 'BmModification',
      component: BmModification
    },
    {
      path: '/dataDictionary',
      component: DataDictionary
    },
    {
      path: '/dataModification',
      name: 'DataModification',
      component: DataModification
    },
    {
      path: '/sysManagement',
      component: SysManagement
    },
    {
      path: '/sysModification',
      name: 'SysModification',
      component: SysModification
    },
    {
      path: '/userManagement',
      component: UserManagement
    },
    {
      path: '/userModification',
      name: 'UserModification',
      component: UserModification
    },
    {
      path: '/mapManagement',
      component: MapManagement
    },
    {
      path: '/mapModification',
      name: 'MapModification',
      component: MapModification
    },
    {
      path: '/carManagement',
      component: CarManagement
    },
    {
      path: '/carModification',
      name: 'CarModification',
      component: CarModification
    },
    {
      path: '/carInformation',
      name: 'CarInformation',
      component: CarInformation
    },
    {
      path: '/carRegistration',
      name: 'CarRegistration',
      component: CarRegistration
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/lineManagement',
      name: 'LineManagement',
      component: LineManagement
    },
    {
      path: '/lineModification',
      name: 'LineModification',
      component: LineModification
    },
    {
      path: '/trackerManagement',
      name: 'TrackerManagement',
      component: TrackerManagement
    },
    {
      path: '/trackerModification',
      name: 'TrackerModification',
      component: TrackerModification
    },
    {
      path: '/monitorManagement',
      name: 'MonitorManagement',
      component: MonitorManagement
    },
    {
      path: '/monitorModification',
      name: 'MonitorModification',
      component: MonitorModification
    },
    {
      path: '/blackListManagement',
      name: 'BlackListManagement',
      component: BlackListManagement
    },
    {
      path: '/blackListModification',
      name: 'BlackListModification',
      component: BlackListModification
    },
    {
      path: '/historicalManagement',
      name: 'HistoricalManagement',
      component: HistoricalManagement
    },
    {
      path: '/trackBack',
      name: 'TrackBack',
      component: TrackBack
    },
    {
      path: '/webVideo',
      name: 'WebVideo',
      component: WebVideo
    },
    {
      path: '/passWord',
      name: 'passWord',
      component: passWord
    },
    {
      path: '/progress',
      name: 'progress',
      component: progress
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/mapAll',
      name: 'mapAll',
      component: mapAll
    }
  ]
})
