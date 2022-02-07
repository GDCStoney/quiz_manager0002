import React, {Component} from "react";

import AuthService from "../../Services/auth-service";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);

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


    }

    render() {
        return(
            <div className="col-md-12">

            </div>
        );
    }
}