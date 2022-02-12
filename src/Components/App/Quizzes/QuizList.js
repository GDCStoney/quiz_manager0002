import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import QuizService from "../../../Services/quiz-service";
import QuestionService from "../../../Services/question-service";
import QResponseService from "../../../Services/qResponse-service";
import Select from "react-select";

export default class QuizList extends Component {
    constructor(props) {
        super(props);

        this.onChangeQuizList = this.onChangeQuizList.bind(this);
        this.onChangeQuestionList = this.onChangeQuestionList.bind(this);
        this.onChangeQResponseList = this.onChangeQResponseList.bind(this);

        this.state = {
            content: "",
            quizzes: [],
            selectedQuizId: "",
            questions: [],
            selectedQuestionId: "",
            qResponses: [],
            selectedQResponseId: "",
            selectedQResponse: "",
        };
    }

    componentDidMount() {
        setTimeout(()=> {
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
            selectedQuizId: e.target.value,
            selectedQuestionId: "",
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
            selectedQuestionId: e.target.value,
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

    mapOptions(qResponses) {
        return (qResponses.map((element, key) => {
            return (
                new Object({value: element.qresponseId, label: element.responseText})
            );
        }));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <h3>Please select a quiz:</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col p-4">
                        {this.state.quizzes && (
                            <select
                                className="form-control-lg"
                                name="selectQuiz"
                                value={this.state.selectedQuizId}
                                onChange={this.onChangeQuizList}
                            >
                                <option value>Select a quiz</option>
                                {this.state.quizzes.map((element, key) => {
                                    return (
                                        <option key={key} value={element.quizId}>
                                            {element.quizId + ": " + element.name}
                                        </option>
                                    );

                                })}
                            </select>
                        )}
                        {this.state.content && (
                            <div className="alert alert-danger" role="alert">
                                {this.state.content}
                            </div>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col p-4">
                        {this.state.questions && (
                            <select
                                className="form-control-lg"
                                name="selectQuiz"
                                value={this.state.selectedQuestionId}
                                onChange={this.onChangeQuestionList}
                            >
                                <option value>Select a question</option>
                                {this.state.questions.map((element, key) => {
                                    return (
                                        <option key={key} value={element.questionId}>
                                            {element.questionId + ": " + element.questionText}
                                        </option>
                                    );

                                })}
                            </select>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.qResponses && (
                            <>
                                <label htmlFor="selectQResponse">Selected Response:</label>
                                <Select
                                    className="form-select-lg"
                                    name="selectQResponse"
                                    value={{value: this.state.selectedQResponseId, label:this.state.selectedQResponse}}
                                    label={this.state.selectedQResponseId}
                                    onChange={this.onChangeQResponseList}
                                    options={this.mapOptions(this.state.qResponses)}
                                    menuIsOpen={this.state.qResponses.length !== 0}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}