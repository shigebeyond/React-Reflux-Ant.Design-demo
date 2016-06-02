import React from 'react';
import { Link } from 'react-router';
import { DatePicker, Button, Form, Input, notification } from 'antd';
import UserActions from '../../actions/user';
const createForm = Form.create;
const FormItem = Form.Item;

class EmployeeForm extends React.Component {
  static defaultProps = {
    name: null,
    birthday: null,
    address: null
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    // 校验
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        // console.log(errors);
        notification.error({
            message: '输入错误',
            description: ''
        });
        return;
      }
      console.log('Submit!!!');
      // 新建员工
      console.log(values);
    });
  }

  checkBirthday(rule, value, callback) {
    if (value && value.getTime() >= Date.now()) {
      callback(new Error('你不可能在未来出生吧!'));
    } else {
      callback();
    }
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    let {name, birthday, address} = this.props;
    birthday = new Date(birthday); // string 不能应用getTime()函数
    return (
      <Form horizontal form={this.props.form} className="reg-form">
        <FormItem
          label="姓名："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          <Input placeholder=""
            {...getFieldProps('name', {
              rules: [
                { required: true, message: '姓名不能为空' },
              ],
              initialValue: name
            })}/>
        </FormItem>

        <FormItem
          label="生日："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          <DatePicker
            {...getFieldProps('birthday', {
              rules: [
                {
                  required: true,
                  type: 'date',
                  message: '生日不能为空',
                }, {
                  validator: this.checkBirthday,
                }
              ],
              initialValue: birthday
            })}
          />
        </FormItem>

        <FormItem
          label="地址："
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          <Input type="textarea" placeholder="" id="textarea" name="textarea"
            {...getFieldProps('textarea', {
              rules: [
                { required: true, message: '真的不打算写点什么吗？' },
              ],
              initialValue: address
            })}/>
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }} style={{marginBottom: 5}}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
            &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

EmployeeForm = createForm()(EmployeeForm);

export default EmployeeForm;
