import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import moment from 'moment';

const dateFormat = "DD-MM-YYYY HH:mm";

class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            task: '',
            dateAdded: moment(new Date(), dateFormat),
            formErrors: {
                task: '',
                dateAdded: ''
            }
        }
    }

    componentDidMount() {
        const { editData } = this.props;
        if (editData) {
            this.setState({ id: editData.key, task: editData.task, dateAdded: editData.dateAdded });
        }
    }

    componentDidUpdate(prevProps) {
        const { editData } = this.props;
        if (this.props.editData && prevProps.editData !== this.props.editData) {
            this.setState({ id: editData.key, task: editData.task, dateAdded: editData.dateAdded });
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        let formErrors = { ...this.state.formErrors };
        formErrors.task = value.length >= 1 ? "" : "minimum 1 characaters required";
        this.setState({ formErrors, [name]: value });
    }
    onOk = (value) => {
        const date = value.format(dateFormat);
        let formErrors = { ...this.state.formErrors };
        formErrors.dateAdded = date.length >= 1 ? "" : "Enter a valid date";
        this.setState({ ['dateAdded']: date });
    }
    render() {
        const { formErrors } = this.state;
        return (<>
            <Form layout="vertical">
                <Form.Item label="Task">
                    <Input placeholder="Enter Task" className={formErrors.task.length > 0 && "error"} name="task" autoComplete="off" value={this.state.task} onChange={this.handleChange} />
                    {formErrors.task.length > 0 ? (
                        <span className="errorMessage">{formErrors.task}</span>
                    ) : null}
                </Form.Item>
                <Form.Item label="Date">
                    <DatePicker className={formErrors.dateAdded.length > 0 && "error"} showTime format={dateFormat} value={moment(this.state.dateAdded, dateFormat)} onOk={this.onOk} />
                    {formErrors.dateAdded.length > 0 ? (
                        <span className="errorMessage">{formErrors.dateAdded}</span>
                    ) : null}
                </Form.Item>
            </Form>
        </>)
    }
}


export default TodoForm;