import React, {Component} from "react";
import Select from "react-select";

import QuestionService from "../../../Services/question-service";
import QResponseList from "../QResponses/QResponseList";

export default class QuestionList extends Component {
    constructor(props) {
        super(props);

        this.onChangeQuestionList = this.onChangeQuestionList.bind(this);
        this.createOptions = this.createOptions.bind(this);

        this.state = {
            content: "",
            questions: "",
            selectedQuestion: "",
            selectedQuestionId: ""
        }
    }

    componentDidMount() {
        QuestionService.getQuestionList(this.props.selectedQuizId).then(
            response => {
                this.setState({
                    questions: response.data
                });
            },
            error => {
                this.setState({
                    content: (
                            error.response &&
                            error.response.data &&
                            error.response.data.message
                        ) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    createOptions(questions) {
        let questionOptions = [];

        questions.forEach(function(question) {
            questionOptions.push({
                label: question.questionId + ": " + question.questionText,
                value: question.questionId
            });
        });

        return  questionOptions;
    }

    onChangeQuestionList(e) {
        this.setState({
            selectedQuestion: e.label,
            selectedQuestionId: e.value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h3>Please select a question:</h3>
                    {this.state.questions && (
                        <Select
                            className="form-select-lg"
                            id="selectQuestion"
                            options={this.createOptions(this.state.questions)}
                            onChange={this.onChangeQuestionList}
                            value={{label: this.state.selectedQuestion}}
                        />
                    )}
                    {this.state.content && (
                        <div className="alert alert-danger" role="alert">
                            {this.state.content}
                        </div>
                    )}

                    {this.state.selectedQuestion && (
                        <QResponseList
                            selectedQuizId={this.props.selectedQuizId}
                            selectedQuestionId={this.state.selectedQuestionId}
                        />
                    )}
                </div>
            </div>
        )
    }
}