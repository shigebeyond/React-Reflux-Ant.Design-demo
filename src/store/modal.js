import Reflux from '../reflux';
import { notification } from 'antd';

var ModalActions = require('../actions/modal');

var ModalStore = Reflux.createStore({
  // this will set up listeners to all publishers in ModalActions, using onKeyname (or keyname) as callbacks
  listenables: [ModalActions],
  getInitialState: function() {
    return {
      modal: {
        title: '',
        content: null,
      },
    };
  },

  /**
   * 弹出对话框
   * @param title 对话框标题
   * @param content 对话框内容
   */
  onShow(title, content) {
    this.triggerPart({title, content});
  },

  // 关闭对话框
  onHide() {
    this.triggerPart({content: false});
  },
});

module.exports = ModalStore;
