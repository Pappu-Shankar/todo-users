import React from 'react';
import CustomTable from './CustomTable';
import UserForm from './UserForm';
import { connect } from 'react-redux';
import { addUser, deleteUser, updateUser } from '../redux/actions/userActions';
import uuid from 'react-uuid';
import { formValid } from '../Utils'
import CustomModal from './CustomModal';
import { Divider } from 'antd';

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editObj: null
        }
    }

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email Id',
            dataIndex: 'email',
            key: 'email',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (element) => (
                <span >
                    <a onClick={() => this.onEditHandler(element)}>Edit</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.onDeleteHandler(element)}>Delete</a>
                </span>
            ),
        },
    ];

    onEditHandler = (editObj) => {
        this.setState({ editObj });
        this.modalRef.setState({
            visible: true,
        });
    }

    onDeleteHandler = (editObj) => {
        this.props.dispatch(deleteUser(editObj.key));
    }

    showModal = () => {
        this.modalRef.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.modalRef.setState({ loading: true });
        if (formValid(this.formRef.state)) {
            let formData = {
                key: this.formRef.state.id,
                name: this.formRef.state.name,
                email: this.formRef.state.emailId
            }
            setTimeout(() => {
                if (formData.key === null) {
                    formData.key = uuid();
                    this.props.dispatch(addUser(formData));
                } else {
                    this.props.dispatch(updateUser(formData));
                }
                this.formRef.setState({
                    id: null,
                    name: '',
                    emailId: '',
                    formErrors: {
                        name: '',
                        emailId: ''
                    }
                });
                this.setState({ editObj: null });
                this.modalRef.setState({ loading: false, visible: false });
            }, 3000);
        } else {
            console.log("FORM INVALID - DISPLAY ERROR MESSAGE");
            alert("FORM INVALID");
            this.modalRef.setState({ loading: false });
        }
    }

    handleCancle = () => {
        this.formRef.setState({
            id: null,
            name: '',
            emailId: '',
            formErrors: {
                name: '',
                emailId: ''
            }
        });
        this.setState({ editObj: null });
    }

    render() {
        return (
            <>
                <CustomModal
                    title="Create Users"
                    buttonLabel="Create"
                    onCreate={this.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancle}
                    ref={node => (this.modalRef = node)}
                >
                    <UserForm editData={this.state.editObj} ref={node => (this.formRef = node)} onSubmit={this.handleSubmit} onCancle={this.handleCancle} />
                </CustomModal>
                <CustomTable columns={this.columns} data={this.props.users} />
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return state.users
}

export default connect(mapStateToProps)(Users);
