'use strict';

import React from 'react';
import { Row, Col, Alert } from 'antd';
import {Link} from 'react-router';

const uhOh = React.createClass({
    render() {
      let content = (
        <div>
            <h4>{ 'That Page Doesn\'t Exist' }</h4>
            <p><Link to="/">Return to the homepage</Link></p>
        </div>
      )
      return (
        <Row className="login-row" type="flex" justify="space-around" align="middle">
          <Col span="8">
            <Alert
              message="404"
              description={content}
              type="info"
              showIcon
            />
          </Col>
        </Row>
      );
    }
});

export default uhOh;
