import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Button from "react-validation/build/button";
import CheckButton from "react-validation/build/button";

import QResponseService from "../../../Services/qResponse-service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class QResponseForm extends Component {
    constructor(props) {
        super(props);

        this.onChangeResponseText = this.onChangeResponseText.bind(this);
        this.onChangeCorrectAnswer = this.onChangeCorrectAnswer.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            message: "",
            loading: "",
            responseText: "",
            correctAnswer: false,
        };
    }

    onChangeResponseText(e) {
        this.setState({
            responseText: e.target.value,
        })
    }

    onChangeCorrectAnswer(e) {
        this.setState({
            correctAnswer: !this.state.correctAnswer,
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        QResponseService.addQResponse({
            quizId: this.props.quizId,
            questionId: this.props.questionId,
            responseText: this.state.responseText,
            correctAnswer: this.state.correctAnswer
        })
            .then(response => { this.props.onSubmit({qResponseId: response.data.qresponseId, responseText: response.data.responseText}) });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <div className="input-group p-1">
                            <label className="form-label m-3" htmlFor="responseText">Response Text</label>
                            <Input
                                className="form-control-lg w-auto"
                                name="responseText"
                                type="text"
                                value={this.state.responseText}
                                placeholder="Enter Response Text"
                                onChange={this.onChangeResponseText}
                                validations={[required]}
                            />

                            <label className="form-label m-3" htmlFor="correctAnswer">Correct Answer?</label>
                            <Input
                                className="form-check align-items-lg-baseline m-3"
                                name="correctAnswer"
                                type="checkbox"
                                checked={this.state.correctAnswer}
                                onChange={this.onChangeCorrectAnswer}
                            />
                        </div >
                        <div className="input-group">
                            <Button
                                className="btn btn-outline-primary"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-grow-sm"></span>
                                )}
                                <span>{this.props.activityState}</span>
                            </Button>
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
        );
    }
}