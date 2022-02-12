import React, {Component} from "react";
import Select from "react-select";

import AuthService from "../../../Services/auth-service";
import QuizService from "../../../Services/quiz-service";
import QuestionService from "../../../Services/question-service";
import QResponseService from "../../../Services/qResponse-service";

export default class QuizList extends Component {
    constructor(props) {
        super(props);

        this.onChangeQuizList = this.onChangeQuizList.bind(this);
        this.onChangeQuestionList = this.onChangeQuestionList.bind(this);
        this.onChangeQResponseList = this.onChangeQResponseList.bind(this);

        this.state = {
            currentUser: "",
            content: "",
            quizzes: [],
            selectedQuizId: "",
            selectedQuiz: "",
            questions: [],
            selectedQuestionId: "",
            selectedQuestion: "",
            qResponses: [],
            selectedQResponseId: "",
            selectedQResponse: "",
        };
    }

    componentDidMount() {
        setTimeout(()=> {
        this.setState({
            currentUser: AuthService.getCurrentUser(),
        })

        QuizService.fetchQuizList().then(
                response => {
                    this.setState({
                        quizzes: response.data,
                    });
                }
                );
        }, 0);
    }


    onChangeQuizList(e) {
        setTimeout(() => {
            QuestionService.fetchQuestionList(this.state.selectedQuizId).then(
                response => {
                    this.setState({
                        questions: response.data,
                    })
                },
                error => {
                    this.setState({
                        content: (
                            error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        },200);

        this.setState({
            selectedQuizId: e.value,
            selectedQuiz: e.label,
            selectedQuestionId: "",
            selectedQuestion: "",
            selectedQResponseId: "",
            selectedQResponse: "",
            qResponses: [],
        });
    }

    onChangeQuestionList(e) {
        setTimeout(() => {
            QResponseService.fetchQResponseList(
                this.state.selectedQuizId,
                this.state.selectedQuestionId
            ).then(
                response => {
                    this.setState({
                        qResponses: response.data,
                    })
                },
                error => {
                    this.setState({
                        content: (
                            error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message ||
                            error.toString()
                    });
                }
            );
        }, 200);

        this.setState({
            selectedQuestionId: e.value,
            selectedQuestion: e.label,
            selectedQResponseId: "",
            selectedQResponse: "",
        });

    }

    onChangeQResponseList(e) {
        this.setState({
            selectedQResponseId: e.value,
            selectedQResponse: e.label,
        });
    }

    mapQuizOptions(collection) {
        return(collection.map((element) => {
            return {value: element.quizId, label: element.name};
        }));
    }

    mapQuestionOptions(collection) {
        return(collection.map((element) => {
            return {value: element.questionId, label: element.questionText};
        }));
    }

    mapQResponseOptions(collection) {
        return (collection.map((element) => {
            return {value: element.qresponseId, label: element.responseText};
        }));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Please select a Quiz:</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col p-4">
                        {this.state.quizzes && (
                            <Select
                                className="form-control-lg"
                                name="selectQuiz"
                                value={{value: this.state.selectedQuizId, label: this.state.selectedQuiz}}
                                onChange={this.onChangeQuizList}
                                options={this.mapQuizOptions(this.state.quizzes)}
                            />
                        )}
                        {this.state.content && (
                            <div className="alert alert-danger" role="alert">
                                {this.state.content}
                            </div>
                        )}
                    </div>
                </div>
                {this.state.currentUser.roleId === "3" &&  (
                    <div className="container-fluid mb-4">
                        <button
                            type="button"
                            name="quizAdd"
                            className="btn btn-lg btn-light m-1">
                            <i className="bi-file-earmark-plus-fill"></i>
                        </button>
                        <button
                            type="button"
                            name="quizDelete"
                            className="btn btn-lg btn-light m-1">
                            <i className="bi-file-earmark-minus-fill"></i>
                        </button>
                        <button
                            type="button"
                            name="quizUpdate"
                            className="btn btn-lg btn-light m-1">
                            <i className="bi-gear-fill"></i>
                        </button>
                    </div>
                )}

                <div className="row">
                    <div>
                        <h3>A Question:</h3>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="select-container">
                            {this.state.questions && (
                                <Select
                                    className="form-control-lg"
                                    name="selectQuiz"
                                    value={{value: this.state.selectedQuestionId, label: this.state.selectedQuestion}}
                                    onChange={this.onChangeQuestionList}
                                    options={this.mapQuestionOptions(this.state.questions)}
                                    menuIsOpen={this.state.selectedQuiz.length !== 0}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {this.state.currentUser.roleId === "3" &&  (
                    <div className="container-fluid mb-4">
                        <button
                            type="button"
                            name="questionAdd"
                            className="btn btn-lg btn-light m-1">
                            <i className="bi-file-earmark-plus-fill"></i>
                        </button>
                        <button
                            type="button"
                            name="questionDelete"
                            className="btn btn-lg btn-light m-1">
                            <i className="bi-file-earmark-minus-fill"></i>
                        </button>
                        <button
                            type="button"
                            name="questionUpdate"
                            className="btn btn-lg btn-light m-1">
                            <i className="bi-gear-fill"></i>
                        </button>
                    </div>
                )}

                <div className="row">
                    <div>
                        {(this.state.currentUser.roleId === "3" && (
                            <h3>... and a Response:</h3>
                        )) || (
                            <h4>These are the available responses for the Question:</h4>
                        )}
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="select-container">
                            {this.state.qResponses && (
                                <Select
                                    className="form-control-lg"
                                    name="selectQResponse"
                                    value={{value: this.state.selectedQResponseId, label:this.state.selectedQResponse}}
                                    label={this.state.selectedQResponseId}
                                    onChange={this.onChangeQResponseList}
                                    options={this.mapQResponseOptions(this.state.qResponses)}
                                    menuIsOpen={this.state.qResponses.length !== 0}
                                />
                            )}
                        </div>
                    </div>
                    {this.state.currentUser.roleId === "3" &&  (
                        <div className="container-fluid">
                            <button
                                type="button"
                                name="qresponseAdd"
                                className="btn btn-lg btn-light m-1">
                                <i className="bi-file-earmark-plus-fill"></i>
                            </button>
                            <button
                                type="button"
                                name="qresponseDelete"
                                className="btn btn-lg btn-light m-1">
                                <i className="bi-file-earmark-minus-fill"></i>
                            </button>
                            <button
                                type="button"
                                name={"qresponseUpdate"}
                                className="btn btn-lg btn-light m-1">
                                <i className="bi-gear-fill"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}