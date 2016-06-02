import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import Reflux from '../../reflux';
import { Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

import TabActions from '../../actions/tab';
import TabStore from '../../store/tab';

class SKTabs extends React.Component {
  constructor(props) {
    super(props);
    this.debug = false; // 是否显示调试的按钮
  }

  handleAdd(){
    TabActions.add('test title', <div>test content</div>);
  }

  handleChange(activeKey) {
    TabActions.select(activeKey);
  }

  handleEdit(targetKey, action) {
    TabActions[action](targetKey);
  }

  renderDebugButton(){
    if(this.debug){
      return (
        <div style={{ marginBottom: 16 }}>
          <Button type="ghost" onClick={this.handleAdd}>新增</Button>
        </div>
      )
    }
    return null;
  }

  renderTabs(){
    const {panes, activeKey} = this.state;
    // console.log(activeKey);
    if(panes && panes.length){
      return (
        <Tabs hideAdd onChange={this.handleChange} activeKey={activeKey}
          type="editable-card" onEdit={this.handleEdit}>
          {panes}
        </Tabs>
      )
    }
    return null;
  }

  render() {

    return (
      <div>
        {this.renderDebugButton()}
        {this.renderTabs()}
      </div>
    );
  }

}

ReactMixin.onClass(SKTabs, Reflux.connectPart(TabStore, ['activeKey', 'panes']));

export default SKTabs;
