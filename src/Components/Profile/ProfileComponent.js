import React, {Component} from "react";

import AuthService from "../../Services/auth-service";


export default class ProfileComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {
        return (
            <div className="container">

            </div>
        )
    }
}