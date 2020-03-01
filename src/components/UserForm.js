import React from 'react';
import { Form, Input } from 'antd';
import { emailRegex } from '../Utils'

class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            emailId: '',
            formErrors: {
                name: '',
                emailId: ''
            }
        }
    }

    componentDidMount() {
        const { editData } = this.props;
        if (editData) {
            this.setState({ id: editData.key, name: editData.name, emailId: editData.email });
        }
    }

    componentDidUpdate(prevProps) {
        const { editData } = this.props;
        if (this.props.editData && prevProps.editData !== this.props.editData) {
            this.setState({ id: editData.key, name: editData.name, emailId: editData.email });
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
            case "name":
                formErrors.name = value.length >= 1 ? "" : "minimum 1 characaters required";
                break;
            case "emailId":
                formErrors.emailId = emailRegex.test(value) ? "" : "invalid email address";;
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
                    <Form.Item label="Name">
                        <Input placeholder="Enter Name" className={formErrors.name.length > 0 && "error"} name="name" autoComplete="off" value={this.state.name} onChange={this.handleChange} />
                        {formErrors.name.length > 0 ? (
                            <span className="errorMessage">{formErrors.name}</span>
                        ) : null}
                    </Form.Item>
                    <Form.Item label="Email Id">
                        <Input placeholder="Enter Email Id" className={formErrors.emailId.length > 0 && "error"} name="emailId" autoComplete="off" value={this.state.emailId} onChange={this.handleChange} />
                        {formErrors.emailId.length > 0 ? (
                            <span className="errorMessage">{formErrors.emailId}</span>
                        ) : null}
                    </Form.Item>
                </Form>
        </>)
    }
}


export default UserForm;