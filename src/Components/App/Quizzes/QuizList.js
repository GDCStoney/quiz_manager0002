import React, {Component} from "react";
import Select from "react-select";

import QuizService from "../../../Services/quiz-service";

export default class QuizList extends Component {
    constructor(props) {
        super(props);

        this.createOptions = this.createOptions.bind(this);
        this.onChangeQuizList = this.onChangeQuizList.bind(this);

        this.state = {
            content: "",
            quizzes: "",
            selectedQuiz: ""
        };
    }

    componentDidMount() {
        QuizService.getQuizList().then(
            response => {
                this.setState({
                    quizzes: response.data
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

    createOptions(quizzes) {
        let quizOptions = [];

        quizzes.forEach(function(quiz) {
            quizOptions.push({
                label: quiz.quizId + ": " + quiz.name,
                value: quiz.quizId + ": " + quiz.name
            });
        });

        return  quizOptions;
    }

    onChangeQuizList(e) {
        console.log(e);
        this.setState({
            selectedQuiz: e.value
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <h3>Please select a quiz:</h3>
                    {this.state.quizzes && (
                        <Select
                            className="form-select-lg"
                            id="selectQuiz"
                            options={this.createOptions(this.state.quizzes)}
                            onChange={this.onChangeQuizList}
                            value={{label: this.state.selectedQuiz}}
                        />
                    )}

                    {this.state.content && (
                        <div className="alert alert-danger" role="alert">
                            {this.state.content}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}