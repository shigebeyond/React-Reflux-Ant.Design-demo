import React from 'react';
import Reflux from '../reflux';
import { notification, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

var TabActions = require('../actions/tab');

var TabStore = Reflux.createStore({
  // this will set up listeners to all publishers in TabActions, using onKeyname (or keyname) as callbacks
  listenables: [TabActions],
  getInitialState() {
    this.tabIndex = 0;
    return {
      activeKey: 0,
      panes: [],
    };
  },

  /**
   * 添加页签
   * @param title 页签标题
   * @param content 页签内容
   */
  onAdd(title, content) {
    const {panes} = this.getState();
    const activeKey = `tab${this.tabIndex++}`; // key自动递增
    panes.push(<TabPane tab={title} key={activeKey}>{content}</TabPane>);

    this.triggerPart({ panes, activeKey });
  },

  /**
   * 删除页签
   * @param targetKey 页签key
   */
  onRemove(targetKey) {
    // 获得上一个页签index
    let lastIndex;
    let {panes, activeKey} = this.getState();
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    // 删除指定页签
    panes = panes.filter(pane => pane.key !== targetKey);
    // 如果被删除的是当前页签，则拿上一个页签做当前页签
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }

    this.triggerPart({ panes, activeKey });
  },

  /**
   * 选中页签
   * @param activeKey 页签key
   */
  onSelect(activeKey) {
    this.triggerPart({ activeKey });
  }
});

module.exports = TabStore;
