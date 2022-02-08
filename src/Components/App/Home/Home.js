import React, {Component} from "react";
import {Collapse} from "bootstrap";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    render() {
        return (
            <div className="container">
                <header className="bg-light p-5 rounded-3 m-3">
                    <h2>Quiz Manager</h2>
                </header>
                <div className="row">
                <div className="col-bg-3"></div>
                    <div className="col-bg-9">
                        <h5>Please wait for further development</h5>
                    </div>
                </div>
                <div className="container p-5">
                    <div className="accordion" id="journal">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="false"
                                        aria-controls="collapseOne"
                                >
                                    Ability to log into the application
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne">
                                <div className="accordion-body">
                                    The functionality is to have the login tag enabled, and use the AuthService to access the /login API endpoint to get a token
                                    for access to the protected portions of the API.
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                >
                                    Ability to show profile information
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo">
                                <div className="accordion-body">
                                    The functionality is to show the user has been successfully logged in, and for use in debugging and checking.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}