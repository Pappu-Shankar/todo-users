import React from 'react';
import { Form, Input } from 'antd';

class TodoForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            task: '',
            dataAdded: new Date(),
            formErrors: {
                task: '',
                dataAdded: ''
            }
        }
    }

    componentDidMount() {
        const { editData } = this.props;
        if (editData) {
            this.setState({ id: editData.key, task: editData.task, dataAdded: editData.dataAdded });
        }
    }

    componentDidUpdate(prevProps) {
        const { editData } = this.props;
        if (this.props.editData && prevProps.editData !== this.props.editData) {
            this.setState({ id: editData.key, task: editData.task, dataAdded: editData.dataAdded });
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "task":
                formErrors.task = value.length >= 1 ? "" : "minimum 1 characaters required";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
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
                </Form>
        </>)
    }
}


export default TodoForm;