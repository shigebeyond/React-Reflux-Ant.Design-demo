import Reflux from '../reflux';
import {getCookie} from '../utils';
import { notification } from 'antd';

var UserActions = require('../actions/user');
import api from '../api';

var UserStore = Reflux.createStore({
  // this will set up listeners to all publishers in UserActions, using onKeyname (or keyname) as callbacks
  listenables: [UserActions],
  getInitialState: function() {
    return {
      user: {},
    };
  },
  // 登陆: 登陆成功后服务端自动往客户端写cookie, cookie名为uid，域为127.0.0.1（参见server.js）
  onLogin: function(user, password) {
    api.put('/login', {
      data: {
        user: user,
        password: password
      }
    }).then((user) => {
      // console.log('login success: ' + JSON.stringify(user));
      notification.success({
          message: '登陆成功',
          description: '欢迎' + user.user
      });
      UserActions.login.completed(user); // 调用外层回调：触发action时的promise回调（即then()）
    }).catch((e) => {
      notification.error({
          message: '登陆失败',
          description: e
      });
    });
  },
  // 登出
  onLogout: function(){
    // 删除cookie or 请求服务端

  },
  // 注册
  onReg: function(data) {
      api.post('/register', {data})
        .then((user) => {
          notification.success({
              message: '注册成功',
              description: '恭喜你，注册成功'
          });
        }).catch((e) => {
          notification.error({
              message: '注册失败',
              description: e
          });
        });
  },
  // 获得登陆用户信息
  onFetchProfile: function() {
      let uid = getCookie('uid'); // cookie名为uid，域为127.0.0.1（参见server.js）
      if (uid === undefined) {
          return;
      }

      api.post('/my')
        .then((user) => {
          this.triggerPart({user});
        }).catch((e) => {
          notification.error({
              message: 'Fetch profile fail',
              description: e
          });
        });
  },
});

module.exports = UserStore;
