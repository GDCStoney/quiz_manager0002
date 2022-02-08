import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
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
                This is not a valid email address!
            </div>
        );
    }
};

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            loading: "",
            message: ""
        }
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

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.logIn(
                this.state.email, this.state.password
            ).then (
                () => {
                    window.history.replaceState(this.state, 'logged in user', "/profile");
                    window.location.reload();
                },
                error => {
                    const errMessage = (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) ||
                    error.message ||
                    error.toString();

                    this.setState({
                        loading: false,
                        message: errMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />

                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="form-group">
                            <label htmlFor="email">Email Address (username):</label>
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
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-ss"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>


                        {this.state.message && (
                            <div className="alert alert-danger" role="alert">
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
        )
    }
}