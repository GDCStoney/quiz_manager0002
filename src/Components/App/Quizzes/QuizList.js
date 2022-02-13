import React, {Component} from "react";
import Select from "react-select";

import AuthService from "../../../Services/auth-service";
import QuizService from "../../../Services/quiz-service";
import QuestionService from "../../../Services/question-service";
import QResponseService from "../../../Services/qResponse-service";
import ReactTooltip from "react-tooltip";

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
        let responseLabels = [];
        if (this.state.currentUser.roleId === "2" || this.state.currentUser.roleId === "3") {
            responseLabels = collection.map(element => {
                const newLabel = element.correctAnswer + ": " + element.responseText;
                return {value: element.qresponseId, label: newLabel};
            });
        }else {
            responseLabels = collection.map(element => {
                const newLabel = element.responseText;
                return {value: element.qresponseId, label: newLabel};
            });
        }
        return responseLabels;
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
                        <>
                            <ReactTooltip id="quizAddTip" place="bottom" effect="float">Add Quiz</ReactTooltip>
                            <button
                                type="button"
                                name="quizAdd"
                                className="btn btn-lg btn-light m-1"
                                data-tip data-for="quizAddTip"
                            >
                                <i className="bi-file-earmark-plus-fill"></i>
                            </button>
                            {this.state.selectedQuizId && (
                                <>
                                    <ReactTooltip id="quizDeleteTip" place="bottom" effect="float">Delete Quiz</ReactTooltip>
                                    <button
                                        type="button"
                                        name="quizDelete"
                                        className="btn btn-lg btn-light m-1"
                                        data-tip data-for="quizDeleteTip"
                                    >
                                        <i className="bi-file-earmark-minus-fill"></i>
                                    </button>
                                    <ReactTooltip id="quizUpdateTip" place="bottom" effect="float">Update Quiz</ReactTooltip>
                                    <button
                                        type="button"
                                        name="quizUpdate"
                                        className="btn btn-lg btn-light m-1"
                                        data-tip data-for="quizUpdateTip"
                                    >
                                        <i className="bi-gear-fill"></i>
                                    </button>
                                </>
                            )}
                        </>
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
                {this.state.currentUser.roleId === "3" &&  this.state.selectedQuizId && (
                    <div className="container-fluid mb-4">
                        <>
                            <ReactTooltip id="questionAddTip" place="bottom" effect="float">Add Question</ReactTooltip>
                            <button
                                type="button"
                                name="questionAdd"
                                className="btn btn-lg btn-light m-1"
                                data-tip data-for="questionAddTip"
                            >
                                <i className="bi-file-earmark-plus-fill"></i>
                            </button>
                            {this.state.selectedQuestionId && (
                                <>
                                    <ReactTooltip id="questionDeleteTip" place="bottom" effect="float">Delete Question</ReactTooltip>
                                    <button
                                        type="button"
                                        name="questionDelete"
                                        className="btn btn-lg btn-light m-1"
                                        data-tip data-for="questionDeleteTip"
                                    >
                                        <i className="bi-file-earmark-minus-fill"></i>
                                    </button>
                                    <ReactTooltip id="questionUpdateTip" place="bottom" effect="float">Update Question</ReactTooltip>
                                    <button
                                        type="button"
                                        name="questionUpdate"
                                        className="btn btn-lg btn-light m-1"
                                        data-tip data-for="questionUpdateTip"
                                    >
                                        <i className="bi-gear-fill"></i>
                                    </button>
                                </>
                            )}
                        </>
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
                                    onChange={this.onChangeQResponseList}
                                    options={this.mapQResponseOptions(this.state.qResponses)}
                                    menuIsOpen={this.state.qResponses.length !== 0}
                                />
                            )}
                        </div>
                    </div>
                    {this.state.currentUser.roleId === "3" &&  this.state.selectedQuizId && this.state.selectedQuestionId && (
                        <div className="container-fluid">
                            <>
                                <ReactTooltip id="qResponseAddTip" place="bottom" effect="float">Add Response</ReactTooltip>
                                <button
                                    type="button"
                                    name="qResponseAdd"
                                    className="btn btn-lg btn-light m-1"
                                    data-tip data-for="qResponseAddTip"
                                >
                                    <i className="bi-file-earmark-plus-fill"></i>
                                </button>
                                {this.state.selectedQResponseId && (
                                    <>
                                        <ReactTooltip id="qResponseDeleteTip" place="bottom" effect="float">Delete Response</ReactTooltip>
                                        <button
                                            type="button"
                                            name="qResponseDelete"
                                            className="btn btn-lg btn-light m-1"
                                            data-tip data-for="qResponseDeleteTip"
                                        >
                                            <i className="bi-file-earmark-minus-fill"></i>
                                        </button>
                                        <ReactTooltip id="qResponseUpdateTip" place="bottom" effect="float">Update Response</ReactTooltip>
                                        <button
                                            type="button"
                                            name="qResponseUpdate"
                                            className="btn btn-lg btn-light m-1"
                                            data-tip data-for="qResponseUpdateTip"
                                        >
                                            <i className="bi-gear-fill"></i>
                                        </button>
                                    </>
                                )}
                            </>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}