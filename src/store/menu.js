import Reflux from '../reflux';
import { notification } from 'antd';
import _ from 'lodash';

var MenuActions = require('../actions/menu');
import api from '../api';

var MenuStore = Reflux.createStore({
  // this will set up listeners to all publishers in UserActions, using onKeyname (or keyname) as callbacks
  listenables: [MenuActions],
  getInitialState: function() {
    return {
      currentIndex: 0, // 当前点击的菜单key
      items: [], // 两级的菜单，以children来关联
      navpath: [] // 打开的菜单路径
    };
  },
  // 获得菜单
  onGetAllMenu: function(){
    api.post('/menu')
      .then((data) => {
        this.triggerPart({items: data.menus});
    }).catch((e) => {
      notification.error({
          message: 'Get all menu fail',
          description: e
      });
    });
  },
  // 更新菜单路径
  onUpdateNavPath: function(path, key){
    const {items} = this.getState();
    let navpath = [], tmpOb, tmpKey, child;
    path.reverse().map((item)=>{
      if(item.indexOf('sub') != -1){ // 第二级菜单
        tmpKey = item.replace('sub', '');
        tmpOb = _.find(items, function(o) {
          return o.key == tmpKey;
        });
        child = tmpOb.child;
        navpath.push({
          key: tmpOb.key,
          name: tmpOb.name
        })
      }
      if(item.indexOf('menu') != -1){ // 第一级菜单
        tmpKey = item.replace('menu', '');
        if(child){
          tmpOb = _.find(child, function(o) {
            return o.key == tmpKey;
          });
        }
        navpath.push({
          key: tmpOb.key,
          name: tmpOb.name
        })
      }
    })
    this.triggerPart({
        currentIndex: key,
        navpath
    });
  },
});

module.exports = MenuStore;
