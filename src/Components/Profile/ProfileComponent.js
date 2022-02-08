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
        const {currentUser} = this.state;
        const ROLES_MAP = ["ADMIN", "TAKER", "MARKER", "SETTER"];

        return (
            <div className="container">
                <header className="bg-light p-5 rounded-3">
                    <h3>Profile for - {currentUser.email}</h3>
                </header>
                <p>
                    <strong>Token: </strong>
                    {currentUser.token.substring(0,20)} ...
                    {currentUser.token.substr(currentUser.token.length - 20)}
                </p>

                <p>
                    <strong>User ID: </strong>
                    {currentUser.userId}
                </p>

                <p>
                    <strong>Full Name: </strong>
                    {currentUser.firstName} {currentUser.lastName}
                </p>

                <ul>
                    <strong>Roles: </strong>
                    <li>{ROLES_MAP[currentUser.roleId]}</li>
                </ul>
            </div>
        );
    }
}