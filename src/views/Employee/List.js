import React from 'react';
import { Table, Pagination, Button, Icon, notification } from 'antd';
import ModalActions from '../../actions/modal';
import EmployeeForm from './Form';
import api from '../../api';

const EmployeeList = React.createClass({
  getInitialState() {
    return {
      selectedRowKeys: [],  // 这里配置默认勾选列
      loading: false,
      items: [], // 当页数据
      total: 0, // 总个数
    };
  },

  componentDidMount: function() {
    this.fetchData(1);
  },

  fetchData(page){
    // 获得分页数据
    api.post('/employee', {
      params: {page}
    }).then((data) => {
      console.log(data);
      if(!data){
        notification.error({
            message: '没有数据',
            description: ''
        });
        return;
      }
      this.setState({
        items: data.items,
        total: data.total
      });
    }).catch((e) => {
      notification.error({
          message: '获得员工列表失败',
          description: e
      });
    });
  },

  handleSubmit() {
    this.setState({ loading: true });
    // 模拟 ajax 请求，完成后清空
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  },

  // 获得table的列
  getTableColumns(){
    return [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '生日',
      dataIndex: 'birthday',
    }, {
      title: '住址',
      dataIndex: 'address',
    }, {
      title: '操作',
      key: 'operation',
      render: (text, item) => (
        <span>
          <a href="#" onClick={() => this.handleEdit(item)}>编辑</a>
          <span className="ant-divider"></span>
          <a href="#">删除</a>
        </span>
      ),
    }];
  },

  // 换页
  onPageChange(page) {
    this.fetchData(page);
  },

  // 处理选中
  onSelectChange(selectedRowKeys) {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  },

  // 处理新建
  handleNew(){
    ModalActions.show('新建员工', (<EmployeeForm />));
  },

  // 处理编辑
  handleEdit(data){
    ModalActions.show('编辑员工', (<EmployeeForm {...data}/>));
  },

  render() {
    const { loading, selectedRowKeys, items, total } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          {/* 选择 */}
          <Button type="primary" onClick={this.handleSubmit}
            disabled={!hasSelected} loading={loading}>操作</Button>
          <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
          {/* 新建 */}
          <Button type="primary" onClick={this.handleNew}>新建</Button>
        </div>
        {/* 列表 */}
        <Table rowSelection={rowSelection} columns={this.getTableColumns()} dataSource={items} pagination={false}/>
        {/* 分页 */}
        <div>
          <Pagination className='ant-table-pagination' total={total} onChange={this.onPageChange} />
        </div>
      </div>
    );
  },
});

export default EmployeeList;
