import React from 'react'
import { Modal, Button } from 'antd';

class CustomModal extends React.Component {
  state = {
    loading: false,
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
    this.props.onCreate();
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.handleCancel();
  };

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {this.props.buttonLabel}
        </Button>
        <Modal
          visible={visible}
          title={this.props.title}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.props.handleOk}>
              Submit
            </Button>,
          ]}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }
}

export default CustomModal;