import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import Reflux from '../../reflux';
import {Affix , Row, Col} from 'antd';
var UserActions = require('../../actions/user');
var UserStore = require('../../store/user');

import NavPath from '../../components/NavPath';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import SKModal from '../../components/SKModal';

import 'antd/style/index.less';
import './index.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    UserActions.fetchProfile();
  }

  render() {
    const {user} = this.state;

    return (
      <div className="ant-layout-aside">
        {/* 侧边栏：菜单 */}
        <Sidebar />
        {/* 正文 */}
        <div className="ant-layout-main">
          {/* 页头 */}
          <Header user={user} />
          {/* 面包屑 */}
          <NavPath />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          {/* 页脚 */}
          <Footer />
        </div>
        {/* 模态窗口 */}
        <SKModal />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

App.contextTypes = {
  history: PropTypes.object.isRequired,
};

ReactMixin.onClass(App, Reflux.connectPart(UserStore,'user'));

export default App;
