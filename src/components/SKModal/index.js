import React, {PropTypes} from 'react';
import ReactMixin from 'react-mixin';
import Reflux from '../../reflux';
import {Modal} from 'antd';
import ModalActions from '../../actions/modal';
import ModalStore from '../../store/modal';

class SKModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {title, content} = this.state;

    return (
        <Modal title={title} visible={!!content} footer={null} onCancel={() => ModalActions.hide()}>
          {content}
        </Modal>
    );
  }

}

ReactMixin.onClass(SKModal, Reflux.connectPart(ModalStore, ['title', 'content']));

export default SKModal;
