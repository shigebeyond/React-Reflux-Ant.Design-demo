import React, { PropTypes } from 'react';
import ReactMixin from 'react-mixin';
import Reflux from '../../reflux';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
import MenuActions from '../../actions/menu';
import TabActions from '../../actions/tab';
import MenuStore from '../../store/menu';
import EmployeeList from '../../views/Employee';

const SubMenu = Menu.SubMenu;

import './index.less';

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    // this.state = {items: [], currentIndex: 0, test: 'nobody'};

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount () {
    MenuActions.getAllMenu();
  }

  handleMenuClick (item) {
    // 更新菜单路径
    MenuActions.updateNavPath(item.keyPath, item.key);
    // 打开新页签
    TabActions.add('员工管理', <EmployeeList />);
  }

  render () {
    const { items } = this.state;
    // 两级菜单
    let openKey = []
    const menu = items.map((item) => {
      openKey.push('sub'+item.key)
      return (
        <SubMenu
          key={'sub'+item.key}
          title={<span><Icon type={item.icon} />{item.name}</span>}
        >
          {item.child.map((node) => {
            return (
              <Menu.Item key={'menu'+node.key}>{node.name}</Menu.Item>
            )
          })}
        </SubMenu>
      )
    });
    return (
      <aside className="ant-layout-sider">
        <div className="ant-layout-logo"></div>
        <Menu
          mode="inline" theme="dark" openKeys={openKey}
          onClick={this.handleMenuClick}
        >
          {menu}
        </Menu>
      </aside>
    )
  }
}

ReactMixin.onClass(Sidebar, Reflux.connectPart(MenuStore,['items', 'currentIndex']));

export default Sidebar;
