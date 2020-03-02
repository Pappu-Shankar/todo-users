import React from 'react';
import CustomTable from './CustomTable';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';
import { addTask, deleteTask, updateTask } from '../redux/actions/todoActions';
import uuid from 'react-uuid';
import { formValid } from '../Utils';
import moment from 'moment';
import CustomModal from './CustomModal';
import { Divider } from 'antd';

class Todo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            editObj: null
        }
    }

    columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Date',
            dataIndex: 'dateAdded',
            key: 'dateAdded',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (element) => (
                <span >
                    <a href="#" onClick={() => this.onEditHandler(element)}>Edit</a>
                    <Divider type="vertical" />
                    <a href="#" onClick={() => this.onDeleteHandler(element)}>Delete</a>
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
        this.props.dispatch(deleteTask(editObj.key));
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
                task: this.formRef.state.task,
                dateAdded: this.formRef.state.dateAdded
            }

            setTimeout(() => {
                if (formData.key === null) {
                    formData.key = uuid();
                    // formData.dateAdded = new Date();
                    this.props.dispatch(addTask(formData));
                } else {
                    this.props.dispatch(updateTask(formData));
                }
                this.formRef.setState({
                    id: null,
                    task: '',
                    dateAdded: moment(new Date()).format("DD-MM-YYYY HH:mm"),
                    formErrors: {
                        task: '',
                        dateAdded: ''
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
            task: '',
            dateAdded: moment(new Date()).format("DD-MM-YYYY HH:mm"),
            formErrors: {
                task: '',
                dateAdded: ''
            }
        });
        this.setState({ editObj: null });
    }

    render() {
        return (
            <>
                <CustomModal
                    title="Create Todo"
                    buttonLabel="Create"
                    onCreate={this.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancle}
                    ref={node => (this.modalRef = node)}
                >
                    <TodoForm editData={this.state.editObj} ref={node => (this.formRef = node)} onSubmit={this.handleSubmit} onCancle={this.handleCancle} />
                </CustomModal>
                <CustomTable columns={this.columns} data={this.props.tasks} />
            </>
        )
    }

}

const mapStateToProps = (state) => {
    return state.tasks
}

export default connect(mapStateToProps)(Todo);