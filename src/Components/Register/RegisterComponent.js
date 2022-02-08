import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button"
import isEmail from "validator/es/lib/isEmail";

import AuthService from "../../Services/auth-service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vEmail = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email!
            </div>
        );
    }
};

const vRoleId = value => {
    if (1 > value || value > 3 ) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid Role Identifier - please use 1, 2, or 3!
            </div>
        )
    }
}

export default class RegisterComponent extends Component {
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
            AuthService.register(
                parseInt(this.state.roleId),
                this.state.firstName,
                this.state.lastName,
                this.state.email,
                this.state.password
            ).then (
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const errMessage = (
                        error.response &&
                            error.response.data &&
                            error.response.data.message
                    ) || error.message
                    || error.toString();

                    this.setState({
                        successful: false,
                        message: errMessage
                    });
                }
            );
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
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Form
                        onSubmit={this.handleRegister}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        {!this.state.successful && (
                            <div className="container">
                                <div className="form-group">
                                    <label htmlFor="roleId">Role ID:</label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        name="roleId"
                                        value={this.state.roleId}
                                        onChange={this.onChangeRoleId}
                                        validations={[required, vRoleId]}
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
                                        validations={[required, vEmail]}
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
                            </div>
                        )}

                        {this.state.message && (
                            <div className={
                                this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                                 role="alert"
                            >
                                {this.state.message}
                            </div>
                        )}

                        <CheckButton
                            style={{display: "none"}}
                            ref={c => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}