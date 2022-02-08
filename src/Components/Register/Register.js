import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);

        this.onChangeRoleId = this.onChangeRoleId.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            roleId: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            console.log("Successful check")
        }
    }

    onChangeRoleId(e) {
        this.setState({
            roleId: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        return(
            <div className="col-md-12">
                <Form
                    onSubmit={this.handleRegister}
                    ref={c => {
                        this.form = c;
                    }}
                >
                        <div className="container">
                            <div className="form-group">
                                <label htmlFor="roleId">Role ID:</label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    name="roleId"
                                    value={this.state.roleId}
                                    onChange={this.onChangeRoleId}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">First Name:</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChangeFirstName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastName">Last Name:</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.onChangeLastName}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email (username):</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password1"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Register</button>
                            </div>

                            <CheckButton
                                style={{display: "none"}}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </div>
                </Form>
            </div>
        );
    }
}