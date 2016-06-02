import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import Reflux from '../../reflux';
import { Breadcrumb } from 'antd';
var MenuStore = require('../../store/menu');

import './index.less'

class NavPath extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {navpath: []};
  }

  render () {
    // 根据打开的菜单路径来渲染面包屑
    const { navpath } = this.state;
    const bread = navpath.map((item)=>{
      return (
        <Breadcrumb.Item key={'bc-'+item.key}>{item.name}</Breadcrumb.Item>
      )
    })
    return (
      <div className="ant-layout-breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item key='bc-0'>首页</Breadcrumb.Item>
          {bread}
        </Breadcrumb>
      </div>
    )
  }
};

ReactMixin.onClass(NavPath, Reflux.connectPart(MenuStore,'navpath'));

export default NavPath;
