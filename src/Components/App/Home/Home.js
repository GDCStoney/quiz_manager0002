import React, {Component} from "react";

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
            </div>
        );
    }
}